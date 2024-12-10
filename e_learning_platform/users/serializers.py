from rest_framework import serializers
from .models import User

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password', 'is_instructor', 'is_student', 'profile_picture', 'bio']

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
            is_instructor=validated_data['is_instructor', False],
            is_student=validated_data['is_student', True],
        )
        if 'profile_picture' in validated_data:
            user.profile_picture = validated_data['profile_picture']
        if 'bio' in validated_data:
            user.bio = validated_data['bio']
        user.save()
        return user