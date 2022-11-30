# Generated by Django 3.2.8 on 2022-11-30 09:36

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('projects', '0003_alter_player_game_id'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='board',
            options={'verbose_name': 'Board', 'verbose_name_plural': 'Boards'},
        ),
        migrations.AlterModelOptions(
            name='cell',
            options={'verbose_name': 'Cell', 'verbose_name_plural': 'Cells'},
        ),
        migrations.AlterModelOptions(
            name='game',
            options={'verbose_name': 'Game', 'verbose_name_plural': 'Games'},
        ),
        migrations.AlterModelOptions(
            name='player',
            options={'verbose_name': 'Player', 'verbose_name_plural': 'Players'},
        ),
        migrations.AlterModelOptions(
            name='ship',
            options={'verbose_name': 'Ship', 'verbose_name_plural': 'Ships'},
        ),
        migrations.AddField(
            model_name='ship',
            name='game_id',
            field=models.ForeignKey(default=None, help_text='Game', null=True, on_delete=django.db.models.deletion.CASCADE, to='projects.game'),
        ),
    ]
