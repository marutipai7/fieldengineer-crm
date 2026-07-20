import ssl
from django.core.mail.backends.smtp import EmailBackend


class UnverifiedSMTPBackend(EmailBackend):
    """SMTP backend that bypasses SSL certificate verification."""
    
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        # Create unverified SSL context
        self.ssl_context = ssl.create_default_context()
        self.ssl_context.check_hostname = False
        self.ssl_context.verify_mode = ssl.CERT_NONE