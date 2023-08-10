from django.db import models
from user_app.models import User
# Create your models here.
class Song(models.Model):
    name = models.CharField(max_length=255)
    genre = models.CharField(max_length=255)
    rating = models.PositiveIntegerField()

    def __str__(self):
        return f'{self.name}'
    
class Playlist(models.Model):
    title = models.CharField(max_length=255)
    private = models.BooleanField(default=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    song = models.ManyToManyField(Song)
    def __str__(self):
        return f'{self.title}'
