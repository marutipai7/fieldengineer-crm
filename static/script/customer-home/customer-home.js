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

  document.addEventListener("DOMContentLoaded", () => {
    initCounters();
    initServiceChips();
    initSearchFocus();
  });
})();
