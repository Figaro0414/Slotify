from django.db import models
# Create your models here.
class Song(models.Model):
    name = models.CharField(max_length=255)
    genre = models.CharField(max_length=255) # Next migration, we will take out genre and we will get that when we do an api call from the data base
    rating = models.PositiveIntegerField()

    def __str__(self):
        return f'{self.name}'