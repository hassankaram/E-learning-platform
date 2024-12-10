from rest_framework import generics
from .models import Category, Course
from .serializers import CategorySerializer, CourseSerializer
from rest_framework.permissions import IsAuthenticated
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

