# Generated by Django 2.0.6 on 2018-06-10 00:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('notes', '0002_note_owner'),
    ]

    operations = [
        migrations.AddField(
            model_name='note',
            name='title',
            field=models.CharField(blank=True, default='', max_length=100),
        ),
    ]