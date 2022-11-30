# Generated by Django 3.2.8 on 2022-10-31 16:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('todos', '0002_auto_20221027_1153'),
    ]

    operations = [
        migrations.CreateModel(
            name='Project',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(help_text='Projent name', max_length=64, unique=True)),
                ('url', models.CharField(blank=True, help_text='Repo URL', max_length=128)),
                ('users', models.ManyToManyField(help_text='Project users', to='todos.User')),
            ],
        ),
    ]