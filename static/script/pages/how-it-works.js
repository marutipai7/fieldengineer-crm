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
document.addEventListener('click', function (event) {
    const signupPopup = document.getElementById('signupPopup');
    const otpPopup = document.getElementById('otpPopup');
    const loginPopup = document.getElementById('loginPopup');

    if (event.target === signupPopup) {
        closeSignupPopup();
    }
    if (event.target === otpPopup) {
        closeOtpPopup();
    }
    if (event.target === loginPopup) {
        closeLoginPopup();
    }
});

// ====== CLOSE WITH ESCAPE KEY ======
document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
        closeSignupPopup();
        closeOtpPopup();
        closeLoginPopup();
    }
});


// ====== LOGIN POPUP FUNCTIONS ======
function openLoginPopup() {
    const popup = document.getElementById('loginPopup');
    popup.classList.remove('opacity-0', 'pointer-events-none');
    popup.classList.add('opacity-100', 'pointer-events-auto');
    document.body.style.overflow = 'hidden';
    document.getElementById('loginMobile').value = '';
}

function closeLoginPopup() {
    const popup = document.getElementById('loginPopup');
    popup.classList.remove('opacity-100', 'pointer-events-auto');
    popup.classList.add('opacity-0', 'pointer-events-none');
    document.body.style.overflow = 'auto';
}

// ====== SWITCH FUNCTIONS ======
function switchToLogin() {
    closeSignupPopup(); // Signup close karo
    setTimeout(() => {
        openLoginPopup(); // Login open karo
    }, 300);
}

function switchToSignup() {
    closeLoginPopup(); // Login close karo
    setTimeout(() => {
        openSignupPopup(); // Signup open karo
    }, 300);
}

// ====== HANDLE LOGIN FORM ======
function handleLogin(event) {
    event.preventDefault();

    const mobile = document.getElementById('loginMobile').value.trim();

    if (!/^[0-9]{10}$/.test(mobile)) {
        alert('❌ Please enter a valid 10-digit mobile number');
        return false;
    }

    closeLoginPopup();

    const formattedMobile = '+91 ' + mobile.slice(0, 5) + ' ' + mobile.slice(5);
    setTimeout(() => {
        openOtpPopup(formattedMobile);
    }, 300);

    return false;
}



/**
 * Function to handle the "Select" -> "Selected" toggle
 * This uses event delegation, so it works even if you add more applicants dynamically.
 */
document.addEventListener('DOMContentLoaded', function () {

    const applicantButtons = document.querySelectorAll('.select-btn');

    applicantButtons.forEach(button => {
        button.addEventListener('click', function (event) {
            event.stopPropagation();

            // 2. Check if the button is currently in "Selected" state 
            // (Checking for the bg-light-green class)
            const isSelected = this.classList.contains('bg-light-green');

            if (!isSelected) {
                // --- ACTION: Change from "Select" to "Selected" ---

                // Change Colors: Light Green background, White text
                this.classList.remove('bg-warm-golden-orange', 'text-black');
                this.classList.add('bg-light-green', 'text-white');

                // Change Text & add the Icon
                this.innerHTML = `
                    <span class="material-symbols-outlined text-[20px] font-normal">check</span>
                    Selected
                `;

                // Ensure flex alignment is preserved
                this.classList.add('inline-flex', 'items-center', 'gap-1.5');

            } else {
                // --- ACTION: Change from "Selected" back to "Select" ---

                // Revert Colors: Warm Golden Orange background, Black text
                this.classList.remove('bg-light-green', 'text-white');
                this.classList.add('bg-warm-golden-orange', 'text-black');

                // Revert Text only (Remove icon)
                this.innerHTML = `Select`;

                // Remove flex classes if they are no longer needed
                this.classList.remove('inline-flex', 'items-center', 'gap-1.5');
            }
        });
    });




    // READY TO DEPLOY
    const statCards = document.querySelectorAll('.grid-cols-2 > article');

    // Store the original text content so we can split numbers from suffixes
    const statData = [];

    statCards.forEach((card) => {
        const valueElement = card.querySelector('p:first-child');
        const originalText = valueElement.innerText.trim();

        // Use regex to separate the number from any text (like 'K', '/5', '%')
        // Matches numbers (including decimals), then captures the rest as suffix
        const match = originalText.match(/^([\d.]+)(.*)$/);

        if (match) {
            statData.push({
                element: valueElement,
                targetNumber: parseFloat(match[1]),
                suffix: match[2], // Keeps things like 'K+', '/5', '%'
                currentNumber: 0,
                isAnimated: false
            });
        }
    });

    // Animation speed
    const animationDuration = 2000; // 2 seconds
    const steps = 60; // How many frames per second

    // Function to animate a single stat
    function animateStat(stat) {
        if (stat.isAnimated) return;
        stat.isAnimated = true;

        const increment = stat.targetNumber / (animationDuration / (1000 / steps));
        let current = 0;

        const timer = setInterval(() => {
            current += increment;

            if (current >= stat.targetNumber) {
                current = stat.targetNumber;
                clearInterval(timer);
            }

            // Update the text, ensuring it shows integers for large numbers, 
            // and keeps 1 decimal place for decimals (like 4.8)
            let displayNumber = current;
            if (Number.isInteger(stat.targetNumber)) {
                displayNumber = Math.floor(current);
            } else {
                displayNumber = current.toFixed(1);
            }

            stat.element.innerText = displayNumber + stat.suffix;
        }, 1000 / steps);
    }

    // Intersection Observer to trigger animation when scrolled into view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Find which stat this card belongs to
                const card = entry.target;
                const valueElement = card.querySelector('p:first-child');

                // Match it to our data array
                const stat = statData.find(s => s.element === valueElement);
                if (stat) {
                    animateStat(stat);
                }

                // Stop observing this card once animated
                observer.unobserve(card);
            }
        });
    }, {
        threshold: 0.3 // Trigger when 30% of the card is visible
    });

    // Start observing each stat card
    statCards.forEach((card) => {
        observer.observe(card);
    });

});
