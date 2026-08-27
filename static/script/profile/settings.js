document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       TAB SWITCHING
    ====================================================== */

    const tabs = document.querySelectorAll(".notification-tab");
    const panels = document.querySelectorAll(".notification-panel");

    tabs.forEach(function (tab) {

        tab.addEventListener("click", function () {

            const target = this.dataset.tab;

            /* Remove active from all tabs */
            tabs.forEach(function (item) {
                item.classList.remove("active");
            });

            /* Hide all panels */
            panels.forEach(function (panel) {
                panel.classList.remove("active");
            });

            /* Activate clicked tab */
            this.classList.add("active");

            /* Show matching panel */
            const targetPanel =
                document.getElementById(target + "Panel");

            if (targetPanel) {
                targetPanel.classList.add("active");
            }

        });

    });


    /* =====================================================
       GLOBAL NOTIFICATION TOGGLE
    ====================================================== */

    const globalToggle =
        document.getElementById("globalNotificationToggle");

    const notificationToggles =
        document.querySelectorAll(".notification-toggle");


    if (globalToggle) {

        globalToggle.addEventListener("change", function () {

            const enabled = this.checked;

            notificationToggles.forEach(function (toggle) {

                toggle.checked = enabled;

            });

        });

    }


    /* =====================================================
       INDIVIDUAL NOTIFICATION TOGGLES
    ====================================================== */

    notificationToggles.forEach(function (toggle) {

        toggle.addEventListener("change", function () {

            if (!globalToggle) {
                return;
            }

            /*
             * Check whether every notification
             * is currently enabled.
             */

            const allEnabled =
                Array.from(notificationToggles).every(
                    function (item) {
                        return item.checked;
                    }
                );


            /*
             * If at least one notification is disabled,
             * turn the main switch off.
             */

            globalToggle.checked = allEnabled;

        });

    });

});