(function () {
  const GURUGRAM_CENTER = [28.4595, 77.0266];
  const DEFAULT_ZOOM = 13;

  const engineers = window.VR_ENGINEERS || [];

  let map = null;

  function buildEngineerMarker(imgSrc) {
    return (
      '<div class="vr-engineer-marker" aria-hidden="true">' +
      '<span class="vr-engineer-marker__pulse"></span>' +
      '<span class="vr-engineer-marker__pulse"></span>' +
      '<span class="vr-engineer-marker__pulse"></span>' +
      '<img class="vr-engineer-marker__avatar" src="' + imgSrc + '" alt="engineering marker" width="44" height="44" loading="lazy">' +
      "</div>"
    );
  }

  function addEngineerMarkers() {
    engineers.forEach((engineer) => {
      const icon = L.divIcon({
        className: "vr-engineer-marker-wrap",
        html: buildEngineerMarker(engineer.img),
        iconSize: [88, 88],
        iconAnchor: [44, 44],
      });

      L.marker([engineer.lat, engineer.lng], { icon, interactive: false }).addTo(map);
    });
  }

  function bindMapControls() {
    const zoomIn = document.getElementById("vr-map-zoom-in");
    const zoomOut = document.getElementById("vr-map-zoom-out");
    const recenter = document.getElementById("vr-map-recenter");

    if (zoomIn) {
      zoomIn.addEventListener("click", () => map.zoomIn());
    }
    if (zoomOut) {
      zoomOut.addEventListener("click", () => map.zoomOut());
    }
    if (recenter) {
      recenter.addEventListener("click", () => {
        map.setView(GURUGRAM_CENTER, DEFAULT_ZOOM, { animate: true });
      });
    }
  }

  function initVendorResponsesHeroMap() {
    const mapEl = document.getElementById("vr-hero-map");
    if (!mapEl || mapEl.dataset.mapReady === "true" || typeof L === "undefined") return;

    map = L.map(mapEl, {
      zoomControl: false,
      scrollWheelZoom: true,
      attributionControl: false,
    });

    L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
      subdomains: "abcd",
      maxZoom: 19,
    }).addTo(map);

    map.setView(GURUGRAM_CENTER, DEFAULT_ZOOM);
    addEngineerMarkers();
    bindMapControls();

    mapEl.dataset.mapReady = "true";
    window.setTimeout(() => map.invalidateSize(), 100);
    window.setTimeout(() => map.invalidateSize(), 400);
  }

  function initVendorResponsesDropdown() {
    const dropdowns = document.querySelectorAll("[data-vr-dropdown]");
    if (!dropdowns.length) return;

    function closeDropdown(dropdown) {
      const trigger = dropdown.querySelector(".vr-dropdown-trigger");
      const menu = dropdown.querySelector(".vr-dropdown-menu");
      dropdown.classList.remove("is-open");
      if (trigger) trigger.setAttribute("aria-expanded", "false");
      if (menu) menu.hidden = true;
    }

    function closeAllExcept(current) {
      dropdowns.forEach((dropdown) => {
        if (dropdown !== current) closeDropdown(dropdown);
      });
    }

    dropdowns.forEach((dropdown) => {
      const trigger = dropdown.querySelector(".vr-dropdown-trigger");
      const menu = dropdown.querySelector(".vr-dropdown-menu");
      const valueEl = dropdown.querySelector("[data-vr-dropdown-value]");
      const inputEl = dropdown.querySelector("[data-vr-dropdown-input]");
      const options = dropdown.querySelectorAll(".vr-dropdown-option");

      if (!trigger || !menu || !valueEl) return;

      trigger.addEventListener("click", (event) => {
        event.stopPropagation();
        const willOpen = !dropdown.classList.contains("is-open");
        closeAllExcept(dropdown);
        dropdown.classList.toggle("is-open", willOpen);
        trigger.setAttribute("aria-expanded", willOpen ? "true" : "false");
        menu.hidden = !willOpen;
      });

      menu.addEventListener("click", (event) => {
        event.stopPropagation();
      });

      options.forEach((option) => {
        option.addEventListener("click", () => {
          const label = option.textContent.trim();
          const value = option.dataset.value || label;

          valueEl.textContent = label;
          if (inputEl) inputEl.value = value;

          options.forEach((item) => {
            const isSelected = item === option;
            item.classList.toggle("is-selected", isSelected);
            item.setAttribute("aria-selected", isSelected ? "true" : "false");
          });

          closeDropdown(dropdown);
        });
      });
    });

    document.addEventListener("click", () => {
      dropdowns.forEach((dropdown) => closeDropdown(dropdown));
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        dropdowns.forEach((dropdown) => closeDropdown(dropdown));
      }
    });
  }

  function initVendorResponsesTabs() {
    const tabs = document.querySelectorAll("[data-vr-tab]");
    const panels = document.querySelectorAll("[data-vr-panel]");
    if (!tabs.length || !panels.length) return;

    tabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        const target = tab.dataset.vrTab;

        tabs.forEach((item) => {
          const isActive = item === tab;
          item.classList.toggle("is-active", isActive);
          item.setAttribute("aria-selected", isActive ? "true" : "false");
          item.tabIndex = isActive ? 0 : -1;
        });

        panels.forEach((panel) => {
          const isActive = panel.dataset.vrPanel === target;
          panel.classList.toggle("is-active", isActive);
          panel.hidden = !isActive;
        });
      });
    });
  }
function initSkillToggle() {
    document.querySelectorAll(".vr-skill-more").forEach(button => {

        button.addEventListener("click", function () {

            const card = this.closest(".vr-engineer-card");
            const hiddenSkills = card.querySelectorAll(".vr-hidden-skill");

            const isOpen = this.dataset.open === "true";

            hiddenSkills.forEach(skill => {
                if (isOpen) {
                    skill.classList.remove("show");
                } else {
                    skill.classList.add("show");
                }
            });

            this.dataset.open = isOpen ? "false" : "true";
            this.textContent = isOpen
                ? `+${hiddenSkills.length} more`
                : "Show Less";
        });

    });
}
 document.addEventListener("DOMContentLoaded", () => {
    initVendorResponsesHeroMap();
    initVendorResponsesTabs();
    initVendorResponsesDropdown();
    initSkillToggle();
});
  
})();
