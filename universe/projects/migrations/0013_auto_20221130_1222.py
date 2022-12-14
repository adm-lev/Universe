# Generated by Django 3.2.8 on 2022-11-30 12:22

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('projects', '0012_auto_20221130_1035'),
    ]

    operations = [
        migrations.AddField(
            model_name='cell',
            name='have_ship',
            field=models.BooleanField(default=True, help_text='Have ship'),
        ),
        migrations.AlterField(
            model_name='cell',
            name='ship_id',
            field=models.ForeignKey(default=None, help_text='Ship', null=True, on_delete=django.db.models.deletion.CASCADE, to='projects.ship'),
        ),
    ]
