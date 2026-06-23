from django.urls import path

from .views import (
    about_fe,
    blogs,
    careers,
    contact,
    fieldengineer,
    help_center,
     help_center_2,
    home,
     home_2,
    request_service,
    vendor,
    vendor_responses,
    privacy_policy,
    term_condition,
     profile,
     customer_contactus,


)

urlpatterns = [
    path('home', home, name='home'),
    path('home-2/', home_2, name='home_2'),
    path('fieldengineer/', fieldengineer, name='fieldengineer'),
    path('vendor/', vendor, name='vendor'),
    path('about-fe/', about_fe, name='about_fe'),
    path('careers/', careers, name='careers'),
    path('blogs/', blogs, name='blogs'),
    path('contact/', contact, name='contact'),
    path('help-center/', help_center, name='help_center'),
    path('help-center-2/', help_center_2, name='help_center_2'),
    path('vendor-responses/', vendor_responses, name='vendor_responses'),
    path('services/request_service/', request_service, name='request_service'),
    path('privacy-policy/', privacy_policy, name='privacy-policy'),
    path('term-condition/', term_condition, name='term_condition'),
    path('profile/', profile, name='profile'),
    path('customer-contactus/', customer_contactus, name='customer_contactus'),
]
