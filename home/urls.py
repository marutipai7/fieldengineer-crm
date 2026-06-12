from django.urls import path

from .views import fieldengineer, home, vendor,request_service

urlpatterns = [
    path('', home, name='home'),
    path('fieldengineer/', fieldengineer, name='fieldengineer'),
    path('vendor/', vendor, name='vendor'),
    path('services/request_service/', request_service, name='request_service'),
]