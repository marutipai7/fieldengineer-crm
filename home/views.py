from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST
from .models import SalesEnquiry
from .email_otp import send_email
import json
import asyncio
import logging

logger = logging.getLogger(__name__)


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

def help_center_2(request):
    return render(request, 'pages/help-center-2.html')


def vendor_responses(request):
    return render(request, 'pages/vendor-responses.html')

def privacy_policy(request):
    return render(request, 'pages/privacy-policy.html')

def term_condition(request):
    return render(request, 'pages/term-condition.html')

def customer_contactus(request):
    return render(request, 'fieldengineer-crm/customer-contactus.html')

def profile(request):
    return render(request, 'fieldengineer-crm/profile.html')

def how_it_works(request):
    return render(request, 'vendor/how-it-works.html')

def customer(request):
    return render(request, 'vendor/customer.html')

@require_POST
@csrf_exempt
def sales_enquiry_submit(request):
    try:
        data = json.loads(request.body) if request.body else request.POST

        company_name = data.get('company_name', '').strip()
        industry = data.get('industry', '').strip()
        first_name = data.get('first_name', '').strip()
        last_name = data.get('last_name', '').strip()
        country_code = data.get('country_code', '+1').strip()
        phone = data.get('phone', '').strip()
        email = data.get('email', '').strip()
        website = data.get('website', '').strip()
        company_address = data.get('company_address', '').strip()
        city = data.get('city', '').strip()
        state = data.get('state', '').strip()
        country = data.get('country', '').strip()
        service_required = data.get('service_required', '').strip()
        message = data.get('message', '').strip()

        # Validate required fields
        required_fields = {
            'company_name': company_name,
            'industry': industry,
            'first_name': first_name,
            'last_name': last_name,
            'phone': phone,
            'email': email,
            'website': website,
            'company_address': company_address,
            'city': city,
            'state': state,
            'country': country,
            'service_required': service_required,
            'message': message,
        }
        missing = [k for k, v in required_fields.items() if not v]
        if missing:
            return JsonResponse({'success': False, 'error': f'Missing fields: {", ".join(missing)}'}, status=400)

        # Save to database
        enquiry = SalesEnquiry.objects.create(
            company_name=company_name,
            industry=industry,
            first_name=first_name,
            last_name=last_name,
            country_code=country_code,
            phone=phone,
            email=email,
            website=website,
            company_address=company_address,
            city=city,
            state=state,
            country=country,
            service_required=service_required,
            message=message,
        )

        # --- Send Email to the customer ---
        customer_subject = "Thank you for your Sales Enquiry - FieldEngineer"
        customer_body = f"""Hi {first_name} {last_name},

Thank you for reaching out to FieldEngineer! We have received your sales enquiry and our team will get back to you shortly.

Here's a summary of your enquiry:
──────────────────────────────────────
Company      : {company_name}
Industry     : {industry}
Service      : {service_required}
Phone        : {country_code} {phone}
Email        : {email}
Website      : {website}
Address      : {company_address}, {city}, {state}, {country}
Message      : {message}
──────────────────────────────────────

Best regards,
FieldEngineer Team
"""
        try:
            asyncio.run(send_email(email, customer_subject, customer_body))
            logger.info(f"Customer email sent to {email}")
        except Exception as e:
            logger.error(f"Failed to send customer email to {email}: {e}")

        # --- Send Email to admin (marutipai203@gmail.com) ---
        admin_email = "marutipai203@gmail.com"
        admin_subject = f"New Sales Enquiry from {first_name} {last_name} - {company_name}"
        admin_body = f"""A new sales enquiry has been submitted.

──────────────────────────────────────
Company Name    : {company_name}
Industry        : {industry}
First Name      : {first_name}
Last Name       : {last_name}
Phone           : {country_code} {phone}
Email           : {email}
Website         : {website}
Company Address : {company_address}
City            : {city}
State           : {state}
Country         : {country}
Service Required: {service_required}
Message         : {message}
──────────────────────────────────────

Submitted At: {enquiry.created_at.strftime('%Y-%m-%d %H:%M:%S')}
"""
        try:
            asyncio.run(send_email(admin_email, admin_subject, admin_body))
            logger.info(f"Admin email sent to {admin_email}")
        except Exception as e:
            logger.error(f"Failed to send admin email to {admin_email}: {e}")

        return JsonResponse({'success': True, 'message': 'Enquiry submitted successfully!'})

    except Exception as e:
        logger.exception("Sales enquiry submission failed")
        return JsonResponse({'success': False, 'error': str(e)}, status=500)