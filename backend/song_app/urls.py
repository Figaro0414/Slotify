from django.urls import path
from .views import All_songs, A_song
# from .views import 
urlpatterns=[
    path('', All_songs.as_view(), name='songs'),
    path('<int:id_or_name>/', A_song.as_view(), name="a_song")
]