from rest_framework import serializers
from .models import Category, Course, CourseProgress, Enrollment, Cart, CartItem
from users.models import User


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
    course = serializers.PrimaryKeyRelatedField(queryset=Course.objects.all())

    class Meta:
        model = Enrollment
        fields = ['id', 'student', 'course', 'date_enrolled']

    def create(self, validated_data):
        if Enrollment.objects.filter(student=validated_data['student'], course=validated_data['course']).exists():
            raise serializers.ValidationError("Student is already enrolled in this course.")
        return super().create(validated_data)

class CourseProgressSerializer(serializers.ModelSerializer):
    class Meta:
        model = CourseProgress
        fields = ['id', 'student', 'course', 'is_completed', 'completed_at']
        read_only_fields = ['id', 'student', 'course', 'completed_at']

class CartItemSerializer(serializers.ModelSerializer):
    course_title = serializers.CharField(source="course.title", read_only=True)

    class Meta:
        model = CartItem
        fields = ['id', 'course', 'course_title', 'quantity']

class CartSerializer(serializers.ModelSerializer):
    items = CartItemSerializer(many=True, read_only=True)
    total_price = serializers.SerializerMethodField()

    class Meta:
        model = Cart
        fields = ['id', 'user', 'items', 'total_price', 'created_at']

    def get_total_price(self, obj):
        return obj.total_price()