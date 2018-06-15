from django.contrib.auth.models import User
from django.db import models


class Note(models.Model):
    
    CATEGORY_CHOICES = (
        ('Bug Report', 'Bug Report'),
        ('Personnel Account Issue', 'Personnel Account Issue'),
        ('Feature Request','Feature Request'),
        ('Other', 'Other'),
    )

    DOMAIN_CHOICES = (
        ('Public', 'Public'),
	('Private', 'Private'),
    )

    STATUS_CHOICES = (
        ('Received', 'Received'),
	('Under Process','Under Process'),
	('Already Working', 'Already Working'),
	('Infeasible', 'Infeasible'),
	('Resolved', 'Resolved'),
    )

    text = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    owner = models.ForeignKey(User, related_name="notes", on_delete=models.CASCADE, null=True)
    title = models.CharField(max_length=100, blank=True, default='')
    category = models.CharField(
        max_length=23,
        choices=CATEGORY_CHOICES,
        default='Bug Report',
    )
    domain = models.CharField(
        max_length=7,
        choices=DOMAIN_CHOICES,
        default='Public',
    )
    statusi = models.CharField(
         max_length=16,
         default='Received',
    )
    solved = models.BooleanField(default=False)  
    
    def __str__(self):
        return self.text
