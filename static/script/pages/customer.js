document.addEventListener('DOMContentLoaded', function() {

    // ============================================================
    // 1. STATS COUNTER ANIMATION
    // ============================================================
    const animateCounters = () => {
        const counters = document.querySelectorAll('.stat-number');
        const duration = 2000;

        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const suffix = counter.getAttribute('data-suffix') || '';
            const startTime = performance.now();

            const updateCount = (currentTime) => {
                const elapsedTime = currentTime - startTime;
                const progress = Math.min(elapsedTime / duration, 1);
                const easeOutQuad = 1 - (1 - progress) * (1 - progress);
                const currentVal = Math.floor(easeOutQuad * target);

                counter.textContent = currentVal.toLocaleString() + suffix;

                if (progress < 1) {
                    requestAnimationFrame(updateCount);
                } else {
                    counter.textContent = target.toLocaleString() + suffix;
                }
            };

            requestAnimationFrame(updateCount);
        });
    };

    animateCounters();

    // ============================================================
    // 2. MAP SETUP
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
    // 3. SWITCH COUNTRY FUNCTION
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

        // Highlight the corresponding card
        document.querySelectorAll('.bottom-card').forEach(card => {
            const h4 = card.querySelector('h4');
            if (h4) {
                const cardTitle = h4.textContent.trim();
                if (cardTitle === selected.cardTitle) {
                    card.style.borderColor = '#FBBF24';
                    card.style.borderWidth = '2px';
                    card.style.borderStyle = 'solid';
                    card.style.boxShadow = '0 0 0 3px rgba(251, 191, 36, 0.2)';
                    card.style.transition = 'all 0.3s ease';
                } else {
                    card.style.borderColor = '#E5E7EB';
                    card.style.borderWidth = '1px';
                    card.style.borderStyle = 'solid';
                    card.style.boxShadow = 'none';
                }
            }
        });
    }

    // ============================================================
    // 4. PILL BUTTONS CLICK
    // ============================================================
    document.querySelectorAll('.country-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            const country = this.getAttribute('data-country');
            switchCountry(country);
        });
    });

    // ============================================================
    // 5. VIEW ON MAP BUTTONS
    // ============================================================
    document.querySelectorAll('.bottom-card .view-map-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Find the parent card
            const card = this.closest('.bottom-card');
            if (!card) return;
            
            // Get the card title from h4
            const h4 = card.querySelector('h4');
            if (!h4) return;
            
            const cardTitle = h4.textContent.trim();
            
            // Map card title to country key
            let countryKey = null;
            if (cardTitle === "United States") countryKey = "usa";
            else if (cardTitle === "India") countryKey = "india";
            else if (cardTitle === "Malaysia") countryKey = "malaysia";
            
            if (countryKey) {
                // Update pill button
                document.querySelectorAll('.country-btn').forEach(btn => {
                    btn.classList.remove('bg-[#FBBF24]', 'text-white', 'shadow-sm');
                    btn.classList.add('text-gray-700');
                    
                    if (btn.getAttribute('data-country') === countryKey) {
                        btn.classList.add('bg-[#FBBF24]', 'text-white', 'shadow-sm');
                        btn.classList.remove('text-gray-700');
                    }
                });
                
                // Switch the map
                switchCountry(countryKey);
            }
        });
    });

    // ============================================================
    // 6. ADD BOTTOM-CARD CLASS TO CARDS
    // ============================================================
    document.querySelectorAll('.grid.grid-cols-1.sm\\:grid-cols-2.lg\\:grid-cols-4 > div').forEach(card => {
        card.classList.add('bottom-card');
    });

    // ============================================================
    // 7. RESET HIGHLIGHTS WHEN CLICKING OUTSIDE
    // ============================================================
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.bottom-card') && !e.target.closest('.country-btn')) {
            document.querySelectorAll('.bottom-card').forEach(card => {
                card.style.borderColor = '#E5E7EB';
                card.style.borderWidth = '1px';
                card.style.borderStyle = 'solid';
                card.style.boxShadow = 'none';
            });
        }
    });

    // ============================================================
    // 8. SET DEFAULT ACTIVE STATE (USA)
    // ============================================================
    // Make USA active by default
    const defaultBtn = document.querySelector('[data-country="usa"]');
    if (defaultBtn) {
        defaultBtn.classList.add('bg-[#FBBF24]', 'text-white', 'shadow-sm');
        defaultBtn.classList.remove('text-gray-700');
    }
    
    // Highlight USA card by default
    setTimeout(() => {
        document.querySelectorAll('.bottom-card').forEach(card => {
            const h4 = card.querySelector('h4');
            if (h4 && h4.textContent.trim() === "United States") {
                card.style.borderColor = '#FBBF24';
                card.style.borderWidth = '2px';
                card.style.borderStyle = 'solid';
                card.style.boxShadow = '0 0 0 3px rgba(251, 191, 36, 0.2)';
                card.style.transition = 'all 0.3s ease';
            }
        });
    }, 100);

});


