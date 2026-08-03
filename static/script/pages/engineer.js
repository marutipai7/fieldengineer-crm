console.log("Engineer JS Loaded");

document.addEventListener("DOMContentLoaded", function () {


    const testimonials = [

        {
            name: "Priya Sharma",
            role: "Verified Customer",
            image: "/static/img/fe-wocs.jpg",
            engineer: "/static/img/fe-wocs2.jpg",
            text: "Booking an engineer through FE took less than a minute. The professional arrived on time, completed the work efficiently and kept us informed throughout the visit. The entire experience was smooth and reliable."
        },

        {
            name: "Rahul Mehta",
            role: "Verified Customer",
            image: "/static/img/fe-wocs.jpg",
            engineer:  "/static/img/fe-wocs2.jpg",
            text: "FE helped us quickly find skilled engineers for our requirements. The process was simple, fast and the service quality was excellent."
        },

        {
            name: "Ananya Patel",
            role: "Verified Customer",
            image: "/static/img/fe-wocs.jpg",
            engineer:  "/static/img/fe-wocs2.jpg",
            text: "The Field Engineer platform made our work easier. We received professional support on time and completed our tasks without delays."
        }

    ];


    let currentIndex = 0;


    // Elements

    const testimonialText = document.getElementById("testimonialText");
    const customerName = document.getElementById("customerName");
    const customerRole = document.getElementById("customerRole");
    const customerImage = document.getElementById("customerImage");
    const engineerImage = document.getElementById("engineerImage");

    const nextBtn = document.getElementById("testimonialNext");
    const prevBtn = document.getElementById("testimonialPrev");

    const dots = document.querySelectorAll(".testimonial-dot");



    function updateTestimonial(index) {

        const testimonial = testimonials[index];


        if (testimonialText) {
            testimonialText.textContent = testimonial.text;
        }


        if (customerName) {
            customerName.textContent = testimonial.name;
        }


        if (customerRole) {
            customerRole.textContent = testimonial.role;
        }


        if (customerImage) {
            customerImage.src = testimonial.image;
        }


        if (engineerImage) {
            engineerImage.src = testimonial.engineer;
        }



        // Update active dots

        dots.forEach((dot, i) => {

            if (i === index) {

                dot.classList.remove("bg-slate-300");
                dot.classList.add("bg-[#F5B530]");

            } else {

                dot.classList.remove("bg-[#F5B530]");
                dot.classList.add("bg-slate-300");

            }

        });


    }



    // Next Button

    if (nextBtn) {

        nextBtn.addEventListener("click", function () {


            currentIndex++;


            if (currentIndex >= testimonials.length) {

                currentIndex = 0;

            }


            updateTestimonial(currentIndex);


        });

    }



    // Previous Button

    if (prevBtn) {

        prevBtn.addEventListener("click", function () {


            currentIndex--;


            if (currentIndex < 0) {

                currentIndex = testimonials.length - 1;

            }


            updateTestimonial(currentIndex);


        });

    }



    // Dot Click

    dots.forEach((dot) => {


        dot.addEventListener("click", function () {


            currentIndex = Number(this.dataset.index);


            updateTestimonial(currentIndex);


        });


    });



    // Initial Load

    updateTestimonial(currentIndex);



});
// =============================
// Animated Counters
// =============================

const counters = document.querySelectorAll(".counter");

const animateCounters = () => {

    counters.forEach(counter => {

        const target = +counter.getAttribute("data-target");
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16);

        let current = 0;

        const updateCounter = () => {

            current += increment;

            if (current < target) {

                counter.textContent = Math.floor(current);

                requestAnimationFrame(updateCounter);

            } else {

                counter.textContent = target;

            }

        };

        updateCounter();

    });

};


// Run only when section becomes visible

const counterSection = document.querySelector(".counter")?.closest("section");

if (counterSection) {

    const observer = new IntersectionObserver((entries, observer) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                animateCounters();

                observer.disconnect();

            }

        });

    }, {
        threshold: 0.4
    });

    observer.observe(counterSection);

}
/* ===========================
   FE Network Reveal
=========================== */

const revealItems = document.querySelectorAll(".fe-reveal");

const revealObserver = new IntersectionObserver((entries) => {

    entries.forEach((entry) => {

        if (entry.isIntersecting) {

            entry.target.classList.add("active");

        }

    });

}, {
    threshold: 0.2
});

revealItems.forEach((item) => {

    revealObserver.observe(item);

});