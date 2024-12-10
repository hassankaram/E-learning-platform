from rest_framework import permissions

class IsInstructor(permissions.BasePermission):
    """
    Custom permission to allow access only to instructors.
    """
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.is_instructor

class IsStudent(permissions.BasePermission):
    """
    Custom permission to allow access only to students.
    """
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.is_student
