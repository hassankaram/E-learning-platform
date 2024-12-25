# filepath: /Users/mohamed3wes/new e-learning/E-learning-platform/e_learning_platform/e_learning_platform/urls.py
from django.contrib import admin
from django.urls import path, include
from courses.views import categories_list, courses_list , enrollment_list # Corrected import
from users.views import LoginView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('auth/login/', LoginView.as_view(), name='custom_login'),
    path('auth/registration/', include('dj_rest_auth.registration.urls')),
    path('api/users/', include('users.urls')),
    path('api/categories/', categories_list, name='categories_list'),
    path('api/courses/', courses_list, name='courses_list'),
    path('enrollments/', enrollment_list, name='enrollment_list'),

    path('', include('users.urls'))
]
