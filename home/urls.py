from django.urls import path

from .views import (
    about_fe,
    blogs,
    careers,
    contact,
    fieldengineer,
    help_center,
    home,
    request_service,
    vendor,
    vendor_responses,
)

urlpatterns = [
    path('', home, name='home'),
    path('fieldengineer/', fieldengineer, name='fieldengineer'),
    path('vendor/', vendor, name='vendor'),
    path('about-fe/', about_fe, name='about_fe'),
    path('careers/', careers, name='careers'),
    path('blogs/', blogs, name='blogs'),
    path('contact/', contact, name='contact'),
    path('help-center/', help_center, name='help_center'),
    path('vendor-responses/', vendor_responses, name='vendor_responses'),
    path('services/request_service/', request_service, name='request_service'),
]
