from rest_framework import viewsets, permissions, generics
from rest_framework.response import Response
from django.contrib.auth.models import User
from knox.models import AuthToken

from .models import Note
from .serializers import (NoteSerializer, CreateUserSerializer, UserSerializer, LoginUserSerializer, AllUsersSerializer, PublicTicketsSerializer)


class NoteViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated, ]
    serializer_class = NoteSerializer
    

    def get_queryset(self):
        return self.request.user.notes.all()

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

class RegistrationAPI(generics.GenericAPIView):
    serializer_class = CreateUserSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        user.is_staff = False
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": AuthToken.objects.create(user)
        })

class LoginAPI(generics.GenericAPIView):
    serializer_class = LoginUserSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": AuthToken.objects.create(user)
        })

class UserAPI(generics.RetrieveAPIView):
    permission_classes = [permissions.IsAuthenticated, ]
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user


class AllNoteViewSet(viewsets.ModelViewSet):
    queryset = Note.objects.all()
    permission_classes = [permissions.IsAdminUser, ]
    serializer_class = NoteSerializer


class AllUsers(viewsets.ModelViewSet):
    queryset = User.objects.all()
    permission_classes = [permissions.IsAdminUser, ]
    serializer_class = AllUsersSerializer

    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)

class PublicTickets(viewsets.ModelViewSet):
    queryset = Note.objects.filter(domain='Public')
    permission_classes = [permissions.IsAuthenticated, ]
    serializer_class = NoteSerializer
