document.addEventListener("DOMContentLoaded", function () {

    /* =========================================================
       KYC STEP NAVIGATION
    ========================================================= */

    const sections = document.querySelectorAll(".kyc-step-section");


    function showStep(stepNumber) {

        sections.forEach(function (section) {

            section.classList.remove("active-step");
            section.style.display = "none";

        });


        const targetStep =
            document.getElementById("kycStep" + stepNumber);


        if (!targetStep) {

            console.error(
                "KYC step not found:",
                stepNumber
            );

            return;

        }


        targetStep.classList.add("active-step");
        targetStep.style.display = "block";


        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });


        console.log(
            "Showing KYC Step:",
            stepNumber
        );

    }


    /* =========================================================
       STEP 1 → STEP 2
    ========================================================= */

    const saveProfileButton =
        document.getElementById("saveProfileButton");


    if (saveProfileButton) {

        saveProfileButton.addEventListener(
            "click",
            function (event) {

                event.preventDefault();
                event.stopPropagation();


                /* -----------------------------------------
                   STEP 1 VALIDATION
                ----------------------------------------- */

                const vendor =
                    document.getElementById("vendor")?.value || "";


                const experience =
                    document.getElementById("experience")?.value || "";


                const specialization =
                    document.getElementById("specialization")?.value || "";


                const skill =
                    document.getElementById("skill")?.value || "";


                if (!vendor) {

                    alert("Please select a vendor.");
                    return;

                }


                if (!experience) {

                    alert(
                        "Please select your years of experience."
                    );

                    return;

                }


                if (!specialization) {

                    alert(
                        "Please select your primary specialization."
                    );

                    return;

                }


                if (!skill) {

                    alert(
                        "Please select a skill."
                    );

                    return;

                }


                /* -----------------------------------------
                   SAVE PROFILE DATA
                ----------------------------------------- */

                const profileData = {

                    vendor: vendor,
                    experience: experience,
                    specialization: specialization,
                    skill: skill

                };


                localStorage.setItem(
                    "fieldEngineerProfile",
                    JSON.stringify(profileData)
                );


                /* -----------------------------------------
                   OPEN STEP 2
                ----------------------------------------- */

                showStep(2);

            }
        );

    }


    /* =========================================================
       STEP 2 → STEP 1
    ========================================================= */

    const kycBackBtn =
        document.getElementById("kycBackBtn");


    if (kycBackBtn) {

        kycBackBtn.addEventListener(
            "click",
            function (event) {

                event.preventDefault();
                event.stopPropagation();


                showStep(1);

            }
        );

    }


    /* =========================================================
       STEP 2 → STEP 3
       
       THIS IS THE IMPORTANT FIX.
       
       NO:
       window.location.href
       
       NO:
       alert()
       
       JUST OPEN STEP 3.
    ========================================================= */

    const kycContinueBtn =
        document.getElementById("kycContinueBtn");


    if (kycContinueBtn) {

        kycContinueBtn.addEventListener(
            "click",
            function (event) {

                event.preventDefault();
                event.stopPropagation();


                console.log(
                    "Step 2 Save & Continue clicked"
                );


                /* -----------------------------------------
                   OPEN STEP 3 DIRECTLY
                ----------------------------------------- */

                showStep(3);

            }
        );

    }


    /* =========================================================
       STEP 3 → STEP 2
    ========================================================= */

    const kycServiceBackBtn =
        document.getElementById(
            "kycServiceBackBtn"
        );


    if (kycServiceBackBtn) {

        kycServiceBackBtn.addEventListener(
            "click",
            function (event) {

                event.preventDefault();
                event.stopPropagation();


                showStep(2);

            }
        );

    }


    /* =========================================================
       STEP 3 → STEP 4
    ========================================================= */

    const kycServiceContinueBtn =
        document.getElementById(
            "kycServiceContinueBtn"
        );


    if (kycServiceContinueBtn) {

        kycServiceContinueBtn.addEventListener(
            "click",
            function (event) {

                event.preventDefault();
                event.stopPropagation();


                /* -----------------------------------------
                   SAVE SERVICE AREA DATA
                ----------------------------------------- */

                const primaryCity =
                    document.getElementById(
                        "primaryCity"
                    )?.value || "";


                const radiusSlider =
                    document.getElementById(
                        "serviceRadiusSlider"
                    );


                const serviceAreaData = {

                    primaryCity: primaryCity,

                    radius:
                        radiusSlider
                            ? radiusSlider.value
                            : "250",

                    savedAt:
                        new Date().toISOString()

                };


                localStorage.setItem(
                    "kycServiceArea",
                    JSON.stringify(serviceAreaData)
                );


                console.log(
                    "Step 3 Save & Continue clicked"
                );


                /* -----------------------------------------
                   OPEN STEP 4
                ----------------------------------------- */

                showStep(4);

            }
        );

    }


    /* =========================================================
       STEP 4 → STEP 3
    ========================================================= */

    const kycStep4BackBtn =
        document.getElementById(
            "kycStep4BackBtn"
        );


    if (kycStep4BackBtn) {

        kycStep4BackBtn.addEventListener(
            "click",
            function (event) {

                event.preventDefault();
                event.stopPropagation();


                showStep(3);

            }
        );

    }


    /* =========================================================
       STEP 4 → STEP 5
    ========================================================= */

    const kycStep4ContinueBtn =
        document.getElementById(
            "kycStep4ContinueBtn"
        );


    if (kycStep4ContinueBtn) {

        kycStep4ContinueBtn.addEventListener(
            "click",
            function (event) {

                event.preventDefault();
                event.stopPropagation();


                console.log(
                    "Step 4 Save & Continue clicked"
                );


                showStep(5);

            }
        );

    }


    /* =========================================================
       STEP 5 → STEP 4
    ========================================================= */

    const kycStep5BackBtn =
        document.getElementById(
            "kycStep5BackBtn"
        );


    if (kycStep5BackBtn) {

        kycStep5BackBtn.addEventListener(
            "click",
            function (event) {

                event.preventDefault();
                event.stopPropagation();


                showStep(4);

            }
        );

    }


    /* =========================================================
       STEP 5 → STEP 6
    ========================================================= */

    const kycStep5ContinueBtn =
        document.getElementById(
            "kycStep5ContinueBtn"
        );


    if (kycStep5ContinueBtn) {

        kycStep5ContinueBtn.addEventListener(
            "click",
            function (event) {

                event.preventDefault();
                event.stopPropagation();


                console.log(
                    "Step 5 Save & Continue clicked"
                );


                showStep(6);

            }
        );

    }


    /* =========================================================
       STEP 6 → STEP 5
    ========================================================= */

    const kycStep6BackBtn =
        document.getElementById(
            "kycStep6BackBtn"
        );


    if (kycStep6BackBtn) {

        kycStep6BackBtn.addEventListener(
            "click",
            function (event) {

                event.preventDefault();
                event.stopPropagation();


                showStep(5);

            }
        );

    }


    /* =========================================================
       PREFERRED CITY
    ========================================================= */

    const preferredCity =
        document.getElementById(
            "preferredCity"
        );


    const selectedAreaBox =
        document.getElementById(
            "selectedAreaBox"
        );


    if (
        preferredCity &&
        selectedAreaBox
    ) {

        preferredCity.addEventListener(
            "change",
            function () {

                const city =
                    this.value;


                if (!city) {
                    return;
                }


                let alreadyAdded = false;


                selectedAreaBox
                    .querySelectorAll(
                        ".kyc-area-tag"
                    )
                    .forEach(function (tag) {

                        const cityName =
                            tag.dataset.city ||
                            tag.textContent
                                .replace("×", "")
                                .trim();


                        if (cityName === city) {

                            alreadyAdded = true;

                        }

                    });


                if (alreadyAdded) {

                    this.value = "";
                    return;

                }


                const tag =
                    document.createElement(
                        "span"
                    );


                tag.className =
                    "kyc-area-tag";


                tag.dataset.city =
                    city;


                tag.innerHTML = `

                    {city}

                    <button
                        type="button"
                        class="kyc-area-remove"
                        data-city="${city}"
                        aria-label="Remove ${city}">

                        ×

                    </button>

                `;


                selectedAreaBox.appendChild(
                    tag
                );


                this.value = "";

            }
        );


        /* -----------------------------------------
           REMOVE PREFERRED CITY
        ----------------------------------------- */

        selectedAreaBox.addEventListener(
            "click",
            function (event) {

                if (
                    event.target.classList.contains(
                        "kyc-area-remove"
                    )
                ) {

                    event.preventDefault();


                    const tag =
                        event.target.closest(
                            ".kyc-area-tag"
                        );


                    if (tag) {

                        tag.remove();

                    }

                }

            }
        );

    }


    /* =========================================================
       SERVICE RADIUS
    ========================================================= */

    const radiusSlider =
        document.getElementById(
            "serviceRadiusSlider"
        );


    const radiusValue =
        document.getElementById(
            "radiusValue"
        );


    if (
        radiusSlider &&
        radiusValue
    ) {

        function updateRadius() {

            radiusValue.textContent =
                radiusSlider.value + " km";

        }


        radiusSlider.addEventListener(
            "input",
            updateRadius
        );


        updateRadius();

    }


    /* =========================================================
       CURRENT LOCATION
    ========================================================= */

    function useCurrentLocation(button) {

        if (!button) {
            return;
        }


        if (!navigator.geolocation) {

            alert(
                "Location is not supported by your browser."
            );

            return;

        }


        button.disabled = true;


        const originalText =
            button.innerHTML;


        button.innerHTML =
            "◎ Detecting current location...";


        navigator.geolocation.getCurrentPosition(

            function (position) {

                console.log(
                    "Current location:",
                    position.coords.latitude,
                    position.coords.longitude
                );


                button.disabled = false;


                button.innerHTML =
                    "✓ Current location detected";


                setTimeout(
                    function () {

                        button.innerHTML =
                            originalText;

                    },
                    2000
                );

            },


            function () {

                button.disabled = false;


                button.innerHTML =
                    originalText;


                alert(
                    "Unable to detect your current location."
                );

            }

        );

    }


    const currentLocationBtn =
        document.getElementById(
            "currentLocationBtn"
        );


    const mapLocationBtn =
        document.getElementById(
            "mapLocationBtn"
        );


    if (currentLocationBtn) {

        currentLocationBtn.addEventListener(
            "click",
            function (event) {

                event.preventDefault();


                useCurrentLocation(
                    currentLocationBtn
                );

            }
        );

    }


    if (mapLocationBtn) {

        mapLocationBtn.addEventListener(
            "click",
            function (event) {

                event.preventDefault();


                useCurrentLocation(
                    mapLocationBtn
                );

            }
        );

    }


    /* =========================================================
       INITIAL STEP
       
       Always start on Step 1.
    ========================================================= */

    showStep(1);

});
/* =====================================================
   STEP 4 → STEP 3
===================================================== */

const kycStep4BackBtn =
    document.getElementById("kycStep4BackBtn");

if (kycStep4BackBtn) {

    kycStep4BackBtn.addEventListener(
        "click",
        function (event) {

            event.preventDefault();

            showStep(3);
        }
    );
}


/* =====================================================
   STEP 4 → STEP 5
===================================================== */

const kycStep4ContinueBtn =
    document.getElementById("kycStep4ContinueBtn");

if (kycStep4ContinueBtn) {

    kycStep4ContinueBtn.addEventListener(
        "click",
        function (event) {

            event.preventDefault();

            showStep(5);
        }
    );
}


/* =====================================================
   STEP 4 PRICE SLIDER
===================================================== */

const minSlider =
    document.getElementById("serviceMinSlider");

const maxSlider =
    document.getElementById("serviceMaxSlider");

const minPrice =
    document.getElementById("serviceMinPrice");

const maxPrice =
    document.getElementById("serviceMaxPrice");

const suggestedRangeText =
    document.getElementById("suggestedRangeText");


function updateServicePriceRange() {

    if (
        !minSlider ||
        !maxSlider ||
        !minPrice ||
        !maxPrice
    ) {
        return;
    }

    let minValue =
        parseInt(minSlider.value);

    let maxValue =
        parseInt(maxSlider.value);


    /* Prevent minimum from going above maximum */

    if (minValue > maxValue) {

        minValue = maxValue;

        minSlider.value = minValue;
    }


    /* Update input boxes */

    minPrice.value = minValue;
    maxPrice.value = maxValue;


    /* Update suggested range */

    if (suggestedRangeText) {

        suggestedRangeText.textContent =
            "₹" +
            minValue +
            "–₹" +
            maxValue +
            "/hr";
    }
}


if (minSlider) {

    minSlider.addEventListener(
        "input",
        updateServicePriceRange
    );
}


if (maxSlider) {

    maxSlider.addEventListener(
        "input",
        updateServicePriceRange
    );
}


if (minPrice) {

    minPrice.addEventListener(
        "input",
        function () {

            let value =
                parseInt(this.value) || 0;

            if (value > parseInt(maxSlider.value)) {

                value =
                    parseInt(maxSlider.value);
            }

            minSlider.value = value;

            updateServicePriceRange();
        }
    );
}


if (maxPrice) {

    maxPrice.addEventListener(
        "input",
        function () {

            let value =
                parseInt(this.value) || 0;

            if (value < parseInt(minSlider.value)) {

                value =
                    parseInt(minSlider.value);
            }

            maxSlider.value = value;

            updateServicePriceRange();
        }
    );
}


updateServicePriceRange();


/* =====================================================
   ADD SERVICE BUTTON
===================================================== */

const addServiceButton =
    document.getElementById("addServiceButton");

if (addServiceButton) {

    addServiceButton.addEventListener(
        "click",
        function () {

            const service =
                document.getElementById(
                    "addServiceType"
                );

            if (!service || !service.value) {

                alert(
                    "Please select a service."
                );

                return;
            }


            alert(
                "Service added successfully."
            );
        }
    );
}
/* ============================================================
   STEP 5 → STEP 6
============================================================ */

document.addEventListener("DOMContentLoaded", function () {

    const step5ContinueBtn =
        document.getElementById("kycStep5ContinueBtn");

    const step5BackBtn =
        document.getElementById("kycStep5BackBtn");

    const step6BackBtn =
        document.getElementById("kycStep6BackBtn");

    const completeBtn =
        document.getElementById("kycCompleteBtn");


    /* ========================================================
       HELPER
    ======================================================== */

    function openKycStep(stepNumber) {

        const sections =
            document.querySelectorAll(".kyc-step-section");

        sections.forEach(function (section) {

            section.style.display = "none";
            section.classList.remove("active-step");

        });


        const target =
            document.getElementById(
                "kycStep" + stepNumber
            );


        if (target) {

            target.style.display = "block";

            target.classList.add("active-step");

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }

    }


    /* ========================================================
       STEP 5 → STEP 6
    ======================================================== */

    if (step5ContinueBtn) {

        step5ContinueBtn.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                /* Save Step 5 data */

                const availabilityData = {

                    monday:
                        document.querySelector(
                            'input[name="monday"]'
                        )?.checked || false,

                    tuesday:
                        document.querySelector(
                            'input[name="tuesday"]'
                        )?.checked || false,

                    wednesday:
                        document.querySelector(
                            'input[name="wednesday"]'
                        )?.checked || false,

                    thursday:
                        document.querySelector(
                            'input[name="thursday"]'
                        )?.checked || false,

                    friday:
                        document.querySelector(
                            'input[name="friday"]'
                        )?.checked || false,

                    saturday:
                        document.querySelector(
                            'input[name="saturday"]'
                        )?.checked || false,

                    sunday:
                        document.querySelector(
                            'input[name="sunday"]'
                        )?.checked || false,

                    savedAt:
                        new Date().toISOString()

                };


                localStorage.setItem(
                    "kycAvailability",
                    JSON.stringify(
                        availabilityData
                    )
                );


                /* OPEN STEP 6 */

                openKycStep(6);

            }
        );

    }


    /* ========================================================
       STEP 5 → STEP 4
    ======================================================== */

    if (step5BackBtn) {

        step5BackBtn.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                openKycStep(4);

            }
        );

    }


    /* ========================================================
       STEP 6 → STEP 5
    ======================================================== */

    if (step6BackBtn) {

        step6BackBtn.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                openKycStep(5);

            }
        );

    }


    /* ========================================================
       COMPLETE PROFILE
    ======================================================== */

    if (completeBtn) {

        completeBtn.addEventListener(
            "click",
            function (event) {

                event.preventDefault();


                const bankData = {

                    accountHolderName:
                        document.getElementById(
                            "accountHolderName"
                        )?.value.trim() || "",

                    accountNumber:
                        document.getElementById(
                            "accountNumber"
                        )?.value.trim() || "",

                    ifscCode:
                        document.getElementById(
                            "ifscCode"
                        )?.value.trim() || "",

                    bankName:
                        document.getElementById(
                            "bankName"
                        )?.value.trim() || "",

                    accountType:
                        document.getElementById(
                            "accountType"
                        )?.value || "",

                    bankBranch:
                        document.getElementById(
                            "bankBranch"
                        )?.value.trim() || ""

                };


                /* BASIC VALIDATION */

                if (!bankData.accountHolderName) {

                    alert(
                        "Please enter account holder name."
                    );

                    return;

                }


                if (!bankData.accountNumber) {

                    alert(
                        "Please enter account number."
                    );

                    return;

                }


                if (!bankData.ifscCode) {

                    alert(
                        "Please enter IFSC code."
                    );

                    return;

                }


                if (!bankData.bankName) {

                    alert(
                        "Please enter bank name."
                    );

                    return;

                }


                if (!bankData.accountType) {

                    alert(
                        "Please select account type."
                    );

                    return;

                }


                if (!bankData.bankBranch) {

                    alert(
                        "Please enter bank branch."
                    );

                    return;

                }


                /* SAVE BANK DATA */

                localStorage.setItem(
                    "kycBankInformation",
                    JSON.stringify(
                        bankData
                    )
                );


                alert(
                    "Profile completed successfully!"
                );


                /*
                 * Later you can replace this
                 * with your Django success URL.
                 */

                console.log(
                    "KYC completed",
                    bankData
                );

            }
        );

    }

});
/* ============================================================
   GLOBAL KYC STEP NAVIGATION
   FIX FOR STEP 1 → 2 → 3 → 4 → 5 → 6
============================================================ */

window.showStep = function (stepNumber) {

    const allSteps =
        document.querySelectorAll(".kyc-step-section");

    /* Hide every KYC step */
    allSteps.forEach(function (step) {

        step.style.display = "none";
        step.classList.remove("active-step");

    });


    /* Open requested step */
    const targetStep =
        document.getElementById("kycStep" + stepNumber);

    if (!targetStep) {
        console.error(
            "KYC Step not found: kycStep" + stepNumber
        );
        return;
    }


    targetStep.style.display = "block";
    targetStep.classList.add("active-step");


    /* Scroll to top */
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
};
/* ============================================================
   FINAL PROFILE VERIFICATION
============================================================ */

document.addEventListener("DOMContentLoaded", function () {

    const completeButton =
        document.getElementById("kycCompleteBtn");

    const step6 =
        document.getElementById("kycStep6");

    const finalPage =
        document.getElementById("kycVerificationComplete");


    if (completeButton && finalPage) {

        completeButton.addEventListener("click", function () {

            /* Hide Step 6 */
            if (step6) {
                step6.style.display = "none";
                step6.classList.remove("active-step");
            }


            /* Hide all KYC steps */
            document
                .querySelectorAll(".kyc-step-section")
                .forEach(function (step) {

                    if (step.id !== "kycVerificationComplete") {
                        step.style.display = "none";
                        step.classList.remove("active-step");
                    }

                });


            /* Show final verification page */
            finalPage.style.display = "block";
            finalPage.classList.add("active-step");


            /* Scroll to top */
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        });

    }

});
/* ============================================================
   KYC STEP 4 → STEP 5
============================================================ */

document.addEventListener("DOMContentLoaded", function () {

    const step4ContinueBtn =
        document.getElementById("kycStep4ContinueBtn");

    const step4BackBtn =
        document.getElementById("kycStep4BackBtn");

    if (step4ContinueBtn) {

        step4ContinueBtn.addEventListener("click", function (event) {

            event.preventDefault();

            showKycStep(5);

        });

    }


    if (step4BackBtn) {

        step4BackBtn.addEventListener("click", function (event) {

            event.preventDefault();

            showKycStep(3);

        });

    }

});


/* ============================================================
   KYC STEP 5 → STEP 6
============================================================ */

document.addEventListener("DOMContentLoaded", function () {

    const step5ContinueBtn =
        document.getElementById("kycStep5ContinueBtn");

    const step5BackBtn =
        document.getElementById("kycStep5BackBtn");


    if (step5ContinueBtn) {

        step5ContinueBtn.addEventListener("click", function (event) {

            event.preventDefault();

            showKycStep(6);

        });

    }


    if (step5BackBtn) {

        step5BackBtn.addEventListener("click", function (event) {

            event.preventDefault();

            showKycStep(4);

        });

    }

});


/* ============================================================
   KYC STEP 6 → STEP 7
============================================================ */

document.addEventListener("DOMContentLoaded", function () {

    const step6CompleteBtn =
        document.getElementById("kycCompleteBtn");

    const step6BackBtn =
        document.getElementById("kycStep6BackBtn");


    if (step6CompleteBtn) {

        step6CompleteBtn.addEventListener("click", function (event) {

            event.preventDefault();

            console.log("Step 6 completed");

            showKycStep(7);

        });

    }


    if (step6BackBtn) {

        step6BackBtn.addEventListener("click", function (event) {

            event.preventDefault();

            showKycStep(5);

        });

    }

});


/* ============================================================
   GLOBAL KYC STEP FUNCTION
   IMPORTANT:
   This function is OUTSIDE DOMContentLoaded
   so every step can use it.
============================================================ */

function showKycStep(stepNumber) {

    const sections =
        document.querySelectorAll(".kyc-step-section");


    sections.forEach(function (section) {

        section.classList.remove("active-step");

        section.classList.add("is-hidden");

        section.style.display = "none";

    });


    const target =
        document.getElementById("kycStep" + stepNumber);


    if (!target) {

        console.error(
            "KYC Step " + stepNumber + " was not found."
        );

        return;

    }


    target.classList.remove("is-hidden");

    target.classList.add("active-step");

    target.style.display = "block";


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });


    console.log(
        "Opened KYC Step " + stepNumber
    );

}
function showStep(stepNumber) {

    document.querySelectorAll('.kyc-step-section').forEach(function(section) {
        section.classList.add('is-hidden');
    });

    const nextStep = document.getElementById('kycStep' + stepNumber);

    if (nextStep) {
        nextStep.classList.remove('is-hidden');
    }
}
