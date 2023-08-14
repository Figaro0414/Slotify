from rest_framework import serializers
from django.core.serializers import serialize
from .models import Playlist
from song_app.serializer import Song, SongSerializer

class PlaylistSerializer(serializers.ModelSerializer):
    song = SongSerializer(many=True)
    class Meta:
        model = Playlist
        fields = ['id','title', 'private','song']