# Generated by Django 3.2.8 on 2022-11-30 09:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('projects', '0005_auto_20221130_0942'),
    ]

    operations = [
        migrations.AlterField(
            model_name='game',
            name='time_finish',
            field=models.DateTimeField(blank=True, help_text='Date updated', null=True),
        ),
    ]
