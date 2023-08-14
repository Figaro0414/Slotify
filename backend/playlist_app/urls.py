from django.urls import path, include
from .views import ALL_Playlists, A_playlist

urlpatterns = [
    path('', ALL_Playlists.as_view()),
    path('<int:id>/', A_playlist.as_view()),
]