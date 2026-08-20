document.addEventListener('DOMContentLoaded', function () {

    // ============================================================
    // 1. COUNTRY-STATE-CITY DYNAMIC DATA
    // ============================================================
    const locationData = {
        "India": {
            states: {
                "Maharashtra": ["Mumbai", "Pune", "Nagpur", "Nashik", "Aurangabad", "Solapur", "Amravati", "Kolhapur", "Sangli", "Jalgaon"],
                "Gujarat": ["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Bhavnagar", "Jamnagar", "Junagadh", "Gandhinagar", "Anand", "Navsari"],
                "Karnataka": ["Bengaluru", "Mysuru", "Hubballi", "Belagavi", "Mangaluru", "Davanagere", "Ballari", "Shivamogga", "Tumakuru", "Raichur"],
                "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Tiruchirappalli", "Salem", "Tirunelveli", "Erode", "Vellore", "Thoothukkudi", "Dindigul"],
                "Uttar Pradesh": ["Lucknow", "Kanpur", "Varanasi", "Agra", "Prayagraj", "Ghaziabad", "Noida", "Meerut", "Aligarh", "Bareilly"],
                "Rajasthan": ["Jaipur", "Jodhpur", "Udaipur", "Kota", "Bikaner", "Ajmer", "Bhilwara", "Alwar", "Sikar", "Pali"],
                "Delhi": ["New Delhi", "Delhi", "South Delhi", "North Delhi", "East Delhi", "West Delhi"],
                "Kerala": ["Thiruvananthapuram", "Kochi", "Kozhikode", "Thrissur", "Alappuzha", "Kollam", "Palakkad", "Kannur", "Malappuram", "Kottayam"],
                "West Bengal": ["Kolkata", "Howrah", "Durgapur", "Siliguri", "Asansol", "Kharagpur", "Haldia", "Darjeeling", "Jalpaiguri", "Bardhaman"],
                "Telangana": ["Hyderabad", "Warangal", "Nizamabad", "Karimnagar", "Ramagundam", "Khammam", "Mahabubnagar", "Nalgonda", "Adilabad", "Suryapet"],
                "Punjab": ["Ludhiana", "Amritsar", "Jalandhar", "Patiala", "Bathinda", "Mohali", "Chandigarh", "Hoshiarpur", "Moga", "Malerkotla"],
                "Haryana": ["Gurugram", "Faridabad", "Panipat", "Ambala", "Rohtak", "Hisar", "Karnal", "Sonipat", "Yamunanagar", "Rewari"],
                "Madhya Pradesh": ["Bhopal", "Indore", "Jabalpur", "Gwalior", "Ujjain", "Sagar", "Dewas", "Satna", "Ratlam", "Rewa"],
                "Bihar": ["Patna", "Gaya", "Bhagalpur", "Muzaffarpur", "Purnia", "Darbhanga", "Munger", "Saharsa", "Sitamarhi", "Hajipur"],
                "Odisha": ["Bhubaneswar", "Cuttack", "Rourkela", "Berhampur", "Sambalpur", "Puri", "Balasore", "Bhadrak", "Jharsuguda", "Paradeep"],
                "Andhra Pradesh": ["Visakhapatnam", "Vijayawada", "Guntur", "Nellore", "Kurnool", "Rajahmundry", "Tirupati", "Kakinada", "Kadapa", "Anantapur"],
                "Jharkhand": ["Ranchi", "Jamshedpur", "Dhanbad", "Bokaro", "Deoghar", "Hazaribagh", "Giridih", "Ramgarh", "Medininagar", "Chaibasa"]
            }
        },
        "USA": {
            states: {
                "California": ["Los Angeles", "San Francisco", "San Diego", "Sacramento", "San Jose", "Oakland", "Fresno", "Long Beach", "Bakersfield", "Anaheim"],
                "Texas": ["Houston", "Dallas", "Austin", "San Antonio", "Fort Worth", "El Paso", "Arlington", "Corpus Christi", "Plano", "Laredo"],
                "New York": ["New York City", "Buffalo", "Rochester", "Yonkers", "Syracuse", "Albany", "Niagara Falls", "Schenectady", "Utica", "Binghamton"],
                "Florida": ["Miami", "Orlando", "Tampa", "Jacksonville", "St. Petersburg", "Fort Lauderdale", "Tallahassee", "Gainesville", "Naples", "Sarasota"],
                "Illinois": ["Chicago", "Aurora", "Rockford", "Joliet", "Naperville", "Springfield", "Peoria", "Elgin", "Waukegan", "Cicero"],
                "Pennsylvania": ["Philadelphia", "Pittsburgh", "Allentown", "Erie", "Scranton", "Bethlehem", "Harrisburg", "Lancaster", "York", "Reading"],
                "Ohio": ["Columbus", "Cleveland", "Cincinnati", "Toledo", "Akron", "Dayton", "Youngstown", "Canton", "Parma", "Lorain"],
                "Michigan": ["Detroit", "Grand Rapids", "Warren", "Sterling Heights", "Ann Arbor", "Lansing", "Flint", "Dearborn", "Livonia", "Troy"],
                "Georgia": ["Atlanta", "Augusta", "Columbus", "Savannah", "Athens", "Macon", "Roswell", "Albany", "Johns Creek", "Marietta"],
                "North Carolina": ["Charlotte", "Raleigh", "Greensboro", "Durham", "Winston-Salem", "Fayetteville", "Cary", "Wilmington", "High Point", "Asheville"],
                "New Jersey": ["Newark", "Jersey City", "Paterson", "Elizabeth", "Trenton", "Camden", "Clifton", "Passaic", "Union City", "Bayonne"],
                "Virginia": ["Virginia Beach", "Norfolk", "Chesapeake", "Arlington", "Richmond", "Newport News", "Alexandria", "Hampton", "Roanoke", "Portsmouth"],
                "Washington": ["Seattle", "Spokane", "Tacoma", "Vancouver", "Bellevue", "Kent", "Everett", "Renton", "Yakima", "Federal Way"],
                "Arizona": ["Phoenix", "Tucson", "Mesa", "Chandler", "Glendale", "Scottsdale", "Gilbert", "Tempe", "Peoria", "Surprise"],
                "Massachusetts": ["Boston", "Worcester", "Springfield", "Cambridge", "Lowell", "Brockton", "Quincy", "Lynn", "Newton", "Somerville"],
                "Colorado": ["Denver", "Colorado Springs", "Aurora", "Fort Collins", "Lakewood", "Thornton", "Arvada", "Westminster", "Pueblo", "Centennial"]
            }
        },
        "UK": {
            states: {
                "England": ["London", "Manchester", "Birmingham", "Liverpool", "Bristol", "Sheffield", "Leeds", "Newcastle", "Nottingham", "Southampton"],
                "Scotland": ["Edinburgh", "Glasgow", "Aberdeen", "Dundee", "Inverness", "Stirling", "Perth", "Dunfermline", "Kirkcaldy", "Ayr"],
                "Wales": ["Cardiff", "Swansea", "Newport", "Wrexham", "Bangor", "St Davids", "Llandudno", "Conwy", "Caernarfon", "Merthyr Tydfil"],
                "Northern Ireland": ["Belfast", "Derry", "Lisburn", "Newry", "Armagh", "Bangor", "Omagh", "Enniskillen", "Coleraine", "Dungannon"]
            }
        },
        "Malaysia": {
            states: {
                "Selangor": ["Kuala Lumpur", "Petaling Jaya", "Shah Alam", "Klang", "Subang Jaya", "Ampang", "Puchong", "Cheras", "Kajang"],
                "Johor": ["Johor Bahru", "Iskandar Puteri", "Pasir Gudang", "Muar", "Batu Pahat", "Kluang", "Segamat", "Kota Tinggi", "Pontian", "Mersing"],
                "Penang": ["George Town", "Bukit Mertajam", "Nibong Tebal", "Balik Pulau", "Bayan Lepas", "Gelugor", "Tanjung Bungah", "Batu Ferringhi"],
                "Sarawak": ["Kuching", "Miri", "Sibu", "Bintulu", "Kota Samarahan", "Sarikei", "Limbang", "Kapit", "Mukah", "Lawas"],
                "Sabah": ["Kota Kinabalu", "Sandakan", "Tawau", "Lahad Datu", "Keningau", "Semporna", "Kudat", "Beaufort", "Tambunan", "Ranau"]
            }
        },
        "Singapore": {
            states: {
                "Central": ["Singapore", "Marina Bay", "Orchard", "Sentosa", "Jurong", "Woodlands", "Tampines", "Bedok", "Changi", "Punggol"]
            }
        },
        "Australia": {
            states: {
                "New South Wales": ["Sydney", "Newcastle", "Wollongong", "Central Coast", "Coffs Harbour", "Wagga Wagga", "Albury", "Tamworth", "Dubbo", "Orange"],
                "Victoria": ["Melbourne", "Geelong", "Ballarat", "Bendigo", "Shepparton", "Melton", "Sunbury", "Werribee", "Traralgon", "Mildura"],
                "Queensland": ["Brisbane", "Gold Coast", "Sunshine Coast", "Townsville", "Cairns", "Toowoomba", "Ipswich", "Mackay", "Rockhampton", "Bundaberg"],
                "Western Australia": ["Perth", "Bunbury", "Kalgoorlie", "Albany", "Geraldton", "Mandurah", "Karratha", "Broome", "Port Hedland", "Esperance"]
            }
        }
    };

    // ============================================================
    // 2. POPULATE COUNTRY DROPDOWN
    // ============================================================
    const countrySelect = document.getElementById('countrySelect');
    const stateSelect = document.getElementById('stateSelect');
    const citySelect = document.getElementById('citySelect');

    Object.keys(locationData).forEach(country => {
        const option = document.createElement('option');
        option.value = country;
        option.textContent = country;
        countrySelect.appendChild(option);
    });

    // ============================================================
    // 3. COUNTRY CHANGE - LOAD STATES
    // ============================================================
    countrySelect.addEventListener('change', function () {
        const selectedCountry = this.value;

        stateSelect.innerHTML = '<option value="">Select State</option>';
        citySelect.innerHTML = '<option value="">Select City</option>';

        if (selectedCountry && locationData[selectedCountry]) {
            const states = locationData[selectedCountry].states;
            Object.keys(states).forEach(state => {
                const option = document.createElement('option');
                option.value = state;
                option.textContent = state;
                stateSelect.appendChild(option);
            });
            stateSelect.disabled = false;
        } else {
            stateSelect.disabled = true;
            citySelect.disabled = true;
        }

        clearError(countrySelect);
        clearError(stateSelect);
        clearError(citySelect);
    });

    // ============================================================
    // 4. STATE CHANGE - LOAD CITIES
    // ============================================================
    stateSelect.addEventListener('change', function () {
        const selectedCountry = countrySelect.value;
        const selectedState = this.value;

        citySelect.innerHTML = '<option value="">Select City</option>';

        if (selectedCountry && selectedState && locationData[selectedCountry]) {
            const cities = locationData[selectedCountry].states[selectedState];
            if (cities) {
                cities.forEach(city => {
                    const option = document.createElement('option');
                    option.value = city;
                    option.textContent = city;
                    citySelect.appendChild(option);
                });
                citySelect.disabled = false;
            }
        } else {
            citySelect.disabled = true;
        }

        clearError(stateSelect);
        clearError(citySelect);
    });

    // ============================================================
    // 5. CUSTOM COUNTRY CODE DROPDOWN (FIXED - No API Call)
    // ============================================================
    const dropdownBtn = document.getElementById('countryDropdownBtn');
    const dropdownList = document.getElementById('countryDropdownList');
    const selectedFlagImg = document.getElementById('selectedFlagImg');
    const selectedCodeText = document.getElementById('selectedCodeText');
    const countryCodeInput = document.getElementById('countryCodeInput');

    // Primary API using CDN (bypass CORS & AdBlockers)
    const PRIMARY_API = 'https://cdn.jsdelivr.net/gh/mledoze/countries@master/dist/countries.json';
    const BACKUP_API = 'https://restcountries.com/v3.1/all?fields=name,cca2,idd';

    async function fetchAllCountries() {
        let data = null;

        try {
            const res = await fetch(PRIMARY_API);
            if (res.ok) {
                data = await res.json();
            } else {
                throw new Error('Primary API unreachable');
            }
        } catch (e) {
            try {
                const backupRes = await fetch(BACKUP_API);
                data = await backupRes.json();
            } catch (backupError) {
                console.error('All APIs failed:', backupError);
                return [];
            }
        }

        const countries = [];

        data.forEach(country => {
            const name = country.name?.common || country.name;
            const isoCode = country.cca2?.toLowerCase();
            const root = country.idd?.root;
            const suffixes = country.idd?.suffixes || [];

            if (!name || !isoCode || !root) return;

            // Dialing code logic
            let phoneCode = root;
            if (suffixes.length === 1) {
                phoneCode = `${root}${suffixes[0]}`;
            }

            countries.push({
                name: name,
                code: phoneCode,
                flag: `https://flagcdn.com/w20/${isoCode}.webp`
            });
        });

        // Remove duplicates & sort alphabetically
        return countries
            .filter((c, index, self) => index === self.findIndex(t => t.name === c.name && t.code === c.code))
            .sort((a, b) => a.name.localeCompare(b.name));
    }

    async function populateDropdown() {
        if (!dropdownList) return;

        dropdownList.innerHTML = '<div style="padding: 10px; text-align: center; color: #888;">Loading countries...</div>';

        const countries = await fetchAllCountries();

        if (!countries || countries.length === 0) {
            dropdownList.innerHTML = '<div style="padding: 10px; text-align: center; color: red;">Failed to load countries</div>';
            return;
        }

        dropdownList.innerHTML = '';
        const fragment = document.createDocumentFragment();

        countries.forEach(({ flag, code, name }) => {
            const item = document.createElement('div');
            item.className = 'country-item';
            item.innerHTML = `
            <img src="${flag}" alt="${name}" width="20" height="15" loading="lazy">
            <span>${name} (${code})</span>
        `;

            item.addEventListener('click', () => {
                selectedFlagImg.src = flag;
                selectedCodeText.textContent = code;
                countryCodeInput.value = code;
                dropdownList.classList.add('hidden');
            });

            fragment.appendChild(item);
        });

        dropdownList.appendChild(fragment);

        // Default Selection: India (+91)
        const defaultCountry = countries.find(c => c.code === '+91' && c.name.toLowerCase() === 'india') || countries[0];
        if (defaultCountry) {
            selectedFlagImg.src = defaultCountry.flag;
            selectedCodeText.textContent = defaultCountry.code;
            countryCodeInput.value = defaultCountry.code;
        }
    }

    populateDropdown();

    // Dropdown event listeners
    if (dropdownBtn && dropdownList) {
        dropdownBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            dropdownList.classList.toggle('hidden');
        });

        document.addEventListener('click', (e) => {
            const container = document.getElementById('countryDropdownContainer');
            if (container && !container.contains(e.target)) {
                dropdownList.classList.add('hidden');
            }
        });
    }

    // ============================================================
    // 6. CLOSE MODAL
    // ============================================================
    const modal = document.getElementById('salesModal');
    const closeBtn = document.getElementById('closeSalesModal');

    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            modal.classList.add('hidden');
            modal.classList.remove('flex');
        });
    }

    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.add('hidden');
                modal.classList.remove('flex');
            }
        });
    }

    // ============================================================
    // 7. HELPER FUNCTIONS
    // ============================================================
    function showError(input, msg) {
        const container = input.closest('div');
        const errorDiv = container ? container.querySelector('.error-message') : null;
        input.classList.add('error-border');
        if (errorDiv) {
            if (msg) errorDiv.textContent = msg;
            errorDiv.classList.remove('hidden');
        }
    }

    function clearError(input) {
        const container = input.closest('div');
        const errorDiv = container ? container.querySelector('.error-message') : null;
        input.classList.remove('error-border');
        if (errorDiv) {
            errorDiv.classList.add('hidden');
        }
    }

    // ============================================================
    function validateCompanyName(input) {
        const value = input.value;
        if (/[^a-zA-Z0-9\s.-]/.test(value)) {
            input.value = value.replace(/[^a-zA-Z0-9\s.-]/g, '');
            showError(input, 'Please enter a valid company name.');
            return false;
        } else {
            clearError(input);
            return true;
        }
    }

    function validateName(input) {
        const value = input.value;
        if (/[^a-zA-Z\s]/.test(value)) {
            input.value = value.replace(/[^a-zA-Z\s]/g, '');
            showError(input, 'Please enter letters only.');
            return false;
        } else {
            clearError(input);
            return true;
        }
    }

    function validatePhone(input) {
        const value = input.value;
        if (/\D/.test(value)) {
            input.value = value.replace(/\D/g, '');
            showError(input, 'Please enter numbers only.');
            return false;
        } else {
            clearError(input);
            return true;
        }
    }

    function validateEmail(input) {
        const value = input.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (value.length > 0 && !emailRegex.test(value)) {
            showError(input, 'Please enter a valid email address.');
            return false;
        } else {
            clearError(input);
            return true;
        }
    }

    function validateURL(input) {
        const value = input.value.trim();
        const urlRegex = /^https?:\/\/[^\s]+$/;
        if (value.length > 0 && !urlRegex.test(value)) {
            showError(input, 'Please enter a valid URL (e.g., https://example.com).');
            return false;
        } else {
            clearError(input);
            return true;
        }
    }
    // ============================================================
    // 9. EVENT LISTENERS
    // ============================================================
    const companyNameInput = document.getElementById('companyNameInput');
    if (companyNameInput) {
        companyNameInput.addEventListener('input', function () { validateCompanyName(this); });
        companyNameInput.addEventListener('blur', function () { validateCompanyName(this); });
    }

    document.querySelectorAll('.name-input').forEach(input => {
        input.addEventListener('input', function () { validateName(this); });
        input.addEventListener('blur', function () { validateName(this); });
    });

    const phoneInput = document.getElementById('phoneInput');
    if (phoneInput) {
        phoneInput.addEventListener('input', function () { validatePhone(this); });
        phoneInput.addEventListener('blur', function () { validatePhone(this); });
    }

    const emailInput = document.getElementById('emailInput');
    if (emailInput) {
        emailInput.addEventListener('blur', function () { validateEmail(this); });
        emailInput.addEventListener('input', function () {
            if (this.classList.contains('error-border')) {
                validateEmail(this);
            }
        });
    }

    const websiteInput = document.getElementById('websiteInput');
    if (websiteInput) {
        websiteInput.addEventListener('blur', function () { validateURL(this); });
        websiteInput.addEventListener('input', function () {
            if (this.classList.contains('error-border')) {
                validateURL(this);
            }
        });
    }

    countrySelect.addEventListener('change', function () { validateSelect(this); });
    stateSelect.addEventListener('change', function () { validateSelect(this); });
    citySelect.addEventListener('change', function () { validateSelect(this); });

    // ============================================================
    // 10. FORM SUBMISSION VALIDATION
    // ============================================================
    const form = document.getElementById('salesEnquiryForm');
    if (form) {
        form.addEventListener('submit', function (e) {
            let isValid = true;

            if (companyNameInput && !validateCompanyName(companyNameInput)) isValid = false;

            document.querySelectorAll('.name-input').forEach(input => {
                if (!validateName(input)) isValid = false;
            });

            if (phoneInput && !validatePhone(phoneInput)) isValid = false;
            if (emailInput && !validateEmail(emailInput)) isValid = false;
            if (websiteInput && !validateURL(websiteInput)) isValid = false;

            if (!validateSelect(countrySelect)) isValid = false;
            if (!validateSelect(stateSelect)) isValid = false;
            if (!validateSelect(citySelect)) isValid = false;

            if (!isValid) {
                e.preventDefault();
                const firstError = document.querySelector('.error-border');
                if (firstError) {
                    firstError.focus();
                }
            }
        });
    }

});





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
RESEND OTP COUNTDOWN
====================================================== */

let resendTimerInterval = null;
const RESEND_SECONDS = 30;

function startResendCountdown() {
    const btn = document.getElementById('resendOtpBtn');
    const timerText = document.getElementById('resendTimerText');
    const secondsSpan = document.getElementById('resendSecondsLeft');
    if (!btn || !timerText || !secondsSpan) return;

    // Clear any existing interval first
    if (resendTimerInterval) {
        clearInterval(resendTimerInterval);
        resendTimerInterval = null;
    }

    let secondsLeft = RESEND_SECONDS;

    // Gray out + disable "Resend OTP", show the timer text
    btn.disabled = true;
    btn.classList.remove('text-primary-green', 'hover:underline');
    btn.classList.add('text-gray-400', 'cursor-not-allowed');

    timerText.classList.remove('hidden');
    timerText.classList.add('flex');
    secondsSpan.textContent = secondsLeft;

    resendTimerInterval = setInterval(function () {
        secondsLeft -= 1;

        if (secondsLeft <= 0) {
            clearInterval(resendTimerInterval);
            resendTimerInterval = null;

            // Hide timer text
            timerText.classList.add('hidden');
            timerText.classList.remove('flex');

            // Restore "Resend OTP" to green/enabled
            btn.disabled = false;
            btn.classList.remove('text-gray-400', 'cursor-not-allowed');
            btn.classList.add('text-primary-green', 'hover:underline');
        } else {
            secondsSpan.textContent = secondsLeft;
        }
    }, 1000);
}

function stopResendCountdown() {
    if (resendTimerInterval) {
        clearInterval(resendTimerInterval);
        resendTimerInterval = null;
    }

    // Reset visual state so next open starts clean
    const btn = document.getElementById('resendOtpBtn');
    const timerText = document.getElementById('resendTimerText');
    if (timerText) {
        timerText.classList.add('hidden');
        timerText.classList.remove('flex');
    }
    if (btn) {
        btn.disabled = false;
        btn.classList.remove('text-gray-400', 'cursor-not-allowed');
        btn.classList.add('text-primary-green', 'hover:underline');
    }
}

function resendOtp() {
    const btn = document.getElementById('resendOtpBtn');
    if (btn && btn.disabled) return; // guard against clicks while disabled

    // TODO: trigger actual resend OTP API call here

    // Restart the countdown immediately
    startResendCountdown();
}

/* =====================================================
   OPEN OTP POPUP
   (Call this from handleSignup/handleLogin success,
   or wherever your code currently un-hides #otpPopup)
====================================================== */

function openOtpPopup(mobileNumber) {
    const otpPopup = document.getElementById('otpPopup');
    if (otpPopup) {
        otpPopup.classList.remove('opacity-0', 'pointer-events-none');
        otpPopup.classList.add('opacity-100', 'pointer-events-auto');
        document.body.classList.add('overflow-hidden');
    }

    // Optionally update the displayed mobile number
    const otpMobileNumber = document.getElementById('otpMobileNumber');
    if (otpMobileNumber && mobileNumber) {
        otpMobileNumber.textContent = mobileNumber;
    }

    // Always clear any previously typed OTP digits
    const otpForm = document.getElementById('otpForm');
    const otpInput = document.getElementById('otpInput');
    if (otpForm) otpForm.reset();
    if (otpInput) otpInput.value = '';

    // Start the 30s resend countdown fresh every time the popup opens
    startResendCountdown();
}

/* =====================================================
   HANDLE OTP SUBMIT
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

    // Clear the typed OTP so it doesn't linger for next time
    const otpForm = document.getElementById('otpForm');
    const otpInput = document.getElementById('otpInput');
    if (otpForm) otpForm.reset();
    if (otpInput) otpInput.value = '';

    // Stop the countdown so it doesn't keep running in the background
    stopResendCountdown();
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
        signupPopup.classList.add(
            'opacity-0',
            'pointer-events-none'
        );

        signupPopup.classList.remove(
            'opacity-100',
            'pointer-events-auto'
        );
    }

    // Open login popup
    const loginPopup = document.getElementById('loginPopup');

    if (loginPopup) {
        loginPopup.classList.remove(
            'opacity-0',
            'pointer-events-none'
        );

        loginPopup.classList.add(
            'opacity-100',
            'pointer-events-auto'
        );
    }

    // DON'T lock body scrolling here
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

function closeLoginPopup() {
    const loginPopup = document.getElementById('loginPopup');

    if (loginPopup) {
        loginPopup.classList.add(
            'opacity-0',
            'pointer-events-none'
        );

        loginPopup.classList.remove(
            'opacity-100',
            'pointer-events-auto'
        );
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



