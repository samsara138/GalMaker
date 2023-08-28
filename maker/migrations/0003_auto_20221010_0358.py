# Generated by Django 3.2.13 on 2022-10-10 03:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('maker', '0002_auto_20221010_0338'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='galnode',
            name='left_character_show',
        ),
        migrations.RemoveField(
            model_name='galnode',
            name='right_character_show',
        ),
        migrations.AddField(
            model_name='galnode',
            name='left_character_hide',
            field=models.BooleanField(blank=True, default=False),
        ),
        migrations.AddField(
            model_name='galnode',
            name='right_character_hide',
            field=models.BooleanField(blank=True, default=False),
        ),
    ]