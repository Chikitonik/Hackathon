# Generated by Django 4.2.4 on 2023-09-01 19:23

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Currency',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('currency_code', models.CharField(max_length=3, unique=True)),
                ('currency_name', models.CharField(max_length=255)),
                ('currency_image_url', models.URLField(blank=True, max_length=255, null=True)),
            ],
        ),
    ]
