document.addEventListener("DOMContentLoaded", function () {

    /* =========================================================
       AVAILABILITY
    ========================================================= */

    const availabilityToggle =
        document.getElementById("availabilityToggle");

    if (availabilityToggle) {

        const savedAvailability =
            localStorage.getItem("fieldEngineerAvailability");

        if (savedAvailability === "false") {
            availabilityToggle.classList.remove("active");
        }

        availabilityToggle.addEventListener("click", function () {

            const isActive =
                availabilityToggle.classList.toggle("active");

            localStorage.setItem(
                "fieldEngineerAvailability",
                isActive
            );

            showToast(
                isActive
                    ? "You are now available for new leads."
                    : "You are now unavailable for new leads."
            );

        });

    }


    /* =========================================================
       QUICK ACTIONS
    ========================================================= */

    window.goToLeads = function () {

        showToast("Opening Leads...");

        setTimeout(function () {

            /*
             * Change this URL to your actual Leads URL.
             */

            window.location.href = "/field-engineer/leads/";

        }, 500);

    };


    window.goToJobs = function () {

        showToast("Opening My Jobs...");

        setTimeout(function () {

            /*
             * Change this URL to your actual Jobs URL.
             */

            window.location.href = "/field-engineer/jobs/";

        }, 500);

    };


    window.goToEarnings = function () {

        showToast("Opening Earnings...");

        setTimeout(function () {

            /*
             * Change this URL to your actual Earnings URL.
             */

            window.location.href =
                "/field-engineer/earnings/";

        }, 500);

    };


    /* =========================================================
       VIEW LEADS
    ========================================================= */

    window.viewLeads = function () {

        showToast("Loading nearby leads...");

        setTimeout(function () {

            window.location.href =
                "/field-engineer/leads/";

        }, 500);

    };


    window.viewAllLeads = function () {

        showToast("Opening all leads...");

        setTimeout(function () {

            window.location.href =
                "/field-engineer/leads/";

        }, 500);

    };


    window.viewAllNearby = function () {

        showToast("Opening nearby leads...");

        setTimeout(function () {

            window.location.href =
                "/field-engineer/leads/";

        }, 500);

    };


    /* =========================================================
       LEAD DETAILS
    ========================================================= */

    window.viewLeadDetails = function (leadName) {

        showToast(
            "Opening " + leadName + " details..."
        );

        /*
         * Later you can replace this with:
         *
         * window.location.href =
         * `/field-engineer/leads/${leadId}/`;
         */

    };


    /* =========================================================
       ACCEPT LEAD
    ========================================================= */

    window.acceptLead = function (leadName) {

        const confirmed =
            confirm(
                "Do you want to accept this lead?\n\n" +
                leadName
            );

        if (!confirmed) {
            return;
        }

        showToast(
            leadName + " accepted successfully."
        );

    };


    /* =========================================================
       ACTIVE JOB
    ========================================================= */

    window.trackJob = function () {

        showToast("Opening job tracking...");

        setTimeout(function () {

            /*
             * Change to your real job tracking URL.
             */

            window.location.href =
                "/field-engineer/jobs/";

        }, 500);

    };


    window.openJobDetails = function () {

        showToast(
            "Opening job FE-507..."
        );

    };


    /* =========================================================
       EARNINGS
    ========================================================= */

    window.viewAllEarnings = function () {

        showToast("Opening earnings...");

        setTimeout(function () {

            window.location.href =
                "/field-engineer/earnings/";

        }, 500);

    };


    window.withdrawAmount = function () {

        const confirmed =
            confirm(
                "Do you want to withdraw your available balance?"
            );

        if (!confirmed) {
            return;
        }

        showToast(
            "Withdrawal request started."
        );

    };


    /* =========================================================
       TOAST
    ========================================================= */

    function showToast(message) {

        let toast =
            document.querySelector(".home-toast");

        if (!toast) {

            toast =
                document.createElement("div");

            toast.className =
                "home-toast";

            document.body.appendChild(toast);

        }

        toast.textContent = message;

        toast.classList.add("show");

        clearTimeout(
            window.homeToastTimer
        );

        window.homeToastTimer =
            setTimeout(function () {

                toast.classList.remove("show");

            }, 2500);

    }

});