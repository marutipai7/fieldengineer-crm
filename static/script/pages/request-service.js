document.addEventListener("DOMContentLoaded", () => {
  // Counter Inputs
  document.querySelectorAll(".counter").forEach((card) => {
    const increment = card.querySelector(".incrementBtn");
    const decrement = card.querySelector(".decrementBtn");
    const input = card.querySelector(".count");
    increment.addEventListener("click", () => {
      input.value = parseInt(input.value) + 1;
    });
    decrement.addEventListener("click", () => {
      if (parseInt(input.value) > 0) input.value = parseInt(input.value) - 1;
    });
  });

  // ── Dropdowns ──────────────────────────────────────────────────────────────
  document.querySelectorAll(".dropdown-wrapper").forEach((wrapper) => {
    const toggle = wrapper.querySelector(".dropdown-toggle");
    const menu = wrapper.querySelector(".dropdownMenu");
    const input = wrapper.querySelector("input");

    toggle.addEventListener("click", () => menu.classList.toggle("hidden"));

    menu.querySelectorAll("li").forEach((li) => {
      li.addEventListener("click", () => {
        input.value = li.textContent.trim();
        menu.classList.add("hidden");
        wrapper
          .querySelector(".flex.items-center.justify-between")
          .classList.remove("border-red-500");
        removeError(wrapper);
      });
    });

    document.addEventListener("click", (e) => {
      if (!wrapper.contains(e.target)) menu.classList.add("hidden");
    });
  });

  // ── Service Card Selection ─────────────────────────────────────────────────
  let selectedService = null;

  document.querySelectorAll(".serviceDetails .grid > div").forEach((card) => {
    card.classList.add("relative");
    card.addEventListener("click", () => {
      if (selectedService && selectedService !== card) {
        selectedService.classList.remove("border-primary", "bg-frost-blue");
        selectedService.classList.add("border-porcelain-gray");
        const oldCheck = selectedService.querySelector(".service-check");
        if (oldCheck) oldCheck.remove();
      }
      selectedService = card;
      card.classList.add("border-primary", "bg-frost-blue");
      card.classList.remove("border-porcelain-gray");
      if (!card.querySelector(".service-check")) {
        const badge = document.createElement("div");
        badge.className =
          "service-check absolute top-2 right-2 w-5 h-5 rounded-full bg-primary flex items-center justify-center";
        badge.innerHTML =
          '<span class="material-symbols-outlined text-white" style="font-size:13px">check</span>';
        card.appendChild(badge);
      }
      removeError(document.querySelector(".serviceDetails"), "service-error");
    });
  });

  // ── Required Work Types — multi-select ────────────────────────────────────
  const selectedWorkTypes = new Set();

  const workTypesHeading = Array.from(
    document.querySelectorAll("p.font-semibold.text-sm"),
  ).find((p) => p.textContent.trim() === "Required Work Types");
  const workTypesGrid = workTypesHeading
    ?.closest(".flex.flex-col.gap-2")
    ?.querySelector(".grid.gap-4");

  if (workTypesGrid) {
    workTypesGrid.querySelectorAll(":scope > div").forEach((card) => {
      card.classList.add("relative");
      card.addEventListener("click", () => {
        const label = card.querySelector("p")?.textContent.trim();
        if (selectedWorkTypes.has(label)) {
          selectedWorkTypes.delete(label);
          card.classList.remove("border-primary", "bg-frost-blue");
          card.classList.add("border-morning-mist");
          card.querySelector(".work-check")?.remove();
        } else {
          selectedWorkTypes.add(label);
          card.classList.add("border-primary", "bg-frost-blue");
          card.classList.remove("border-morning-mist");
          if (!card.querySelector(".work-check")) {
            const badge = document.createElement("div");
            badge.className =
              "work-check absolute top-1 right-1 w-5 h-5 rounded-full bg-primary flex items-center justify-center";
            badge.innerHTML =
              '<span class="material-symbols-outlined text-white" style="font-size:13px">check</span>';
            card.appendChild(badge);
          }
        }
      });
    });
  }

  // ── Urgency Level — single select ─────────────────────────────────────────
  let selectedUrgency = null;

  document.querySelectorAll(".urgencyLevel").forEach((card) => {
    card.classList.add("relative");
    card.addEventListener("click", () => {
      if (selectedUrgency && selectedUrgency !== card) {
        selectedUrgency.classList.remove("border-primary", "bg-frost-blue");
        selectedUrgency.classList.add("border-morning-mist");
      }
      selectedUrgency = card;
      card.classList.add("border-primary", "bg-frost-blue");
      card.classList.remove("border-morning-mist");
      removeError(card.closest(".flex.flex-col.gap-2\\.5"), "urgency-error");
    });
  });

  // ── Date Pickers ──────────────────────────────────────────────────────────
  function buildCalendar(inputEl) {
    // Remove any existing calendar for this input
    const existingPicker = inputEl
      .closest(".flex.flex-col")
      ?.querySelector(".date-picker-popup");
    if (existingPicker) existingPicker.remove();

    const today = new Date();
    let viewYear = today.getFullYear();
    let viewMonth = today.getMonth();

    const popup = document.createElement("div");
    popup.className =
      "date-picker-popup absolute z-50 bg-white border border-pearl-blue rounded-lg shadow-xl p-4 w-72 top-full mt-1 left-0";

    function render() {
      popup.innerHTML = "";

      // Header
      const header = document.createElement("div");
      header.className = "flex items-center justify-between mb-3";
      const prevBtn = document.createElement("button");
      prevBtn.innerHTML =
        '<span class="material-symbols-outlined text-sm!">chevron_left</span>';
      prevBtn.className = "cursor-pointer text-primary";
      prevBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        viewMonth--;
        if (viewMonth < 0) {
          viewMonth = 11;
          viewYear--;
        }
        render();
      });

      const nextBtn = document.createElement("button");
      nextBtn.innerHTML =
        '<span class="material-symbols-outlined text-sm!">chevron_right</span>';
      nextBtn.className = "cursor-pointer text-primary";
      nextBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        viewMonth++;
        if (viewMonth > 11) {
          viewMonth = 0;
          viewYear++;
        }
        render();
      });

      const monthLabel = document.createElement("span");
      monthLabel.className = "font-semibold text-sm";
      monthLabel.textContent = new Date(viewYear, viewMonth).toLocaleString(
        "default",
        { month: "long", year: "numeric" },
      );

      header.append(prevBtn, monthLabel, nextBtn);
      popup.appendChild(header);

      // Day headers
      const dayRow = document.createElement("div");
      dayRow.className = "grid grid-cols-7 mb-1";
      ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].forEach((d) => {
        const cell = document.createElement("div");
        cell.className =
          "text-center text-xs font-semibold text-muted-steel py-1";
        cell.textContent = d;
        dayRow.appendChild(cell);
      });
      popup.appendChild(dayRow);

      // Days grid
      const grid = document.createElement("div");
      grid.className = "grid grid-cols-7 gap-y-1";
      const firstDay = new Date(viewYear, viewMonth, 1).getDay();
      const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

      for (let i = 0; i < firstDay; i++) {
        grid.appendChild(document.createElement("div"));
      }

      for (let d = 1; d <= daysInMonth; d++) {
        const cell = document.createElement("button");
        cell.textContent = d;
        cell.className =
          "text-center text-xs rounded-full w-7 h-7 mx-auto cursor-pointer hover:bg-primary hover:text-white transition-colors";

        const cellDate = new Date(viewYear, viewMonth, d);
        const isToday = cellDate.toDateString() === today.toDateString();
        if (isToday)
          cell.classList.add("border", "border-primary", "text-primary");

        // Check if this date is already selected
        if (
          inputEl.value ===
          cellDate.toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })
        ) {
          cell.classList.add("bg-primary", "text-white");
        }

        cell.addEventListener("click", (e) => {
          e.stopPropagation();
          inputEl.value = cellDate.toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          });
          clearFieldError(inputEl);
          popup.remove();
        });
        grid.appendChild(cell);
      }
      popup.appendChild(grid);
    }

    render();

    // Position relative to parent wrapper
    const wrapper = inputEl.closest(".flex.flex-col");
    wrapper.style.position = "relative";
    wrapper.appendChild(popup);

    // Close on outside click
    setTimeout(() => {
      document.addEventListener("click", function closePicker(e) {
        if (!popup.contains(e.target) && e.target !== inputEl) {
          popup.remove();
          document.removeEventListener("click", closePicker);
        }
      });
    }, 0);
  }

  // Attach to both date inputs in access-timeline
  document
    .querySelectorAll(
      ".access-timeline input[placeholder='Select start date'], .access-timeline input[placeholder='Select end date']",
    )
    .forEach((input) => {
      input.addEventListener("click", (e) => {
        e.stopPropagation();
        // Close any other open pickers first
        document
          .querySelectorAll(".date-picker-popup")
          .forEach((p) => p.remove());
        buildCalendar(input);
      });
    });

  // ── Step Indicator ─────────────────────────────────────────────────────────
  const stepIndicator = document.querySelector(".stepIndicator");
  const stepItems = stepIndicator.querySelectorAll(
    ":scope > div.flex.flex-col",
  );
  const dividers = stepIndicator.querySelectorAll(":scope > div.w-40");

  function updateStepIndicator(activeStep) {
    stepItems.forEach((item, index) => {
      const circle = item.querySelector("div.w-10");
      const label = item.querySelector("p");
      const stepNumber = index + 1;
      if (stepNumber < activeStep) {
        circle.className =
          "w-10 h-10 rounded-full bg-forest-green flex items-center justify-center text-xl font-bold text-white";
        circle.innerHTML = `<span class="material-symbols-outlined text-white text-lg!">check</span>`;
        label.className = "pb-2 text-nowrap text-primary font-semibold text-sm";
      } else if (stepNumber === activeStep) {
        circle.className =
          "w-10 h-10 rounded-full bg-primary flex items-center justify-center text-xl font-bold text-white";
        circle.innerHTML = stepNumber;
        label.className =
          "border-b-2 border-primary pb-2 text-nowrap text-black font-semibold";
      } else {
        circle.className =
          "w-10 h-10 rounded-full border border-alice-blue bg-ice-blue flex items-center justify-center text-xl font-bold";
        circle.innerHTML = stepNumber;
        label.className =
          "text-nowrap pb-2 text-slate-gray font-normal text-sm";
      }
    });
    dividers.forEach((divider, index) => {
      divider.className =
        index + 1 < activeStep
          ? "w-40 border-t-2 border-dashed border-primary"
          : "w-40 border-t-2 border-dashed border-silver-gray";
    });
  }

  // ── Error Helpers ──────────────────────────────────────────────────────────
  function showError(parent, message, id) {
    if (!parent || parent.querySelector(`#${id}`)) return;
    const el = document.createElement("p");
    el.id = id;
    el.className = "text-red-500 text-xs mt-1 error-msg";
    el.textContent = message;
    parent.appendChild(el);
  }

  function removeError(parent, id) {
    if (!parent) return;
    const el = id
      ? parent.querySelector(`#${id}`)
      : parent.querySelector(".error-msg");
    if (el) el.remove();
  }

  function markFieldError(field) {
    field.classList.add("border-red-500");
    field.classList.remove("border-pearl-blue", "border-mist-gray");
  }

  function clearFieldError(field) {
    field.classList.remove("border-red-500");
  }

  document
    .querySelectorAll(
      "input[type='text'], input[type='number'], input[type='email'], textarea",
    )
    .forEach((el) => {
      el.addEventListener("input", () => clearFieldError(el));
    });

  // ── Validation: Step 1 ────────────────────────────────────────────────────
  function validateStep1() {
    let valid = true;
    const section = document.querySelector(".serviceDetails");

    if (!selectedService) {
      showError(
        section.querySelector(".grid"),
        "Please select a service.",
        "service-error",
      );
      valid = false;
    } else {
      removeError(section.querySelector(".grid"), "service-error");
    }

    const textarea = section.querySelector("textarea");
    if (!textarea.value.trim()) {
      markFieldError(textarea);
      showError(
        textarea.parentElement,
        "Please describe your requirement.",
        "desc-error",
      );
      valid = false;
    } else {
      clearFieldError(textarea);
      removeError(textarea.parentElement, "desc-error");
    }
    return valid;
  }

  // ── Validation: Step 2 ────────────────────────────────────────────────────
  // ── Validation: Step 2 ────────────────────────────────────────────────────
  function validateStep2() {
    let valid = true;
    const section = document.querySelector(".siteInfo");

    function fieldError(wrapper, input, message, errorId) {
      if (!wrapper || !input) return;
      if (!input.value.trim()) {
        markFieldError(input);
        showError(wrapper, message, errorId);
        valid = false;
      } else {
        clearFieldError(input);
        removeError(wrapper, errorId);
      }
    }

    function dropdownError(wrapper, errorId) {
      if (!wrapper) return;
      const dropInput = wrapper.querySelector("input");
      const dropBox = wrapper.querySelector(
        ".flex.items-center.justify-between",
      );
      if (!dropInput || !dropBox) return;
      if (!dropInput.value.trim()) {
        dropBox.classList.add("border-red-500");
        dropBox.classList.remove("border-pearl-blue");
        showError(wrapper, "Please select an option.", errorId);
        valid = false;
      } else {
        dropBox.classList.remove("border-red-500");
        dropBox.classList.add("border-pearl-blue");
        removeError(wrapper, errorId);
      }
    }

    // Use the responsive grid — grab all direct children
    const infoGrid = section.querySelector(".grid.gap-5");
    const gridDivs = infoGrid
      ? Array.from(infoGrid.querySelectorAll(":scope > div"))
      : [];

    // gridDivs[0] = Company/Site Name, [1] = Site Type, [2] = Project Type, [3] = Building/Floor
    fieldError(
      gridDivs[0],
      gridDivs[0]?.querySelector("input"),
      "Company/Site name is required.",
      "err-company",
    );
    dropdownError(gridDivs[1], "err-site-type");
    dropdownError(gridDivs[2], "err-project-type");
    fieldError(
      gridDivs[3],
      gridDivs[3]?.querySelector("input"),
      "Building/Floor is required.",
      "err-building",
    );

    const counters = section.querySelectorAll(".counter input.count");
    const allZero = Array.from(counters).every((c) => parseInt(c.value) === 0);
    const scopeWrapper = section.querySelector(".grid.grid-cols-4");
    if (allZero) {
      showError(
        scopeWrapper,
        "Please fill in at least one scope field.",
        "scope-error",
      );
      valid = false;
    } else {
      removeError(scopeWrapper, "scope-error");
    }

    return valid;
  }

  // ── Validation: Step 4 (Access & Timeline) ────────────────────────────────
  function validateStep4() {
    let valid = true;
    const section = document.querySelector(".access-timeline");

    function fieldError(wrapper, input, message, errorId) {
      if (!wrapper || !input) return;
      if (!input.value.trim()) {
        markFieldError(input);
        showError(wrapper, message, errorId);
        valid = false;
      } else {
        clearFieldError(input);
        removeError(wrapper, errorId);
      }
    }

    function dropdownError(wrapper, errorId) {
      if (!wrapper) return;
      const dropInput = wrapper.querySelector("input");
      const dropBox = wrapper.querySelector(
        ".flex.items-center.justify-between",
      );
      if (!dropInput || !dropBox) return;
      if (!dropInput.value.trim()) {
        dropBox.classList.add("border-red-500");
        dropBox.classList.remove("border-pearl-blue");
        showError(wrapper, "Please select an option.", errorId);
        valid = false;
      } else {
        dropBox.classList.remove("border-red-500");
        dropBox.classList.add("border-pearl-blue");
        removeError(wrapper, errorId);
      }
    }

    // ── Site Contact Person ──────────────────────────────────────────────
    // Target by the heading text to avoid fragile nth-child / grid-cols matching
    const contactHeading = Array.from(
      section.querySelectorAll("p.font-semibold.text-sm"),
    ).find((p) => p.textContent.trim() === "Site Contact Person");
    const contactGrid = contactHeading
      ?.closest(".flex.flex-col.gap-2")
      ?.querySelector(".grid.gap-5");
    const contactDivs = contactGrid
      ? Array.from(contactGrid.querySelectorAll(":scope > div"))
      : [];

    // [0]=Name [1]=Mobile [2]=Alternate [3]=Email [4]=Department [5]=Designation
    fieldError(
      contactDivs[0],
      contactDivs[0]?.querySelector("input"),
      "Contact person name is required.",
      "err-contact-name",
    );
    fieldError(
      contactDivs[1],
      contactDivs[1]?.querySelector("input"),
      "Mobile number is required.",
      "err-mobile",
    );
    fieldError(
      contactDivs[3],
      contactDivs[3]?.querySelector("input"),
      "Email address is required.",
      "err-email",
    );

    // ── Access Information ───────────────────────────────────────────────
    const accessHeading = Array.from(
      section.querySelectorAll("p.font-semibold.text-sm"),
    ).find((p) => p.textContent.trim() === "Access Information");
    const accessGrid = accessHeading
      ?.closest(".flex.flex-col.gap-2")
      ?.querySelector(".grid.gap-5");
    const accessDropdowns = accessGrid
      ? Array.from(accessGrid.querySelectorAll(".dropdown-wrapper"))
      : [];

    dropdownError(accessDropdowns[0] ?? null, "err-entry"); // Entry Instructions
    dropdownError(accessDropdowns[1] ?? null, "err-security"); // Security Gate
    dropdownError(accessDropdowns[2] ?? null, "err-parking"); // Parking
    dropdownError(accessDropdowns[3] ?? null, "err-visitor"); // Visitor Pass

    // ── Urgency Level ────────────────────────────────────────────────────
    const urgencyHeading = Array.from(
      section.querySelectorAll("p.font-semibold.text-sm"),
    ).find((p) => p.textContent.trim() === "Urgency Level");
    const urgencyWrapper = urgencyHeading?.closest(".flex.flex-col.gap-2\\.5");

    if (!selectedUrgency) {
      showError(
        urgencyWrapper ?? section,
        "Please select an urgency level.",
        "urgency-error",
      );
      valid = false;
    } else {
      removeError(urgencyWrapper ?? section, "urgency-error");
    }

    // ── Preferred Start Date ─────────────────────────────────────────────
    const startInput = section.querySelector(
      "input[placeholder='Select start date']",
    );
    if (startInput) {
      const startWrapper = startInput.closest(".flex.flex-col");
      if (!startInput.value.trim()) {
        markFieldError(startInput);
        showError(startWrapper, "Start date is required.", "err-start-date");
        valid = false;
      } else {
        clearFieldError(startInput);
        removeError(startWrapper, "err-start-date");
      }
    }

    // ── Preferred End Date ───────────────────────────────────────────────
    const endInput = section.querySelector(
      "input[placeholder='Select end date']",
    );
    if (endInput) {
      const endWrapper = endInput.closest(".flex.flex-col");
      if (!endInput.value.trim()) {
        markFieldError(endInput);
        showError(endWrapper, "End date is required.", "err-end-date");
        valid = false;
      } else {
        clearFieldError(endInput);
        removeError(endWrapper, "err-end-date");
      }
    }

    // ── Preferred Time Window ────────────────────────────────────────────
    const scheduleHeading = Array.from(
      section.querySelectorAll("p.font-semibold.text-sm"),
    ).find((p) => p.textContent.trim() === "Schedule & Timeline");
    const scheduleGrid = scheduleHeading
      ?.closest(".flex.flex-col.gap-2")
      ?.querySelector(".grid.gap-4");
    const scheduleDropdowns = scheduleGrid
      ? Array.from(scheduleGrid.querySelectorAll(".dropdown-wrapper"))
      : [];

    dropdownError(scheduleDropdowns[0] ?? null, "err-time-window"); // Preferred Time Window

    return valid;
  }

  // ── Leaflet Map ────────────────────────────────────────────────────────────
  let map = null;
  let marker = null;

  function initMap(lat = 28.6139, lng = 77.209) {
    const mapEl = document.getElementById("map");
    mapEl.style.height = "300px";
    mapEl.style.width = "100%";
    mapEl.style.borderRadius = "0.5rem";

    map = L.map("map", { zoomControl: true }).setView([lat, lng], 13);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19,
    }).addTo(map);

    const markerIcon = L.divIcon({
      className: "",
      html: `<div style="width:36px;height:36px;background:#1D4ED8;border-radius:50% 50% 50% 0;transform:rotate(-45deg);border:3px solid white;box-shadow:0 2px 8px rgba(0,0,0,0.3);"></div>`,
      iconSize: [36, 36],
      iconAnchor: [18, 36],
    });

    marker = L.marker([lat, lng], { icon: markerIcon, draggable: true }).addTo(
      map,
    );
    marker.on("dragend", () => {
      const pos = marker.getLatLng();
      reverseGeocode(pos.lat, pos.lng);
    });
    map.on("click", (e) => {
      marker.setLatLng(e.latlng);
      reverseGeocode(e.latlng.lat, e.latlng.lng);
    });
    setTimeout(() => map.invalidateSize(), 150);
  }

  function reverseGeocode(lat, lng) {
    fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`,
    )
      .then((res) => res.json())
      .then((data) => {
        if (addressInput && data.display_name)
          addressInput.value = data.display_name;
      })
      .catch(() => {});
  }

  const locationSection = document.querySelector(".location");
  const searchBtn = locationSection.querySelector("button");
  const addressInput = locationSection.querySelector(
    "input[placeholder='Enter address']",
  );
  const clearBtn = locationSection.querySelector(
    ".material-symbols-outlined.cursor-pointer",
  );

  searchBtn.addEventListener("click", () => {
    const query = addressInput.value.trim();
    if (!query) return;
    fetch(
      `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=1`,
    )
      .then((res) => res.json())
      .then((data) => {
        if (!data.length) return;
        const { lat, lon, display_name } = data[0];
        map.setView([parseFloat(lat), parseFloat(lon)], 15);
        marker.setLatLng([parseFloat(lat), parseFloat(lon)]);
        addressInput.value = display_name;
      })
      .catch(() => {});
  });

  addressInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") searchBtn.click();
  });
  clearBtn.addEventListener("click", () => {
    addressInput.value = "";
  });

  locationSection
    .querySelector(".currentLocationBtn")
    .addEventListener("click", () => {
      if (!navigator.geolocation) return;
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          map.setView([latitude, longitude], 15);
          marker.setLatLng([latitude, longitude]);
          reverseGeocode(latitude, longitude);
        },
        () => alert("Unable to retrieve your location."),
      );
    });

  // ── Right Panel Summary Panels ─────────────────────────────────────────────
  const siteDetails = document.querySelector(".siteDetails");
  const locationDetails = document.querySelector(".locationDetails");
  const accessTimelineDetails = document.querySelector(
    ".accessTimelineDetails",
  );
  const costDetails = document.querySelector(".costDetails");

  // ── Sections & Navigation ─────────────────────────────────────────────────
  const serviceSection = document.querySelector(".serviceDetails");
  const siteSection = document.querySelector(".siteInfo");
  const accessTimelineSection = document.querySelector(".access-timeline");
  const reviewSubmitSection = document.querySelector(".reviewSubmit");

  const sections = [
    serviceSection,
    siteSection,
    locationSection,
    accessTimelineSection,
    reviewSubmitSection,
  ];

  function showSection(index) {
    sections.forEach((sec) => sec && sec.classList.add("hidden"));
    if (sections[index]) sections[index].classList.remove("hidden");
    updateStepIndicator(index + 1);

    if (index === 2 && !map) {
      setTimeout(() => initMap(), 100);
    }
  }

  // Step 1 → Step 2
  document.querySelector(".continueBtn1").addEventListener("click", () => {
    if (!validateStep1()) return;
    showSection(1);
    siteDetails.classList.remove("hidden");
  });

  // Continue buttons
  document.querySelectorAll(".continueBtn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const currentVisible = sections.findIndex(
        (s) => s && !s.classList.contains("hidden"),
      );

      if (currentVisible === 1 && !validateStep2()) return;
      if (currentVisible === 3 && !validateStep4()) return;

      if (currentVisible < sections.length - 1) {
        showSection(currentVisible + 1);

        // Show location details in right panel when entering step 3
        if (currentVisible + 1 === 2) {
          locationDetails && locationDetails.classList.remove("hidden");
        }

        // Show access+cost details in right panel when leaving step 4
        if (currentVisible + 1 === 4) {
          accessTimelineDetails &&
            accessTimelineDetails.classList.remove("hidden");
          costDetails && costDetails.classList.remove("hidden");
        }
      }
    });
  });

  // Back buttons
  document.querySelectorAll(".cancelBtn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const currentVisible = sections.findIndex(
        (s) => s && !s.classList.contains("hidden"),
      );
      if (currentVisible > 0) {
        showSection(currentVisible - 1);
        if (currentVisible === 1) siteDetails.classList.add("hidden");
      }
    });
  });

  // Textarea character counter
  document.querySelectorAll("textarea[maxlength]").forEach((ta) => {
    const counter = ta.parentElement.querySelector("p.absolute");
    if (!counter) return;
    ta.addEventListener("input", () => {
      counter.textContent = `${ta.value.length}/500`;
    });
  });

  // Initialize
  updateStepIndicator(1);
});
