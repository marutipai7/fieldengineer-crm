document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       AVAILABILITY TOGGLE
    ====================================================== */

    const availabilityToggle =
        document.getElementById("availabilityToggle");

    if (availabilityToggle) {

        availabilityToggle.addEventListener("change", function () {

            if (this.checked) {
                console.log("Availability enabled");
            } else {
                console.log("Availability disabled");
            }

        });

    }


    /* =====================================================
       LOCKED FEATURES
    ====================================================== */

    document.querySelectorAll(".locked-feature").forEach(function (card) {

        card.addEventListener("click", function (event) {

            event.preventDefault();

            console.log(
                "Complete KYC before accessing this feature."
            );

        });

    });


    /* =====================================================
       LOCKED LEAD BUTTONS
    ====================================================== */

    document.querySelectorAll(".fe-lead-buttons button").forEach(
        function (button) {

            button.addEventListener("click", function () {

                alert(
                    "Please complete your KYC to access leads."
                );

            });

        }
    );

});