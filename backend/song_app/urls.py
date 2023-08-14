from django.urls import path
from .views import All_songs
# from .views import 
urlpatterns=[
    path('', All_songs.as_view(), name='songs')
]