import uuid
from django.db import models
from django.contrib.auth.models import User


class PasswordResetToken(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    token = models.UUIDField(default=uuid.uuid4, unique=True, editable=False)
    created_at = models.DateTimeField(auto_now_add=True)

    @classmethod
    def create_token(cls, user):
        return cls.objects.create(user=user)

    def is_expired(self, expiry_seconds=1800):
        from django.utils import timezone
        return (timezone.now() - self.created_at).total_seconds() > expiry_seconds

    def __str__(self):
        return f"Reset token for {self.user.email}"


class SalesEnquiry(models.Model):
    company_name = models.CharField(max_length=255)
    industry = models.CharField(max_length=100)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    country_code = models.CharField(max_length=5, default='+1')
    phone = models.CharField(max_length=20)
    email = models.EmailField()
    website = models.URLField()
    company_address = models.TextField()
    city = models.CharField(max_length=100)
    state = models.CharField(max_length=100)
    country = models.CharField(max_length=100)
    service_required = models.CharField(max_length=255)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.first_name} {self.last_name} - {self.company_name}"


class StayUpdated(models.Model):
    email = models.EmailField(unique=True)
    subscribed_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.email

    class Meta:
        verbose_name = "Stay Updated Subscriber"
        verbose_name_plural = "Stay Updated Subscribers"


class ContactUs(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    email = models.EmailField()
    phone = models.CharField(max_length=20, blank=True, default='')
    company = models.CharField(max_length=255, blank=True, default='')
    city = models.CharField(max_length=100, blank=True, default='')
    inquiry_type = models.CharField(max_length=100, blank=True, default='')
    message = models.TextField(blank=True, default='')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.first_name} {self.last_name} - {self.email}"