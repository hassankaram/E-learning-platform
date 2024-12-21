# filepath: /Users/mohamed3wes/new e-learning/E-learning-platform/e_learning_platform/courses/urls.py
from django.urls import path
from .views import courses_list, categories_list  # Corrected import

urlpatterns = [
    path('categories/', categories_list, name='categories_list'),
    path('courses/', courses_list, name='courses_list'),
]