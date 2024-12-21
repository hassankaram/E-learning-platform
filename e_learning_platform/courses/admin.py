# filepath: /Users/mohamed3wes/new e-learning/E-learning-platform/e_learning_platform/courses/admin.py
from django.contrib import admin
from .models import Category, Course, Lesson, Video, Cart, CartItem, CourseProgress, Enrollment

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'description')

@admin.register(Course)
class CourseAdmin(admin.ModelAdmin):
    list_display = ('title', 'description', 'instructor', 'category', 'created_at')

@admin.register(Lesson)
class LessonAdmin(admin.ModelAdmin):
    list_display = ('title', 'course', 'created_at')

@admin.register(Video)
class VideoAdmin(admin.ModelAdmin):
    list_display = ('title', 'duration', 'created_at')

@admin.register(Cart)
class CartAdmin(admin.ModelAdmin):
    list_display = ('user', 'created_at')

@admin.register(CartItem)
class CartItemAdmin(admin.ModelAdmin):
    list_display = ('cart', 'course', 'quantity')

@admin.register(CourseProgress)
class CourseProgressAdmin(admin.ModelAdmin):
    list_display = ('student', 'course', 'is_completed', 'completed_at')

@admin.register(Enrollment)
class EnrollmentAdmin(admin.ModelAdmin):
    list_display = ('student', 'course', 'date_enrolled')