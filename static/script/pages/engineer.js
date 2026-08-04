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
/* ==========================================
   FE WORLD MAP ANIMATIONS
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    // =====================================
    // Floating location pins
    // =====================================

    const pins = document.querySelectorAll(".fe-pin");

    pins.forEach((pin, index) => {

        pin.style.animationDelay = `${index * 0.3}s`;

    });


    // =====================================
    // Fade-in cards
    // =====================================

    const cards = document.querySelectorAll(".fe-region-card");

    const observer = new IntersectionObserver((entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                entry.target.classList.add("show");

            }

        });

    }, {

        threshold: 0.15

    });

    cards.forEach(card => observer.observe(card));


    // =====================================
    // Animate SVG network lines
    // =====================================

    const lines = document.querySelectorAll(".fe-line");

    lines.forEach((line, index) => {

        line.style.animationDelay = `${index * 0.8}s`;

    });


    // =====================================
    // Pulse effect on pins
    // =====================================

    setInterval(() => {

        pins.forEach(pin => {

            pin.classList.remove("pulse");

            void pin.offsetWidth;

            pin.classList.add("pulse");

        });

    }, 3000);

});
/*==========================================================
 FIELD ENGINEER GLOBAL MAP
==========================================================*/

document.addEventListener("DOMContentLoaded", function () {

    if (!document.getElementById("chartdiv")) return;

    if (typeof am5 === "undefined") {

        console.error("amCharts library not loaded.");

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

    background: am5.Rectangle.new(root, {

        fill: am5.color(0xFCFAF5),

        fillOpacity: 1

    })

});
/*==========================================================
WORLD MAP
==========================================================*/

const polygonSeries = chart.series.push(

    am5map.MapPolygonSeries.new(root, {

        geoJSON: am5geodata_worldLow,

        exclude: ["AQ"]

    })

);

// Country Style
polygonSeries.mapPolygons.template.setAll({

    tooltipText: "{name}",

    fill: am5.color(0xEDF1F5),      // Light grey countries

    fillOpacity: 1,

    stroke: am5.color(0xFFFFFF),    // White borders

    strokeWidth: 1,

    interactive: true,

    cursorOverStyle: "pointer"

});

// Hover Effect
polygonSeries.mapPolygons.template.states.create("hover", {

    fill: am5.color(0xF5B530),

    stroke: am5.color(0xE2A220),

    strokeWidth: 1.5

});

// Appear Animation
polygonSeries.appear(1000);

/*==========================================================
FIELD ENGINEER LOCATIONS
==========================================================*/

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
        title: "United Arab Emirates",
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
/*==========================================================
POINT SERIES
==========================================================*/

const pointSeries = chart.series.push(

    am5map.MapPointSeries.new(root, {})

);

locations.forEach(function(location){

    pointSeries.pushDataItem({

        latitude: location.latitude,

        longitude: location.longitude,

        title: location.title,

        city: location.city

    });

});
/*==========================================================
FIELD ENGINEER MARKERS
==========================================================*/

pointSeries.bullets.push(function (root, series, dataItem) {

    const container = am5.Container.new(root, {

        cursorOverStyle: "pointer"

    });

    // Outer Pulse Ring

    const pulse = container.children.push(

        am5.Circle.new(root, {

            radius: 18,

            fill: am5.color(0xF5B530),

            fillOpacity: 0.18,

            stroke: am5.color(0xF5B530),

            strokeOpacity: 0.35,

            strokeWidth: 2

        })

    );

    // Middle Ring

    const ring = container.children.push(

        am5.Circle.new(root, {

            radius: 10,

            fill: am5.color(0xF5B530),

            fillOpacity: 0.25,

            stroke: am5.color(0xF5B530),

            strokeWidth: 2

        })

    );

    // Center Dot

    const dot = container.children.push(

        am5.Circle.new(root, {

            radius: 5,

            fill: am5.color(0xF5B530),

            stroke: am5.color(0xffffff),

            strokeWidth: 2,

            tooltipText:
                "[bold]{title}[/]\n{city}"

        })

    );

    // Pulse Animation

    pulse.animate({

        key: "scale",

        from:0.4,
        
        to:2.5,

        duration: 1800,

        loops: Infinity,

        easing: am5.ease.out(am5.ease.cubic)

    });

    pulse.animate({

        key: "opacity",

        from: 0.7,

        to: 0,

        duration: 1800,

        loops: Infinity

    });

    // Floating Effect

    container.animate({

        key: "y",

        from: -2,

        to: 2,

        duration: 2200,

        loops: Infinity,

        easing: am5.ease.inOut(am5.ease.sin)

    });

    return am5.Bullet.new(root, {

        sprite: container

    });

});
/*==========================================================
FIELD ENGINEER CONNECTION LINES
==========================================================*/

// Connection routes between cities

const connections = [

    // India → UAE
    {
        points: [
            { latitude: 19.0760, longitude: 72.8777 },
            { latitude: 25.2048, longitude: 55.2708 }
        ]
    },

    // UAE → Germany
    {
        points: [
            { latitude: 25.2048, longitude: 55.2708 },
            { latitude: 50.1109, longitude: 8.6821 }
        ]
    },

    // Germany → United Kingdom
    {
        points: [
            { latitude: 50.1109, longitude: 8.6821 },
            { latitude: 51.5074, longitude: -0.1278 }
        ]
    },

    // UK → USA
    {
        points: [
            { latitude: 51.5074, longitude: -0.1278 },
            { latitude: 40.7128, longitude: -74.0060 }
        ]
    },

    // India → Singapore
    {
        points: [
            { latitude: 19.0760, longitude: 72.8777 },
            { latitude: 1.3521, longitude: 103.8198 }
        ]
    },

    // Singapore → Australia
    {
        points: [
            { latitude: 1.3521, longitude: 103.8198 },
            { latitude: -33.8688, longitude: 151.2093 }
        ]
    },

    // India → Japan
    {
        points: [
            { latitude: 19.0760, longitude: 72.8777 },
            { latitude: 35.6762, longitude: 139.6503 }
        ]
    },

    // India → South Africa
    {
        points: [
            { latitude: 19.0760, longitude: 72.8777 },
            { latitude: -26.2041, longitude: 28.0473 }
        ]
    }

];

// Create line series

const lineSeries = chart.series.push(

    am5map.MapLineSeries.new(root, {})

);

// Create each route

connections.forEach(function(route){

    lineSeries.pushDataItem({

        points: route.points

    });

});

// Style the lines

lineSeries.mapLines.template.setAll({

    stroke: am5.color(0xF5B530),

    strokeWidth:2,

strokeOpacity:.45,

strokeDasharray:[8,6],

stroke:am5.color(0xF5B530)

});

// Hover state

lineSeries.mapLines.template.states.create("hover",{

    strokeWidth:4,

    strokeOpacity:1

});

// Animate dashed lines

lineSeries.mapLines.template.animate({

    key:"strokeDashoffset",

    from:16,

    to:0,

    duration:900,

    loops:Infinity

});
/*==========================================================
FIELD ENGINEER MAP FINAL SETUP
==========================================================*/

// Initial Zoom & Center

chart.setAll({

    homeGeoPoint: {

        latitude:18,

        longitude:10

    },

    homeZoomLevel:1.05

});

// Go to Home Position

chart.goHome();


// ==========================================================
// LOAD ANIMATION
// ==========================================================

polygonSeries.appear(1000);

pointSeries.appear(1200);

lineSeries.appear(1400);

chart.appear(1500, 100);


// ==========================================================
// OPTIONAL AUTO ROTATION
// Uncomment if you want the globe to rotate automatically
// ==========================================================

/*

chart.animate({

    key: "rotationX",

    from: 0,

    to: 360,

    duration: 60000,

    loops: Infinity

});

*/


// ==========================================================
// WINDOW RESIZE
// ==========================================================

window.addEventListener("resize", function () {

    root.resize();

});


// ==========================================================
// CLEANUP
// ==========================================================

window.addEventListener("beforeunload", function () {

    root.dispose();

});


// ==========================================================
// END OF MAP
// ==========================================================

}); // am5.ready()

}); // DOMContentLoaded