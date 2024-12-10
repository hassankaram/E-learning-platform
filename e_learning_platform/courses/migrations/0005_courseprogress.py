# Generated by Django 5.1.4 on 2024-12-10 19:27

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('courses', '0004_enrollment_review'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='CourseProgress',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('is_completed', models.BooleanField(default=False)),
                ('completed_at', models.DateTimeField(blank=True, null=True)),
                ('course', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='progress', to='courses.course')),
                ('student', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='course_progress', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'unique_together': {('student', 'course')},
            },
        ),
    ]
