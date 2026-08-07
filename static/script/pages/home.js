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
//MAP SETUP 
// ============================================================
const countryData = {
    usa: {
        center: [38.8951, -77.0364],
        zoom: 4,
        marker: [40.7282, -73.7371],
        title: "USA Office",
        cardTitle: "United States"
    },
    india: {
        center: [20.5937, 78.9629],
        zoom: 5,
        marker: [19.1860, 72.8485],
        title: "India Office",
        cardTitle: "India"
    },
    malaysia: {
        center: [4.2105, 101.9758],
        zoom: 6,
        marker: [3.1516, 101.5938],
        title: "Malaysia Office",
        cardTitle: "Malaysia"
    }
};

// Initialize map
const map = L.map('coverageMap', {
    zoomControl: true,
    scrollWheelZoom: false
}).setView(countryData.usa.center, countryData.usa.zoom);

L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; OpenStreetMap &copy; CARTO',
    subdomains: 'abcd',
    maxZoom: 19
}).addTo(map);

// Custom marker icon
const customIcon = L.divIcon({
    className: 'custom-map-pin',
    html: `
        <div style="background-color: #F59E0B; width: 24px; height: 24px; border-radius: 50%; border: 3px solid white; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.2); position: relative;">
            <span style="position: absolute; width: 100%; height: 100%; background-color: #F59E0B; border-radius: 50%; animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite; opacity: 0.75;"></span>
        </div>
    `,
    iconSize: [24, 24],
    iconAnchor: [12, 12]
});

// Add markers
const markers = {};
Object.keys(countryData).forEach(key => {
    const item = countryData[key];
    markers[key] = L.marker(item.marker, { icon: customIcon })
        .addTo(map)
        .bindPopup(`<b>${item.title}</b>`);
});

// ============================================================
// 3. SWITCH COUNTRY FUNCTION - YEH BHI HATANA HAI
// ============================================================
function switchCountry(countryKey) {
    const selected = countryData[countryKey];
    if (!selected) return;

    // Fly to country
    map.flyTo(selected.center, selected.zoom, {
        duration: 1.5
    });

    // Open popup
    setTimeout(() => {
        markers[countryKey].openPopup();
    }, 500);

    // Update pill buttons
    document.querySelectorAll('.country-btn').forEach(btn => {
        btn.classList.remove('bg-[#FBBF24]', 'text-white', 'shadow-sm');
        btn.classList.add('text-gray-700');
        
        if (btn.getAttribute('data-country') === countryKey) {
            btn.classList.add('bg-[#FBBF24]', 'text-white', 'shadow-sm');
            btn.classList.remove('text-gray-700');
        }
    });

   
   document.querySelectorAll('.bottom-card').forEach(card => {
    card.style.border = 'none';
    card.style.boxShadow = 'none';
});
}



// our service section
 document.addEventListener('DOMContentLoaded', function() {
        const container = document.getElementById('serviceCardsContainer');
        
        if (container) {
            new Sortable(container, {
                animation: 350,
                easing: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                ghostClass: 'sortable-ghost',
                dragClass: 'sortable-chosen',
                onStart: function(evt) {
                    evt.item.style.transform = 'scale(1.05)';
                    evt.item.style.boxShadow = '0 30px 60px rgba(0,0,0,0.9)';
                    evt.item.style.zIndex = '999';
                    evt.item.style.border = '3px solid #F3BA3F';
                    evt.item.style.borderRadius = '16px';
                },
                onEnd: function(evt) {
                    evt.item.style.transform = '';
                    evt.item.style.boxShadow = '';
                    evt.item.style.zIndex = '';
                    evt.item.style.border = '';
                    evt.item.style.borderRadius = '';
                },
                touchStartThreshold: 5,
                delay: 150,
                delayOnTouchOnly: true
            });
        }
    });

    function switchToLogin() {
        console.log('Switch to login');
    }

    document.querySelectorAll('.service-card').forEach(card => {
        card.addEventListener('click', function(e) {
            if (!this.classList.contains('dragging')) {
                switchToLogin();
            }
        });
    });