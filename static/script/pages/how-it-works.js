 // Clear browser history state to prevent form resubmission
    if (window.history && window.history.replaceState) {
        window.history.replaceState(null, null, window.location.href);
    }

    let userMobileNumber = '';

    // ====== ROLE SELECTION ======
    function selectRole(role) {
        document.getElementById('selectedRole').value = role;

        document.querySelectorAll('.role-btn').forEach(btn => {
            btn.className = "role-btn flex flex-col items-center justify-center border border-gray-200 bg-gray-50 text-gray-700 rounded-xl py-4 px-2 hover:border-gray-300 transition-all duration-200";
        });

        const activeBtn = document.getElementById(`role-${role}`);
        activeBtn.className = "role-btn flex flex-col items-center justify-center border-2 border-emerald-500 bg-emerald-50 text-emerald-800 rounded-xl py-4 px-2 transition-all duration-200";
    }

    // ====== SIGNUP POPUP ======
    function openSignupPopup() {
        const popup = document.getElementById('signupPopup');
        popup.classList.remove('opacity-0', 'pointer-events-none');
        popup.classList.add('opacity-100', 'pointer-events-auto');
        document.body.style.overflow = 'hidden';
    }

    function closeSignupPopup() {
        const popup = document.getElementById('signupPopup');
        popup.classList.remove('opacity-100', 'pointer-events-auto');
        popup.classList.add('opacity-0', 'pointer-events-none');
        document.body.style.overflow = 'auto';
    }

    // ====== OTP POPUP ======
    function openOtpPopup(mobile) {
        document.getElementById('otpMobileNumber').textContent = mobile;
        userMobileNumber = mobile;
        const popup = document.getElementById('otpPopup');
        popup.classList.remove('opacity-0', 'pointer-events-none');
        popup.classList.add('opacity-100', 'pointer-events-auto');
        document.body.style.overflow = 'hidden';
        document.getElementById('otpInput').value = '';
    }

    function closeOtpPopup() {
        const popup = document.getElementById('otpPopup');
        popup.classList.remove('opacity-100', 'pointer-events-auto');
        popup.classList.add('opacity-0', 'pointer-events-none');
        document.body.style.overflow = 'auto';
    }

    // ====== HANDLE SIGNUP FORM ======
    function handleSignup(event) {
        event.preventDefault();
        
        const mobile = document.getElementById('mobileNumber').value.trim();
        const errorEl = document.getElementById('mobileError');
        
        // Validate: only numbers and exactly 10 digits
        if (!/^[0-9]{10}$/.test(mobile)) {
            errorEl.classList.remove('hidden');
            return false;
        }
        
        errorEl.classList.add('hidden');
        
        // Close signup popup and open OTP popup
        closeSignupPopup();
        
        // Format mobile number for display
        const formattedMobile = '+91 ' + mobile.slice(0, 5) + ' ' + mobile.slice(5);
        setTimeout(() => {
            openOtpPopup(formattedMobile);
        }, 300);
        
        return false;
    }

    // ====== HANDLE OTP FORM ======
    function handleOtp(event) {
        event.preventDefault();
        
        const otp = document.getElementById('otpInput').value.trim();
        
        if (otp.length === 6) {
            alert('✅ OTP Verified Successfully! Welcome to FieldEngineer.');
            closeOtpPopup();
            // window.location.href = '/dashboard/';
        } else {
            alert('❌ Please enter a valid 6-digit OTP');
        }
        
        return false;
    }

    // ====== RESEND OTP ======
    function resendOtp() {
        alert('📱 OTP resent to ' + userMobileNumber);
        document.getElementById('otpInput').value = '';
    }

    // ====== CHANGE NUMBER ======
    function changeNumber() {
        closeOtpPopup();
        setTimeout(() => {
            openSignupPopup();
            document.getElementById('mobileNumber').value = '';
            document.getElementById('mobileNumber').focus();
        }, 300);
    }

    // ====== CLOSE POPUPS ON OUTSIDE CLICK ======
    document.addEventListener('click', function(event) {
        const signupPopup = document.getElementById('signupPopup');
        const otpPopup = document.getElementById('otpPopup');
        
        if (event.target === signupPopup) {
            closeSignupPopup();
        }
        if (event.target === otpPopup) {
            closeOtpPopup();
        }
    });

    // ====== CLOSE WITH ESCAPE KEY ======
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            closeSignupPopup();
            closeOtpPopup();
        }
    });