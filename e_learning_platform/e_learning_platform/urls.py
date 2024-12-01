from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('auth/', include('dj_rest_auth.urls')),
    path('auth/registration/', include('dj_rest_auth.registration')),
    path('api/users/', include('users.urls')),
    path('api/courses/', include('courses.urls'),)
]
