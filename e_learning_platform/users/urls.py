# filepath: /Users/mohamed3wes/new e-learning/E-learning-platform/e_learning_platform/users/urls.py
from django.urls import path 
from users.views import RegisterView, UserProfileView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('profile/', UserProfileView.as_view(), name='profile'),
]
