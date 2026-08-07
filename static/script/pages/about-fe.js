

document.addEventListener("DOMContentLoaded", function () {

    const counters = document.querySelectorAll(".counter");

    counters.forEach(counter => {

        const target = +counter.getAttribute("data-target");

        let count = 0;

        const speed = target / 100;

        function updateCount() {

            if (count < target) {

                count += speed;

                if (count > target) count = target;

                if (target === 10) {
                    counter.innerText = Math.floor(count) + "M";
                } else {
                    counter.innerText = Math.floor(count).toLocaleString();
                }

                requestAnimationFrame(updateCount);

            }

        }

        updateCount();

    });

});


function animateCounter(id, target, duration) {

    const element = document.getElementById(id);

    if (!element) return;

    let start = 0;

    const increment = target / (duration / 16);

    function updateCounter() {

        start += increment;

        if (start < target) {

            element.innerText = Math.floor(start);

            requestAnimationFrame(updateCounter);

        } else {

            element.innerText = target;

        }

    }

    updateCounter();

}


let counterStarted = false;


const counterSection = document.getElementById("counterSection");


if (counterSection) {

    const observer = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting && !counterStarted) {

                counterStarted = true;

                animateCounter("countriesCount", 7, 1000);
                animateCounter("citiesCount", 113, 1500);
                animateCounter("locationsCount", 4905, 2000);

            }

        });

    }, {
        threshold: 0.5
    });


    observer.observe(counterSection);

}
function initContactFaq() {
    const faqItems = document.querySelectorAll("[data-faq-item]");

    faqItems.forEach((item) => {
        const trigger = item.querySelector("[data-faq-trigger]");
        const panel = item.querySelector("[data-faq-panel]");

        // Hide all panels initially
        panel.hidden = true;
        trigger.setAttribute("aria-expanded", "false");

        trigger.addEventListener("click", () => {
            const isOpen = item.classList.contains("is-open");

            // Close all FAQs
            faqItems.forEach((faq) => {
                faq.classList.remove("is-open");

                const faqTrigger = faq.querySelector("[data-faq-trigger]");
                const faqPanel = faq.querySelector("[data-faq-panel]");

                faqTrigger.setAttribute("aria-expanded", "false");
                faqPanel.hidden = true;
            });

            // Open clicked FAQ if it wasn't already open
            if (!isOpen) {
                item.classList.add("is-open");
                trigger.setAttribute("aria-expanded", "true");
                panel.hidden = false;
            }
        });
    });
}

document.addEventListener("DOMContentLoaded", function () {
    initContactFaq();
});