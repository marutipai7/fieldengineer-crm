from django.urls import path
from .views import profile,bookings,saved_address,payment_methods,support_center,settings

urlpatterns = [
    path('', profile, name='profile'),
    path('bookings/', bookings, name='bookings'),
    path('saved_address/', saved_address, name='saved_address'),
    path('payment_methods/', payment_methods, name='payment_methods'),
    path('support_center/', support_center, name='support_center'),
    path('settings/', settings, name='settings'),
]