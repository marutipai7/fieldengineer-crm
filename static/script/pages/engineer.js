/* ==========================================================
   FE TESTIMONIAL SLIDER
========================================================== */
/* ==========================================================
FE TESTIMONIAL SLIDER
========================================================== */


const testimonials = [

    {
        name: "Priya Sharma",
        company: "TechNova Solutions",
        role: "Verified Company",
        rating: 3,
        image: testimonialImages[0],
        text: "FE provided quick and reliable engineers for our infrastructure setup. The service was smooth and professional."
    },

    {
        name: "Anjali Arora",
        company: "Global IT Systems",
        role: "Verified Company",
        rating: 4,
        image: testimonialImages[1],
        text: "The engineer arrived on time and completed our installation work efficiently. Great experience with FE."
    },

    {
        name: "Amit Shah",
        company: "CloudEdge Technologies",
        role: "Verified Company",
        rating: 5,
        image: testimonialImages[2],
        text: "Excellent support team and skilled engineers. FE helped us complete our project without delays."
    }

];


let currentTestimonial = 0;



function loadTestimonial() {

    let data = testimonials[currentTestimonial];


    document.querySelector("#customerName").innerHTML = data.name;

    document.querySelector("#customerCompany").innerHTML = data.company;

    document.querySelector("#customerRole").innerHTML = data.role;

    document.querySelector("#customerImage").src = data.image;

    document.querySelector("#testimonialText").innerHTML = data.text;



    let starsBox = document.querySelector("#testimonialStars");


    starsBox.innerHTML = "";


    for (let i = 0; i < data.rating; i++) {

        starsBox.innerHTML += `
        <span class="material-symbols-outlined"
        style="
        color:#F5B530;
        font-variation-settings:'FILL' 1;
        ">
        star
        </span>`;
    }

}





document.addEventListener("DOMContentLoaded", function () {

    console.log("TESTIMONIAL JS LOADED");


    loadTestimonial();


    let nextBtn = document.querySelector("#testimonialNext");
    let prevBtn = document.querySelector("#testimonialPrev");


    const testimonialDots = document.querySelectorAll(".testimonial-dot");



    function updateDots(index) {

        testimonialDots.forEach((dot, i) => {

            if (i === index) {

                dot.classList.remove("bg-slate-300");
                dot.classList.add("bg-[#F5B530]");

            }
            else {

                dot.classList.remove("bg-[#F5B530]");
                dot.classList.add("bg-slate-300");

            }

        });

    }



    nextBtn.onclick = function () {


        currentTestimonial++;


        if (currentTestimonial >= testimonials.length) {

            currentTestimonial = 0;

        }


        loadTestimonial();

        updateDots(currentTestimonial);


    };




    prevBtn.onclick = function () {


        currentTestimonial--;


        if (currentTestimonial < 0) {

            currentTestimonial = testimonials.length - 1;

        }


        loadTestimonial();

        updateDots(currentTestimonial);


    };




    testimonialDots.forEach((dot) => {


        dot.onclick = function () {


            currentTestimonial = Number(this.dataset.index);


            loadTestimonial();


            updateDots(currentTestimonial);


        };


    });



    // Initial active dot

    updateDots(currentTestimonial);



});





/* ==========================================================
   ANIMATED COUNTERS
========================================================== */


function animateCounters() {


    const counters = document.querySelectorAll(".counter");


    counters.forEach(counter => {


        const target = Number(counter.dataset.target);

        let current = 0;


        const duration = 2000;

        const increment = target / (duration / 16);



        function update() {


            current += increment;



            if (current < target) {


                counter.textContent = Math.floor(current);


                requestAnimationFrame(update);


            }

            else {


                counter.textContent = target;


            }


        }



        update();


    });


}




document.addEventListener("DOMContentLoaded", () => {


    const section = document.querySelector(".counter")?.closest("section");


    if (!section) return;



    const observer = new IntersectionObserver((entries) => {


        entries.forEach(entry => {


            if (entry.isIntersecting) {


                animateCounters();


                observer.disconnect();


            }


        });



    }, {

        threshold: 0.4

    });



    observer.observe(section);



});







/* ==========================================================
   FE REVEAL ANIMATION
========================================================== */


document.addEventListener("DOMContentLoaded", () => {


    const revealItems = document.querySelectorAll(".fe-reveal");



    if (!revealItems.length) return;



    const revealObserver = new IntersectionObserver((entries) => {


        entries.forEach(entry => {


            if (entry.isIntersecting) {


                entry.target.classList.add("active");


            }


        });



    }, {


        threshold: 0.2


    });



    revealItems.forEach(item => {


        revealObserver.observe(item);


    });



});
/* ==========================================================
   FIELD ENGINEER GLOBAL MAP
========================================================== */


document.addEventListener("DOMContentLoaded", function () {


    const mapContainer = document.getElementById("chartdiv");


    if (!mapContainer) return;



    if (typeof am5 === "undefined") {

        console.error("amCharts is not loaded");

        return;

    }



    am5.ready(function () {



        const root = am5.Root.new("chartdiv");



        root.setThemes([

            am5themes_Animated.new(root)

        ]);




        const chart = root.container.children.push(


            am5map.MapChart.new(root, {


                panX: "rotateX",

                panY: "translateY",

                wheelY: "zoom",

                wheelX: "none",

                pinchZoom: true,


                projection: am5map.geoMercator()


            })



        );




        chart.chartContainer.setAll({


            background:


                am5.Rectangle.new(root, {


                    fill: am5.color(0xFCFAF5),

                    fillOpacity: 1


                })


        });







        /* ======================================================
           WORLD COUNTRIES
        ====================================================== */


        const polygonSeries = chart.series.push(


            am5map.MapPolygonSeries.new(root, {


                geoJSON: am5geodata_worldLow,

                exclude: ["AQ"]


            })


        );




        polygonSeries.mapPolygons.template.setAll({


            tooltipText: "{name}",


            fill: am5.color(0xEDF1F5),


            fillOpacity: 1,


            stroke: am5.color(0xffffff),


            strokeWidth: 1,


            interactive: true,


            cursorOverStyle: "pointer"


        });





        polygonSeries.mapPolygons.template.states.create(
            "hover",
            {


                fill: am5.color(0xF5B530),


                stroke: am5.color(0xE2A220),


                strokeWidth: 1.5


            }
        );





        polygonSeries.appear(1000);







        /* ======================================================
           FIELD ENGINEER LOCATIONS
        ====================================================== */


        const locations = [


            {
                title: "India",
                city: "Mumbai",
                latitude: 19.0760,
                longitude: 72.8777
            },


            {
                title: "United States",
                city: "New York",
                latitude: 40.7128,
                longitude: -74.0060
            },


            {
                title: "United Kingdom",
                city: "London",
                latitude: 51.5074,
                longitude: -0.1278
            },


            {
                title: "Germany",
                city: "Frankfurt",
                latitude: 50.1109,
                longitude: 8.6821
            },


            {
                title: "Singapore",
                city: "Singapore",
                latitude: 1.3521,
                longitude: 103.8198
            },


            {
                title: "UAE",
                city: "Dubai",
                latitude: 25.2048,
                longitude: 55.2708
            },


            {
                title: "Australia",
                city: "Sydney",
                latitude: -33.8688,
                longitude: 151.2093
            },


            {
                title: "Japan",
                city: "Tokyo",
                latitude: 35.6762,
                longitude: 139.6503
            },


            {
                title: "South Africa",
                city: "Johannesburg",
                latitude: -26.2041,
                longitude: 28.0473
            },


            {
                title: "Brazil",
                city: "São Paulo",
                latitude: -23.5505,
                longitude: -46.6333
            }


        ];








        /* ======================================================
           LOCATION POINTS
        ====================================================== */


        const pointSeries = chart.series.push(


            am5map.MapPointSeries.new(root, {})


        );




        locations.forEach(location => {


            pointSeries.pushDataItem({


                latitude: location.latitude,


                longitude: location.longitude,


                title: location.title,


                city: location.city


            });



        });








        pointSeries.bullets.push(function (root) {



            const container = am5.Container.new(root, {});





            const pulse = container.children.push(


                am5.Circle.new(root, {


                    radius: 18,


                    fill: am5.color(0xF5B530),


                    fillOpacity: 0.18,


                    stroke: am5.color(0xF5B530),


                    strokeOpacity: 0.4,


                    strokeWidth: 2


                })


            );





            container.children.push(


                am5.Circle.new(root, {


                    radius: 10,


                    fill: am5.color(0xF5B530),


                    fillOpacity: 0.25,


                    stroke: am5.color(0xF5B530),


                    strokeWidth: 2


                })


            );





            container.children.push(


                am5.Circle.new(root, {


                    radius: 5,


                    fill: am5.color(0xF5B530),


                    stroke: am5.color(0xffffff),


                    strokeWidth: 2,


                    tooltipText: "[bold]{title}[/]\n{city}"


                })


            );





            pulse.animate({


                key: "scale",


                from: 0.5,


                to: 2.5,


                duration: 1800,


                loops: Infinity


            });




            pulse.animate({


                key: "opacity",


                from: 0.8,


                to: 0,


                duration: 1800,


                loops: Infinity


            });





            return am5.Bullet.new(root, {


                sprite: container


            });


        });








        /* ======================================================
           CONNECTION ROUTES
        ====================================================== */


        const connections = [


            [
                [19.0760, 72.8777],
                [25.2048, 55.2708]
            ],


            [
                [25.2048, 55.2708],
                [50.1109, 8.6821]
            ],


            [
                [50.1109, 8.6821],
                [51.5074, -0.1278]
            ],


            [
                [51.5074, -0.1278],
                [40.7128, -74.0060]
            ],


            [
                [19.0760, 72.8777],
                [1.3521, 103.8198]
            ],


            [
                [1.3521, 103.8198],
                [-33.8688, 151.2093]
            ],


            [
                [19.0760, 72.8777],
                [35.6762, 139.6503]
            ],


            [
                [19.0760, 72.8777],
                [-26.2041, 28.0473]
            ]


        ];





        const lineSeries = chart.series.push(


            am5map.MapLineSeries.new(root, {})


        );




        connections.forEach(route => {


            lineSeries.pushDataItem({


                points: [


                    {
                        latitude: route[0][0],
                        longitude: route[0][1]
                    },


                    {
                        latitude: route[1][0],
                        longitude: route[1][1]
                    }


                ]


            });


        });





        lineSeries.mapLines.template.setAll({


            stroke: am5.color(0xF5B530),


            strokeWidth: 2,


            strokeOpacity: 0.45,


            strokeDasharray: [8, 6]


        });





        lineSeries.mapLines.template.animate({


            key: "strokeDashoffset",


            from: 16,


            to: 0,


            duration: 900,


            loops: Infinity


        });







        /* ======================================================
           INITIAL POSITION
        ====================================================== */


        chart.setAll({


            homeGeoPoint: {


                latitude: 20,


                longitude: 10


            },


            homeZoomLevel: 1.05


        });




        chart.goHome();



        polygonSeries.appear(1000);

        pointSeries.appear(1200);

        lineSeries.appear(1400);

        chart.appear(1500, 100);






        window.addEventListener("resize", () => {


            root.resize();


        });





        window.addEventListener("beforeunload", () => {


            root.dispose();


        });



    });



});
/* ==========================================================
   FE GLOBAL REGION CARDS - READ MORE / SHOW LESS
========================================================== */

document.addEventListener("DOMContentLoaded", function () {

    const readMoreButtons = document.querySelectorAll(".read-more-btn");

    if (!readMoreButtons.length) return;


    readMoreButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            // Get the card that contains the clicked button
            const card = button.closest(".fe-region-card");

            if (!card) return;


            // Get only the hidden countries inside this card
            const moreCountries = card.querySelectorAll(".more-country");

            if (!moreCountries.length) return;


            // Check current state
            const isExpanded = card.classList.contains("expanded");


            // Show / hide countries
            moreCountries.forEach(function (country) {

                country.classList.toggle("hidden");

            });


            // Toggle expanded state
            card.classList.toggle("expanded");


            // Change button text
            const textNode = Array.from(button.childNodes).find(
                node => node.nodeType === Node.TEXT_NODE
            );

            if (textNode) {

                textNode.textContent = isExpanded
                    ? " Read More "
                    : " Show Less ";

            }


            // Change arrow icon
            const arrow = button.querySelector(".material-symbols-outlined");

            if (arrow) {

                arrow.textContent = isExpanded
                    ? "expand_more"
                    : "expand_less";

            }

        });

    });

});