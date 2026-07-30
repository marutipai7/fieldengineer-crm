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