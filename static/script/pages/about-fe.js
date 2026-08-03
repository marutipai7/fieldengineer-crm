

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
                    counter.innerText = Math.floor(count) + "M+";
                } else {
                    counter.innerText = Math.floor(count).toLocaleString() + "+";
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
document.querySelectorAll('details[name="faq"]').forEach((detail) => {
    detail.addEventListener('toggle', () => {
        if (detail.open) {
            document.querySelectorAll('details[name="faq"]').forEach((other) => {
                if (other !== detail) {
                    other.removeAttribute('open');
                }
            });
        }
    });
});
