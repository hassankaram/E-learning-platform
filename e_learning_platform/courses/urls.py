from django.urls import path
from .views import courses_list, categories_list, enrollment_list  # Corrected import

urlpatterns = [
    path('categories/', categories_list, name='categories_list'),
    path('courses/', courses_list, name='courses_list'),
    path('enrollments/', enrollment_list, name='enrollment_list'),
]