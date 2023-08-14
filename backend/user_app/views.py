from django.shortcuts import render
from django.contrib.auth import authenticate
from .models import SlotifyUser
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import (HTTP_201_CREATED, HTTP_404_NOT_FOUND, HTTP_204_NO_CONTENT)
from rest_framework.authtoken.models import Token
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
# Create your views here.

class Sign_Up(APIView):
    def post(self, request):
        request.data["username"]=request.data['email']
        newSlotifyUser = SlotifyUser.objects.create_user(**request.data)
        token = Token.objects.create(user=newSlotifyUser)
        return Response(
            {'Slotify': newSlotifyUser.email, 'token': token.key}, status=HTTP_201_CREATED
        )
class Sign_In(APIView):
    def post(self, request):
        email = request.data.get("email")
        password = request.data.get("password")
        currentUser = authenticate(username =email, password=password)
        if currentUser:
            token, created = Token.objects.get_or_create(user=currentUser)
            return Response({'token': token.key, "SlotifyUser": currentUser.email})
        else:
            return Response("No user match these credentials", status=HTTP_404_NOT_FOUND)
class Info(APIView):
    authentication_classes=[TokenAuthentication]
    permission_classes =[IsAuthenticated]
    def get(self,request):
        return Response({"username": request.user.email})
class Sign_Out(APIView):
    authentication_classes=[TokenAuthentication]
    permission_classes =[IsAuthenticated]
    def post(self, request):
        request.user.auth_token.delete()
        return Response(status=HTTP_204_NO_CONTENT)
