from rest_framework import generics
from .models import Category, Course
from .serializers import CategorySerializer, CourseSerializer

class CategoryListView(generics.ListCreateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class CourseListView(generics.ListCreateAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer

    #def perform_create(self, serializer):
        #serializer.save(instructor=self.request.user)

