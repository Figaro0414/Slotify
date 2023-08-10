from django.contrib import admin
from .models import Song, Playlist
from user_app.models import User
# Register your models here.

admin.site.register([Song, Playlist, User])