// Homepage JS

// Stay Updated Form - AJAX Submission
document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector('.stay-updated-form');
    const messageDiv = document.getElementById('stay-updated-message');
    const emailInput = document.getElementById('stay-updated-email');
    const submitBtn = form ? form.querySelector('button[type="submit"]') : null;

    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();

            const email = emailInput.value.trim();
            if (!email) return;

            // Disable button and show loading
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = 'Subscribing...';
            }
            messageDiv.innerHTML = '';
            messageDiv.className = 'mt-2 text-sm';

            // Get CSRF token from the form
            const csrfToken = form.querySelector('[name=csrfmiddlewaretoken]').value;

            fetch(form.action, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrfToken
                },
                body: JSON.stringify({ email: email })
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    messageDiv.textContent = data.message;
                    messageDiv.className = 'mt-2 text-sm text-green-600 font-medium';
                    emailInput.value = '';
                } else {
                    messageDiv.textContent = data.error || 'Something went wrong.';
                    messageDiv.className = 'mt-2 text-sm text-red-600 font-medium';
                }
            })
            .catch(error => {
                messageDiv.textContent = 'Network error. Please try again.';
                messageDiv.className = 'mt-2 text-sm text-red-600 font-medium';
            })
            .finally(() => {
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = 'Subscribe <span class="material-symbols-outlined text-base transition-transform duration-200 group-hover:translate-x-1">arrow_forward</span>';
                }
            });
        });
    }
});

// Hero counter animation
document.addEventListener("DOMContentLoaded", () => {
    const counters = document.querySelectorAll('.stat-count');
    const animationDuration = 1500; // 1.5 seconds

    const formatNumber = (val, target) => {
        // If it's the 5000 element and it has reached the target, show '5k'
        if (target === 5000 && val >= 5000) {
            return "5k+";
        }
        // While animating towards 5000, keep it clean with a '+' suffix
        if (target === 5000) {
            return val.toLocaleString() + "+";
        }
        // Return standard value for other numbers
        return val;
    };

    const startCounting = (element) => {
        const target = parseInt(element.getAttribute('data-count'), 10);
        const startTime = performance.now();

        const updateCount = (currentTime) => {
            const elapsedTime = currentTime - startTime;
            const progress = Math.min(elapsedTime / animationDuration, 1);
            
            // Premium ease-out cubic curve
            const easeOutProgress = 1 - Math.pow(1 - progress, 3);
            const currentValue = Math.floor(easeOutProgress * target);

            element.innerText = formatNumber(currentValue, target);

            if (progress < 1) {
                requestAnimationFrame(updateCount);
            } else {
                element.innerText = formatNumber(target, target);
            }
        };

        requestAnimationFrame(updateCount);
    };

    const observerOptions = {
        root: null,
        threshold: 0.2
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                startCounting(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    counters.forEach(counter => observer.observe(counter));
});

// Dropdown Functions - RAKHNA HAI
function toggleDropdown(id) {
    const isLocation = id === 'location-dropdown';
    const currentMenu = document.getElementById(isLocation ? 'location-menu' : 'service-menu');
    const otherMenu = document.getElementById(isLocation ? 'service-menu' : 'location-menu');
    const currentArrow = document.getElementById(isLocation ? 'location-arrow' : 'service-arrow');
    const otherArrow = document.getElementById(isLocation ? 'service-arrow' : 'location-arrow');

    // Close other dropdown
    if (otherMenu) otherMenu.classList.add('hidden');
    if (otherArrow) otherArrow.classList.remove('rotate-180');

    // Toggle current dropdown
    currentMenu.classList.toggle('hidden');
    currentArrow.classList.toggle('rotate-180');
}

function selectOption(id, value) {
    const isLocation = id === 'location-dropdown';
    const textEl = document.getElementById(isLocation ? 'location-text' : 'service-text');
    const inputEl = document.getElementById(isLocation ? 'location-input' : 'service-input');
    
    textEl.textContent = value;
    inputEl.value = value;
    
    toggleDropdown(id); // Close menu on select
}

// Close if click outside
window.addEventListener('click', function(e) {
    if (!e.target.closest('#location-dropdown') && !e.target.closest('#service-dropdown')) {
        const locationMenu = document.getElementById('location-menu');
        const serviceMenu = document.getElementById('service-menu');
        const locationArrow = document.getElementById('location-arrow');
        const serviceArrow = document.getElementById('service-arrow');
        
        if (locationMenu) locationMenu.classList.add('hidden');
        if (serviceMenu) serviceMenu.classList.add('hidden');
        if (locationArrow) locationArrow.classList.remove('rotate-180');
        if (serviceArrow) serviceArrow.classList.remove('rotate-180');
    }
});

// Trusted Field Engineers Counter - RAKHNA HAI
document.addEventListener("DOMContentLoaded", () => {
    const counters = document.querySelectorAll('.counter');

    counters.forEach(counter => {
        const updateCount = () => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;

            // Increment chhota kar diya hai taaki smooth aur slow count ho
            const increment = Math.max(1, Math.ceil(target / 300));

            if (count < target) {
                counter.innerText = Math.min(count + increment, target);
                setTimeout(updateCount, 40); // Interval 20ms se 40ms kar diya hai
            } else {
                counter.innerText = target;
            }
        };
        updateCount();
    });
});

// Ready to Deploy Certified Counter - RAKHNA HAI
document.addEventListener("DOMContentLoaded", () => {
    const counters = document.querySelectorAll('.counter');
    const speed = 200; // Animation speed in ms

    const startCounting = (counter) => {
        const target = +counter.getAttribute('data-target');
        const decimals = +counter.getAttribute('data-decimals') || 0;
        const increment = target / (speed / 10);

        let count = 0;

        const updateCount = () => {
            count += increment;

            if (count < target) {
                counter.innerText = count.toFixed(decimals);
                setTimeout(updateCount, 10);
            } else {
                counter.innerText = target.toFixed(decimals);
            }
        };

        updateCount();
    };

    // Trigger animation when scrolled into view
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                startCounting(counter);
                observer.unobserve(counter); // Run once
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
});




// ============================================================
// OUR COVERAGE - LEAFLET MAP
// ============================================================

document.addEventListener("DOMContentLoaded", function () {

    const mapElement = document.getElementById("coverageMap");

    if (!mapElement) {
        console.error("coverageMap element not found.");
        return;
    }

    // ------------------------------------------------------------
    // Country data
    // ------------------------------------------------------------

    const countryData = {

        usa: {
            center: [38.8951, -77.0364],
            zoom: 4,
            marker: [40.7282, -73.7371],
            title: "USA Office"
        },

        india: {
            center: [20.5937, 78.9629],
            zoom: 5,
            marker: [19.1860, 72.8485],
            title: "India Office"
        },

        malaysia: {
            center: [4.2105, 101.9758],
            zoom: 6,
            marker: [3.1516, 101.5938],
            title: "Malaysia Office"
        }

    };


    // ------------------------------------------------------------
    // Create Leaflet map
    // ------------------------------------------------------------

    const map = L.map("coverageMap", {
        zoomControl: true,
        scrollWheelZoom: false
    }).setView(
        countryData.usa.center,
        countryData.usa.zoom
    );


    // ------------------------------------------------------------
    // Map tiles
    // ------------------------------------------------------------

  L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.webp", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
  subdomains: "abcd",
  maxZoom: 19,
}).addTo(map);


    // ------------------------------------------------------------
    // Custom marker
    // ------------------------------------------------------------

    const customIcon = L.divIcon({

        className: "custom-map-pin",

        html: `
            <div style="
                background-color:#F59E0B;
                width:24px;
                height:24px;
                border-radius:50%;
                border:3px solid white;
                box-shadow:0 4px 6px -1px rgba(0,0,0,0.2);
                position:relative;
            ">
                <span style="
                    position:absolute;
                    width:100%;
                    height:100%;
                    background-color:#F59E0B;
                    border-radius:50%;
                    animation:ping 1.5s cubic-bezier(0,0,0.2,1) infinite;
                    opacity:0.75;
                "></span>
            </div>
        `,

        iconSize: [24, 24],
        iconAnchor: [12, 12]

    });


    // ------------------------------------------------------------
    // Create markers
    // ------------------------------------------------------------

    const markers = {};

    Object.keys(countryData).forEach(function (countryKey) {

        const country = countryData[countryKey];

        markers[countryKey] = L.marker(
            country.marker,
            {
                icon: customIcon
            }
        )
        .addTo(map)
        .bindPopup(`<b>${country.title}</b>`);

    });


    // ------------------------------------------------------------
    // Switch country
    // ------------------------------------------------------------

    function switchCountry(countryKey) {

        const country = countryData[countryKey];

        if (!country) {
            console.error("Country not found:", countryKey);
            return;
        }

        // Change map position
        map.flyTo(
            country.center,
            country.zoom,
            {
                duration: 1.5
            }
        );


        // Open selected country's marker
        setTimeout(function () {

            if (markers[countryKey]) {
                markers[countryKey].openPopup();
            }

        }, 1200);


        // Update top country buttons
        document.querySelectorAll(".country-btn").forEach(function (button) {

            button.classList.remove(
                "bg-[#FBBF24]",
                "text-white",
                "shadow-sm"
            );

            button.classList.add("text-gray-700");


            if (button.dataset.country === countryKey) {

                button.classList.add(
                    "bg-[#FBBF24]",
                    "text-white",
                    "shadow-sm"
                );

                button.classList.remove("text-gray-700");

            }

        });

    }


    // ------------------------------------------------------------
    // TOP COUNTRY BUTTONS
    // ------------------------------------------------------------

    document.querySelectorAll(".country-btn").forEach(function (button) {

        button.addEventListener("click", function () {

            const country = this.dataset.country;

            switchCountry(country);

        });

    });


    // ------------------------------------------------------------
    // VIEW ON MAP BUTTONS
    // ------------------------------------------------------------

    const viewMapButtons = document.querySelectorAll("[data-view-map]");

    viewMapButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const country = this.dataset.viewMap;

            switchCountry(country);

            // Scroll to map
            mapElement.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });

        });

    });


    // ------------------------------------------------------------
    // Fix Leaflet map size after page rendering
    // ------------------------------------------------------------

    setTimeout(function () {
        map.invalidateSize();
    }, 300);


    // Make function available globally if needed elsewhere
    window.switchCountry = switchCountry;

});
document.querySelectorAll("[data-view-map]").forEach(function (button) {

    button.addEventListener("click", function () {

        const country = this.dataset.viewMap;

        switchCountry(country);

        document.getElementById("coverageMap").scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

    });

});
// ============================================================
// PREVENT IMAGE DRAGGING
// ============================================================

document.addEventListener("DOMContentLoaded", function () {

    document.querySelectorAll("img").forEach(function (img) {

        // Prevent browser image dragging
        img.setAttribute("draggable", "false");

        // Prevent drag & drop
        img.addEventListener("dragstart", function (event) {
            event.preventDefault();
        });

        // Prevent image selection
        img.style.userSelect = "none";
        img.style.webkitUserSelect = "none";
        img.style.webkitUserDrag = "none";

    });

});