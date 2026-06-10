from django.urls import path

from .views import fieldengineer, home, vendor

urlpatterns = [
    path('', home, name='home'),
    path('fieldengineer/', fieldengineer, name='fieldengineer'),
    path('vendor/', vendor, name='vendor'),
]