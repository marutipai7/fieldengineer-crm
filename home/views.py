from django.shortcuts import render


def home(request):
    return render(request, 'home/home.html')


def fieldengineer(request):
    return render(request, 'fieldengineer/fieldengineer.html')


def vendor(request):
    return render(request, 'vendor/vendor.html')

def request_service(request):
    return render(request, 'home/services/request-service.html')