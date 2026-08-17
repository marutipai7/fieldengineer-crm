from django.shortcuts import render

# Create your views here.
def dashboard(request):
    return render(request, 'dashboard/dashboard.html')

def profile(request):
    return render(request, 'dashboard/profile.html')

def bookings(request):
    return render(request, 'dashboard/bookings.html')

def saved_address(request):
    return render(request, 'dashboard/saved-address.html')

def payment_methods(request):
    return render(request, 'dashboard/payment-methods.html')

def support_center(request):
    return render(request, 'dashboard/support-center.html')

def settings(request):
    return render(request, 'dashboard/settings.html')

def invoice(request):
    return render(request, 'dashboard/invoice.html')

def login(request):
    return render(request, 'dashboard/login.html')
