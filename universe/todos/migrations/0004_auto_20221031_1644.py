# Generated by Django 3.2.8 on 2022-10-31 16:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('todos', '0003_project'),
    ]

    operations = [
        migrations.RenameField(
            model_name='project',
            old_name='url',
            new_name='project_url',
        ),
        migrations.AlterField(
            model_name='project',
            name='name',
            field=models.CharField(help_text='Project name', max_length=64, unique=True),
        ),
    ]
