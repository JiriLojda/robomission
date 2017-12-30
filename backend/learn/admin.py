"""Setting for admin page.
"""
from django.contrib import admin
from learn.models import Block, Toolbox, Level, Task, Instruction, Student
from learn.models import TaskSession, ProgramSnapshot, Action, Feedback


@admin.register(Block)
class BlockAdmin(admin.ModelAdmin):
    search_fields = ['name']


@admin.register(Level)
class LevelAdmin(admin.ModelAdmin):
    list_display = ('level', 'name', 'toolbox', 'credits')
    list_display_links = ('level', 'name')


@admin.register(Task)
class TaskAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'level')
    list_display_links = ('id', 'name')
    list_filter = ('level',)
    search_fields = ['name']


@admin.register(Toolbox)
class ToolboxAdmin(admin.ModelAdmin):
    list_filter = ('blocks',)


@admin.register(Instruction)
class InstructionAdmin(admin.ModelAdmin):
    search_fields = ['name']


@admin.register(TaskSession)
class TaskSessionAdmin(admin.ModelAdmin):
    list_display = ('id', 'student', 'task', 'solved', 'start', 'end')
    date_hierarchy = 'start'
    list_filter = ('task', 'solved', 'start')


@admin.register(ProgramSnapshot)
class ProgramSnapshotAdmin(admin.ModelAdmin):
    list_display = ('id', 'task_session', 'program', 'granularity', 'correct')
    date_hierarchy = 'time'
    list_filter = ('granularity', 'correct')
    search_fields = ['program']


@admin.register(Action)
class ActionAdmin(admin.ModelAdmin):
    date_hierarchy = 'time'
    list_filter = ('name',)


@admin.register(Student)
class StudentAdmin(admin.ModelAdmin):
    pass


@admin.register(Feedback)
class FeedbackAdmin(admin.ModelAdmin):
    date_hierarchy = 'inserted'
    list_filter = ('inserted', 'url')
    search_fields = ['comment']
