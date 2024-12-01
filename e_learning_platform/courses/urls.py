from django.urls import path
from .views import CategoryListView, CourseListView

urlpatterns = [
    path('categories/', CategoryListView.as_view(), name='category-list'),
    path('courses/', CategoryListView.as_view(), name='course-list'),
    ]


