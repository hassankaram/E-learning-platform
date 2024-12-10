from django.urls import path
from .views import CategoryListView, EnrollmentListCreateView

urlpatterns = [
    path('categories/', CategoryListView.as_view(), name='category-list'),
    path('courses/', CategoryListView.as_view(), name='course-list'),
    path('enrollments/', EnrollmentListCreateView.as_view(), name='enrollments-list-create'),
]


