from django.db import models
# Create your models here.
class Song(models.Model):
    name = models.CharField(max_length=255)
    genre = models.CharField(max_length=255)
    rating = models.PositiveIntegerField()

    def __str__(self):
        return f'{self.name}'