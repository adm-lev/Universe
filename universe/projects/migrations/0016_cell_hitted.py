# Generated by Django 3.2.8 on 2022-11-30 12:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('projects', '0015_alter_cell_have_ship'),
    ]

    operations = [
        migrations.AddField(
            model_name='cell',
            name='hitted',
            field=models.BooleanField(default=False, help_text='Have hit'),
        ),
    ]
