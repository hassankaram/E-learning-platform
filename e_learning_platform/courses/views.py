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

@api_view(['GET'])
def categories_list(request):
    categories = Category.objects.all().values('id', 'name')
    return JsonResponse(list(categories), safe=False)

@api_view(['GET'])
def courses_list(request):
    courses = Course.objects.all()
    serializer = CourseSerializer(courses, many=True)
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

    def get(self, request):
        cart, created = Cart.objects.get_or_create(user=request.user)
        serializer = CartSerializer(cart)
        return Response(serializer.data)

    def post(self, request):
        user = request.user
        course_id = request.data.get('course_id')
        try:
            course = Course.objects.get(id=course_id)
        except Course.DoesNotExist:
            return Response({"error": "Course not found"}, status=status.HTTP_404_NOT_FOUND)

        if course.instructor == user:
            return Response({"error": "You cannot add your own course to the cart."}, status=status.HTTP_400_BAD_REQUEST)

        cart, created = Cart.objects.get_or_create(user=user)
        if cart.items.filter(course=course).exists():
            return Response({"error": "This course is already in your cart."}, status=status.HTTP_400_BAD_REQUEST)

        cart_item = CartItem.objects.create(cart=cart, course=course)
        serializer = CartItemSerializer(cart_item)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def delete(self, request, cart_item_id):
        user = request.user
        try:
            cart_item = CartItem.objects.get(id=cart_item_id, cart__user=user)
        except CartItem.DoesNotExist:
            return Response({"error": "Cart item not found"}, status=status.HTTP_404_NOT_FOUND)

        cart_item.delete()
        return Response({"message": "Item removed from cart"}, status=status.HTTP_204_NO_CONTENT)
