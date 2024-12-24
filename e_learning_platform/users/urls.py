from django.urls import path
from users.views import RegisterView, UserProfileView, LoginView

urlpatterns = [
    path('registration/', RegisterView.as_view(), name='registration'),
    path('login/', LoginView.as_view(), name='login'),
    path('profile/', UserProfileView.as_view(), name='profile'),
]
