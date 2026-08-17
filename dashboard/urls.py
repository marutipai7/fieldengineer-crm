from django.urls import path
from .views import dashboard,profile,bookings,saved_address,payment_methods,support_center,settings,invoice,login

urlpatterns = [
    path('', dashboard, name='dashboard'),
    path('profile/', profile, name='profile'),
    path('bookings/', bookings, name='bookings'),
    path('saved_address/', saved_address, name='saved_address'),
    path('payment_methods/', payment_methods, name='payment_methods'),
    path('support_center/', support_center, name='support_center'),
    path('settings/', settings, name='settings'),
    path('invoice/', invoice, name='invoice'),
    path('login/', login, name='login'),
]