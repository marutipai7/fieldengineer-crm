document.addEventListener("DOMContentLoaded", function () {

    console.log("Notification JS Loaded");


    /* =========================================================
       ELEMENTS
    ========================================================= */

    const notificationItems =
        document.querySelectorAll(".notification-item");

    const notificationTabs =
        document.querySelectorAll(".notification-tab");

    const filterCheckboxes =
        document.querySelectorAll(".filter-checkbox");

    const applyFiltersBtn =
        document.getElementById("applyFiltersBtn");

    const clearAllBtn =
        document.getElementById("clearAllBtn");

    const loadMoreBtn =
        document.getElementById("loadMoreBtn");

    const notificationList =
        document.getElementById("notificationList");

    const unreadCountText =
        document.getElementById("unreadCountText");

    const allCount =
        document.getElementById("allCount");


    /* =========================================================
       HELPER
    ========================================================= */

    function showItem(item) {
        item.style.display = "flex";
    }


    function hideItem(item) {
        item.style.display = "none";
    }


    /* =========================================================
       UPDATE GROUPS
    ========================================================= */

    function updateGroups() {

        const groups =
            document.querySelectorAll(".notification-group");

        groups.forEach(function (group) {

            const items =
                group.querySelectorAll(".notification-item");

            let visibleItems = 0;

            items.forEach(function (item) {

                if (item.style.display !== "none") {
                    visibleItems++;
                }

            });


            if (visibleItems === 0) {

                group.style.display = "none";

            } else {

                group.style.display = "";

            }

        });

    }


    /* =========================================================
       EMPTY MESSAGE
    ========================================================= */

    function updateEmptyMessage() {

        let visibleItems = 0;

        notificationItems.forEach(function (item) {

            if (item.style.display !== "none") {
                visibleItems++;
            }

        });


        let emptyMessage =
            document.getElementById(
                "notificationEmptyMessage"
            );


        if (!emptyMessage) {

            emptyMessage =
                document.createElement("div");

            emptyMessage.id =
                "notificationEmptyMessage";

            emptyMessage.className =
                "notification-empty";

            emptyMessage.textContent =
                "No notifications found.";

            notificationList.insertBefore(
                emptyMessage,
                notificationList.querySelector(
                    ".load-more-container"
                )
            );

        }


        if (visibleItems === 0) {

            emptyMessage.classList.add("show");

        } else {

            emptyMessage.classList.remove("show");

        }

    }


    /* =========================================================
       UPDATE UNREAD COUNT
    ========================================================= */

    function updateUnreadCount() {

        let unreadCount = 0;


        notificationItems.forEach(function (item) {

            if (
                item.classList.contains("unread")
            ) {
                unreadCount++;
            }

        });


        if (unreadCountText) {

            unreadCountText.textContent =
                unreadCount +
                " unread notifications";

        }


        if (allCount) {

            allCount.textContent =
                unreadCount;

        }

    }


    /* =========================================================
       SET ACTIVE TAB
    ========================================================= */

    function setActiveTab(activeTab) {

        notificationTabs.forEach(function (tab) {

            tab.classList.remove("active");

        });


        activeTab.classList.add("active");

    }


    /* =========================================================
       FILTER BY TAB
    ========================================================= */

    function filterByTab(category) {

        notificationItems.forEach(function (item) {

            if (category === "all") {

                showItem(item);

                return;

            }


            if (
                item.dataset.category === category
            ) {

                showItem(item);

            } else {

                hideItem(item);

            }

        });


        updateGroups();
        updateEmptyMessage();

    }


    /* =========================================================
       TAB CLICK
    ========================================================= */

    notificationTabs.forEach(function (tab) {

        tab.addEventListener(
            "click",
            function (event) {

                event.preventDefault();


                const selectedCategory =
                    tab.dataset.tab;


                console.log(
                    "Selected tab:",
                    selectedCategory
                );


                setActiveTab(tab);

                filterByTab(
                    selectedCategory
                );

            }
        );

    });


    /* =========================================================
       APPLY FILTERS
    ========================================================= */

    if (applyFiltersBtn) {

        applyFiltersBtn.addEventListener(
            "click",
            function (event) {

                event.preventDefault();


                const checkedFilters =
                    Array.from(
                        document.querySelectorAll(
                            ".filter-checkbox:checked"
                        )
                    );


                const unreadOnly =
                    checkedFilters.some(
                        function (checkbox) {

                            return checkbox.value === "unread";

                        }
                    );


                const selectedCategories =
                    checkedFilters
                        .map(function (checkbox) {

                            return checkbox.value;

                        })
                        .filter(function (value) {

                            return value !== "unread";

                        });


                notificationItems.forEach(
                    function (item) {

                        let shouldShow = true;


                        /* UNREAD */

                        if (
                            unreadOnly &&
                            !item.classList.contains("unread")
                        ) {

                            shouldShow = false;

                        }


                        /* CATEGORY */

                        if (
                            selectedCategories.length > 0
                        ) {

                            const category =
                                item.dataset.category;


                            if (
                                !selectedCategories.includes(
                                    category
                                )
                            ) {

                                shouldShow = false;

                            }

                        }


                        if (shouldShow) {

                            showItem(item);

                        } else {

                            hideItem(item);

                        }

                    }
                );


                updateGroups();
                updateEmptyMessage();


                /* Button feedback */

                const originalText =
                    applyFiltersBtn.textContent;


                applyFiltersBtn.textContent =
                    "Applied";


                setTimeout(function () {

                    applyFiltersBtn.textContent =
                        originalText;

                }, 1000);

            }
        );

    }


    /* =========================================================
       CLEAR ALL
    ========================================================= */

    if (clearAllBtn) {

        clearAllBtn.addEventListener(
            "click",
            function (event) {

                event.preventDefault();


                notificationItems.forEach(
                    function (item) {

                        item.classList.remove("unread");


                        /* Remove unread dot */

                        const dot =
                            item.querySelector(
                                ".unread-dot"
                            );


                        if (dot) {
                            dot.remove();
                        }

                    }
                );


                updateUnreadCount();


                clearAllBtn.querySelector(
                    "span"
                ).textContent = "All Cleared";


                setTimeout(function () {

                    clearAllBtn.querySelector(
                        "span"
                    ).textContent = "Clear All";

                }, 1200);

            }
        );

    }


    /* =========================================================
       LOAD MORE
    ========================================================= */

    if (loadMoreBtn) {

        loadMoreBtn.addEventListener(
            "click",
            function (event) {

                event.preventDefault();


                loadMoreBtn.textContent =
                    "No More Notifications";


                loadMoreBtn.disabled = true;

            }
        );

    }


    /* =========================================================
       CHECKBOX LOG
    ========================================================= */

    filterCheckboxes.forEach(
        function (checkbox) {

            checkbox.addEventListener(
                "change",
                function () {

                    console.log(
                        "Filter:",
                        this.value,
                        this.checked
                    );

                }
            );

        }
    );


    /* =========================================================
       INITIAL STATE
    ========================================================= */

    notificationItems.forEach(function (item) {

        showItem(item);

    });


    const allTab =
        document.querySelector(
            '.notification-tab[data-tab="all"]'
        );


    if (allTab) {

        setActiveTab(allTab);

    }


    updateUnreadCount();
    updateGroups();
    updateEmptyMessage();


    console.log(
        "Notification page initialized successfully"
    );

});