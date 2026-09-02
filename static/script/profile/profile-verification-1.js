document.addEventListener("DOMContentLoaded", function () {

    const saveButton = document.getElementById("profileSaveBtn");

    if (!saveButton) {
        return;
    }


    saveButton.addEventListener("click", function () {

        const vendor = document.getElementById("vendor").value;
        const experience = document.getElementById("experience").value;
        const specialization = document.getElementById("specialization").value;
        const skill = document.getElementById("skill").value;


        /*
         * Basic validation
         */

        if (!vendor) {
            alert("Please select a vendor.");
            return;
        }

        if (!experience) {
            alert("Please select your years of experience.");
            return;
        }

        if (!specialization) {
            alert("Please select your primary specialization.");
            return;
        }

        if (!skill) {
            alert("Please select a skill.");
            return;
        }


        /*
         * Save data locally for now.
         * Later this can be connected to Django.
         */

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


        /*
         * Go to next step
         *
         * Change this URL to your actual
         * next-step Django URL.
         */

        window.location.href = "/fe-dashboard/kyc-home/";

    });

});
/* =========================================================
   KYC STEP 2 - DOCUMENT UPLOAD
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const MAX_FILE_SIZE = 15 * 1024 * 1024;

    const requiredInputs = document.querySelectorAll(
        ".kyc-file-input"
    );

    const counter = document.getElementById(
        "kycUploadCounter"
    );

    const continueBtn = document.getElementById(
        "kycContinueBtn"
    );

    const backBtn = document.getElementById(
        "kycBackBtn"
    );


    /* =====================================================
       UPLOAD COUNTER
    ====================================================== */

    function updateCounter() {

        let count = 0;

        document.querySelectorAll(
            ".kyc-document-upload.uploaded"
        ).forEach(function () {

            count++;

        });

        /*
         * GST is already uploaded in your screenshot.
         * Count it manually.
         */

        const gstUploaded =
            document.getElementById("gstUploadedBox");

        if (
            gstUploaded &&
            !gstUploaded.classList.contains("removed")
        ) {
            count++;
        }

        if (count > 5) {
            count = 5;
        }

        counter.textContent =
            count + " of 5 uploaded";
    }


    /* =====================================================
       FILE VALIDATION
    ====================================================== */

    function validateFile(file) {

        if (!file) {
            return false;
        }

        if (file.size > MAX_FILE_SIZE) {

            alert(
                "File size must be less than 15MB."
            );

            return false;
        }

        const allowedExtensions = [
            ".pdf",
            ".jpg",
            ".jpeg",
            ".png"
        ];

        const fileName =
            file.name.toLowerCase();

        const validExtension =
            allowedExtensions.some(function (extension) {

                return fileName.endsWith(extension);

            });

        if (!validExtension) {

            alert(
                "Please upload PDF, JPG or PNG files only."
            );

            return false;
        }

        return true;
    }


    /* =====================================================
       REQUIRED DOCUMENT UPLOAD
    ====================================================== */

    requiredInputs.forEach(function (input) {

        input.addEventListener(
            "change",
            function () {

                const file = this.files[0];

                if (!validateFile(file)) {

                    this.value = "";
                    return;

                }

                const uploadBox =
                    this.closest(
                        ".kyc-document-upload"
                    );

                uploadBox.classList.add(
                    "uploaded"
                );

                uploadBox.innerHTML = `

                    <div class="kyc-upload-check">
                        ✓
                    </div>

                    <div class="kyc-uploaded-text">

                        <strong>
                            ${file.name}
                        </strong>

                        <span>
                            Ready for verification
                        </span>

                    </div>

                    <button
                        type="button"
                        class="kyc-remove-btn">

                        ×

                    </button>
                `;

                updateCounter();


                /* REMOVE */

                const removeButton =
                    uploadBox.querySelector(
                        ".kyc-remove-btn"
                    );

                removeButton.addEventListener(
                    "click",
                    function (event) {

                        event.preventDefault();

                        uploadBox.classList.remove(
                            "uploaded"
                        );

                        uploadBox.innerHTML = `

                            <input
                                type="file"
                                class="kyc-file-input"
                                accept=".pdf,.jpg,.jpeg,.png">

                            <span class="kyc-upload-symbol">
                                ⇧
                            </span>

                            <div>

                                <strong>
                                    Drop file here or Browse
                                </strong>

                                <small>
                                    PDF, JPG, PNG - Max 15MB
                                </small>

                            </div>
                        `;

                        const newInput =
                            uploadBox.querySelector(
                                ".kyc-file-input"
                            );

                        newInput.addEventListener(
                            "change",
                            function () {

                                const newFile =
                                    this.files[0];

                                if (
                                    !validateFile(
                                        newFile
                                    )
                                ) {
                                    this.value = "";
                                    return;
                                }

                                uploadBox.classList.add(
                                    "uploaded"
                                );

                                uploadBox.innerHTML = `

                                    <div class="kyc-upload-check">
                                        ✓
                                    </div>

                                    <div class="kyc-uploaded-text">

                                        <strong>
                                            ${newFile.name}
                                        </strong>

                                        <span>
                                            Ready for verification
                                        </span>

                                    </div>

                                    <button
                                        type="button"
                                        class="kyc-remove-btn">

                                        ×

                                    </button>
                                `;

                                updateCounter();

                            }
                        );

                        updateCounter();

                    }
                );

            }
        );

    });


    /* =====================================================
       GST REMOVE
    ====================================================== */

    const gstBox =
        document.getElementById(
            "gstUploadedBox"
        );

    if (gstBox) {

        const gstRemove =
            gstBox.querySelector(
                ".kyc-remove-btn"
            );

        gstRemove.addEventListener(
            "click",
            function () {

                gstBox.classList.add(
                    "removed"
                );

                gstBox.style.display =
                    "none";

                updateCounter();

            }
        );

    }


    /* =====================================================
       OPTIONAL DOCUMENTS
    ====================================================== */

    const optionalInputs =
        document.querySelectorAll(
            ".kyc-optional-input"
        );

    optionalInputs.forEach(function (input) {

        input.addEventListener(
            "change",
            function () {

                const file = this.files[0];

                if (!validateFile(file)) {

                    this.value = "";
                    return;

                }

                const card =
                    this.closest(
                        ".kyc-optional-card"
                    );

                const uploadText =
                    card.querySelector(
                        ".kyc-optional-upload"
                    );

                uploadText.textContent =
                    "✓ Uploaded";

                uploadText.style.color =
                    "#45b968";

                uploadText.style.borderColor =
                    "#a9dfb7";

                uploadText.style.background =
                    "#effaf2";

            }
        );

    });


    /* =====================================================
       BACK BUTTON
    ====================================================== */

    if (backBtn) {

        backBtn.addEventListener(
            "click",
            function () {

                /*
                 * If Section 1 is displayed/hidden using JS,
                 * call your previous-section function here.
                 */

                console.log(
                    "Back to Step 1"
                );

            }
        );

    }


    /* =====================================================
       SAVE & CONTINUE
    ====================================================== */

    if (continueBtn) {

        continueBtn.addEventListener(
            "click",
            function () {

                console.log(
                    "KYC Step 2 completed"
                );

                /*
                 * When Step 3 is ready, put your
                 * Step 3 section/show logic here.
                 */

            }
        );

    }


    /* =====================================================
       INITIAL COUNTER
    ====================================================== */

    updateCounter();

});
document.addEventListener("DOMContentLoaded", function () {

    /* =========================================================
       KYC SECTIONS
    ========================================================= */

    const step1 =
        document.getElementById("kycStep1");

    const step2 =
        document.getElementById("kycStep2");


    /* =========================================================
       BUTTONS
    ========================================================= */

    const saveProfileButton =
        document.getElementById("saveProfileButton");

    const backButton =
        document.getElementById("kycBackBtn");

    const continueButton =
        document.getElementById("kycContinueBtn");


    /* =========================================================
       FUNCTION
       SHOW STEP
    ========================================================= */

    function showStep(stepToShow) {

        const allSteps =
            document.querySelectorAll(".kyc-step-section");


        allSteps.forEach(function (step) {

            step.classList.remove("active-step");

        });


        stepToShow.classList.add("active-step");


        /* Scroll page to top */

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }


    /* =========================================================
       STEP 1 → STEP 2
    ========================================================= */

    if (saveProfileButton) {

        saveProfileButton.addEventListener(
            "click",
            function () {

                console.log(
                    "Step 1 Save & Continue clicked"
                );


                showStep(step2);

            }
        );

    }


    /* =========================================================
       STEP 2 → STEP 1
       BACK BUTTON
    ========================================================= */

    if (backButton) {

        backButton.addEventListener(
            "click",
            function () {

                console.log(
                    "Going back to Step 1"
                );


                showStep(step1);

            }
        );

    }


    /* =========================================================
       STEP 2 → STEP 3
       CURRENTLY PLACEHOLDER
    ========================================================= */

    if (continueButton) {

        continueButton.addEventListener(
            "click",
            function () {

                console.log(
                    "Step 2 Save & Continue clicked"
                );

                /*
                 * Step 3 will be connected here later.
                 *
                 * Example:
                 *
                 * showStep(
                 *     document.getElementById("kycStep3")
                 * );
                 */

                alert(
                    "Step 2 completed. Step 3 will be added next."
                );

            }
        );

    }

});
document.addEventListener("DOMContentLoaded", function () {

    /* =========================================================
       STEP 3 ELEMENTS
    ========================================================= */

    const step3 = document.getElementById("kycStep3");

    if (!step3) {
        return;
    }

    const preferredCity =
        document.getElementById("preferredCity");

    const selectedAreaBox =
        document.getElementById("selectedAreaBox");

    const currentLocationBtn =
        document.getElementById("currentLocationBtn");

    const mapLocationBtn =
        document.getElementById("mapLocationBtn");

    const radiusSlider =
        document.getElementById("serviceRadiusSlider");

    const radiusValue =
        document.getElementById("radiusValue");

    const backButton =
        document.getElementById("kycServiceBackBtn");

    const continueButton =
        document.getElementById("kycServiceContinueBtn");


    /* =========================================================
       SHOW ONLY CURRENT KYC STEP
    ========================================================= */

    function showStep(stepId) {

        const sections =
            document.querySelectorAll(".kyc-step-section");

        sections.forEach(function (section) {

            section.style.display = "none";

        });

        const target =
            document.getElementById(stepId);

        if (target) {

            target.style.display = "block";

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }
    }


    /* =========================================================
       PREFERRED CITY
    ========================================================= */

    if (preferredCity && selectedAreaBox) {

        preferredCity.addEventListener("change", function () {

            const city = this.value;

            if (!city) {
                return;
            }

            const existingTags =
                selectedAreaBox.querySelectorAll(".kyc-area-tag");

            let alreadyAdded = false;

            existingTags.forEach(function (tag) {

                const text =
                    tag.textContent
                        .replace("×", "")
                        .trim();

                if (text === city) {
                    alreadyAdded = true;
                }

            });

            if (alreadyAdded) {

                this.value = "";

                return;
            }


            const tag =
                document.createElement("span");

            tag.className = "kyc-area-tag";

            tag.innerHTML = `
                ${city}
                <button
                    type="button"
                    class="kyc-area-remove"
                >
                    ×
                </button>
            `;

            selectedAreaBox.appendChild(tag);

            this.value = "";

        });


        /* REMOVE CITY */

        selectedAreaBox.addEventListener(
            "click",
            function (event) {

                if (
                    event.target.classList.contains(
                        "kyc-area-remove"
                    )
                ) {

                    event.target
                        .closest(".kyc-area-tag")
                        .remove();

                }

            }
        );

    }


    /* =========================================================
       CURRENT LOCATION
    ========================================================= */

    function useCurrentLocation(button) {

        if (!button) {
            return;
        }

        button.disabled = true;

        const originalText =
            button.innerHTML;

        button.innerHTML =
            "◎ Detecting current location...";


        if (!navigator.geolocation) {

            button.disabled = false;

            button.innerHTML =
                originalText;

            alert(
                "Location is not supported by your browser."
            );

            return;
        }


        navigator.geolocation.getCurrentPosition(

            function () {

                button.disabled = false;

                button.innerHTML =
                    "✓ Current location detected";

                setTimeout(function () {

                    button.innerHTML =
                        originalText;

                }, 2000);

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


    if (currentLocationBtn) {

        currentLocationBtn.addEventListener(
            "click",
            function () {

                useCurrentLocation(
                    currentLocationBtn
                );

            }
        );

    }


    if (mapLocationBtn) {

        mapLocationBtn.addEventListener(
            "click",
            function () {

                useCurrentLocation(
                    mapLocationBtn
                );

            }
        );

    }


    /* =========================================================
       SERVICE RADIUS
    ========================================================= */

    if (radiusSlider && radiusValue) {

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
       STEP 3 → STEP 4
    ========================================================= */

    if (continueButton) {

        continueButton.addEventListener(
            "click",
            function () {

                /*
                 * Save Step 3 data.
                 */

                const serviceAreaData = {

                    primaryCity:
                        document.getElementById(
                            "primaryCity"
                        )?.value || "",

                    radius:
                        radiusSlider
                            ? radiusSlider.value
                            : "250",

                    savedAt:
                        new Date().toISOString()

                };


                localStorage.setItem(
                    "kycServiceArea",
                    JSON.stringify(
                        serviceAreaData
                    )
                );


                /*
                 * STEP 4
                 *
                 * If you create Step 4 with id="kycStep4",
                 * this will automatically open it.
                 */

                const step4 =
                    document.getElementById("kycStep4");

                if (step4) {

                    showStep("kycStep4");

                } else {

                    alert(
                        "Step 3 saved successfully."
                    );

                }

            }
        );

    }


    /* =========================================================
       STEP 3 → STEP 2
    ========================================================= */

    if (backButton) {

        backButton.addEventListener(
            "click",
            function () {

                const step2 =
                    document.getElementById("kycStep2");

                if (step2) {

                    showStep("kycStep2");

                }

            }
        );

    }

});
document.addEventListener("DOMContentLoaded", function () {

    const continueBtn = document.getElementById("kycContinueBtn");
    const backBtn = document.getElementById("kycBackBtn");

    /*
    ============================================================
    STEP 2 → STEP 3
    ============================================================
    */

    if (continueBtn) {

        continueBtn.addEventListener("click", function () {

            // Open Step 3 page
            window.location.href = "/kyc/service-area/";

        });

    }


    /*
    ============================================================
    STEP 2 → STEP 1
    ============================================================
    */

    if (backBtn) {

        backBtn.addEventListener("click", function () {

            window.location.href = "/kyc/profile/";

        });

    }

});