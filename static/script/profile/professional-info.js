document.addEventListener("DOMContentLoaded", function () {

    /* =========================================================
       DATA
    ========================================================= */

    const STORAGE_KEY = "fieldEngineerProfessionalInfo";

    const defaultData = {
        availability: true,

        summary:
            "Results-driven Network Engineer with 8+ years of experience in designing, implementing and maintaining enterprise networks. Proven track record in optimizing network performance, managing vendor operations, and ensuring critical infrastructure uptime. Skilled in network troubleshooting, configuration, monitoring, and implementing secure network solutions.",

        skills: [
            "Network Engineering",
            "Server Installation",
            "Network Security",
            "Data Center",
            "Network Configuration",
            "Routing & Switching",
            "Network Monitoring",
            "Troubleshooting"
        ],

        tools: [
            "Cisco Routers",
            "Cisco Switches",
            "Juniper",
            "Fortinet Firewall",
            "Mikrotik",
            "Ubiquiti",
            "NMS",
            "Network Monitoring",
            "SolarWinds",
            "Putty",
            "Fiber Testing",
            "Fluke Tester"
        ],

        experiences: [
            {
                title: "Senior Network Engineer",
                company: "TechSolutions Pvt. Ltd.",
                description:
                    "Leading network infrastructure projects, handling enterprise clients and managing a team of 4 engineers.",
                duration: "Jan 2022 - Present"
            },
            {
                title: "Network Engineer",
                company: "NetConnect Systems",
                description:
                    "Managed network installations, configurations and maintenance for enterprise clients.",
                duration: "Jan 2019 - Dec 2021"
            },
            {
                title: "Junior Network Engineer",
                company: "Infotech Services",
                description:
                    "Assisted network setup, troubleshooting and documentation for various projects.",
                duration: "Jan 2017 - Dec 2018"
            }
        ],

        education: [
            {
                degree:
                    "Bachelor of Engineering (B.E.) in Electronics & Communication",
                institute: "Mumbai University",
                year: "2017"
            },
            {
                degree:
                    "Diploma in Electronics & Telecommunication",
                institute: "Maharashtra State Board",
                year: "2014"
            }
        ],

        licenses: [
            {
                name: "Electrical Contractor License",
                details: "Maharashtra • License No. 123456",
                validity: "Valid till May 2028"
            },
            {
                name: "Network Engineer License",
                details: "Cisco • License No. NE-2024-001",
                validity: "Valid till Dec 2027"
            }
        ],

        certifications: [
            {
                name: "Cisco Certified Network Associate",
                issuer: "Cisco Certified • 2023"
            },
            {
                name: "Cisco Certified Network Professional",
                issuer: "Cisco Certified • 2024"
            },
            {
                name: "Fiber Optic Technician",
                issuer: "FOA • 2022"
            },
            {
                name: "CCTV Installation Technician",
                issuer: "Hikvision • 2021"
            }
        ],

        documents: [
            {
                name: "Resume.pdf",
                size: "1.2 MB"
            },
            {
                name: "Experience_Letter.pdf",
                size: "850 KB"
            },
            {
                name: "Recommendation.pdf",
                size: "620 KB"
            }
        ]
    };
    /* =========================================================
   TOP SKILLS
========================================================= */

function renderSkills() {

    const skillsContainer = document.querySelector(".skills-container");

    if (!skillsContainer) return;

    const skills = defaultData.skills || [];

    // Show first 6 skills
    const visibleSkills = skills.slice(0, 6);

    // Remaining skills
    const hiddenSkills = skills.slice(6);

    // Clear existing skills
    skillsContainer.innerHTML = "";

    // Add visible skills
    visibleSkills.forEach(function (skill) {

        const skillTag = document.createElement("span");

        skillTag.className = "skill-tag";
        skillTag.textContent = skill;

        skillsContainer.appendChild(skillTag);

    });

    // Add hidden skills
    hiddenSkills.forEach(function (skill) {

        const skillTag = document.createElement("span");

        skillTag.className = "skill-tag hidden-skill";
        skillTag.textContent = skill;

        skillsContainer.appendChild(skillTag);

    });

    // Add +X more button only if there are hidden skills
    if (hiddenSkills.length > 0) {

        const moreButton = document.createElement("button");

        moreButton.type = "button";
        moreButton.id = "skillsMoreBtn";
        moreButton.className = "skill-tag skill-tag-more";
        moreButton.textContent = `+${hiddenSkills.length} more`;

        skillsContainer.appendChild(moreButton);

        moreButton.addEventListener("click", function () {

            const hiddenElements =
                skillsContainer.querySelectorAll(".hidden-skill");

            const isExpanded =
                moreButton.dataset.expanded === "true";

            hiddenElements.forEach(function (skill) {

                skill.classList.toggle(
                    "show-skill",
                    !isExpanded
                );

            });

            if (!isExpanded) {

                moreButton.textContent = "Show Less";
                moreButton.dataset.expanded = "true";

            } else {

                moreButton.textContent =
                    `+${hiddenSkills.length} more`;

                moreButton.dataset.expanded = "false";
            }

        });
    }
}


    /* =========================================================
       LOAD / SAVE DATA
    ========================================================= */

    function loadData() {

        const saved =
            localStorage.getItem(STORAGE_KEY);

        if (saved) {

            try {

                const parsed =
                    JSON.parse(saved);

                /*
                 * Merge saved data with default data.
                 * This prevents missing properties when
                 * the structure changes.
                 */

                return {
                    ...defaultData,
                    ...parsed,

                    skills:
                        Array.isArray(parsed.skills)
                            ? parsed.skills
                            : [...defaultData.skills],

                    tools:
                        Array.isArray(parsed.tools)
                            ? parsed.tools
                            : [...defaultData.tools],

                    experiences:
                        Array.isArray(parsed.experiences)
                            ? parsed.experiences
                            : [...defaultData.experiences],

                    education:
                        Array.isArray(parsed.education)
                            ? parsed.education
                            : [...defaultData.education],

                    licenses:
                        Array.isArray(parsed.licenses)
                            ? parsed.licenses
                            : [...defaultData.licenses],

                    certifications:
                        Array.isArray(parsed.certifications)
                            ? parsed.certifications
                            : [...defaultData.certifications],

                    documents:
                        Array.isArray(parsed.documents)
                            ? parsed.documents
                            : [...defaultData.documents]
                };

            } catch (error) {

                console.error(
                    "Unable to load saved professional information:",
                    error
                );

            }

        }

        return JSON.parse(
            JSON.stringify(defaultData)
        );
    }


    let data = loadData();


    function saveData() {

        try {

            localStorage.setItem(
                STORAGE_KEY,
                JSON.stringify(data)
            );

        } catch (error) {

            console.error(
                "Unable to save professional information:",
                error
            );

        }

    }


    /* =========================================================
       MODAL
    ========================================================= */

    function createModal(
        title,
        content,
        buttons = []
    ) {

        closeModal();

        const overlay =
            document.createElement("div");

        overlay.className =
            "professional-modal-overlay";

        overlay.id =
            "professionalModal";


        const modal =
            document.createElement("div");

        modal.className =
            "professional-modal";


        let footer = "";


        if (buttons.length) {

            footer = `
                <div class="professional-modal-footer">

                    ${buttons.map(button => `

                        <button
                            type="button"
                            class="${button.class || ""}"
                            data-modal-action="${button.action}">

                            ${escapeHtml(button.text)}

                        </button>

                    `).join("")}

                </div>
            `;

        }


        modal.innerHTML = `

            <div class="professional-modal-header">

                <h2>
                    ${escapeHtml(title)}
                </h2>

                <button
                    type="button"
                    class="professional-modal-close"
                    data-close-modal>

                    ×

                </button>

            </div>

            <div class="professional-modal-body">

                ${content}

            </div>

            ${footer}

        `;


        overlay.appendChild(modal);

        document.body.appendChild(overlay);


        overlay.addEventListener(
            "click",
            function (event) {

                if (event.target === overlay) {

                    closeModal();

                }

            }
        );


        return overlay;
    }


    function closeModal() {

        const modal =
            document.getElementById(
                "professionalModal"
            );

        if (modal) {

            modal.remove();

        }

    }


    document.addEventListener(
        "click",
        function (event) {

            if (
                event.target.matches(
                    "[data-close-modal]"
                ) ||
                event.target.closest(
                    "[data-close-modal]"
                )
            ) {

                closeModal();

            }

        }
    );


    /* =========================================================
       AVAILABILITY TOGGLE
    ========================================================= */

    const availabilityToggle =
        document.getElementById(
            "availabilityToggle"
        );

    const availabilityMessage =
        document.getElementById(
            "availabilityMessage"
        );


    if (availabilityToggle) {

        /*
         * Make sure availability is always a boolean.
         */

        if (
            typeof data.availability !==
            "boolean"
        ) {

            data.availability = true;

        }


        /* =====================================================
           UPDATE AVAILABILITY UI
        ===================================================== */

        function updateAvailabilityUI() {

            if (data.availability) {

                /*
                 * =========================
                 * AVAILABLE / ON
                 * =========================
                 */

                availabilityToggle.classList.add(
                    "active"
                );

                availabilityToggle.setAttribute(
                    "aria-pressed",
                    "true"
                );

                availabilityToggle.setAttribute(
                    "aria-label",
                    "Turn availability off"
                );


                if (availabilityMessage) {

                    availabilityMessage.textContent =
                        "You are available for new projects and opportunities.";

                }

            } else {

                /*
                 * =========================
                 * UNAVAILABLE / OFF
                 * =========================
                 */

                availabilityToggle.classList.remove(
                    "active"
                );

                availabilityToggle.setAttribute(
                    "aria-pressed",
                    "false"
                );

                availabilityToggle.setAttribute(
                    "aria-label",
                    "Turn availability on"
                );


                if (availabilityMessage) {

                    availabilityMessage.textContent =
                        "You are currently unavailable for new projects and opportunities.";

                }

            }

        }


        /* =====================================================
           CLICK
        ===================================================== */

        availabilityToggle.addEventListener(
            "click",
            function (event) {

                event.preventDefault();


                /*
                 * ON → OFF
                 * OFF → ON
                 */

                data.availability =
                    !data.availability;


                /*
                 * Save using the same
                 * Professional Information storage.
                 */

                saveData();


                /*
                 * Update screen.
                 */

                updateAvailabilityUI();


                console.log(
                    "Availability:",
                    data.availability
                        ? "ON"
                        : "OFF"
                );

            }
        );


        /*
         * Initial state.
         */

        updateAvailabilityUI();

    }

    /* =========================================================
   EDIT PROFESSIONAL SUMMARY
========================================================= */

const editSummaryButton =
    document.getElementById(
        "editSummaryButton"
    );


if (editSummaryButton) {

    editSummaryButton.addEventListener(
        "click",
        function () {

            createModal(

                "Edit Professional Summary",

                `
                <div class="summary-edit-wrapper">

                    <label
                        for="summaryInput"
                        class="modal-label">

                        Professional Summary

                    </label>

                    <textarea
                        id="summaryInput"
                        class="modal-textarea summary-edit-textarea"
                        rows="8"
                        placeholder="Enter your professional summary">${escapeHtml(data.summary)}</textarea>

                    <p class="summary-character-count">
                        Update your professional experience,
                        skills and expertise.
                    </p>

                </div>
                `,

                [

                    {
                        text: "Cancel",
                        action: "close",
                        class: "modal-cancel-btn"
                    },

                    {
                        text: "Save Summary",
                        action: "save-summary",
                        class: "modal-save-btn"
                    }

                ]

            );

        }
    );

}


    /* =========================================================
   MANAGE SKILLS
========================================================= */

const manageSkillsButton =
    findButtonByText(
        "Manage Skills"
    );


if (manageSkillsButton) {

    manageSkillsButton.addEventListener(
        "click",
        function () {

            showSkillsModal();

        }
    );

}


/* =========================================================
   SHOW MANAGE SKILLS MODAL
========================================================= */

function showSkillsModal() {

    const skillsHTML =
        data.skills
            .map(
                (skill, index) => `

                    <div class="modal-list-item">

                        <span>
                            ${escapeHtml(skill)}
                        </span>

                        <button
                            type="button"
                            class="modal-remove-item"
                            data-remove-skill="${index}">

                            ×

                        </button>

                    </div>

                `
            )
            .join("");


    createModal(

        "Manage Skills",

        `

        <div class="modal-list">

            ${
                skillsHTML ||
                `

                <p class="empty-modal-text">
                    No skills added yet.
                </p>

                `
            }

        </div>


        <div class="modal-add-row">

            <input
                type="text"
                id="newSkillInput"
                class="modal-input"
                placeholder="Enter new skill"
                autocomplete="off"
            >


            <button
                type="button"
                id="addSkillButton"
                class="modal-small-add">

                Add

            </button>

        </div>

        `

    );


    /* =====================================================
       ADD NEW SKILL
    ===================================================== */

    document
        .getElementById(
            "addSkillButton"
        )
        ?.addEventListener(
            "click",
            function () {

                const input =
                    document.getElementById(
                        "newSkillInput"
                    );


                if (!input) {
                    return;
                }


                const skill =
                    input.value.trim();


                if (!skill) {

                    alert(
                        "Please enter a skill."
                    );

                    input.focus();

                    return;

                }


                /* -----------------------------------------
                   Prevent duplicate skills
                ----------------------------------------- */

                const alreadyExists =
                    data.skills.some(
                        existingSkill =>
                            existingSkill.toLowerCase() ===
                            skill.toLowerCase()
                    );


                if (alreadyExists) {

                    alert(
                        "This skill already exists."
                    );

                    input.focus();

                    return;

                }


                /* -----------------------------------------
                   Add skill
                ----------------------------------------- */

                data.skills.push(
                    skill
                );


                /* Save */
                saveData();


                /* Update Top Skills card */
                renderSkills();


                /* Refresh modal */
                showSkillsModal();

            }
        );


    /* =====================================================
       REMOVE SKILL
    ===================================================== */

    document
        .querySelectorAll(
            "[data-remove-skill]"
        )
        .forEach(
            button => {

                button.addEventListener(
                    "click",
                    function () {

                        const index =
                            Number(
                                this.dataset
                                    .removeSkill
                            );


                        if (
                            Number.isNaN(index)
                        ) {
                            return;
                        }


                        /* Remove skill */
                        data.skills.splice(
                            index,
                            1
                        );


                        /* Save */
                        saveData();


                        /* Update Top Skills card */
                        renderSkills();


                        /* Refresh modal */
                        showSkillsModal();

                    }
                );

            }
        );

}


/* =========================================================
   RENDER TOP SKILLS
========================================================= */

function renderSkills() {

    const container =
        document.querySelector(
            ".skills-container"
        );


    if (!container) {
        return;
    }


    /* =====================================================
       CLEAR OLD CONTENT
    ===================================================== */

    container.innerHTML = "";


    /* =====================================================
       RENDER ALL SKILLS
    ===================================================== */

    data.skills.forEach(
        function (skill) {

            const skillTag =
                document.createElement(
                    "span"
                );


            skillTag.className =
                "skill-tag";


            skillTag.innerHTML = `

                <span class="skill-dot">
                    •
                </span>

                ${escapeHtml(skill)}

            `;


            container.appendChild(
                skillTag
            );

        }
    );


    /* =====================================================
       ADD SKILL BUTTON
    ===================================================== */

    const addSkillButton =
        document.createElement(
            "button"
        );


    addSkillButton.type =
        "button";


    addSkillButton.id =
        "addSkillBtn";


    addSkillButton.className =
        "add-skill-btn";


    addSkillButton.innerHTML = `

        <span class="add-skill-icon">
            +
        </span>

        Add Skill

    `;


    container.appendChild(
        addSkillButton
    );


    /* =====================================================
       ADD SKILL BUTTON → MANAGE SKILLS MODAL
    ===================================================== */

    addSkillButton.addEventListener(
        "click",
        function () {

            showSkillsModal();

        }
    );

}


    /* =========================================================
       ADD LICENSE
    ========================================================= */

    const addLicenseButton =
        findButtonByText(
            "Add License"
        );


    if (addLicenseButton) {

        addLicenseButton.addEventListener(
            "click",
            function () {

                createModal(

                    "Add License",

                    `

                    <div class="modal-form-grid">

                        <div>

                            <label class="modal-label">
                                License Name
                            </label>

                            <input
                                id="licenseName"
                                class="modal-input"
                                placeholder="e.g. Electrical Contractor License">

                        </div>


                        <div>

                            <label class="modal-label">
                                Details
                            </label>

                            <input
                                id="licenseDetails"
                                class="modal-input"
                                placeholder="Company / License number">

                        </div>


                        <div>

                            <label class="modal-label">
                                Validity
                            </label>

                            <input
                                id="licenseValidity"
                                class="modal-input"
                                placeholder="e.g. Valid till May 2028">

                        </div>

                    </div>

                    `,

                    [

                        {
                            text: "Cancel",
                            action: "close",
                            class: "modal-cancel-btn"
                        },

                        {
                            text: "Add License",
                            action: "add-license",
                            class: "modal-save-btn"
                        }

                    ]

                );

            }
        );

    }


    /* =========================================================
       ADD EXPERIENCE
    ========================================================= */

    const addExperienceButton =
        findButtonByText(
            "Add Experience"
        );


    if (addExperienceButton) {

        addExperienceButton.addEventListener(
            "click",
            function () {

                createModal(

                    "Add Work Experience",

                    `

                    <div class="modal-form-grid">

                        <div>

                            <label class="modal-label">
                                Job Title
                            </label>

                            <input
                                id="experienceTitle"
                                class="modal-input"
                                placeholder="e.g. Senior Network Engineer">

                        </div>


                        <div>

                            <label class="modal-label">
                                Company
                            </label>

                            <input
                                id="experienceCompany"
                                class="modal-input"
                                placeholder="Company name">

                        </div>


                        <div>

                            <label class="modal-label">
                                Duration
                            </label>

                            <input
                                id="experienceDuration"
                                class="modal-input"
                                placeholder="e.g. Jan 2024 - Present">

                        </div>


                        <div>

                            <label class="modal-label">
                                Description
                            </label>

                            <textarea
                                id="experienceDescription"
                                class="modal-textarea"
                                rows="4"
                                placeholder="Describe your responsibilities"></textarea>

                        </div>

                    </div>

                    `,

                    [

                        {
                            text: "Cancel",
                            action: "close",
                            class: "modal-cancel-btn"
                        },

                        {
                            text: "Add Experience",
                            action: "add-experience",
                            class: "modal-save-btn"
                        }

                    ]

                );

            }
        );

    }


    /* =========================================================
   VIEW ALL EXPERIENCES
========================================================= */

const viewExperienceButton =
    findButtonByText("View All Experiences");

if (viewExperienceButton) {

    let showingAllExperiences = false;

    function updateExperienceVisibility() {

        const items =
            document.querySelectorAll(".experience-item");

        items.forEach((item, index) => {

            if (index < 2) {

                // First 2 are always visible
                item.style.display = "";

            } else {

                // Remaining items depend on Show More
                item.style.display =
                    showingAllExperiences
                        ? ""
                        : "none";
            }

        });


        /*
         * Change button text
         */

        viewExperienceButton.textContent =
            showingAllExperiences
                ? "Show Less ↑"
                : "View All Experiences →";

    }


    viewExperienceButton.addEventListener(
        "click",
        function (event) {

            event.preventDefault();

            showingAllExperiences =
                !showingAllExperiences;

            updateExperienceVisibility();

        }
    );


    /*
     * Set initial state
     */

    updateExperienceVisibility();

}


    /* =================================================
   ADD EDUCATION
================================================= */

if (
    action ===
    "add-education"
) {

    const degree =
        getInputValue(
            "educationDegree"
        );


    const institute =
        getInputValue(
            "educationInstitute"
        );


    const year =
        getInputValue(
            "educationYear"
        );


    /* ---------------------------------------------
       VALIDATION
    --------------------------------------------- */

    if (!degree) {

        alert(
            "Please enter degree or course."
        );

        return;

    }


    if (!institute) {

        alert(
            "Please enter institute."
        );

        return;

    }


    /* ---------------------------------------------
       ADD EDUCATION TO DATA
    --------------------------------------------- */

    data.education.push({

        degree:
            degree,

        institute:
            institute,

        year:
            year

    });


    /* ---------------------------------------------
       SAVE DATA
    --------------------------------------------- */

    saveData();


    /* ---------------------------------------------
       UPDATE EDUCATION LIST
    --------------------------------------------- */

    renderEducation();


    /* ---------------------------------------------
       CLOSE MODAL
    --------------------------------------------- */

    closeModal();

}

/* =========================================================
   RENDER EDUCATION
========================================================= */

function renderEducation() {

    const educationList =
        document.querySelector(
            ".education-list"
        );


    if (!educationList) {
        return;
    }


    /* ---------------------------------------------
       Clear current education list
    --------------------------------------------- */

    educationList.innerHTML = "";


    /* ---------------------------------------------
       Empty state
    --------------------------------------------- */

    if (
        !Array.isArray(data.education) ||
        data.education.length === 0
    ) {

        educationList.innerHTML = `

            <div class="education-empty">

                <p>
                    No education added yet.
                </p>

            </div>

        `;

        return;

    }


    /* ---------------------------------------------
       Render education
    --------------------------------------------- */

    data.education.forEach(
        function (education, index) {

            const educationItem =
                document.createElement(
                    "div"
                );


            educationItem.className =
                "education-item";


            /*
             * Alternate icon colors
             */

            const iconClass =
                index % 2 === 0
                    ? "education-green"
                    : "education-purple";


            educationItem.innerHTML = `

                <div
                    class="education-icon ${iconClass}">

                    🎓

                </div>


                <div class="education-info">

                    <h3>
                        ${escapeHtml(
                            education.degree
                        )}
                    </h3>


                    <p>

                        ${escapeHtml(
                            education.institute
                        )}

                        ${
                            education.year
                                ? ` • ${escapeHtml(
                                    education.year
                                )}`
                                : ""
                        }

                    </p>

                </div>


                <span class="verified-label">

                    ✓ Verified

                </span>

            `;


            educationList.appendChild(
                educationItem
            );

        }
    );

}
/* =========================================================
   INITIAL RENDER
========================================================= */

renderDocuments();


/* ---------------------------------------------------------
   Render Skills
--------------------------------------------------------- */

if (
    document.querySelector(
        ".skills-container"
    )
) {

    renderSkills();

}


/* ---------------------------------------------------------
   Render Education
--------------------------------------------------------- */

if (
    document.querySelector(
        ".education-list"
    )
) {

    renderEducation();

} 


    /* =========================================================
       MANAGE TOOLS
    ========================================================= */

    const manageToolsButton =
        findButtonByText(
            "Manage Tools"
        );


    if (manageToolsButton) {

        manageToolsButton.addEventListener(
            "click",
            function () {

                showToolsModal();

            }
        );

    }


    function showToolsModal() {

        const toolsHTML =
            data.tools.map(
                (tool, index) => `

                    <div class="modal-list-item">

                        <span>
                            ${escapeHtml(tool)}
                        </span>

                        <button
                            type="button"
                            class="modal-remove-item"
                            data-remove-tool="${index}">

                            ×

                        </button>

                    </div>

                `
            ).join("");


        createModal(

            "Manage Tools & Technologies",

            `

            <div class="modal-list">

                ${toolsHTML}

            </div>


            <div class="modal-add-row">

                <input
                    id="newToolInput"
                    class="modal-input"
                    placeholder="Enter tool or technology">


                <button
                    type="button"
                    id="addToolButton"
                    class="modal-small-add">

                    Add

                </button>

            </div>

            `
        );


        document
            .getElementById(
                "addToolButton"
            )
            ?.addEventListener(
                "click",
                function () {

                    const input =
                        document.getElementById(
                            "newToolInput"
                        );


                    const tool =
                        input.value.trim();


                    if (!tool) {

                        alert(
                            "Please enter a tool."
                        );

                        return;

                    }


                    data.tools.push(
                        tool
                    );


                    saveData();

                    renderTools();

                    showToolsModal();

                }
            );


        document
            .querySelectorAll(
                "[data-remove-tool]"
            )
            .forEach(button => {

                button.addEventListener(
                    "click",
                    function () {

                        const index =
                            Number(
                                this.dataset
                                    .removeTool
                            );


                        data.tools.splice(
                            index,
                            1
                        );


                        saveData();

                        renderTools();

                        showToolsModal();

                    }
                );

            });

    }


    function renderTools() {

        const container =
            document.querySelector(
                ".tools-container"
            );


        if (!container) {
            return;
        }


        container.innerHTML =
            data.tools
                .map(tool => `

                    <span class="tool-tag">

                        ${escapeHtml(tool)}

                    </span>

                `)
                .join("");

    }


    /* =========================================================
       ADD CERTIFICATION
    ========================================================= */

    const addCertificationButton =
        findButtonByText(
            "Add Certification"
        );


    if (addCertificationButton) {

        addCertificationButton.addEventListener(
            "click",
            function () {

                createModal(

                    "Add Certification",

                    `

                    <div class="modal-form-grid">

                        <div>

                            <label class="modal-label">
                                Certification Name
                            </label>

                            <input
                                id="certificationName"
                                class="modal-input"
                                placeholder="Certification name">

                        </div>


                        <div>

                            <label class="modal-label">
                                Issuing Organization
                            </label>

                            <input
                                id="certificationIssuer"
                                class="modal-input"
                                placeholder="Organization • Year">

                        </div>

                    </div>

                    `,

                    [

                        {
                            text: "Cancel",
                            action: "close",
                            class: "modal-cancel-btn"
                        },

                        {
                            text: "Add Certification",
                            action: "add-certification",
                            class: "modal-save-btn"
                        }

                    ]

                );

            }
        );

    }


    /* =========================================================
   VIEW ALL CERTIFICATIONS
========================================================= */

const viewCertificationButton =
    findButtonByText("View All Certifications");

if (viewCertificationButton) {

    let showingAllCertifications = false;


    function updateCertificationVisibility() {

        const items =
            document.querySelectorAll(
                ".certification-item"
            );


        items.forEach((item, index) => {

            if (index < 2) {

                item.style.display = "";

            } else {

                item.style.display =
                    showingAllCertifications
                        ? ""
                        : "none";

            }

        });


        viewCertificationButton.textContent =
            showingAllCertifications
                ? "Show Less ↑"
                : "View All Certifications →";

    }


    viewCertificationButton.addEventListener(
        "click",
        function (event) {

            event.preventDefault();

            showingAllCertifications =
                !showingAllCertifications;

            updateCertificationVisibility();

        }
    );


    updateCertificationVisibility();

}


    /* =========================================================
       MANAGE DOCUMENTS
    ========================================================= */

    const manageDocumentsButton =
        findButtonByText(
            "Manage"
        );


    if (manageDocumentsButton) {

        manageDocumentsButton.addEventListener(
            "click",
            function () {

                showDocumentsModal();

            }
        );

    }


    function showDocumentsModal() {

        const documentsHTML =
            data.documents.map(
                (doc, index) => `

                    <div class="modal-list-item">

                        <div>

                            <strong>
                                ${escapeHtml(doc.name)}
                            </strong>

                            <small>
                                ${escapeHtml(doc.size)}
                            </small>

                        </div>


                        <button
                            type="button"
                            class="modal-remove-item"
                            data-remove-document-index="${index}">

                            ×

                        </button>

                    </div>

                `
            ).join("");


        createModal(

            "Manage Professional Documents",

            `

            <div class="modal-list">

                ${documentsHTML}

            </div>

            `

        );


        document
            .querySelectorAll(
                "[data-remove-document-index]"
            )
            .forEach(button => {

                button.addEventListener(
                    "click",
                    function () {

                        const index =
                            Number(
                                this.dataset
                                    .removeDocumentIndex
                            );


                        data.documents.splice(
                            index,
                            1
                        );


                        saveData();

                        renderDocuments();

                        showDocumentsModal();

                    }
                );

            });

    }


    /* =========================================================
       DOCUMENT UPLOAD
    ========================================================= */

    const documentInput =
        document.getElementById(
            "documentInput"
        );


    if (documentInput) {

        documentInput.addEventListener(
            "change",
            function () {

                const files =
                    Array.from(
                        this.files
                    );


                files.forEach(file => {

                    const size =
                        formatFileSize(
                            file.size
                        );


                    data.documents.push({
                        name: file.name,
                        size: size
                    });

                });


                saveData();

                renderDocuments();


                this.value = "";

            }
        );

    }


    function renderDocuments() {

        const documentList =
            document.querySelector(
                ".document-list"
            );


        if (!documentList) {
            return;
        }


        documentList.innerHTML =
            data.documents
                .map(
                    (doc, index) => `

                        <div class="document-item">

                            <div class="pdf-icon">
                                PDF
                            </div>


                            <div class="document-info">

                                <h3>
                                    ${escapeHtml(
                                        doc.name
                                    )}
                                </h3>

                                <p>
                                    ${escapeHtml(
                                        doc.size
                                    )}
                                    • Uploaded
                                </p>

                            </div>


                            <button
                                type="button"
                                class="remove-document"
                                data-document-index="${index}">

                                ×

                            </button>

                        </div>

                    `
                )
                .join("");


        document
            .querySelectorAll(
                "[data-document-index]"
            )
            .forEach(button => {

                button.addEventListener(
                    "click",
                    function () {

                        const index =
                            Number(
                                this.dataset
                                    .documentIndex
                            );


                        data.documents.splice(
                            index,
                            1
                        );


                        saveData();

                        renderDocuments();

                    }
                );

            });

    }


    /* =========================================================
       SAVE CHANGES
    ========================================================= */

    const saveButton =
        document.getElementById(
            "saveProfessionalInfo"
        );


    if (saveButton) {

        saveButton.addEventListener(
            "click",
            function () {

                saveData();


                const originalText =
                    this.textContent;


                this.disabled = true;

                this.textContent =
                    "Saved ✓";


                setTimeout(
                    () => {

                        this.textContent =
                            originalText;

                        this.disabled =
                            false;

                    },
                    1500
                );

            }
        );

    }


    /* =========================================================
       CANCEL
    ========================================================= */

    const cancelButton =
        document.getElementById(
            "cancelProfessionalInfo"
        );


    if (cancelButton) {

        cancelButton.addEventListener(
            "click",
            function () {

                const confirmed =
                    confirm(
                        "Discard your unsaved changes?"
                    );


                if (!confirmed) {
                    return;
                }


                data = loadData();

                location.reload();

            }
        );

    }


    /* =========================================================
       MODAL ACTIONS
    ========================================================= */

    document.addEventListener(
        "click",
        function (event) {

            const button =
                event.target.closest(
                    "[data-modal-action]"
                );


            if (!button) {
                return;
            }


            const action =
                button.dataset.modalAction;


            /* =================================================
               SAVE SUMMARY
            ================================================= */

            if (
                action ===
                "save-summary"
            ) {

                const input =
                    document.getElementById(
                        "summaryInput"
                    );


                if (input) {

                    data.summary =
                        input.value.trim();


                    const summary =
                        document.querySelector(
                            ".summary-content p"
                        );


                    if (summary) {

                        summary.textContent =
                            data.summary;

                    }


                    saveData();

                }


                closeModal();

            }


            /* =================================================
               ADD LICENSE
            ================================================= */

            if (
                action ===
                "add-license"
            ) {

                const name =
                    getInputValue(
                        "licenseName"
                    );


                const details =
                    getInputValue(
                        "licenseDetails"
                    );


                const validity =
                    getInputValue(
                        "licenseValidity"
                    );


                if (!name) {

                    alert(
                        "Please enter the license name."
                    );

                    return;

                }


                data.licenses.push({

                    name,
                    details,
                    validity

                });


                saveData();

                closeModal();


                alert(
                    "License added successfully."
                );

            }


            /* =================================================
               ADD EXPERIENCE
            ================================================= */

            if (
                action ===
                "add-experience"
            ) {

                const title =
                    getInputValue(
                        "experienceTitle"
                    );


                const company =
                    getInputValue(
                        "experienceCompany"
                    );


                const duration =
                    getInputValue(
                        "experienceDuration"
                    );


                const description =
                    getInputValue(
                        "experienceDescription"
                    );


                if (
                    !title ||
                    !company
                ) {

                    alert(
                        "Please enter job title and company."
                    );

                    return;

                }


                data.experiences.push({

                    title,
                    company,
                    duration,
                    description

                });


                saveData();

                closeModal();


                alert(
                    "Experience added successfully."
                );

            }


            /* =================================================
               ADD EDUCATION
            ================================================= */

            if (
                action ===
                "add-education"
            ) {

                const degree =
                    getInputValue(
                        "educationDegree"
                    );


                const institute =
                    getInputValue(
                        "educationInstitute"
                    );


                const year =
                    getInputValue(
                        "educationYear"
                    );


                if (
                    !degree ||
                    !institute
                ) {

                    alert(
                        "Please enter degree and institute."
                    );

                    return;

                }


                data.education.push({

                    degree,
                    institute,
                    year

                });


                saveData();

                closeModal();


                alert(
                    "Education added successfully."
                );

            }


            /* =================================================
               ADD CERTIFICATION
            ================================================= */

            if (
                action ===
                "add-certification"
            ) {

                const name =
                    getInputValue(
                        "certificationName"
                    );


                const issuer =
                    getInputValue(
                        "certificationIssuer"
                    );


                if (!name) {

                    alert(
                        "Please enter certification name."
                    );

                    return;

                }


                data.certifications.push({

                    name,
                    issuer

                });


                saveData();

                closeModal();


                alert(
                    "Certification added successfully."
                );

            }


            /* =================================================
               CLOSE
            ================================================= */

            if (
                action ===
                "close"
            ) {

                closeModal();

            }

        }
    );


    /* =========================================================
       HELPER FUNCTIONS
    ========================================================= */

    function findButtonByText(text) {

        return Array.from(
            document.querySelectorAll(
                "button"
            )
        ).find(
            button =>
                button.textContent
                    .trim()
                    .includes(text)
        );

    }


    function getInputValue(id) {

        const element =
            document.getElementById(id);


        return element
            ? element.value.trim()
            : "";

    }


    function escapeHtml(value) {

        const div =
            document.createElement(
                "div"
            );


        div.textContent =
            value || "";


        return div.innerHTML;

    }


    function formatFileSize(bytes) {

        if (bytes === 0) {

            return "0 Bytes";

        }


        const units = [

            "Bytes",
            "KB",
            "MB",
            "GB"

        ];


        const index =
            Math.floor(
                Math.log(bytes) /
                Math.log(1024)
            );


        return (

            parseFloat(

                (
                    bytes /
                    Math.pow(
                        1024,
                        index
                    )

                ).toFixed(1)

            )

            +

            " " +

            units[index]

        );

    }


    /* =========================================================
       INITIAL RENDER
    ========================================================= */

    renderDocuments();


    /*
     * Render skills/tools if their containers
     * already exist in the HTML.
     */

    if (
        document.querySelector(
            ".skills-container"
        )
    ) {

        renderSkills();

    }


    if (
        document.querySelector(
            ".tools-container"
        )
    ) {

        renderTools();

    }

});
document.addEventListener("DOMContentLoaded", function () {

    const moreBtn = document.getElementById("skillsMoreBtn");
    const hiddenSkills = document.querySelectorAll(".hidden-skill");

    if (!moreBtn) return;

    moreBtn.addEventListener("click", function () {

        const isExpanded = moreBtn.dataset.expanded === "true";

        if (!isExpanded) {

            // Show all hidden skills
            hiddenSkills.forEach(function (skill) {
                skill.classList.remove("hidden-skill");
            });

            moreBtn.textContent = "Show Less";
            moreBtn.dataset.expanded = "true";

        } else {

            // Hide them again
            hiddenSkills.forEach(function (skill) {
                skill.classList.add("hidden-skill");
            });

            moreBtn.textContent = "+4 more";
            moreBtn.dataset.expanded = "false";
        }
    });

});
document.addEventListener("DOMContentLoaded", function () {

    const moreBtn = document.getElementById("skillsMoreBtn");
    const hiddenSkills = document.querySelectorAll(".hidden-skill");

    if (!moreBtn) return;

    moreBtn.addEventListener("click", function () {

        const isExpanded = moreBtn.dataset.expanded === "true";

        hiddenSkills.forEach(function (skill) {
            skill.classList.toggle("show-skill", !isExpanded);
        });

        if (!isExpanded) {
            moreBtn.textContent = "Show Less";
            moreBtn.dataset.expanded = "true";
        } else {
            moreBtn.textContent = "+4 more";
            moreBtn.dataset.expanded = "false";
        }

    });

});
