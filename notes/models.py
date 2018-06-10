from django.contrib.auth.models import User
from django.db import models


class Note(models.Model):
    text = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    owner = models.ForeignKey(User, related_name="notes", on_delete=models.CASCADE, null=True)
    title = models.CharField(max_length=100, blank=True, default='')
    def __str__(self):
        return self.text
