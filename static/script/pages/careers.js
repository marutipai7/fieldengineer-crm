document.addEventListener("DOMContentLoaded", () => {
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
});

function openApplyModal(job) {
    document.getElementById("applyModal").classList.remove("hidden");
    document.getElementById("applyModal").classList.add("flex");

    document.getElementById("jobTitle").value = job;
    document.getElementById("jobTitleInput").value = job;

    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
}

function closeApplyModal() {
    document.getElementById("applyModal").classList.remove("flex");
    document.getElementById("applyModal").classList.add("hidden");

    document.documentElement.style.overflow = "";
    document.body.style.overflow = "";
}