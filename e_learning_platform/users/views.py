from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate
from django.contrib.auth.models import update_last_login
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import UserSerializer
from rest_framework.permissions import IsAuthenticated

class LoginView(APIView):
    def post(self, request, *args, **kwargs):
        username = request.data.get('username')
        password = request.data.get('password')

        # Authenticate user
        user = authenticate(username=username, password=password)
        if user is not None:
            if user.is_active:
                # Generate JWT tokens
                refresh = RefreshToken.for_user(user)
                update_last_login(None, user)

                # Serialize user data
                serialized_user = UserSerializer(user).data

                return Response({
                    'access': str(refresh.access_token),
                    'refresh': str(refresh),
                    'user': serialized_user
                }, status=status.HTTP_200_OK)

            return Response({'detail': 'Account is disabled.'}, status=status.HTTP_403_FORBIDDEN)

        return Response({'detail': 'Invalid username or password.'}, status=status.HTTP_401_UNAUTHORIZED)


    
class UserProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        serializer = UserSerializer(user)
        return Response(serializer.data)

    def patch(self, request):
        user = request.user
        serializer = UserSerializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class RegisterView(APIView):
    def post(self, request):
        return Response({"message": "Registration endpoint"})    
