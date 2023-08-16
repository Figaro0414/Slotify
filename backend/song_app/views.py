from django.shortcuts import render, get_object_or_404
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from user_app.models import SlotifyUser
from rest_framework.status import HTTP_201_CREATED, HTTP_200_OK, HTTP_204_NO_CONTENT, HTTP_404_NOT_FOUND
from .serializer import Song, SongSerializer
# Create your views here.
class All_songs(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    def get(self, request):
        a_user = request.user
        playlists = a_user.playlists.all()
        allSongs = []
        for playlist in playlists:
            for song in playlist.song.all():
                allSongs.append(song)
        print(allSongs)
        return Response(SongSerializer(allSongs, many=True).data)
    def post(self, request):
        new_song = Song(**request.data)
        new_song.full_clean()
        new_song.save()
        serialized_song = SongSerializer(new_song)
        return Response(serialized_song.data ,status=HTTP_201_CREATED)
    
class A_song(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    
    def get_song(self, identifier):
        song = None
        if type(identifier) == int:
            song = get_object_or_404(Song, id = identifier)
        else:
            song = get_object_or_404(Song, name = identifier.title())
        return song
    
    def get(self, request, id_or_name):
        song = self.get_song(id_or_name)
        return Response(SongSerializer(song).data, status=HTTP_204_NO_CONTENT)
    
    def delete(self, request, id_or_name):
        song = self.get_song(id_or_name)
        song.delete()
        return Response(status=HTTP_204_NO_CONTENT)