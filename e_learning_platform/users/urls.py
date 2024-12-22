from django.urls import path
from users.views import RegisterView, UserProfileView, LoginView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('profile/', UserProfileView.as_view(), name='profile'),  # Ensure this exists
]
