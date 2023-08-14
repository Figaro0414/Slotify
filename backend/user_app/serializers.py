from rest_framework import serializers
from django.core.serializers import serialize
from .models import SlotifyUser
from playlist_app.serializers import PlaylistSerializer

class SlotifyUserSerializers(serializers.ModelSerializer):
    playlists = PlaylistSerializer(many=True)
    class Meta:
        model = SlotifyUser
        fields = ['id', 'email', 'playlists']