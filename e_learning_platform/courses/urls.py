from django.urls import path
from .views import CategoryListView, CourseDetailView, CourseReviewListView, EnrollmentListCreateView, MarkCourseAsCompletedView, ReviewListCreateView

urlpatterns = [
    path('categories/', CategoryListView.as_view(), name='category-list'),
    path('courses/', CategoryListView.as_view(), name='course-list'),
    path('enrollments/', EnrollmentListCreateView.as_view(), name='enrollments-list-create'),
    path('courses/<int:pk>/', CourseDetailView.as_view(), name='course-detail'),
    path('courses/<int:course_id>/reviews/', CourseReviewListView.as_view(), name='course-reviews'),
    path('reviews/', ReviewListCreateView.as_view(), name='review-list-create'),
    path('courses/<int:course_id>/complete/', MarkCourseAsCompletedView.as_view(), name='mark-course-completed'),
]


