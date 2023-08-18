from django.shortcuts import render, get_object_or_404
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import HTTP_201_CREATED, HTTP_204_NO_CONTENT, HTTP_400_BAD_REQUEST
from .serializers import PlaylistSerializer, Playlist
from song_app.serializer import SongSerializer, Song
from song_app.views import A_song
# Create your views here.
class ALL_Playlists(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    def get(self, request):
        playlists = PlaylistSerializer(Playlist.objects.filter(user=request.user.id), many=True)
        return Response(playlists.data, status=HTTP_204_NO_CONTENT)
    def post(self, request):
        new_playlist = Playlist.objects.create(**request.data, user=request.user)
        new_playlist.save()
        a_playlist = PlaylistSerializer(new_playlist)
        return Response(a_playlist.data)
class A_playlist(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    def get(self,request, id):
        a_playlist = PlaylistSerializer(get_object_or_404(Playlist, id = id, user=request.user.id))
        return Response(a_playlist.data)
    
    def put(self, request, id):
        a_playlist = get_object_or_404(Playlist, id = id, user=request.user.id)
        method = request.data.get("method")
        songID = request.data.get("songID")
        try:
            if method == "add":
                song = get_object_or_404(Song, name = songID)
                a_playlist.song.add(song)
                print("in the if statement")
                return Response(True)
            elif method == "remove":
                print("Not in the if statement")
                song = get_object_or_404(Song, name = songID)
                a_playlist.song.remove(song)
                return Response(False)
            else:
                return Response(status=HTTP_400_BAD_REQUEST)
        except:
            return Response(status=HTTP_400_BAD_REQUEST)
        
    def delete(self, request, id):
        a_playlist = get_object_or_404(Playlist, id=id)
        a_playlist.delete()
        return Response(status=HTTP_204_NO_CONTENT)
    