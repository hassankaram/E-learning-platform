from django.urls import path
from .views import CategoryListView, CourseDetailView, EnrollmentListCreateView

urlpatterns = [
    path('categories/', CategoryListView.as_view(), name='category-list'),
    path('courses/', CategoryListView.as_view(), name='course-list'),
    path('enrollments/', EnrollmentListCreateView.as_view(), name='enrollments-list-create'),
    path('courses/<int:pk>/', CourseDetailView.as_view(), name='course-detail'),
]


