from datetime import timezone
from requests import Response
from rest_framework import status
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from . import serializers
from .models import Category, Course, CourseProgress, Enrollment, Review
from .serializers import CategorySerializer, CourseProgressSerializer, CourseSerializer, EnrollmentSerializer, ReviewSerializer
from .permissions import IsInstructor


class CategoryListView(generics.ListCreateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [IsAuthenticated]

class CourseListView(generics.ListCreateAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    permission_classes = [IsAuthenticated, IsInstructor]

    def perform_create(self, serializer):
        serializer.save(instructor=self.request.user)

class EnrollmentListCreateView(generics.ListCreateAPIView):
    queryset = Enrollment.objects.all()
    serializer_class = EnrollmentSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        if not self.request.user.is_student:
            raise serializers.ValidationError("Only students can enroll in courses.")
        serializer.save(student=self.request.user)

class CourseDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    permission_classes = [IsAuthenticated, IsInstructor]

class ReviewListCreateView(generics.ListCreateAPIView):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        # Ensure the current user is a student
        if not self.request.user.is_student:
            raise serializers.ValidationError("Only students can review courses.")
        serializer.save(student=self.request.user)

class CourseReviewListView(generics.ListAPIView):
    serializer_class = ReviewSerializer

    def get_queryset(self):
        course_id = self.kwargs['course_id']
        return Review.objects.filter(course_id=course_id)
    
class MarkCourseAsCompletedView(generics.ListAPIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, course_id):
        student = request.user
        try:
            course = Course.objects.get(id=course_id)
        except Course.DoesNotExist:
            return Response({"error": "Course not found"}, status=status.HTTP_404_NOT_FOUND)

        if not Enrollment.objects.filter(student=student, course=course).exists():
            return Response({"error": "You must be enrolled in this course to mark it as completed."}, status=status.HTTP_400_BAD_REQUEST)
        
        progress, created = CourseProgress.objects.get_or_create(student=student, course=course)
        if progress.is_completed:
            return Response({"error": "Course is already marked as completed."}, status=status.HTTP_400_BAD_REQUEST)

        progress.is_completed = True
        progress.completed_at = timezone.now()
        progress.save()

        serializer = CourseProgressSerializer(progress)
        return Response(serializer.data, status=status.HTTP_200_OK)
