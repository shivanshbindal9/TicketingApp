from django.conf.urls import include, url
from rest_framework import routers

from .api import NoteViewSet, RegistrationAPI, LoginAPI, UserAPI, AllNoteViewSet, AllUsers

router = routers.DefaultRouter()
router.register('notes', NoteViewSet, 'notes')
router.register('imgnotes', AllNoteViewSet)
router.register('users',AllUsers)

urlpatterns = [
    url("^", include(router.urls)),
    url("^auth/register/$", RegistrationAPI.as_view()),
    url("^auth/login/$", LoginAPI.as_view()),
    url("^auth/user/$", UserAPI.as_view()),
]
