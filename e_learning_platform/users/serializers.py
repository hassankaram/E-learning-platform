from django.contrib.auth import get_user_model
from rest_framework import serializers
from rest_framework.validators import UniqueValidator

# Get the custom user model
User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(
        required=True,
        validators=[UniqueValidator(queryset=User.objects.all(), message="This email is already registered.")]
    )
    username = serializers.CharField(
        required=True,
        validators=[UniqueValidator(queryset=User.objects.all(), message="This username is already taken.")]
    )
    password1 = serializers.CharField(
        write_only=True,
        style={"input_type": "password"},
        required=True
    )
    password2 = serializers.CharField(
        write_only=True,
        style={"input_type": "password"},
        required=True
    )

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name']
        read_only_fields = ['id', 'username', 'email', 'first_name', 'last_name']

    def validate(self, data):
        if data['password1'] != data['password2']:
            raise serializers.ValidationError({"password": "Passwords do not match."})
        return data

    def create(self, validated_data):
        validated_data.pop('password2')  # Remove password2 from the data
        password = validated_data.pop('password1')
        user = User.objects.create(**validated_data)
        user.set_password(password)  # Hash the password before saving
        user.save()
        return user
class UserDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'is_instructor', 'is_student']
        read_only_fields = fields