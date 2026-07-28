from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST
from .models import SalesEnquiry, StayUpdated, ContactUs
from .email_otp import send_email_sync
import json
import logging

logger = logging.getLogger(__name__)


def home(request):
    return render(request, 'home/home.html')

def home_2(request):
    return render(request, 'pages/home-2.html')


def engineer(request):
    return render(request, 'engineer/engineer.html')

def customer(request):
    return render(request, 'customer/customer.html')

def how_it_works(request):
    return render(request, 'how-it-works/how-it-works.html')


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

def disclaimer(request):
    return render(request, 'pages/disclaimer.html')


def customer_contactus(request):
    return render(request, 'fieldengineer-crm/customer-contactus.html')


@require_POST
@csrf_exempt
def stay_updated_subscribe(request):
    try:
        data = json.loads(request.body) if request.body else request.POST
        email = data.get('email', '').strip()

        if not email:
            return JsonResponse({'success': False, 'error': 'Email is required.'}, status=400)

        # Save or get existing subscriber
        subscriber, created = StayUpdated.objects.get_or_create(email=email)

        # --- Send welcome email to the subscriber ---
        subject = "Thank you for subscribing - FieldEngineer"
        body = f"""Hi there,

Thank you for subscribing to FieldEngineer updates!

You'll now receive deployment insights, industry trends and product updates straight to your inbox.

Best regards,
FieldEngineer Team
"""
        try:
            send_email_sync(email, subject, body)
            logger.info(f"Welcome email sent to {email}")
        except Exception as e:
            logger.error(f"Failed to send welcome email to {email}: {e}")

        # --- Send notification to admin (marutipai203@gmail.com) ---
        admin_email = "marutipai203@gmail.com"
        admin_subject = "New Stay Updated Subscriber - FieldEngineer"
        admin_body = f"""A new subscriber has joined via the Stay Updated form.

Email: {email}
Subscribed At: {subscriber.subscribed_at.strftime('%Y-%m-%d %H:%M:%S') if created else 'Already existed'}
"""
        try:
            send_email_sync(admin_email, admin_subject, admin_body)
            logger.info(f"Admin notification sent to {admin_email}")
        except Exception as e:
            logger.error(f"Failed to send admin notification to {admin_email}: {e}")

        if created:
            return JsonResponse({'success': True, 'message': 'Subscribed successfully! Welcome email sent.'})
        else:
            return JsonResponse({'success': True, 'message': 'You are already subscribed!'})

    except Exception as e:
        logger.exception("Stay Updated subscription failed")
        return JsonResponse({'success': False, 'error': str(e)}, status=500)


@require_POST
@csrf_exempt
def contact_submit(request):
    try:
        # Handle multipart/form-data (file uploads) or JSON
        if request.content_type == 'application/json':
            data = json.loads(request.body) if request.body else {}
        else:
            data = request.POST.dict()

        first_name = data.get('first_name', '').strip()
        last_name = data.get('last_name', '').strip()
        email = data.get('email', '').strip()
        phone = data.get('phone', '').strip()
        company = data.get('company', '').strip()
        city = data.get('city', '').strip()
        inquiry_type = data.get('inquiry_type', '').strip()
        message = data.get('message', '').strip()

        if not first_name or not last_name or not email:
            return JsonResponse({'success': False, 'error': 'First Name, Last Name, and Email are required.'}, status=400)

        # Save to database
        contact = ContactUs.objects.create(
            first_name=first_name,
            last_name=last_name,
            email=email,
            phone=phone,
            company=company,
            city=city,
            inquiry_type=inquiry_type,
            message=message,
        )

        # --- Send email to the user ---
        user_subject = "Thank you for contacting FieldEngineer"
        user_body = f"""Hi {first_name} {last_name},

Thank you for reaching out to FieldEngineer! We have received your inquiry and our team will get back to you shortly.

Inquiry Details:
──────────────────────────────────────
Name          : {first_name} {last_name}
Email         : {email}
Phone         : {phone}
Company       : {company}
City          : {city}
Inquiry Type  : {inquiry_type}
Message       : {message}
──────────────────────────────────────

Best regards,
FieldEngineer Team
"""
        try:
            send_email_sync(email, user_subject, user_body)
            logger.info(f"Contact email sent to {email}")
        except Exception as e:
            logger.error(f"Failed to send contact email to {email}: {e}")

        # --- Send notification to admin (marutipai203@gmail.com) ---
        admin_email = "marutipai203@gmail.com"
        admin_subject = f"New Contact Inquiry from {first_name} {last_name}"
        admin_body = f"""A new contact inquiry has been submitted.

──────────────────────────────────────
First Name    : {first_name}
Last Name     : {last_name}
Email         : {email}
Phone         : {phone}
Company       : {company}
City          : {city}
Inquiry Type  : {inquiry_type}
Message       : {message}
──────────────────────────────────────

Submitted At: {contact.created_at.strftime('%Y-%m-%d %H:%M:%S')}
"""
        try:
            send_email_sync(admin_email, admin_subject, admin_body)
            logger.info(f"Admin notification sent to {admin_email}")
        except Exception as e:
            logger.error(f"Failed to send admin notification to {admin_email}: {e}")

        return JsonResponse({'success': True, 'message': 'Inquiry submitted successfully! Check your email for confirmation.'})

    except Exception as e:
        logger.exception("Contact form submission failed")
        return JsonResponse({'success': False, 'error': str(e)}, status=500)

def profile(request):
    return render(request, 'fieldengineer-crm/profile.html')


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
            send_email_sync(email, customer_subject, customer_body)
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
            send_email_sync(admin_email, admin_subject, admin_body)
            logger.info(f"Admin email sent to {admin_email}")
        except Exception as e:
            logger.error(f"Failed to send admin email to {admin_email}: {e}")

        return JsonResponse({'success': True, 'message': 'Enquiry submitted successfully!'})

    except Exception as e:
        logger.exception("Sales enquiry submission failed")
        return JsonResponse({'success': False, 'error': str(e)}, status=500)