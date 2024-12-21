# filepath: /Users/mohamed3wes/new e-learning/E-learning-platform/e_learning_platform/e_learning_platform/views.py
from django.http import JsonResponse
from courses.models import Category 
from .models import Cart, CartItem, Category, Course, CourseProgress, Enrollment, Review


def categories_list(request):
    categories = Category.objects.all().values('id', 'name')
    return JsonResponse(list(categories), safe=False)
