 // Stay Updated Form - AJAX Submission
//     document.addEventListener("DOMContentLoaded", function () {
//         const form = document.querySelector('.stay-updated-form');
//         const messageDiv = document.getElementById('stay-updated-message');
//         const emailInput = document.getElementById('stay-updated-email');
//         const submitBtn = form ? form.querySelector('button[type="submit"]') : null;

//         if (form) {
//             form.addEventListener('submit', function (e) {
//                 e.preventDefault();

//                 const email = emailInput.value.trim();
//                 if (!email) return;

//                 // Disable button and show loading
//                 if (submitBtn) {
//                     submitBtn.disabled = true;
//                     submitBtn.innerHTML = 'Subscribing...';
//                 }
//                 messageDiv.innerHTML = '';
//                 messageDiv.className = 'mt-2 text-sm';

//                 // Get CSRF token from the form
//                 const csrfToken = form.querySelector('[name=csrfmiddlewaretoken]').value;

//                 fetch(form.action, {
//                     method: 'POST',
//                     headers: {
//                         'Content-Type': 'application/json',
//                         'X-CSRFToken': csrfToken
//                     },
//                     body: JSON.stringify({ email: email })
//                 })
//                 .then(response => response.json())
//                 .then(data => {
//                     if (data.success) {
//                         messageDiv.textContent = data.message;
//                         messageDiv.className = 'mt-2 text-sm text-green-600 font-medium';
//                         emailInput.value = '';
//                     } else {
//                         messageDiv.textContent = data.error || 'Something went wrong.';
//                         messageDiv.className = 'mt-2 text-sm text-red-600 font-medium';
//                     }
//                 })
//                 .catch(error => {
//                     messageDiv.textContent = 'Network error. Please try again.';
//                     messageDiv.className = 'mt-2 text-sm text-red-600 font-medium';
//                 })
//                 .finally(() => {
//                     if (submitBtn) {
//                         submitBtn.disabled = false;
//                         submitBtn.innerHTML = 'Subscribe <span class="material-symbols-outlined text-base transition-transform duration-200 group-hover:translate-x-1">arrow_forward</span>';
//                     }
//                 });
//             });
//         }
//     });

//     // Hero counter animation
//     document.addEventListener("DOMContentLoaded", () => {
//         const counters = document.querySelectorAll('.stat-count');
//         const animationDuration = 1500; // 1.5 seconds

//         const formatNumber = (val, target) => {
//             // If it's the 5000 element and it has reached the target, show '5k'
//             if (target === 5000 && val >= 5000) {
//                 return "5k+";
//             }
//             // While animating towards 5000, keep it clean with a '+' suffix
//             if (target === 5000) {
//                 return val.toLocaleString() + "+";
//             }
//             // Return standard value for other numbers
//             return val;
//         };

//         const startCounting = (element) => {
//             const target = parseInt(element.getAttribute('data-count'), 10);
//             const startTime = performance.now();

//             const updateCount = (currentTime) => {
//                 const elapsedTime = currentTime - startTime;
//                 const progress = Math.min(elapsedTime / animationDuration, 1);
                
//                 // Premium ease-out cubic curve
//                 const easeOutProgress = 1 - Math.pow(1 - progress, 3);
//                 const currentValue = Math.floor(easeOutProgress * target);

//                 element.innerText = formatNumber(currentValue, target);

//                 if (progress < 1) {
//                     requestAnimationFrame(updateCount);
//                 } else {
//                     element.innerText = formatNumber(target, target);
//                 }
//             };

//             requestAnimationFrame(updateCount);
//         };

//         const observerOptions = {
//             root: null,
//             threshold: 0.2
//         };

//         const observer = new IntersectionObserver((entries, observer) => {
//             entries.forEach(entry => {
//                 if (entry.isIntersecting) {
//                     startCounting(entry.target);
//                     observer.unobserve(entry.target);
//                 }
//             });
//         }, observerOptions);

//         counters.forEach(counter => observer.observe(counter));
//     });

//      document.addEventListener("DOMContentLoaded", function () {
//     // 1. Initialize Map
//     const map = L.map('coverageMap', {
//         center: [20, 10],
//         zoom: 2,
//         zoomControl: true
//     });

//     L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
//         maxZoom: 18,
//         subdomains: 'abcd',
//     }).addTo(map);

//     const locations = {
//         usa: {
//             coords: [40.725, -73.743],
//             title: "United States",
//             address: "218-10, Hillside Ave, Queens Village, New York, USA, 11427."
//         },
//         india: {
//             coords: [19.186, 72.848],
//             title: "India",
//             address: "3102, 1st Floor, Rustomjee Eaze Zone, Malad West - Mumbai 400064"
//         },
//         malaysia: {
//             coords: [3.083, 101.674],
//             title: "Malaysia",
//             address: "M116, Jalan Mega Mendung, Off Jalan Klang Lama, 58200, Kuala Lumpur"
//         }
//     };

//     const createGreenMarkerIcon = () => L.divIcon({
//         className: 'custom-pin',
//         html: `<div style="background-color: #1E9B6F; width: 28px; height: 28px; border-radius: 50%; border: 3px solid white; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.2); display: flex; align-items: center; justify-content: center;">
//                 <div style="width: 8px; height: 8px; background-color: white; border-radius: 50%;"></div>
//                </div>`,
//         iconSize: [28, 28],
//         iconAnchor: [14, 14]
//     });

//     const markers = {};

//     Object.keys(locations).forEach(key => {
//         const loc = locations[key];
//         const marker = L.marker(loc.coords, { icon: createGreenMarkerIcon() }).addTo(map);

//         const popupContent = `
//             <div style="font-family: inherit; padding: 2px;">
//                 <h5 style="color: #1E9B6F; font-weight: 700; margin-bottom: 4px;">${loc.title}</h5>
//                 <p style="font-size: 11px; color: #6B7280; margin: 0 0 6px 0; line-height: 1.3;">${loc.address}</p>
//                 <a href="#" style="font-size: 11px; color: #1E9B6F; font-weight: 600; text-decoration: none;">View Details &rarr;</a>
//             </div>
//         `;

//         marker.bindPopup(popupContent);
//         markers[key] = marker;
//     });

//     markers['usa'].openPopup();

//     function activateLocation(key) {
//         const loc = locations[key];
//         if (!loc) return;

//         map.flyTo(loc.coords, 5, { duration: 1.2 });
//         markers[key].openPopup();

//         const radio = document.querySelector(`input[name="countrySelect"][value="${key}"]`);
//         if (radio) radio.checked = true;

//         // Toggle Left Green Indicator Line
//         document.querySelectorAll('.location-card').forEach(card => {
//             const indicator = card.querySelector('.line-indicator');
//             if (card.id === `card-${key}`) {
//                 indicator.classList.remove('hidden');
//                 card.classList.add('shadow-md');
//             } else {
//                 indicator.classList.add('hidden');
//                 card.classList.remove('shadow-md');
//             }
//         });
//     }

//     document.querySelectorAll('input[name="countrySelect"]').forEach(radio => {
//         radio.addEventListener('change', (e) => {
//             activateLocation(e.target.value);
//         });
//     });

//     document.querySelectorAll('.location-card').forEach(card => {
//         card.addEventListener('click', () => {
//             const key = card.id.replace('card-', '');
//             activateLocation(key);
//         });
//     });
// });

// function toggleDropdown(id) {
//     const isLocation = id === 'location-dropdown';
//     const currentMenu = document.getElementById(isLocation ? 'location-menu' : 'service-menu');
//     const otherMenu = document.getElementById(isLocation ? 'service-menu' : 'location-menu');
//     const currentArrow = document.getElementById(isLocation ? 'location-arrow' : 'service-arrow');
//     const otherArrow = document.getElementById(isLocation ? 'service-arrow' : 'location-arrow');

//     // Close other dropdown
//     if (otherMenu) otherMenu.classList.add('hidden');
//     if (otherArrow) otherArrow.classList.remove('rotate-180');

//     // Toggle current dropdown
//     currentMenu.classList.toggle('hidden');
//     currentArrow.classList.toggle('rotate-180');
// }

// function selectOption(id, value) {
//     const isLocation = id === 'location-dropdown';
//     const textEl = document.getElementById(isLocation ? 'location-text' : 'service-text');
//     const inputEl = document.getElementById(isLocation ? 'location-input' : 'service-input');
    
//     textEl.textContent = value;
//     inputEl.value = value;
    
//     toggleDropdown(id); // Close menu on select
// }

// // Close if click outside
// window.addEventListener('click', function(e) {
//     if (!e.target.closest('#location-dropdown') && !e.target.closest('#service-dropdown')) {
//         document.getElementById('location-menu').classList.add('hidden');
//         document.getElementById('service-menu').classList.add('hidden');
//         document.getElementById('location-arrow').classList.remove('rotate-180');
//         document.getElementById('service-arrow').classList.remove('rotate-180');
//     }
// });


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

     document.addEventListener("DOMContentLoaded", function () {
    // 1. Initialize Map
    const map = L.map('coverageMap', {
        center: [20, 10],
        zoom: 2,
        zoomControl: true
    });

    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        maxZoom: 18,
        subdomains: 'abcd',
    }).addTo(map);

    const locations = {
        usa: {
            coords: [40.725, -73.743],
            title: "United States",
            address: "218-10, Hillside Ave, Queens Village, New York, USA, 11427."
        },
        india: {
            coords: [19.186, 72.848],
            title: "India",
            address: "3102, 1st Floor, Rustomjee Eaze Zone, Malad West - Mumbai 400064"
        },
        malaysia: {
            coords: [3.083, 101.674],
            title: "Malaysia",
            address: "M116, Jalan Mega Mendung, Off Jalan Klang Lama, 58200, Kuala Lumpur"
        }
    };

    const createGreenMarkerIcon = () => L.divIcon({
        className: 'custom-pin',
        html: `<div style="background-color: #1E9B6F; width: 28px; height: 28px; border-radius: 50%; border: 3px solid white; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.2); display: flex; align-items: center; justify-content: center;">
                <div style="width: 8px; height: 8px; background-color: white; border-radius: 50%;"></div>
               </div>`,
        iconSize: [28, 28],
        iconAnchor: [14, 14]
    });

    const markers = {};

    Object.keys(locations).forEach(key => {
        const loc = locations[key];
        const marker = L.marker(loc.coords, { icon: createGreenMarkerIcon() }).addTo(map);

        const popupContent = `
            <div style="font-family: inherit; padding: 2px;">
                <h5 style="color: #1E9B6F; font-weight: 700; margin-bottom: 4px;">${loc.title}</h5>
                <p style="font-size: 11px; color: #6B7280; margin: 0 0 6px 0; line-height: 1.3;">${loc.address}</p>
                <a href="#" style="font-size: 11px; color: #1E9B6F; font-weight: 600; text-decoration: none;">View Details &rarr;</a>
            </div>
        `;

        marker.bindPopup(popupContent);
        markers[key] = marker;
    });

    markers['usa'].openPopup();

    function activateLocation(key) {
        const loc = locations[key];
        if (!loc) return;

        map.flyTo(loc.coords, 5, { duration: 1.2 });
        markers[key].openPopup();

        const radio = document.querySelector(`input[name="countrySelect"][value="${key}"]`);
        if (radio) radio.checked = true;

        // Toggle Left Green Indicator Line
        document.querySelectorAll('.location-card').forEach(card => {
            const indicator = card.querySelector('.line-indicator');
            if (card.id === `card-${key}`) {
                indicator.classList.remove('hidden');
                card.classList.add('shadow-md');
            } else {
                indicator.classList.add('hidden');
                card.classList.remove('shadow-md');
            }
        });
    }

    document.querySelectorAll('input[name="countrySelect"]').forEach(radio => {
        radio.addEventListener('change', (e) => {
            activateLocation(e.target.value);
        });
    });

    document.querySelectorAll('.location-card').forEach(card => {
        card.addEventListener('click', () => {
            const key = card.id.replace('card-', '');
            activateLocation(key);
        });
    });
});

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
        document.getElementById('location-menu').classList.add('hidden');
        document.getElementById('service-menu').classList.add('hidden');
        document.getElementById('location-arrow').classList.remove('rotate-180');
        document.getElementById('service-arrow').classList.remove('rotate-180');
    }
});



// Trusted Field Engineers
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




// Ready to Deploy Certified
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