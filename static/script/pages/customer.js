document.addEventListener('DOMContentLoaded', function() {

    // ============================================================
    // 1. STATS COUNTER ANIMATION ✅ RAKHNA HAI
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
    // 2. PILL BUTTONS CLICK ✅ RAKHNA HAI
    // ============================================================
    document.querySelectorAll('.country-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            const country = this.getAttribute('data-country');
            // switchCountry ab home.js mein define hai
            if (typeof window.switchCountry === 'function') {
                window.switchCountry(country);
            }
        });
    });

    // ============================================================
    // 3. VIEW ON MAP BUTTONS ✅ RAKHNA HAI
    // ============================================================
    document.querySelectorAll('.bottom-card .view-map-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            
            const card = this.closest('.bottom-card');
            if (!card) return;
            
            const h4 = card.querySelector('h4');
            if (!h4) return;
            
            const cardTitle = h4.textContent.trim();
            
            let countryKey = null;
            if (cardTitle === "United States") countryKey = "usa";
            else if (cardTitle === "India") countryKey = "india";
            else if (cardTitle === "Malaysia") countryKey = "malaysia";
            
            if (countryKey) {
                document.querySelectorAll('.country-btn').forEach(btn => {
                    btn.classList.remove('bg-[#FBBF24]', 'text-white', 'shadow-sm');
                    btn.classList.add('text-gray-700');
                    
                    if (btn.getAttribute('data-country') === countryKey) {
                        btn.classList.add('bg-[#FBBF24]', 'text-white', 'shadow-sm');
                        btn.classList.remove('text-gray-700');
                    }
                });
                
                if (typeof window.switchCountry === 'function') {
                    window.switchCountry(countryKey);
                }
            }
        });
    });

    // ============================================================
    // 4. ADD BOTTOM-CARD CLASS TO CARDS ✅ RAKHNA HAI
    // ============================================================
    document.querySelectorAll('.grid.grid-cols-1.sm\\:grid-cols-2.lg\\:grid-cols-4 > div').forEach(card => {
        card.classList.add('bottom-card');
    });

    // ============================================================
    // 5. RESET HIGHLIGHTS WHEN CLICKING OUTSIDE ✅ RAKHNA HAI
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
    // 6. SET DEFAULT ACTIVE STATE (USA) ✅ RAKHNA HAI
    // ============================================================
    const defaultBtn = document.querySelector('[data-country="usa"]');
    if (defaultBtn) {
        defaultBtn.classList.add('bg-[#FBBF24]', 'text-white', 'shadow-sm');
        defaultBtn.classList.remove('text-gray-700');
    }
    
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