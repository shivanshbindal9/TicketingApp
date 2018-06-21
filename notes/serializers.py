from django.contrib.auth.models import User
from rest_framework import serializers

from .models import Note
from django.contrib.auth import authenticate


class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = ('id', 'text', 'title','owner','category','domain', 'statusi', 'solved')


class CreateUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(validated_data['username'],
                                        None,
                                        validated_data['password'])
        return user


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'is_superuser')

class LoginUserSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Unable to log in with provided credentials.")

class AllUsersSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ( 'username', 'password', 'is_superuser','is_staff', 'id')

class PublicTicketsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = ('id', 'text', 'title','owner','category','domain', 'statusi', 'solved')

