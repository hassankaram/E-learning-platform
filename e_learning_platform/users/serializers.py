from rest_framework import serializers
from django.contrib.auth import get_user_model
from courses.models import Category, Course, Enrollment

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'is_staff', 'is_active']  # Update fields as needed

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'description']

class CourseSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source='category.name', read_only=True)
    instructor_name = serializers.CharField(source='instructor.username', read_only=True)
    created_at = serializers.DateTimeField(format='%Y-%m-%d %H:%M:%S', read_only=True)

    class Meta:
        model = Course
        fields = ['id', 'title', 'description', 'instructor_name', 'category_name', 'category', 'created_at']

class EnrollmentSerializer(serializers.ModelSerializer):
    student = serializers.PrimaryKeyRelatedField(queryset=User.objects.filter(is_student=True))

    class Meta:
        model = Enrollment
        fields = '__all__'

    def create(self, validated_data):
        return super().create(validated_data)
