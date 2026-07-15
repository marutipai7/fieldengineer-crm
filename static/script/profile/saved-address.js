document.addEventListener("DOMContentLoaded", function () {

    const filterBtn = document.querySelector(".filter-btn");
    const filterDropdown = document.querySelector(".filter-dropdown");
    const filterText = document.querySelector(".filter-text");
    const filterOptions = document.querySelectorAll(".filter-option");

    if (!filterBtn || !filterDropdown) return;

    // Toggle dropdown
    filterBtn.addEventListener("click", function (e) {
        e.stopPropagation();
        filterDropdown.classList.toggle("hidden");
    });

    // Select option
    filterOptions.forEach(function (option) {

        option.addEventListener("click", function () {

            filterText.textContent = this.textContent.trim();
            filterDropdown.classList.add("hidden");

        });

    });

    // Close when clicking outside
    document.addEventListener("click", function (e) {

        if (
            !filterBtn.contains(e.target) &&
            !filterDropdown.contains(e.target)
        ) {
            filterDropdown.classList.add("hidden");
        }

    });

});