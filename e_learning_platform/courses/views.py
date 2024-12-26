from django.utils import timezone
from rest_framework import status, generics
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import JsonResponse, HttpResponse
from utils.certificate_generator import generate_certificate
from .models import Cart, CartItem, Course, CourseProgress, Enrollment, Category
from .serializers import (
    CartItemSerializer,
    CartSerializer,
    CategorySerializer,
    CourseProgressSerializer,
    CourseSerializer,
    EnrollmentSerializer,
)
from .permissions import IsInstructor

@api_view(['GET', 'POST'])
def categories_list(request):
    if request.method == 'GET':
        categories = Category.objects.all()
        response = []
        for category in categories:
            courses = Course.objects.filter(category=category)
            courses_serializer = CourseSerializer(courses, many=True)
            response.append({
                "id": category.id,
                "name": category.name,
                "description": category.description,
                "courses": courses_serializer.data
            })
        return Response(response)


@api_view(['GET', 'POST'])
def courses_list(request):
    if request.method == 'GET':
        courses = Course.objects.all()
        serializer = CourseSerializer(courses, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = CourseSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def enrollment_list(request):
    enrollments = Enrollment.objects.all()
    serializer = EnrollmentSerializer(enrollments, many=True)
    return Response(serializer.data)



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





class MarkCourseAsCompletedView(generics.GenericAPIView):
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

class GenerateCertificateView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, course_id):
        student = request.user
        try:
            course = Course.objects.get(id=course_id)
        except Course.DoesNotExist:
            return Response({"error": "Course not found"}, status=status.HTTP_404_NOT_FOUND)

        progress = CourseProgress.objects.filter(student=student, course=course).first()
        if not progress or not progress.is_completed:
            return Response({"error": "You must complete the course to receive a certificate."}, status=status.HTTP_400_BAD_REQUEST)

        completion_date = progress.completed_at
        certificate_pdf = generate_certificate(student.username, course.title, completion_date)

        response = HttpResponse(certificate_pdf, content_type="application/pdf")
        response['Content-Disposition'] = f'attachment; filename="certificate_{course.id}.pdf"'

        return response

class CartView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            course_id = request.data.get('course_id')
            if not course_id:
                raise ValueError("Course ID is required.")

            course = Course.objects.get(id=course_id)
            if course.instructor == request.user:
                raise ValueError("You cannot add your own course to the cart.")

            cart, created = Cart.objects.get_or_create(user=request.user)
            if cart.items.filter(course=course).exists():
                raise ValueError("This course is already in your cart.")

            cart_item = CartItem.objects.create(cart=cart, course=course)
            return Response(CartItemSerializer(cart_item).data, status=status.HTTP_201_CREATED)
        except Course.DoesNotExist:
            return Response({"error": "Course not found."}, status=status.HTTP_404_NOT_FOUND)
        except ValueError as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({"error": "An unexpected error occurred."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
