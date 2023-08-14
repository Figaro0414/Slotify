from django.db import models
from django.contrib.auth.models import AbstractUser
# Create your models here.
class SlotifyUser(AbstractUser):
    # username = models.CharField(max_length=255)
    email = models.EmailField(unique=True)
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    def __str__(self):
        return f'{self.email}'