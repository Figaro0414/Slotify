from django.contrib import admin
from django.urls import path, include
from .views import Info, Sign_In, Sign_Out, Sign_Up
urlpatterns=[
    path('', Info.as_view(), name="info"),
    path('signup/', Sign_Up.as_view(), name="signup"),
    path('signin/', Sign_In.as_view(), name="signin"),
    path('signout/', Sign_Out.as_view(), name="signout")
]