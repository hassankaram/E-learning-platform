# filepath: /Users/mohamed3wes/new e-learning/E-learning-platform/e_learning_platform/e_learning_platform/urls.py
from django.contrib import admin
from django.urls import path, include
from courses.views import categories_list, courses_list  # Corrected import

urlpatterns = [
    path('admin/', admin.site.urls),
    path('auth/', include('dj_rest_auth.urls')),
    path('auth/registration/', include('dj_rest_auth.registration.urls')),
    path('api/users/', include('users.urls')),
    path('api/categories/', categories_list, name='categories_list'),
    path('api/courses/', courses_list, name='courses_list'),
    path('', include('users.urls'))
]