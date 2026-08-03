
        document.addEventListener("DOMContentLoaded", function () {

            const btn = document.getElementById("salesEnquiryBtn");               // Desktop button
            const mobileSalesBtn = document.getElementById("mobileSalesEnquiryBtn"); // Mobile "More" menu button
            const modal = document.getElementById("salesModal");
            const close = document.getElementById("closeSalesModal");

            const hamburgerBtn = document.getElementById("hamburger-btn");
            const navLinks = document.querySelector(".nav-links");
            const navActions = document.querySelector(".nav-actions");

            // Function to open modal
            function openModal() {
                modal.classList.remove("hidden");
                modal.classList.add("flex");
            }

            // Desktop button
            if (btn) {
                btn.addEventListener("click", function () {
                    openModal();
                });
            }

            // Mobile "More > Sales Enquiry" button
            if (mobileSalesBtn) {
                mobileSalesBtn.addEventListener("click", function (e) {
                    e.preventDefault();

                    // Close mobile menu
                    if (navLinks) navLinks.classList.remove("active");
                    if (navActions) navActions.classList.remove("active");
                    if (hamburgerBtn) hamburgerBtn.classList.remove("active");

                    // Open modal
                    openModal();
                });
            }

            // Close button
            if (close) {
                close.addEventListener("click", function () {
                    modal.classList.remove("flex");
                    modal.classList.add("hidden");
                });
            }

            // Close when clicking outside
            modal.addEventListener("click", function (e) {
                if (e.target === modal) {
                    modal.classList.remove("flex");
                    modal.classList.add("hidden");
                }
            });

        });

        document.addEventListener("DOMContentLoaded", () => {

            /* ===============================
               SALES ENQUIRY MODAL
            =============================== */

            const salesBtn = document.getElementById("salesEnquiryBtn");
            const salesModal = document.getElementById("salesModal");
            const closeSalesModal = document.getElementById("closeSalesModal");

            function openSalesModal() {
                if (!salesModal) return;

                salesModal.classList.remove("hidden");
                salesModal.classList.add("flex");
                document.body.classList.add("overflow-hidden");
            }

            function closeModal() {
                if (!salesModal) return;

                salesModal.classList.remove("flex");
                salesModal.classList.add("hidden");
                document.body.classList.remove("overflow-hidden");
            }

            if (salesBtn) {
                salesBtn.addEventListener("click", function (e) {
                    e.preventDefault();
                    openSalesModal();
                });
            }

            if (closeSalesModal) {
                closeSalesModal.addEventListener("click", closeModal);
            }

            if (salesModal) {
                salesModal.addEventListener("click", function (e) {
                    if (e.target === salesModal) {
                        closeModal();
                    }
                });
            }

            /* =====================================================
               MOBILE MENU
            ====================================================== */

            const hamburgerBtn = document.getElementById("hamburger-btn");
            const mobileMenu = document.getElementById("mobile-menu");
            const mobileOverlay = document.getElementById("mobile-overlay");
            const closeMenuBtn = document.getElementById("close-mobile-menu");

            function openMenu() {
                mobileMenu.classList.remove("scale-y-0", "opacity-0", "pointer-events-none");
                document.getElementById("hamburger-icon").textContent = "close";
                document.body.classList.add("overflow-hidden");
            }

            function closeMenu() {
                mobileMenu.classList.add("scale-y-0", "opacity-0", "pointer-events-none");
                document.getElementById("hamburger-icon").textContent = "menu";
                document.body.classList.remove("overflow-hidden");

                // Close company dropdown
                const companyMenu = document.getElementById("mobile-company-menu");
                const companyArrow = document.getElementById("mobile-company-arrow");
                if (companyMenu) {
                    companyMenu.classList.add("hidden");
                    companyArrow.classList.remove("rotate-180");
                }
            }

            hamburgerBtn?.addEventListener("click", openMenu);

            closeMenuBtn?.addEventListener("click", closeMenu);

            mobileOverlay?.addEventListener("click", closeMenu);

            /* =====================================================
               ESC KEY CLOSE
            ====================================================== */

            document.addEventListener("keydown", function (e) {

                if (e.key === "Escape") {

                    closeMenu();

                }

            });

            /* =====================================================
               COMPANY ACCORDION
            ====================================================== */

            const companyBtn = document.getElementById("mobile-company-btn");
            const companyMenu = document.getElementById("mobile-company-menu");
            const companyArrow = document.getElementById("mobile-company-arrow");

            companyBtn?.addEventListener("click", function () {

                companyMenu.classList.toggle("hidden");

                companyArrow.classList.toggle("rotate-180");

            });

            /* =====================================================
               CLOSE MENU AFTER LINK CLICK
            ====================================================== */

            const mobileLinks = document.querySelectorAll("#mobile-menu a");

            mobileLinks.forEach(link => {

                link.addEventListener("click", function () {

                    closeMenu();

                });

            });

            /* =====================================================
               SALES ENQUIRY FORM SUBMIT (AJAX - No page reload)
            ====================================================== */
            const enquiryForm = document.getElementById("salesEnquiryForm");
            if (enquiryForm) {
                enquiryForm.addEventListener("submit", async function (e) {
                    e.preventDefault();

                    const formData = new FormData(enquiryForm);
                    const data = {};
                    formData.forEach((value, key) => { data[key] = value; });

                    const submitBtn = enquiryForm.querySelector("button[type='submit']");
                    const originalText = submitBtn.innerHTML;
                    submitBtn.disabled = true;
                    submitBtn.innerHTML = "Submitting...";

                    try {
                        const response = await fetch(enquiryForm.action, {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                                "X-CSRFToken": document.querySelector("[name='csrfmiddlewaretoken']").value,
                            },
                            body: JSON.stringify(data),
                        });

                        const result = await response.json();

                        if (result.success) {
                            enquiryForm.innerHTML = `
                                <div class="text-center py-16">
                                    <div class="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 mb-6">
                                        <svg class="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                        </svg>
                                    </div>
                                    <h3 class="text-2xl font-bold text-slate-900 mb-2">Enquiry Submitted!</h3>
                                    <p class="text-gray-500 text-lg">Thank you! We'll get back to you shortly.</p>
                                </div>
                            `;
                            setTimeout(() => {
                                const modal = document.getElementById("salesModal");
                                if (modal) {
                                    modal.classList.remove("flex");
                                    modal.classList.add("hidden");
                                    document.body.classList.remove("overflow-hidden");
                                }
                            }, 3000);
                        } else {
                            alert("Error: " + (result.error || "Something went wrong. Please try again."));
                            submitBtn.disabled = false;
                            submitBtn.innerHTML = originalText;
                        }
                    } catch (err) {
                        alert("Network error. Please try again.");
                        submitBtn.disabled = false;
                        submitBtn.innerHTML = originalText;
                    }
                });
            }

        });

        // Window resize par mobile menu ko reset karne ke liye
        window.addEventListener("resize", function () {
            // Agar screen width 768px (md breakpoint) se badi ho jaye
            if (window.innerWidth >= 768) {
                closeMenu(); // Pura menu close aur reset ho jayega
            }
        });

        document.addEventListener("DOMContentLoaded", function () {

            // Aapka purana mobile menu ka code yahan hoga...

            /* =====================================================
               AUTO CLOSE MENU ON SCREEN RESIZE (Fix for Desktop)
            ====================================================== */
            window.addEventListener("resize", function () {
                // Tailwind 'xl' breakpoint 1280px hota hai
                if (window.innerWidth >= 1280) {
                    const mobileMenu = document.getElementById("mobile-menu");
                    const hamburgerIcon = document.getElementById("hamburger-icon");

                    if (mobileMenu) {
                        // Menu ko wapas hide aur shrink kar do
                        mobileMenu.classList.add("scale-y-0", "opacity-0", "pointer-events-none");
                        // Icon ko 'menu' me badal do
                        if (hamburgerIcon) hamburgerIcon.textContent = "menu";
                        // Body se scroll lock hata do
                        document.body.classList.remove("overflow-hidden");

                        // Dropdown agar khula hai to usko bhi close kar do
                        const companyMenu = document.getElementById("mobile-company-menu");
                        const companyArrow = document.getElementById("mobile-company-arrow");
                        if (companyMenu) {
                            companyMenu.classList.add("hidden");
                            if (companyArrow) companyArrow.classList.remove("rotate-180");
                        }
                    }
                }
            });

        });

        /* =====================================================
           OTP VERIFICATION & REDIRECT
        ====================================================== */

        function handleOtp(event) {
            event.preventDefault();

            const otpInput = document.getElementById('otpInput');
            const otp = otpInput ? otpInput.value : '';

            // Validate OTP - minimum 4 digits
            if (!otp || otp.length < 4) {
                alert('Please enter a valid OTP');
                return false;
            }

            // Show loading state
            const submitBtn = document.querySelector('#otpForm button[type="submit"]');
            const originalText = submitBtn ? submitBtn.innerHTML : '';
            if (submitBtn) {
                submitBtn.innerHTML = 'Verifying...';
                submitBtn.disabled = true;
            }

            // Simulate API call - Replace with actual API call
            setTimeout(function () {
                // Close OTP popup
                closeOtpPopup();

                // Close login popup
                closeLoginPopup();

                // Reset button
                if (submitBtn) {
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                }

                // Redirect to dashboard
                window.location.href = '/dashboard/';
            }, 1000);

            return false;
        }

        /* =====================================================
           CLOSE OTP POPUP
        ====================================================== */

        function closeOtpPopup() {
            const otpPopup = document.getElementById('otpPopup');
            if (otpPopup) {
                otpPopup.classList.add('opacity-0', 'pointer-events-none');
                otpPopup.classList.remove('opacity-100', 'pointer-events-auto');
                document.body.classList.remove('overflow-hidden');
            }
        }

        /* =====================================================
           CLOSE LOGIN POPUP
        ====================================================== */

        function closeLoginPopup() {
            const loginPopup = document.getElementById('loginPopup');
            if (loginPopup) {
                loginPopup.classList.add('opacity-0', 'pointer-events-none');
                loginPopup.classList.remove('opacity-100', 'pointer-events-auto');
                document.body.classList.remove('overflow-hidden');
            }
        }

        /* =====================================================
           SWITCH TO LOGIN
        ====================================================== */

        function switchToLogin() {
            // Close signup popup if open
            const signupPopup = document.getElementById('signupPopup');
            if (signupPopup) {
                signupPopup.classList.add('opacity-0', 'pointer-events-none');
                signupPopup.classList.remove('opacity-100', 'pointer-events-auto');
            }

            // Close OTP popup if open
            const otpPopup = document.getElementById('otpPopup');
            if (otpPopup) {
                otpPopup.classList.add('opacity-0', 'pointer-events-none');
                otpPopup.classList.remove('opacity-100', 'pointer-events-auto');
            }

            // Open login popup
            const loginPopup = document.getElementById('loginPopup');
            if (loginPopup) {
                loginPopup.classList.remove('opacity-0', 'pointer-events-none');
                loginPopup.classList.add('opacity-100', 'pointer-events-auto');
                document.body.classList.add('overflow-hidden');
            }
        }

        /* =====================================================
           SWITCH TO SIGNUP
        ====================================================== */

        function switchToSignup() {
            // Close login popup if open
            const loginPopup = document.getElementById('loginPopup');
            if (loginPopup) {
                loginPopup.classList.add('opacity-0', 'pointer-events-none');
                loginPopup.classList.remove('opacity-100', 'pointer-events-auto');
            }

            // Close OTP popup if open
            const otpPopup = document.getElementById('otpPopup');
            if (otpPopup) {
                otpPopup.classList.add('opacity-0', 'pointer-events-none');
                otpPopup.classList.remove('opacity-100', 'pointer-events-auto');
            }

            // Open signup popup
            const signupPopup = document.getElementById('signupPopup');
            if (signupPopup) {
                signupPopup.classList.remove('opacity-0', 'pointer-events-none');
                signupPopup.classList.add('opacity-100', 'pointer-events-auto');
                document.body.classList.add('overflow-hidden');
            }
        }

        /* =====================================================
           OPEN SIGNUP POPUP (for header button)
        ====================================================== */

        function openSignupPopup() {
            const signupPopup = document.getElementById('signupPopup');
            if (signupPopup) {
                signupPopup.classList.remove('opacity-0', 'pointer-events-none');
                signupPopup.classList.add('opacity-100', 'pointer-events-auto');
                document.body.classList.add('overflow-hidden');
            }
        }

        function openMenu() {
            const mobileMenu = document.getElementById("mobile-menu");
            if (!mobileMenu) return;

            mobileMenu.classList.remove("opacity-0", "pointer-events-none");
            mobileMenu.classList.add("opacity-100");
            document.body.classList.add("overflow-hidden");
        }

        function closeMenu() {
            const mobileMenu = document.getElementById("mobile-menu");
            if (!mobileMenu) return;

            mobileMenu.classList.add("opacity-0", "pointer-events-none");
            mobileMenu.classList.remove("opacity-100");
            document.body.classList.remove("overflow-hidden");

            // Close company dropdown if open
            const companyMenu = document.getElementById("mobile-company-menu");
            const companyArrow = document.getElementById("mobile-company-arrow");
            if (companyMenu) {
                companyMenu.classList.add("hidden");
                if (companyArrow) companyArrow.classList.remove("rotate-180");
            }
        }

        /* =====================================================
           CLOSE SIGNUP POPUP
        ====================================================== */

        function closeSignupPopup() {
            const signupPopup = document.getElementById('signupPopup');
            if (signupPopup) {
                signupPopup.classList.add('opacity-0', 'pointer-events-none');
                signupPopup.classList.remove('opacity-100', 'pointer-events-auto');
                document.body.classList.remove('overflow-hidden');
            }
        }
        /* =====================================================
           SALES ENQUIRY FORM SUBMIT (AJAX - No page reload)
        ====================================================== */
        const enquiryForm = document.getElementById("salesEnquiryForm");
        if (enquiryForm) {
            enquiryForm.addEventListener("submit", async function (e) {
                e.preventDefault();

                const formData = new FormData(enquiryForm);
                const data = {};
                formData.forEach((value, key) => { data[key] = value; });

                const submitBtn = enquiryForm.querySelector("button[type='submit']");
                const originalText = submitBtn.innerHTML;
                submitBtn.disabled = true;
                submitBtn.innerHTML = "Submitting...";

                try {
                    const response = await fetch(enquiryForm.action, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "X-CSRFToken": document.querySelector("[name='csrfmiddlewaretoken']").value,
                        },
                        body: JSON.stringify(data),
                    });

                    const result = await response.json();

                    if (result.success) {
                        enquiryForm.innerHTML = `
                                <div class="text-center py-16">
                                    <div class="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 mb-6">
                                        <svg class="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                        </svg>
                                    </div>
                                    <h3 class="text-2xl font-bold text-slate-900 mb-2">Enquiry Submitted!</h3>
                                    <p class="text-gray-500 text-lg">Thank you! We'll get back to you shortly.</p>
                                </div>
                            `;
                        setTimeout(() => {
                            const modal = document.getElementById("salesModal");
                            if (modal) {
                                modal.classList.remove("flex");
                                modal.classList.add("hidden");
                                document.body.classList.remove("overflow-hidden");
                            }
                        }, 3000);
                    } else {
                        alert("Error: " + (result.error || "Something went wrong. Please try again."));
                        submitBtn.disabled = false;
                        submitBtn.innerHTML = originalText;
                    }
                } catch (err) {
                    alert("Network error. Please try again.");
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalText;
                }
            });
        }

        // Make functions available globally
        window.handleOtp = handleOtp;
        window.closeOtpPopup = closeOtpPopup;
        window.closeLoginPopup = closeLoginPopup;
        window.switchToLogin = switchToLogin;
        window.switchToSignup = switchToSignup;
        window.openSignupPopup = openSignupPopup;
        window.closeSignupPopup = closeSignupPopup;



