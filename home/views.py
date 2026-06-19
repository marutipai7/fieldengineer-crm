from django.shortcuts import render


def home(request):
    return render(request, 'home/home.html')

def home_2(request):
    return render(request, 'pages/home-2.html')


def fieldengineer(request):
    return render(request, 'fieldengineer/fieldengineer.html')


def vendor(request):
    return render(request, 'vendor/vendor.html')


def request_service(request):
    return render(request, 'home/services/request-service.html')


def about_fe(request):
    return render(request, 'pages/about-fe.html')


def careers(request):
    return render(request, 'pages/careers.html')


def blogs(request):
    return render(request, 'pages/blogs.html')


def contact(request):
    return render(request, 'pages/contact.html')


def help_center(request):
    return render(request, 'pages/help-center.html')


def vendor_responses(request):
    return render(request, 'pages/vendor-responses.html')

def privacy_policy(request):
    return render(request, 'pages/privacy-policy.html')

def term_condition(request):
    return render(request, 'pages/term-condition.html')