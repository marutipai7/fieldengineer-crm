document.addEventListener("DOMContentLoaded", function () {

    // Counter Animation
    const counters = document.querySelectorAll(".count-up");

    counters.forEach(counter => {
        const target = parseFloat(counter.dataset.target);
        const duration = 2000;
        const startTime = performance.now();

        function update(currentTime) {
            const progress = Math.min((currentTime - startTime) / duration, 1);
            const value = target * progress;

            if (target === 4.6) {
                counter.textContent = value.toFixed(1) + "/5";
            } else if (counter.dataset.target === "85") {
                counter.textContent = Math.floor(value) + "%";
            } else {
                counter.textContent = Math.floor(value) + "+";
            }

            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                if (target === 4.6) {
                    counter.textContent = "4.6/5";
                } else if (counter.dataset.target === "85") {
                    counter.textContent = "85%";
                } else {
                    counter.textContent = target + "+";
                }
            }
        }

        requestAnimationFrame(update);
    });

    // Apply Modal Buttons
    const applyButtons = document.querySelectorAll(".openJobApplyModal");

    applyButtons.forEach(button => {

        button.addEventListener("click", function () {

            const job = this.dataset.job || "Software Engineer";

            openApplyModal(job);

        });

    });

});

function openApplyModal(job) {

    const modal = document.getElementById("applyModal");

    if (!modal) return;

    modal.classList.remove("hidden");
    modal.classList.add("flex");

    const jobTitle = document.getElementById("jobTitle");
    const jobTitleInput = document.getElementById("jobTitleInput");

    if (jobTitle) {
        jobTitle.value = job;
    }

    if (jobTitleInput) {
        jobTitleInput.value = job;
    }

    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
}

function closeApplyModal() {

    const modal = document.getElementById("applyModal");

    if (!modal) return;

    modal.classList.remove("flex");
    modal.classList.add("hidden");

    document.documentElement.style.overflow = "";
    document.body.style.overflow = "";
}

// Close modal when clicking outside
document.addEventListener("click", function (e) {

    const modal = document.getElementById("applyModal");

    if (!modal) return;

    if (e.target === modal) {
        closeApplyModal();
    }

});
// ================= Save Job =================

document.addEventListener("DOMContentLoaded", function () {

    const saveBtn = document.getElementById("saveJobBtn");

    if (!saveBtn) return;

    const icon = document.getElementById("saveJobIcon");
    const text = document.getElementById("saveJobText");

    // Unique job ID
    const jobId = "software-engineer";

    // Check saved state
    let isSaved = localStorage.getItem("savedJob_" + jobId) === "true";

    updateButton();

    saveBtn.addEventListener("click", function () {

        isSaved = !isSaved;

        localStorage.setItem("savedJob_" + jobId, isSaved);

        updateButton();

    });

    function updateButton() {

        if (isSaved) {

            text.textContent = "Saved";

            icon.textContent = "bookmark";

            saveBtn.classList.add("saved");

        } else {

            text.textContent = "Save Job";

            icon.textContent = "bookmark_add";

            saveBtn.classList.remove("saved");

        }

    }

});
// Resume Validation
const resumeInput = document.getElementById("resume");

if (resumeInput) {
    resumeInput.addEventListener("change", function () {

        const file = this.files[0];

        if (!file) return;

        const allowedTypes = [
            "application/pdf",
            "application/msword",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        ];

        if (!allowedTypes.includes(file.type)) {
            alert("Only PDF, DOC and DOCX files are allowed.");
            this.value = "";
            return;
        }

        if (file.size > 500 * 1024) {
            alert("Resume size must not exceed 500 KB.");
            this.value = "";
            return;
        }

    });
}