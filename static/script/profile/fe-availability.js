
  /* ============================================================
   FIELD ENGINEER - INDIVIDUAL AVAILABILITY
   ============================================================ */

  /* ============================================================
   MAIN ELEMENTS
   ============================================================ */

  const feIndividualAvailabilityWeeklyHours = document.getElementById(
    "fe-individual-availability-weekly-hours",
  );

  const feIndividualAvailabilityResetHours = document.getElementById(
    "fe-individual-availability-reset-hours",
  );

  /* Stop if availability section does not exist */

  if (feIndividualAvailabilityWeeklyHours) {
    /* ==========================================================
     DAY ROWS
     ========================================================== */

    const feIndividualAvailabilityDayRows =
      feIndividualAvailabilityWeeklyHours.querySelectorAll(
        ".fe-individual-availability-day-row",
      );

    /* ==========================================================
     CLOSE ALL DROPDOWNS
     ========================================================== */

    function feIndividualAvailabilityCloseAllDropdowns(exceptDropdown = null) {
      const dropdowns = feIndividualAvailabilityWeeklyHours.querySelectorAll(
        ".fe-individual-availability-time-dropdown",
      );

      dropdowns.forEach(function (dropdown) {
        if (dropdown === exceptDropdown) {
          return;
        }

        const menu = dropdown.querySelector(
          ".fe-individual-availability-time-menu",
        );

        const trigger = dropdown.querySelector(
          ".fe-individual-availability-time-trigger",
        );

        const icon = dropdown.querySelector(
          ".fe-individual-availability-dropdown-icon",
        );

        if (menu) {
          menu.classList.add("hidden");
        }

        if (trigger) {
          trigger.setAttribute("aria-expanded", "false");
        }

        if (icon) {
          icon.classList.remove("open");
        }
      });
    }

    /* ==========================================================
     CUSTOM TIME DROPDOWNS
     ========================================================== */

    const feIndividualAvailabilityDropdowns =
      feIndividualAvailabilityWeeklyHours.querySelectorAll(
        ".fe-individual-availability-time-dropdown",
      );

    feIndividualAvailabilityDropdowns.forEach(function (dropdown) {
      const trigger = dropdown.querySelector(
        ".fe-individual-availability-time-trigger",
      );

      const menu = dropdown.querySelector(
        ".fe-individual-availability-time-menu",
      );

      const icon = dropdown.querySelector(
        ".fe-individual-availability-dropdown-icon",
      );

      if (!trigger || !menu) {
        return;
      }

      /* ------------------------------------------------------
         Open / Close dropdown
         ------------------------------------------------------ */

      trigger.addEventListener("click", function (event) {
        event.stopPropagation();

        const isOpen = !menu.classList.contains("hidden");

        /* Close other dropdowns */

        feIndividualAvailabilityCloseAllDropdowns(dropdown);

        /* Close current */

        if (isOpen) {
          menu.classList.add("hidden");

          trigger.setAttribute("aria-expanded", "false");

          if (icon) {
            icon.classList.remove("open");
          }
        } else {
          /* Open current */
          menu.classList.remove("hidden");

          trigger.setAttribute("aria-expanded", "true");

          if (icon) {
            icon.classList.add("open");
          }
        }
      });
    });

    /* ==========================================================
     TIME OPTION SELECTION
     ========================================================== */

    const feIndividualAvailabilityTimeOptions =
      feIndividualAvailabilityWeeklyHours.querySelectorAll(
        ".fe-individual-availability-time-option",
      );

    feIndividualAvailabilityTimeOptions.forEach(function (option) {
      option.addEventListener("click", function (event) {
        event.stopPropagation();

        const dropdown = option.closest(
          ".fe-individual-availability-time-dropdown",
        );

        if (!dropdown) {
          return;
        }

        /* Selected value */

        const selectedValue = option.dataset.value;

        /* Selected text */

        const selectedTime = dropdown.querySelector(
          ".fe-individual-availability-selected-time",
        );

        /* Menu */

        const menu = dropdown.querySelector(
          ".fe-individual-availability-time-menu",
        );

        /* Trigger */

        const trigger = dropdown.querySelector(
          ".fe-individual-availability-time-trigger",
        );

        /* Arrow */

        const icon = dropdown.querySelector(
          ".fe-individual-availability-dropdown-icon",
        );

        /* Update displayed time */

        if (selectedTime) {
          selectedTime.textContent = selectedValue;
        }

        /* Remove selected from all options */

        dropdown
          .querySelectorAll(".fe-individual-availability-time-option")
          .forEach(function (item) {
            item.classList.remove("selected");
          });

        /* Add selected */

        option.classList.add("selected");

        /* Close dropdown */

        if (menu) {
          menu.classList.add("hidden");
        }

        if (trigger) {
          trigger.setAttribute("aria-expanded", "false");
        }

        if (icon) {
          icon.classList.remove("open");
        }
      });
    });

    /* ==========================================================
     UPDATE TOGGLE STATE
     ========================================================== */

    function feIndividualAvailabilityUpdateToggleState(row, enabled) {
      const toggle = row.querySelector(".fe-individual-availability-toggle");

      const knob = row.querySelector(".fe-individual-availability-toggle-knob");

      const timeDropdown = row.querySelector(
        ".fe-individual-availability-time-dropdown",
      );

      const notAvailable = row.querySelector(
        ".fe-individual-availability-not-available",
      );

      if (!toggle) {
        return;
      }

      /* Store state */

      row.dataset.enabled = String(enabled);

      /* Accessibility */

      toggle.setAttribute("aria-pressed", String(enabled));

      /* ========================================================
       ENABLED
       ======================================================== */

      if (enabled) {
        /* Remove OFF color */

        toggle.classList.remove("bg-gray-200");

        /* Add yellow */

        toggle.classList.add("bg-primary-yellow");

        /* Move knob right */

        if (knob) {
          knob.classList.remove("translate-x-0");

          knob.classList.add("translate-x-5");
        }

        /* Remove disabled state */

        row.classList.remove("is-disabled");

        /* Hide Not Available */

        if (notAvailable) {
          notAvailable.classList.add("hidden");
        }

        /* Show time dropdown */

        if (timeDropdown) {
          timeDropdown.classList.remove("hidden");
        }
      } else {
        /* ========================================================
       DISABLED
       ======================================================== */
        /* Remove yellow */

        toggle.classList.remove("bg-primary-yellow");

        /* Add grey */

        toggle.classList.add("bg-gray-200");

        /* Move knob left */

        if (knob) {
          knob.classList.remove("translate-x-5");

          knob.classList.add("translate-x-0");
        }

        /* Add disabled state */

        row.classList.add("is-disabled");

        /* Close dropdown */

        const menu = row.querySelector(".fe-individual-availability-time-menu");

        const trigger = row.querySelector(
          ".fe-individual-availability-time-trigger",
        );

        const icon = row.querySelector(
          ".fe-individual-availability-dropdown-icon",
        );

        if (menu) {
          menu.classList.add("hidden");
        }

        if (trigger) {
          trigger.setAttribute("aria-expanded", "false");
        }

        if (icon) {
          icon.classList.remove("open");
        }

        /* Show Not Available */

        if (notAvailable) {
          notAvailable.classList.remove("hidden");
        }

        /* Hide time dropdown */

        if (timeDropdown) {
          timeDropdown.classList.add("hidden");
        }
      }
    }

    /* ==========================================================
     TOGGLE FUNCTIONALITY
     ========================================================== */

    feIndividualAvailabilityDayRows.forEach(function (row) {
      const toggle = row.querySelector(".fe-individual-availability-toggle");

      if (!toggle) {
        return;
      }

      /* Initial state */

      const initialState = row.dataset.enabled === "true";

      /* Apply initial state */

      feIndividualAvailabilityUpdateToggleState(row, initialState);

      /* Toggle click */

      toggle.addEventListener("click", function () {
        const currentState = row.dataset.enabled === "true";

        const newState = !currentState;

        feIndividualAvailabilityUpdateToggleState(row, newState);
      });
    });

    /* ==========================================================
     RESET TO DEFAULT
     ========================================================== */

    if (feIndividualAvailabilityResetHours) {
      feIndividualAvailabilityResetHours.addEventListener("click", function () {
        feIndividualAvailabilityDayRows.forEach(function (row) {
          const day = row.dataset.day;

          const selectedTime = row.querySelector(
            ".fe-individual-availability-selected-time",
          );

          /* ----------------------------------------------
               Sunday remains OFF
               ---------------------------------------------- */

          if (day === "sunday") {
            feIndividualAvailabilityUpdateToggleState(row, false);

            return;
          }

          /* ----------------------------------------------
               Monday - Saturday ON
               ---------------------------------------------- */

          feIndividualAvailabilityUpdateToggleState(row, true);

          /* Reset time */

          if (selectedTime) {
            selectedTime.textContent = "09:00 AM - 07:00 PM";
          }

          /* Reset selected option */

          const options = row.querySelectorAll(
            ".fe-individual-availability-time-option",
          );

          options.forEach(function (option) {
            option.classList.remove("selected");

            if (option.dataset.value === "09:00 AM - 07:00 PM") {
              option.classList.add("selected");
            }
          });
        });
      });
    }

    /* ==========================================================
     CLOSE DROPDOWN WHEN CLICKING OUTSIDE
     ========================================================== */

    document.addEventListener("click", function () {
      feIndividualAvailabilityCloseAllDropdowns();
    });
  }

  /* ============================================================
   AVAILABILITY PREFERENCES TOGGLE
   ============================================================ */

  /* ------------------------------------------------------------
   Flexible With Location
   ------------------------------------------------------------ */

  const feIndividualAvailabilityLocationToggle = document.getElementById(
    "fe-individual-availability-location-toggle",
  );

  const feIndividualAvailabilityLocationLabel = document.getElementById(
    "fe-individual-availability-location-label",
  );

  /* ------------------------------------------------------------
   Short Notice Jobs
   ------------------------------------------------------------ */

  const feIndividualAvailabilityNoticeToggle = document.getElementById(
    "fe-individual-availability-notice-toggle",
  );

  const feIndividualAvailabilityNoticeLabel = document.getElementById(
    "fe-individual-availability-notice-label",
  );

  /* ============================================================
   TOGGLE UPDATE FUNCTION
   ============================================================ */

  function feIndividualAvailabilityUpdatePreferenceToggle(
    toggle,
    label,
    enabled,
  ) {
    if (!toggle) {
      return;
    }

    /* Save current state */

    toggle.dataset.enabled = String(enabled);

    /* Accessibility */

    toggle.setAttribute("aria-pressed", String(enabled));

    /* Toggle knob */

    const knob = toggle.querySelector(
      ".fe-individual-availability-preference-knob",
    );

    /* ==========================================================
     ON
     ========================================================== */

    if (enabled) {
      /* Yellow background */

      toggle.classList.remove("bg-gray-200");

      toggle.classList.add("bg-primary-yellow");

      /* Move knob right */

      if (knob) {
        knob.classList.remove("translate-x-0");

        knob.classList.add("translate-x-5");
      }

      /* Label */

      if (label) {
        label.textContent = "ON";
      }
    } else {
      /* ==========================================================
     OFF
     ========================================================== */
      /* Grey background */

      toggle.classList.remove("bg-primary-yellow");

      toggle.classList.add("bg-gray-200");

      /* Move knob left */

      if (knob) {
        knob.classList.remove("translate-x-5");

        knob.classList.add("translate-x-0");
      }

      /* Label */

      if (label) {
        label.textContent = "OFF";
      }
    }
  }

  /* ============================================================
   LOCATION TOGGLE
   ============================================================ */

  if (feIndividualAvailabilityLocationToggle) {
    feIndividualAvailabilityLocationToggle.addEventListener(
      "click",
      function () {
        const currentState = this.dataset.enabled === "true";

        feIndividualAvailabilityUpdatePreferenceToggle(
          this,
          feIndividualAvailabilityLocationLabel,
          !currentState,
        );
      },
    );
  }

  /* ============================================================
   SHORT NOTICE TOGGLE
   ============================================================ */

  if (feIndividualAvailabilityNoticeToggle) {
    feIndividualAvailabilityNoticeToggle.addEventListener("click", function () {
      const currentState = this.dataset.enabled === "true";

      feIndividualAvailabilityUpdatePreferenceToggle(
        this,
        feIndividualAvailabilityNoticeLabel,
        !currentState,
      );
    });

    /* ============================================================
   FIELD ENGINEER - ONLINE / OFFLINE AVAILABILITY
   ============================================================ */

    function toggleFeIndividualAvailabilityOnline(button) {
      /* Current state */
      const isCurrentlyOn = button.dataset.on === "true";

      /* New state */
      const isNowOn = !isCurrentlyOn;

      /* Store new state */
      button.dataset.on = String(isNowOn);

      /* Accessibility */
      button.setAttribute("aria-pressed", String(isNowOn));

      /* Toggle dot */
      const dot = button.querySelector(
        ".fe-individual-availability-online-dot",
      );

      /* Status elements */
      const status = document.getElementById(
        "fe-individual-availability-status",
      );

      const statusDot = document.getElementById(
        "fe-individual-availability-status-dot",
      );

      const description = document.getElementById(
        "fe-individual-availability-description",
      );

      /* ==========================================================
     ONLINE
     ========================================================== */

      if (isNowOn) {
        /* Toggle background */
        button.classList.remove("bg-gray-200");

        button.classList.add("bg-primary-yellow");

        /* Move toggle dot right */
        if (dot) {
          dot.classList.remove("left-1");

          dot.classList.add("left-6");
        }

        /* Status */
        if (status) {
          status.textContent = "Online";

          status.classList.remove("text-gray-500");

          status.classList.add("text-bright-green");
        }

        /* Status dot */
        if (statusDot) {
          statusDot.classList.remove("bg-gray-400");

          statusDot.classList.add("bg-bright-green");
        }

        /* Description */
        if (description) {
          description.textContent =
            "You are visible for new leads and incoming job requests.";
        }
      } else {
        /* ==========================================================
     OFFLINE
     ========================================================== */
        /* Toggle background */
        button.classList.remove("bg-primary-yellow");

        button.classList.add("bg-gray-200");

        /* Move toggle dot left */
        if (dot) {
          dot.classList.remove("left-6");

          dot.classList.add("left-1");
        }

        /* Status */
        if (status) {
          status.textContent = "Offline";

          status.classList.remove("text-bright-green");

          status.classList.add("text-gray-500");
        }

        /* Status dot */
        if (statusDot) {
          statusDot.classList.remove("bg-bright-green");

          statusDot.classList.add("bg-gray-400");
        }

        /* Description */
        if (description) {
          description.textContent =
            "You are not visible for new leads and incoming job requests.";
        }
      }
    }
  }
