"""Views and utilities for exporting data to csv.
"""
from django.conf import settings
from django.shortcuts import redirect
from rest_framework import permissions
from rest_framework import serializers
from rest_framework import viewsets
from rest_pandas import PandasSerializer, PandasViewSet
from learn.models import Block, Toolbox, Level, Task, Instruction
from learn.models import Action, Student, TaskSession, ProgramSnapshot


class BlockSerializer(serializers.ModelSerializer):
    class Meta:
        model = Block
        fields = ('id', 'name', 'order')


class BlockViewSet(PandasViewSet):
    queryset = Block.objects.all()
    serializer_class = BlockSerializer
    permission_classes = (permissions.IsAdminUser,)


class ToolboxSerializer(serializers.ModelSerializer):
    blocks = serializers.SlugRelatedField(slug_field='name', many=True, read_only=True)

    class Meta:
        model = Toolbox
        fields = ('id', 'name', 'blocks')


class ToolboxViewSet(PandasViewSet):
    queryset = Toolbox.objects.all().prefetch_related('blocks')
    serializer_class = ToolboxSerializer
    permission_classes = (permissions.IsAdminUser,)


class LevelSerializer(serializers.ModelSerializer):
    tasks = serializers.SlugRelatedField(
        slug_field='name',
        many=True,
        read_only=True)
    toolbox = serializers.SlugRelatedField(
        slug_field='name',
        many=False,
        queryset=Toolbox.objects.all())

    class Meta:
        model = Level
        fields = ('id', 'level', 'name', 'credits', 'toolbox', 'tasks')


class LevelViewSet(PandasViewSet):
    queryset = Level.objects.all().select_related('toolbox').prefetch_related('tasks')
    serializer_class = LevelSerializer
    permission_classes = (permissions.IsAdminUser,)


class InstructionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Instruction
        fields = ('id', 'name')


class InstructionViewSet(PandasViewSet):
    serializer_class = InstructionSerializer
    queryset = Instruction.objects.all()
    permission_classes = (permissions.IsAdminUser,)


class TaskSerializer(serializers.ModelSerializer):
    level = serializers.SlugRelatedField(
        slug_field='name',
        many=False,
        queryset=Level.objects.all())

    class Meta:
        model = Task
        fields = ('id', 'name', 'level', 'setting', 'solution')


class TaskViewSet(PandasViewSet):
    queryset = Task.objects.all().select_related('level')
    serializer_class = TaskSerializer
    permission_classes = (permissions.IsAdminUser,)


class StudentSerializer(serializers.ModelSerializer):
    credits = serializers.IntegerField(read_only=True)
    seen_instructions = serializers.SlugRelatedField(
        slug_field='name',
        many=True,
        read_only=True)

    class Meta:
        model = Student
        fields = ('id', 'credits', 'seen_instructions')


class StudentViewSet(PandasViewSet):
    queryset = Student.objects.prefetch_related('seen_instructions').all()
    serializer_class = StudentSerializer
    permission_classes = (permissions.IsAdminUser,)


class TaskSessionSerializer(serializers.ModelSerializer):
    class Meta:
        model = TaskSession
        fields = ('id', 'student', 'task', 'solved', 'start', 'end', 'time_spent')


class TaskSessionsViewSet(PandasViewSet):
    queryset = TaskSession.objects.all()
    serializer_class = TaskSessionSerializer
    permission_classes = (permissions.IsAdminUser,)


class ProgramSnapshotSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProgramSnapshot
        fields = (
            'id', 'task_session', 'time', 'program',
            'granularity', 'order', 'correct', 'time_from_start')


def to_delta(times):
    deltas = times.diff()
    deltas.iat[0] = times.iat[0]
    return deltas


class ProgramSnapshotPandasSerializer(PandasSerializer):
    def transform_dataframe(self, dataframe):
        """Add a column with time since last snapshot of the same granularity.
        """
        grouped_programs = dataframe.groupby(['task_session', 'granularity'])
        dataframe['time_delta'] = grouped_programs.time_from_start.transform(to_delta)
        return dataframe


class ProgramSnapshotsViewSet(PandasViewSet):
    # Not only task session, but also its snapshots must be prefetched to avoid
    # generating individual SQL queries for each serialed row. (The reason is
    # in ProgramSnapshot.order which is a computed property and needs to know
    # all snapshots of its task session.)
    # TODO: Once the order is computed on save(), it is enought to
    # select_related('task_session') (that is still needed for time_from
    # start), although that could be computed on save() as well.
    queryset = ProgramSnapshot.objects.prefetch_related('task_session__snapshots').all()
    serializer_class = ProgramSnapshotSerializer
    pandas_serializer_class = ProgramSnapshotPandasSerializer
    permission_classes = (permissions.IsAdminUser,)


class ActionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Action
        fields = ('id', 'name', 'student', 'task', 'time', 'randomness', 'data')


class ActionsViewSet(PandasViewSet):
    queryset = Action.objects.all()
    serializer_class = ActionSerializer
    permission_classes = (permissions.IsAdminUser,)


class LatestBundleViewSet(viewsets.ViewSet):
    """Phony ViewSet to specify a custom entry in the rest API.
    """
    # Whole export API is only available to staff users, but the already
    # exported files are avaible to everybody by direct URL to the media dir.
    # Specifically the latest bundle can be downloaded by anybody at:
    # `http://robomise.cz/media/exports/robomission-latest.zip`.
    permission_classes = (permissions.IsAdminUser,)

    def list(self, request, format=None):
        bundle_url = '{media}exports/{bundle_name}'.format(
            media=settings.MEDIA_URL,
            bundle_name=settings.EXPORT_BUNDLE_NAME)
        return redirect(bundle_url)
