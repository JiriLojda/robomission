# -*- coding: utf-8 -*-
# Generated by Django 1.11.5 on 2018-03-07 14:25
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('learn', '0033_remove_levels'),
    ]

    operations = [
        migrations.AlterField(
            model_name='skill',
            name='value',
            field=models.FloatField(default=0),
        ),
    ]
