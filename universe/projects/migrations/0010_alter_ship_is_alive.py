# Generated by Django 3.2.8 on 2022-11-30 10:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('projects', '0009_remove_ship_game_id'),
    ]

    operations = [
        migrations.AlterField(
            model_name='ship',
            name='is_alive',
            field=models.BooleanField(default=True, help_text='Is alive'),
        ),
    ]