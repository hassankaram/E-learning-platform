from rest_framework import serializers
from .models import Category, Course, Enrollment
from users.models import User
from .models import Course

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

    def validate_title(self, value):
        if Course.objects.filter(title=value).exists():
            raise serializers.ValidationError("A course with this title already exists.")
        return value
    
class EnrollmentSerializer(serializers.ModelSerializer):
    student = serializers.PrimaryKeyRelatedField(queryset=User.objects.filter(is_student=True))
    course = serializers.PrimaryKeyRelatedField(queryset=Course.objects.all())

    class Meta:
        model = Enrollment
        fields = ['id', 'student', 'course', 'date_enrolled']

    def create(self, validated_data):
        if Enrollment.objects.filter(student=validated_data['student'], course=validated_data['course']).exists():
            raise serializers.ValidationError("Student is already enrolled in this course.")
        return super().create(validated_data)