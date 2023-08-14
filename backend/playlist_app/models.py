from django.db import models
from user_app.models import SlotifyUser
from song_app.models import Song
# Create your models here.
    
class Playlist(models.Model):
    title = models.CharField(max_length=255)
    private = models.BooleanField(default=False)
    user = models.ForeignKey(SlotifyUser, on_delete=models.CASCADE, related_name='playlists')
    song = models.ManyToManyField(Song, related_name='playlist_song')
    def __str__(self):
        return f'{self.title}'
