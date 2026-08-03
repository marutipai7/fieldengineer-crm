


/**
 * Function to handle the "Select" -> "Selected" toggle
 * This uses event delegation, so it works even if you add more applicants dynamically.
 */
document.addEventListener('DOMContentLoaded', function () {

    const applicantButtons = document.querySelectorAll('.select-btn');

    applicantButtons.forEach(button => {
        button.addEventListener('click', function (event) {
            event.stopPropagation();

            // 2. Check if the button is currently in "Selected" state 
            // (Checking for the bg-light-green class)
            const isSelected = this.classList.contains('bg-light-green');

            if (!isSelected) {
                // --- ACTION: Change from "Select" to "Selected" ---

                // Change Colors: Light Green background, White text
                this.classList.remove('bg-warm-golden-orange', 'text-black');
                this.classList.add('bg-light-green', 'text-white');

                // Change Text & add the Icon
                this.innerHTML = `
                    <span class="material-symbols-outlined text-[20px] font-normal">check</span>
                    Selected
                `;

                // Ensure flex alignment is preserved
                this.classList.add('inline-flex', 'items-center', 'gap-1.5');

            } else {
                // --- ACTION: Change from "Selected" back to "Select" ---

                // Revert Colors: Warm Golden Orange background, Black text
                this.classList.remove('bg-light-green', 'text-white');
                this.classList.add('bg-warm-golden-orange', 'text-black');

                // Revert Text only (Remove icon)
                this.innerHTML = `Select`;

                // Remove flex classes if they are no longer needed
                this.classList.remove('inline-flex', 'items-center', 'gap-1.5');
            }
        });
    });




    // READY TO DEPLOY
    const statCards = document.querySelectorAll('.grid-cols-2 > article');

    // Store the original text content so we can split numbers from suffixes
    const statData = [];

    statCards.forEach((card) => {
        const valueElement = card.querySelector('p:first-child');
        const originalText = valueElement.innerText.trim();

        // Use regex to separate the number from any text (like 'K', '/5', '%')
        // Matches numbers (including decimals), then captures the rest as suffix
        const match = originalText.match(/^([\d.]+)(.*)$/);

        if (match) {
            statData.push({
                element: valueElement,
                targetNumber: parseFloat(match[1]),
                suffix: match[2], // Keeps things like 'K+', '/5', '%'
                currentNumber: 0,
                isAnimated: false
            });
        }
    });

    // Animation speed
    const animationDuration = 2000; // 2 seconds
    const steps = 60; // How many frames per second

    // Function to animate a single stat
    function animateStat(stat) {
        if (stat.isAnimated) return;
        stat.isAnimated = true;

        const increment = stat.targetNumber / (animationDuration / (1000 / steps));
        let current = 0;

        const timer = setInterval(() => {
            current += increment;

            if (current >= stat.targetNumber) {
                current = stat.targetNumber;
                clearInterval(timer);
            }

            // Update the text, ensuring it shows integers for large numbers, 
            // and keeps 1 decimal place for decimals (like 4.8)
            let displayNumber = current;
            if (Number.isInteger(stat.targetNumber)) {
                displayNumber = Math.floor(current);
            } else {
                displayNumber = current.toFixed(1);
            }

            stat.element.innerText = displayNumber + stat.suffix;
        }, 1000 / steps);
    }

    // Intersection Observer to trigger animation when scrolled into view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Find which stat this card belongs to
                const card = entry.target;
                const valueElement = card.querySelector('p:first-child');

                // Match it to our data array
                const stat = statData.find(s => s.element === valueElement);
                if (stat) {
                    animateStat(stat);
                }

                // Stop observing this card once animated
                observer.unobserve(card);
            }
        });
    }, {
        threshold: 0.3 // Trigger when 30% of the card is visible
    });

    // Start observing each stat card
    statCards.forEach((card) => {
        observer.observe(card);
    });

});
