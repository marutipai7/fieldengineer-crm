(function () {
  function formatNumber(value, decimals, useComma) {
    const fixed = Number(value).toFixed(decimals);
    if (!useComma) return fixed;
    const parts = fixed.split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
  }

  function animateCounter(el) {
    if (el.dataset.animated === "true") return;
    el.dataset.animated = "true";

    const target = parseFloat(el.dataset.target || "0", 10);
    const suffix = el.dataset.suffix || "";
    const decimals = parseInt(el.dataset.decimals || "0", 10);
    const useComma = el.dataset.format === "comma";
    const duration = 1400;
    const start = performance.now();

    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = target * eased;
      el.textContent = formatNumber(current, decimals, useComma) + suffix;
      if (progress < 1) requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
  }

  function initCounters() {
    const counters = document.querySelectorAll(".hero-counter");
    if (!counters.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.35 }
    );

    counters.forEach((counter) => observer.observe(counter));
  }

  function initServiceChips() {
    document.querySelectorAll(".hero-service-chip").forEach((chip, index) => {
      chip.style.opacity = "0";
      chip.style.transform = "translateY(12px)";
      chip.style.transition = "opacity 0.45s ease, transform 0.45s ease, box-shadow 0.2s ease, border-color 0.2s ease";
      setTimeout(() => {
        chip.style.opacity = "1";
        chip.style.transform = "translateY(0)";
      }, 520 + index * 70);
    });
  }

  function initSearchFocus() {
    const input = document.getElementById("hero-search-input");
    if (!input) return;
    const wrapper = input.closest("div");
    input.addEventListener("focus", () => wrapper?.classList.add("ring-2", "ring-primary/25"));
    input.addEventListener("blur", () => wrapper?.classList.remove("ring-2", "ring-primary/25"));
  }

  function buildCoverageMarker(city) {
    return (
      '<div class="coverage-map-marker glass-border-white">' +
      '<span class="coverage-city-name">' + city.name + "</span>" +
      '<span class="coverage-city-count">' + city.count + "</span>" +
      "</div>"
    );
  }

  function initCoverageMap() {
    const mapEl = document.getElementById("coverage-india-map");
    if (!mapEl || mapEl.dataset.mapReady === "true" || typeof L === "undefined") return;

    const cities = [
      { name: "Delhi NCR", count: "1,250+ Engineers", lat: 28.6139, lng: 77.209 },
      { name: "Mumbai", count: "1,000+ Engineers", lat: 19.076, lng: 72.8777 },
      { name: "Bangalore", count: "1,600+ Engineers", lat: 12.9716, lng: 77.5946 },
      { name: "Chennai", count: "1,100+ Engineers", lat: 13.0827, lng: 80.2707 },
      { name: "Hyderabad", count: "1,800+ Engineers", lat: 17.385, lng: 78.4867 },
      { name: "Kolkata", count: "900+ Engineers", lat: 22.5726, lng: 88.3639 },
    ];

    const map = L.map(mapEl, {
      zoomControl: true,
      scrollWheelZoom: false,
      attributionControl: true,
    });

    L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: "abcd",
      maxZoom: 19,
    }).addTo(map);

    const indiaBounds = L.latLngBounds([6.5, 68.0], [35.5, 97.5]);
    map.fitBounds(indiaBounds, { padding: [18, 18] });
    map.setMaxBounds(indiaBounds.pad(0.08));

    const baseZoom = map.getZoom();
    map.setMinZoom(baseZoom);
    map.setMaxZoom(baseZoom + 1);

    cities.forEach((city) => {
      const icon = L.divIcon({
        className: "coverage-map-marker-wrap",
        html: buildCoverageMarker(city),
        iconSize: [112, 48],
        iconAnchor: [56, 48],
      });

      L.marker([city.lat, city.lng], { icon, alt: city.name }).addTo(map);
    });

    mapEl.dataset.mapReady = "true";
    window.setTimeout(() => map.invalidateSize(), 150);
    window.setTimeout(() => map.invalidateSize(), 500);
  }

  function observeCoverageMap() {
    const mapEl = document.getElementById("coverage-india-map");
    if (!mapEl) return;

    if (typeof IntersectionObserver === "undefined") {
      initCoverageMap();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            initCoverageMap();
            observer.disconnect();
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(mapEl);
  }

  function initConstellation() {
    const canvas = document.getElementById("constellation");
    if (!canvas || !canvas.parentElement) return; // Guard against missing elements

    const parent = canvas.parentElement;

    function resize() {
      canvas.width = parent.offsetWidth;
      canvas.height = parent.offsetHeight;
      draw();
    }

    function draw() {
      const W = canvas.width, H = canvas.height;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      
      ctx.clearRect(0, 0, W, H);

      const centerX = W / 2;
      const fadePad = W * 0.28;

      const points = [
        // left cluster
        { x: 0.04, y: 0.15 }, { x: 0.10, y: 0.55 }, { x: 0.07, y: 0.82 },
        { x: 0.16, y: 0.30 }, { x: 0.20, y: 0.70 }, { x: 0.26, y: 0.12 },
        { x: 0.28, y: 0.50 }, { x: 0.22, y: 0.90 }, { x: 0.13, y: 0.42 },
        { x: 0.32, y: 0.75 }, { x: 0.36, y: 0.22 }, { x: 0.30, y: 0.38 },

        // right cluster (mirrored)
        { x: 0.96, y: 0.15 }, { x: 0.90, y: 0.55 }, { x: 0.93, y: 0.82 },
        { x: 0.84, y: 0.30 }, { x: 0.80, y: 0.70 }, { x: 0.74, y: 0.12 },
        { x: 0.72, y: 0.50 }, { x: 0.78, y: 0.90 }, { x: 0.87, y: 0.42 },
        { x: 0.68, y: 0.75 }, { x: 0.64, y: 0.22 }, { x: 0.70, y: 0.38 },

        // sparse center
        { x: 0.45, y: 0.08 }, { x: 0.52, y: 0.92 }, { x: 0.48, y: 0.50 },
        { x: 0.55, y: 0.18 }, { x: 0.42, y: 0.78 },
      ].map((p) => ({ x: p.x * W, y: p.y * H }));

      const maxDist = W * 0.22;

      function alpha(px, base) {
        const dx = Math.abs(px - centerX);
        if (dx < fadePad * 0.3) return base * 0.08;
        if (dx < fadePad) {
          const t = (dx - fadePad * 0.3) / (fadePad * 0.7);
          return base * (0.08 + 0.92 * t);
        }
        return base;
      }

      // Draw connections
      for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
          const a = points[i], b = points[j];
          const dist = Math.hypot(a.x - b.x, a.y - b.y);
          if (dist < maxDist) {
            const midX = (a.x + b.x) / 2;
            const fade = 1 - dist / maxDist;
            const op = alpha(midX, 0.3 * fade);
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(255,255,255,${op})`;
            ctx.lineWidth = 0.7;
            ctx.stroke();
          }
        }
      }

      // Draw dots
      points.forEach((p) => {
        const op = alpha(p.x, 1);
        const r = 2;
        ctx.beginPath();
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${op * 0.7})`;
        ctx.fill();
        // glow ring
        ctx.beginPath();
        ctx.arc(p.x, p.y, r + 1.5, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255,255,255,${op * 0.2})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      });
    }

    resize();
    window.addEventListener("resize", resize);
  }

  document.addEventListener("DOMContentLoaded", () => {
    initCounters();
    initServiceChips();
    initSearchFocus();
    observeCoverageMap();
    initConstellation();
  });
})();