/**
 * Field Engineer - Leads Management JavaScript
 * Handles tabs, custom dropdowns, availability toggle, card interactions, and modals.
 */

document.addEventListener("DOMContentLoaded", function () {
    initTabs();
    initCustomDropdowns();
    initAvailabilityToggle();
    initCardInteractions();
    initModal();
    initViewAll();
});

// ==========================================
// 1. TABS SWITCHING & FILTERING
// ==========================================
function initTabs() {
    const tabButtons = document.querySelectorAll(".fe-leads-tab-btn");
    const cards = document.querySelectorAll(".fe-leads-card");

    tabButtons.forEach(btn => {
        btn.addEventListener("click", function () {
            const targetTab = this.getAttribute("data-tab");

            // Reset all tabs
            tabButtons.forEach(t => {
                t.classList.remove("text-primary-yellow", "border-b-2", "border-primary-yellow", "font-semibold", "bg-dim-banner");
                t.classList.add("text-ink", "font-normal", "border-b-2", "border-transparent");
            });

            // Activate clicked tab
            this.classList.remove("text-ink", "font-normal", "border-transparent", "bg-dim-banner");
            this.classList.add("text-primary-yellow", "border-primary-yellow", "font-semibold", "bg-dim-banner");

            // Filter cards
            cards.forEach(card => {
                const cardType = card.getAttribute("data-badge") || "";
                const cardNearby = card.getAttribute("data-nearby") || "";

                if (targetTab === "all") {
                    card.style.display = "";
                } else if (targetTab === "priority") {
                    card.style.display = cardType.toLowerCase().includes("priority") ? "" : "none";
                } else if (targetTab === "nearby") {
                    card.style.display = cardNearby === "true" ? "" : "none";
                } else if (targetTab === "invited") {
                    card.style.display = cardType.toLowerCase().includes("standard") ? "" : "none";
                } else if (targetTab === "requests") {
                    card.style.display = cardType.toLowerCase().includes("pending") ? "" : "none";
                } else {
                    card.style.display = "";
                }
            });
        });
    });
}

// ==========================================
// 2. CUSTOM DROPDOWNS
// ==========================================
function initCustomDropdowns() {
    const dropdownWrappers = document.querySelectorAll(".fe-custom-dropdown");

    dropdownWrappers.forEach(wrapper => {
        const toggleBtn = wrapper.querySelector(".fe-dropdown-toggle");
        const menu = wrapper.querySelector(".fe-dropdown-menu");
        const valueDisplay = wrapper.querySelector(".fe-dropdown-value");
        const chevron = wrapper.querySelector(".fe-dropdown-chevron");

        if (!toggleBtn || !menu) return;

        // Toggle on click
        toggleBtn.addEventListener("click", function (e) {
            e.stopPropagation();
            const isOpen = !menu.classList.contains("hidden");

            // Close all other dropdowns
            closeAllDropdowns();

            if (!isOpen) {
                menu.classList.remove("hidden");
                if (chevron) chevron.style.transform = "rotate(180deg)";
                toggleBtn.classList.add("border-[#FAB819]");
            }
        });

        // Option item click
        const options = menu.querySelectorAll(".fe-dropdown-option");
        options.forEach(option => {
            option.addEventListener("click", function (e) {
                e.stopPropagation();
                const selectedValue = this.getAttribute("data-value") || this.textContent.trim();

                // Update display
                if (valueDisplay) {
                    valueDisplay.textContent = selectedValue;
                }

                // Close menu
                closeAllDropdowns();

                // Trigger a lightweight filter update
                applyFilters();
            });
        });
    });

    // Close when clicking outside
    document.addEventListener("click", function () {
        closeAllDropdowns();
    });

    function closeAllDropdowns() {
        document.querySelectorAll(".fe-dropdown-menu").forEach(m => m.classList.add("hidden"));
        document.querySelectorAll(".fe-dropdown-chevron").forEach(c => c.style.transform = "");
        document.querySelectorAll(".fe-dropdown-toggle").forEach(btn => btn.classList.remove("border-[#FAB819]"));
    }
}

function applyFilters() {
    // Optional filter logic matching selected dropdown values
    const cards = document.querySelectorAll(".fe-leads-card");
    const skillVal = document.querySelector("#dropdown-skills .fe-dropdown-value")?.textContent.trim();

    if (skillVal && skillVal !== "Any") {
        cards.forEach(card => {
            const title = card.querySelector(".lead-card-title")?.textContent.trim() || "";
            if (title.toLowerCase().includes(skillVal.toLowerCase())) {
                card.style.display = "";
            } else {
                card.style.display = "none";
            }
        });
    }
}

// ==========================================
// 3. AVAILABILITY TOGGLE
// ==========================================
function initAvailabilityToggle() {
    const toggle = document.getElementById("fe-availability-switch");
    const statusText = document.getElementById("fe-availability-status");
    const statusDot = document.getElementById("fe-availability-dot");

    if (!toggle || !statusText || !statusDot) return;

    toggle.addEventListener("change", function () {
        if (this.checked) {
            statusText.textContent = "Online";
            statusText.classList.remove("text-slate-400");
            statusText.classList.add("text-green-600");
            statusDot.classList.remove("bg-slate-400");
            statusDot.classList.add("bg-green-500");
        } else {
            statusText.textContent = "Offline";
            statusText.classList.remove("text-green-600");
            statusText.classList.add("text-slate-400");
            statusDot.classList.remove("bg-green-500");
            statusDot.classList.add("bg-slate-400");
        }
    });
}

// ==========================================
// 4. CARD SELECTION & ACCEPT LEAD
// ==========================================
function initCardInteractions() {
    const cards = document.querySelectorAll(".fe-leads-card");

    cards.forEach(card => {
        // Card click highlight
        card.addEventListener("click", function (e) {
            // If button clicked, don't trigger card selection change
            if (e.target.closest("button") || e.target.closest("a")) return;

            cards.forEach(c => {
                c.classList.remove("bg-[#EEF4FB]", "border-blue-200");
                c.classList.add("bg-white", "border-slate-200");
            });

            this.classList.remove("bg-white", "border-slate-200");
            this.classList.add("bg-[#EEF4FB]", "border-blue-200");
        });

        // Accept Lead button
        const acceptBtn = card.querySelector(".fe-accept-lead-btn");
        if (acceptBtn) {
            acceptBtn.addEventListener("click", function (e) {
                e.stopPropagation();
                const title = card.querySelector(".lead-card-title")?.textContent || "Lead";
                showToast(`Lead "${title.trim()}" accepted! Added to My Jobs.`);
                
                // Visual feedback
                acceptBtn.disabled = true;
                acceptBtn.classList.remove("bg-[#FAB819]", "hover:bg-[#E5A715]");
                acceptBtn.classList.add("bg-green-600", "cursor-default");
                acceptBtn.textContent = "Accepted";
            });
        }
    });
}

// ==========================================
// 5. LEAD DETAILS MODAL
// ==========================================
function initModal() {
    const modal = document.getElementById("leadDetailsModal");
    const closeBtn = document.getElementById("closeLeadDetailsModal");
    const viewButtons = document.querySelectorAll(".fe-view-lead-btn");

    if (!modal) return;

    viewButtons.forEach(btn => {
        btn.addEventListener("click", function (e) {
            e.stopPropagation();
            const card = this.closest(".fe-leads-card");
            if (!card) return;

            const title = card.querySelector(".lead-card-title")?.textContent.trim() || "Lead Details";
            const location = card.querySelector(".lead-card-location")?.textContent.trim() || "DC - Mumbai";
            const desc = card.querySelector(".lead-card-desc")?.textContent.trim() || "Installation details";
            const budget = card.querySelector(".lead-card-budget")?.textContent.trim() || "$5,000–$10,000";
            const duration = card.querySelector(".lead-card-duration")?.textContent.trim() || "4–6 hrs";
            const team = card.querySelector(".lead-card-team")?.textContent.trim() || "2 Engineers";
            const badge = card.querySelector(".lead-card-badge")?.textContent.trim() || "STANDARD";

            // Populate modal
            const mTitle = document.getElementById("modalLeadTitle");
            const mLocation = document.getElementById("modalLeadLocation");
            const mDesc = document.getElementById("modalLeadDesc");
            const mBudget = document.getElementById("modalLeadBudget");
            const mDuration = document.getElementById("modalLeadDuration");
            const mTeam = document.getElementById("modalLeadTeam");
            const mBadge = document.getElementById("modalLeadBadge");

            if (mTitle) mTitle.textContent = title;
            if (mLocation) mLocation.textContent = location;
            if (mDesc) mDesc.textContent = desc;
            if (mBudget) mBudget.textContent = budget;
            if (mDuration) mDuration.textContent = duration;
            if (mTeam) mTeam.textContent = team;
            if (mBadge) mBadge.textContent = badge;

            modal.classList.remove("hidden");
            modal.classList.add("flex");
        });
    });

    if (closeBtn) {
        closeBtn.addEventListener("click", closeModal);
    }

    modal.addEventListener("click", function (e) {
        if (e.target === modal) closeModal();
    });

    function closeModal() {
        modal.classList.add("hidden");
        modal.classList.remove("flex");
    }
}

// ==========================================
// 6. VIEW ALL LEADS
// ==========================================
function initViewAll() {
    const viewAllBtn = document.getElementById("viewAllLeadsBtn");
    if (!viewAllBtn) return;

    viewAllBtn.addEventListener("click", function (e) {
        e.preventDefault();
        // Trigger click on 'All Leads' tab
        const allTab = document.querySelector('.fe-leads-tab-btn[data-tab="all"]');
        if (allTab) allTab.click();

        // Reset dropdown values
        document.querySelectorAll(".fe-dropdown-value").forEach(v => {
            const wrapper = v.closest(".fe-custom-dropdown");
            if (wrapper && wrapper.id === "dropdown-distance") {
                v.textContent = "25 KM";
            } else {
                v.textContent = "Any";
            }
        });

        // Show all cards
        document.querySelectorAll(".fe-leads-card").forEach(c => c.style.display = "");
        showToast("Showing all 128 available leads.");
    });
}

// ==========================================
// 7. TOAST NOTIFICATION UTILITY
// ==========================================
function showToast(message) {
    let toast = document.getElementById("fe-toast");
    if (!toast) {
        toast = document.createElement("div");
        toast.id = "fe-toast";
        toast.className = "fixed bottom-6 right-6 z-50 bg-slate-900 text-white text-xs px-4 py-3 rounded-xl shadow-xl flex items-center gap-2 transition-all duration-300 transform translate-y-2 opacity-0 pointer-events-none";
        document.body.appendChild(toast);
    }

    toast.innerHTML = `
        <span class="material-symbols-outlined text-[#FAB819] text-[18px]">check_circle</span>
        <span>${message}</span>
    `;

    toast.classList.remove("opacity-0", "translate-y-2", "pointer-events-none");
    toast.classList.add("opacity-100", "translate-y-0");

    setTimeout(() => {
        toast.classList.remove("opacity-100", "translate-y-0");
        toast.classList.add("opacity-0", "translate-y-2", "pointer-events-none");
    }, 3000);
}
