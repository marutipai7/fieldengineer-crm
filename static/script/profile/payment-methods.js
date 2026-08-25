const data = [30, 42, 52, 46, 68, 56];
const labels = [
  "Jan 2026",
  "Feb 2026",
  "Mar 2026",
  "Apr 2026",
  "May 2026",
  "Jun 2026",
];

const dataLabelsPlugin = {
  id: "dataLabelsPlugin",
  afterDatasetsDraw(chart) {
    const { ctx } = chart;
    chart.data.datasets.forEach((dataset, i) => {
      const meta = chart.getDatasetMeta(i);
      meta.data.forEach((bar, index) => {
        const value = dataset.data[index];
        ctx.save();
        ctx.font = "bold 13px Arial";
        ctx.fillStyle = "#111";
        ctx.textAlign = "center";
        ctx.fillText("Rs." + value + "K", bar.x, bar.y - 10);
        ctx.restore();
      });
    });
  },
};

const ctx = document.getElementById("revenueChart").getContext("2d");
new Chart(ctx, {
  type: "bar",
  data: {
    labels: labels,
    datasets: [
      {
        label: "Revenue",
        data: data,
        backgroundColor: "#FFC949",
        borderRadius: 0,
        barPercentage: 0.35,
        categoryPercentage: 0.8,
      },
    ],
  },
  options: {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true },
    },
    scales: {
      y: {
        min: 0,
        max: 80,
        ticks: {
          stepSize: 20,
          callback: function (value) {
            return "Rs." + value + "K";
          },
          color: "#333",
          font: { size: 12 },
        },
        grid: {
          color: "#eeeeee",
        },
        title: {
          display: true,
          text: "Total spend in Rupees",
          color: "#333",
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: "#333",
          font: { size: 12 },
        },
      },
    },
    layout: {
      padding: { top: 30 },
    },
  },
  plugins: [dataLabelsPlugin],
});

document.addEventListener("DOMContentLoaded", function() {
    // Tab functionality
    const tabs = document.querySelectorAll(".filter-tab");
    const rows = document.querySelectorAll(".invoice-row");

    tabs.forEach(tab => {
        tab.addEventListener("click", () => {
            // Remove active classes from all tabs
            tabs.forEach(t => t.classList.remove("bg-primary-yellow!", "active-tab"));
            tabs.forEach(t => t.querySelector("span").classList.remove("text-white"));
            tabs.forEach(t => t.querySelector("span").classList.add("text-granite-gray"));

            // Add active classes to clicked tab
            tab.classList.add("bg-primary-yellow!", "active-tab");
            tab.querySelector("span").classList.remove("text-granite-gray");
            tab.querySelector("span").classList.add("text-white");

            const status = tab.getAttribute("data-status");
            const searchInput = document.getElementById("invoiceSearchInput");
            const searchTerm = searchInput ? searchInput.value.toLowerCase() : "";

            // Filter rows
            rows.forEach(row => {
                const invoiceId = row.querySelector("td").textContent.toLowerCase().trim();
                const matchesSearch = invoiceId.includes(searchTerm);
                if ((status === "all" || row.getAttribute("data-status") === status) && matchesSearch) {
                    row.style.display = "";
                } else {
                    row.style.display = "none";
                }
            });
        });
    });

    // Initialize first tab as active
    const allTab = document.querySelector('.filter-tab[data-status="all"]');
    if (allTab) {
        allTab.classList.add("bg-primary-yellow!");
        allTab.querySelector("span").classList.remove("text-granite-gray");
        allTab.querySelector("span").classList.add("text-white");
    }

    // Search functionality
    const searchInput = document.getElementById("invoiceSearchInput");
    if (searchInput) {
        searchInput.addEventListener("input", function(e) {
            const searchTerm = e.target.value.toLowerCase();
            const activeStatus = document.querySelector('.filter-tab.active-tab')?.getAttribute('data-status') || 'all';

            rows.forEach(row => {
                const invoiceId = row.querySelector("td").textContent.toLowerCase().trim();
                const matchesSearch = invoiceId.includes(searchTerm);
                const matchesStatus = (activeStatus === "all" || row.getAttribute("data-status") === activeStatus);

                if (matchesSearch && matchesStatus) {
                    row.style.display = "";
                } else {
                    row.style.display = "none";
                }
            });
        });
    }

    // Flatpickr initialization
    if (typeof flatpickr !== 'undefined') {
        document.querySelectorAll(".date-picker-btn").forEach(btn => {
            const fp = flatpickr(btn, {
                mode: "range",
                dateFormat: "M j, Y",
                onChange: function(selectedDates, dateStr, instance) {
                    const pTag = instance.element.querySelector('p');
                    if (pTag) {
                        pTag.textContent = dateStr ? dateStr : "Date Range";
                    }
                }
            });
            btn.addEventListener("click", (e) => {
                e.preventDefault();
                fp.open();
            });
        });
    }

    // Modal functionality
    const modal = document.getElementById("invoiceModal");
    const closeBtn = document.getElementById("closeInvoiceModal");
    const downloadIcons = document.querySelectorAll("td span.cursor-pointer");

    downloadIcons.forEach(icon => {
        if (icon.textContent.trim() === "download") {
            icon.addEventListener("click", () => {
                if (modal) {
                    modal.classList.remove("hidden");
                    modal.classList.add("flex");
                }
            });
        }
    });

    if (closeBtn && modal) {
        closeBtn.addEventListener("click", () => {
            modal.classList.add("hidden");
            modal.classList.remove("flex");
        });
    }

    // Close when clicking outside the modal content
    window.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.classList.add("hidden");
            modal.classList.remove("flex");
        }
    });
    // Add Payment Modal functionality
    const addPaymentBtn = document.querySelector(".addPaymentBtn");
    const addPaymentModal = document.getElementById("addPaymentModal");
    
    if (addPaymentBtn && addPaymentModal) {
        addPaymentBtn.addEventListener("click", () => {
            addPaymentModal.classList.remove("hidden");
            addPaymentModal.classList.add("flex");
        });
    }

    if (addPaymentModal) {
        // Close when clicking outside
        addPaymentModal.addEventListener("click", (e) => {
            if (e.target === addPaymentModal) {
                addPaymentModal.classList.add("hidden");
                addPaymentModal.classList.remove("flex");
            }
        });
        
        // Close when clicking the close button
        const closeAddPaymentModalBtn = document.getElementById("closeAddPaymentModalBtn");
        const cancelPaymentBtn = document.getElementById("cancelPaymentBtn");
        const savePaymentBtn = document.getElementById("savePaymentBtn");
        
        const closePaymentModal = () => {
            addPaymentModal.classList.add("hidden");
            addPaymentModal.classList.remove("flex");
        };

        if (closeAddPaymentModalBtn) {
            closeAddPaymentModalBtn.addEventListener("click", closePaymentModal);
        }
        if (cancelPaymentBtn) {
            cancelPaymentBtn.addEventListener("click", closePaymentModal);
        }
        if (savePaymentBtn) {
            savePaymentBtn.addEventListener("click", () => {
                const selectedMethod = document.querySelector('input[name="payment_method"]:checked')?.value;
                const mainPaymentContent = document.getElementById("mainPaymentContent");
                
                if (selectedMethod === 'card') {
                    const addCardMainContent = document.getElementById("addCardMainContent");
                    if (mainPaymentContent && addCardMainContent) {
                        mainPaymentContent.classList.add("hidden");
                        addCardMainContent.classList.remove("hidden");
                    }
                } else if (selectedMethod === 'upi') {
                    const addUpiMainContent = document.getElementById("addUpiMainContent");
                    if (mainPaymentContent && addUpiMainContent) {
                        mainPaymentContent.classList.add("hidden");
                        addUpiMainContent.classList.remove("hidden");
                    }
                } else if (selectedMethod === 'netbanking') {
                    const addNetbankingMainContent = document.getElementById("addNetbankingMainContent");
                    if (mainPaymentContent && addNetbankingMainContent) {
                        mainPaymentContent.classList.add("hidden");
                        addNetbankingMainContent.classList.remove("hidden");
                    }
                } else if (selectedMethod === 'wallet') {
                    const addWalletMainContent = document.getElementById("addWalletMainContent");
                    if (mainPaymentContent && addWalletMainContent) {
                        mainPaymentContent.classList.add("hidden");
                        addWalletMainContent.classList.remove("hidden");
                    }
                }
                closePaymentModal();
            });
        }

        const cancelAddCardBtn = document.getElementById("cancelAddCardBtn");
        if (cancelAddCardBtn) {
            cancelAddCardBtn.addEventListener("click", () => {
                const mainPaymentContent = document.getElementById("mainPaymentContent");
                const addCardMainContent = document.getElementById("addCardMainContent");
                if (mainPaymentContent && addCardMainContent) {
                    addCardMainContent.classList.add("hidden");
                    mainPaymentContent.classList.remove("hidden");
                }
            });
        }

        const cancelUpiBtn = document.getElementById("cancelUpiBtn");
        if (cancelUpiBtn) {
            cancelUpiBtn.addEventListener("click", () => {
                const mainPaymentContent = document.getElementById("mainPaymentContent");
                const addUpiMainContent = document.getElementById("addUpiMainContent");
                if (mainPaymentContent && addUpiMainContent) {
                    addUpiMainContent.classList.add("hidden");
                    mainPaymentContent.classList.remove("hidden");
                }
            });
        }

        const cancelNetbankingBtn = document.getElementById("cancelNetbankingBtn");
        if (cancelNetbankingBtn) {
            cancelNetbankingBtn.addEventListener("click", () => {
                const mainPaymentContent = document.getElementById("mainPaymentContent");
                const addNetbankingMainContent = document.getElementById("addNetbankingMainContent");
                if (mainPaymentContent && addNetbankingMainContent) {
                    addNetbankingMainContent.classList.add("hidden");
                    mainPaymentContent.classList.remove("hidden");
                }
            });
        }

        const switchToEditNetbankingBtn = document.getElementById("switchToEditNetbankingBtn");
        if (switchToEditNetbankingBtn) {
            switchToEditNetbankingBtn.addEventListener("click", () => {
                const addNetbankingMainContent = document.getElementById("addNetbankingMainContent");
                const editNetbankingMainContent = document.getElementById("editNetbankingMainContent");
                if (addNetbankingMainContent && editNetbankingMainContent) {
                    addNetbankingMainContent.classList.add("hidden");
                    editNetbankingMainContent.classList.remove("hidden");
                }
            });
        }

        const cancelEditNetbankingBtn = document.getElementById("cancelEditNetbankingBtn");
        if (cancelEditNetbankingBtn) {
            cancelEditNetbankingBtn.addEventListener("click", () => {
                const mainPaymentContent = document.getElementById("mainPaymentContent");
                const editNetbankingMainContent = document.getElementById("editNetbankingMainContent");
                if (mainPaymentContent && editNetbankingMainContent) {
                    editNetbankingMainContent.classList.add("hidden");
                    mainPaymentContent.classList.remove("hidden");
                }
            });
        }

        const cancelWalletBtn = document.getElementById("cancelWalletBtn");
        if (cancelWalletBtn) {
            cancelWalletBtn.addEventListener("click", () => {
                const mainPaymentContent = document.getElementById("mainPaymentContent");
                const addWalletMainContent = document.getElementById("addWalletMainContent");
                if (mainPaymentContent && addWalletMainContent) {
                    addWalletMainContent.classList.add("hidden");
                    mainPaymentContent.classList.remove("hidden");
                }
            });
        }

        const walletOptions = document.querySelectorAll('.wallet-option');
        let selectedWallet = 'paytm'; // default
        if (walletOptions.length > 0) {
            walletOptions.forEach(option => {
                option.addEventListener('click', () => {
                    // Reset all options
                    walletOptions.forEach(opt => {
                        opt.classList.remove('border-[#FFC949]', 'bg-[#FFFBF0]');
                        opt.classList.add('border-gray-200', 'bg-white', 'hover:bg-gray-50');
                        
                        const radioIcon = opt.querySelector('span:last-child');
                        radioIcon.textContent = 'radio_button_unchecked';
                        radioIcon.classList.remove('text-[#FFC949]');
                        radioIcon.classList.add('text-gray-300');
                    });
                    
                    // Set selected option
                    option.classList.remove('border-gray-200', 'bg-white', 'hover:bg-gray-50');
                    option.classList.add('border-[#FFC949]', 'bg-[#FFFBF0]');
                    
                    const selectedRadioIcon = option.querySelector('span:last-child');
                    selectedRadioIcon.textContent = 'radio_button_checked';
                    selectedRadioIcon.classList.remove('text-gray-300');
                    selectedRadioIcon.classList.add('text-[#FFC949]');
                    
                    selectedWallet = option.getAttribute('data-wallet');
                });
            });
        }

        const proceedToPayWalletBtn = document.getElementById("proceedToPayWalletBtn");
        const verifyOtpModal = document.getElementById("verifyOtpModal");
        if (proceedToPayWalletBtn && verifyOtpModal) {
            proceedToPayWalletBtn.addEventListener("click", () => {
                if (selectedWallet === 'paytm') {
                    verifyOtpModal.classList.remove("hidden");
                    verifyOtpModal.classList.add("flex");
                }
            });
        }

        const cancelVerifyOtpBtn = document.getElementById("cancelVerifyOtpBtn");
        if (cancelVerifyOtpBtn && verifyOtpModal) {
            cancelVerifyOtpBtn.addEventListener("click", () => {
                verifyOtpModal.classList.add("hidden");
                verifyOtpModal.classList.remove("flex");
            });
        }

        const verifyOtpSubmitBtn = document.getElementById("verifyOtpSubmitBtn");
        const successModal = document.getElementById("successModal");
        if (verifyOtpSubmitBtn && successModal && verifyOtpModal) {
            verifyOtpSubmitBtn.addEventListener("click", () => {
                verifyOtpModal.classList.add("hidden");
                verifyOtpModal.classList.remove("flex");
                successModal.classList.remove("hidden");
                successModal.classList.add("flex");
            });
        }

        const successDoneBtn = document.getElementById("successDoneBtn");
        const addAnotherPaymentBtn = document.getElementById("addAnotherPaymentBtn");
        const mainPaymentContent = document.getElementById("mainPaymentContent");
        const addWalletMainContent = document.getElementById("addWalletMainContent");
        
        if (successDoneBtn && successModal) {
            successDoneBtn.addEventListener("click", () => {
                successModal.classList.add("hidden");
                successModal.classList.remove("flex");
                if (addWalletMainContent && mainPaymentContent) {
                    addWalletMainContent.classList.add("hidden");
                    mainPaymentContent.classList.remove("hidden");
                }
            });
        }

        if (addAnotherPaymentBtn && successModal) {
            addAnotherPaymentBtn.addEventListener("click", () => {
                successModal.classList.add("hidden");
                successModal.classList.remove("flex");
                if (addWalletMainContent && mainPaymentContent) {
                    addWalletMainContent.classList.add("hidden");
                    mainPaymentContent.classList.remove("hidden");
                }
            });
        }

        const editExistingUpiBtn = document.querySelector(".editExistingUpiBtn");
        if (editExistingUpiBtn) {
            editExistingUpiBtn.addEventListener("click", () => {
                const mainPaymentContent = document.getElementById("mainPaymentContent");
                const editUpiMainContent = document.getElementById("editUpiMainContent");
                if (mainPaymentContent && editUpiMainContent) {
                    mainPaymentContent.classList.add("hidden");
                    editUpiMainContent.classList.remove("hidden");
                }
            });
        }

        const cancelEditUpiBtn = document.getElementById("cancelEditUpiBtn");
        if (cancelEditUpiBtn) {
            cancelEditUpiBtn.addEventListener("click", () => {
                const mainPaymentContent = document.getElementById("mainPaymentContent");
                const editUpiMainContent = document.getElementById("editUpiMainContent");
                if (mainPaymentContent && editUpiMainContent) {
                    editUpiMainContent.classList.add("hidden");
                    mainPaymentContent.classList.remove("hidden");
                }
            });
        }

        const editExistingCardBtn = document.querySelector(".editExistingCardBtn");
        if (editExistingCardBtn) {
            editExistingCardBtn.addEventListener("click", () => {
                const mainPaymentContent = document.getElementById("mainPaymentContent");
                const editCardMainContent = document.getElementById("editCardMainContent");
                if (mainPaymentContent && editCardMainContent) {
                    mainPaymentContent.classList.add("hidden");
                    editCardMainContent.classList.remove("hidden");
                }
            });
        }

        const switchToEditCardBtn = document.getElementById("switchToEditCardBtn");
        if (switchToEditCardBtn) {
            switchToEditCardBtn.addEventListener("click", () => {
                const addCardMainContent = document.getElementById("addCardMainContent");
                const editCardMainContent = document.getElementById("editCardMainContent");
                if (addCardMainContent && editCardMainContent) {
                    addCardMainContent.classList.add("hidden");
                    editCardMainContent.classList.remove("hidden");
                }
            });
        }

        const switchToEditUpiBtn = document.getElementById("switchToEditUpiBtn");
        if (switchToEditUpiBtn) {
            switchToEditUpiBtn.addEventListener("click", () => {
                const addUpiMainContent = document.getElementById("addUpiMainContent");
                const editUpiMainContent = document.getElementById("editUpiMainContent");
                if (addUpiMainContent && editUpiMainContent) {
                    addUpiMainContent.classList.add("hidden");
                    editUpiMainContent.classList.remove("hidden");
                }
            });
        }

        const cancelEditCardBtn = document.getElementById("cancelEditCardBtn");
        if (cancelEditCardBtn) {
            cancelEditCardBtn.addEventListener("click", () => {
                const mainPaymentContent = document.getElementById("mainPaymentContent");
                const editCardMainContent = document.getElementById("editCardMainContent");
                if (mainPaymentContent && editCardMainContent) {
                    editCardMainContent.classList.add("hidden");
                    mainPaymentContent.classList.remove("hidden");
                }
            });
        }

        // Radio button logic
        const paymentOptions = addPaymentModal.querySelectorAll(".payment-option");
        paymentOptions.forEach(option => {
            option.addEventListener("click", function() {
                // Reset all
                paymentOptions.forEach(opt => {
                    opt.classList.remove("border-[#E5F0FF]", "bg-[#F4F9FF]");
                    opt.classList.add("border-transparent");
                    
                    const radio = opt.querySelector(".radio-custom");
                    if (radio) {
                        radio.classList.remove("border-primary-yellow");
                        radio.classList.add("border-gray-300");
                        const innerDot = radio.querySelector(".inner-dot");
                        if (innerDot) innerDot.classList.add("hidden");
                    }

                    const icon = opt.querySelector(".material-symbols-outlined");
                    if (icon) {
                        icon.classList.remove("text-primary-yellow");
                        icon.classList.add("text-gray-500");
                    }
                });

                // Set active
                this.classList.remove("border-transparent");
                this.classList.add("border-[#E5F0FF]", "bg-[#F4F9FF]");
                
                const radio = this.querySelector(".radio-custom");
                if (radio) {
                    radio.classList.remove("border-gray-300");
                    radio.classList.add("border-primary-yellow");
                    const innerDot = radio.querySelector(".inner-dot");
                    if (innerDot) innerDot.classList.remove("hidden");
                }

                const icon = this.querySelector(".material-symbols-outlined");
                if (icon) {
                    icon.classList.remove("text-gray-500");
                    icon.classList.add("text-primary-yellow");
                }
            });
        });
    }
});

   document.addEventListener("DOMContentLoaded", function () {

    /*
    ============================================================
       PAYMENT METHODS
    ============================================================
    */

    const menuButtons =
        document.querySelectorAll(".payment-menu-btn");

    const paymentMenus =
        document.querySelectorAll(".payment-action-menu");


    /*
    ============================================================
       CLOSE ALL PAYMENT MENUS
    ============================================================
    */

    function closeAllPaymentMenus() {

        paymentMenus.forEach(function (menu) {

            menu.classList.add("hidden");

        });


        menuButtons.forEach(function (button) {

            button.setAttribute(
                "aria-expanded",
                "false"
            );

        });

    }


    /*
    ============================================================
       THREE-DOT MENU
    ============================================================
    */

    menuButtons.forEach(function (button) {

        button.addEventListener("click", function (event) {

            event.stopPropagation();


            const menuId =
                button.getAttribute(
                    "data-payment-menu"
                );


            const selectedMenu =
                document.getElementById(menuId);


            if (!selectedMenu) {
                return;
            }


            const isOpen =
                !selectedMenu.classList.contains(
                    "hidden"
                );


            /*
            Close all other menus
            */
            closeAllPaymentMenus();


            /*
            Open selected menu
            */
            if (!isOpen) {

                selectedMenu.classList.remove(
                    "hidden"
                );


                button.setAttribute(
                    "aria-expanded",
                    "true"
                );

            }

        });

    });


    /*
    ============================================================
       PREVENT MENU CLICK FROM CLOSING MENU
    ============================================================
    */

    paymentMenus.forEach(function (menu) {

        menu.addEventListener("click", function (event) {

            event.stopPropagation();

        });

    });


    /*
    ============================================================
       CLICK OUTSIDE → CLOSE MENU
    ============================================================
    */

    document.addEventListener("click", function () {

        closeAllPaymentMenus();

    });


    /*
    ============================================================
       SET AS PRIMARY
    ============================================================
    */

    const primaryButtons =
        document.querySelectorAll(
            ".set-primary-btn"
        );


    primaryButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const paymentName =
                button.getAttribute(
                    "data-payment-name"
                );


            /*
            Remove existing Primary badges
            */
            document
                .querySelectorAll(".primary-badge")
                .forEach(function (badge) {

                    badge.remove();

                });


            /*
            Find payment method
            */
            const paymentMethods =
                document.querySelectorAll(
                    ".payment-method"
                );


            paymentMethods.forEach(function (paymentMethod) {

                const paymentText =
                    paymentMethod.innerText;


                if (
                    paymentText.includes(
                        paymentName
                    )
                ) {


                    /*
                    Find right-side container
                    */
                    const rightSide =
                        paymentMethod.querySelector(
                            ".flex.items-center.gap-3.shrink-0"
                        );


                    if (!rightSide) {
                        return;
                    }


                    /*
                    Create Primary badge
                    */
                    const primaryBadge =
                        document.createElement(
                            "div"
                        );


                    primaryBadge.className =
                        "primary-badge w-15 h-5.5 flex items-center justify-center rounded-full bg-[#E5F7F1]";


                    primaryBadge.innerHTML = `
                        <p class="font-normal text-xs text-[#00B884]">
                            Primary
                        </p>
                    `;


                    /*
                    Add badge before three-dot button
                    */
                    rightSide.insertBefore(
                        primaryBadge,
                        rightSide.firstChild
                    );

                }

            });


            /*
            Close menu
            */
            closeAllPaymentMenus();

        });

    });


    /*
    ============================================================
       EDIT PAYMENT
    ============================================================
    */

    const editButtons =
        document.querySelectorAll(
            ".edit-payment-btn"
        );


    editButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const paymentName =
                button.getAttribute(
                    "data-payment-name"
                );


            console.log(
                "Edit payment method:",
                paymentName
            );


            /*
            Your edit modal/function
            can be added here later.
            */


            closeAllPaymentMenus();

        });

    });


    /*
    ============================================================
       DELETE PAYMENT
    ============================================================
    */

    const deleteButtons =
        document.querySelectorAll(
            ".delete-payment-btn"
        );


    deleteButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const paymentName =
                button.getAttribute(
                    "data-payment-name"
                );


            /*
            Confirmation
            */
            const confirmed =
                window.confirm(
                    "Are you sure you want to delete " +
                    paymentName +
                    "?"
                );


            if (!confirmed) {
                return;
            }


            /*
            Find payment method
            */
            const paymentMethods =
                document.querySelectorAll(
                    ".payment-method"
                );


            paymentMethods.forEach(function (paymentMethod) {

                const paymentText =
                    paymentMethod.innerText;


                if (
                    paymentText.includes(
                        paymentName
                    )
                ) {

                    paymentMethod.remove();

                }

            });


            /*
            Close menu
            */
            closeAllPaymentMenus();

        });

    });

});
/* =========================================================
   INVOICE VIEW + DOWNLOAD + PDF
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    console.log("Invoice system loaded");


    /* =====================================================
       ELEMENTS
    ===================================================== */

    const invoiceModal =
        document.getElementById("invoiceModal");

    const closeInvoiceModal =
        document.getElementById("closeInvoiceModal");

    const invoiceContent =
        document.getElementById("invoiceContent");

    const modalDownloadInvoice =
        document.getElementById("modalDownloadInvoice");

    const invoiceModalId =
        document.getElementById("invoiceModalId");

    const invoiceNumber =
        document.getElementById("invoiceNumber");

    const invoiceBookingId =
        document.getElementById("invoiceBookingId");

    const invoiceDate =
        document.getElementById("invoiceDate");

    const invoiceService =
        document.getElementById("invoiceService");

    const invoiceStatus =
        document.getElementById("invoiceStatus");

    const invoiceDescription =
        document.getElementById("invoiceDescription");

    const invoiceAmount =
        document.getElementById("invoiceAmount");

    const invoiceSubtotal =
        document.getElementById("invoiceSubtotal");

    const invoiceTotal =
        document.getElementById("invoiceTotal");


    /* =====================================================
       INVOICE DATA
    ===================================================== */

    const invoiceData = {

        "INV-2026-001": {
            bookingId: "BK-5684",
            service: "Network Cabling",
            amount: "Rs. 5,730",
            status: "Paid",
            date: "15 May 2026"
        },

        "INV-2026-002": {
            bookingId: "BK-5684",
            service: "Rack Installation",
            amount: "Rs. 5,730",
            status: "Paid",
            date: "15 May 2026"
        },

        "INV-2026-003": {
            bookingId: "BK-5684",
            service: "CCTV Installation",
            amount: "Rs. 5,730",
            status: "Pending",
            date: "15 May 2026"
        },

        "INV-2026-004": {
            bookingId: "BK-5684",
            service: "Fiber Optic",
            amount: "Rs. 5,730",
            status: "Pending",
            date: "15 May 2026"
        },

        "INV-2026-005": {
            bookingId: "BK-5684",
            service: "Fiber Optic",
            amount: "Rs. 5,730",
            status: "Pending",
            date: "15 May 2026"
        },

        "INV-2026-006": {
            bookingId: "BK-5685",
            service: "Equipment Return",
            amount: "Rs. 2,150",
            status: "Refunded",
            date: "18 May 2026"
        },

        "INV-2026-007": {
            bookingId: "BK-5686",
            service: "Service Cancellation",
            amount: "Rs. 1,500",
            status: "Refunded",
            date: "20 May 2026"
        },

        "INV-2026-008": {
            bookingId: "BK-5687",
            service: "Site Survey",
            amount: "Rs. 3,200",
            status: "Refunded",
            date: "22 May 2026"
        },

        "INV-2026-009": {
            bookingId: "BK-5688",
            service: "Equipment Maintenance",
            amount: "Rs. 1,800",
            status: "Refunded",
            date: "25 May 2026"
        }

    };


    /* =====================================================
       OPEN INVOICE POPUP
    ===================================================== */

    function openInvoiceModal(invoiceId) {

        if (!invoiceModal) {

            console.error(
                "#invoiceModal not found"
            );

            return;

        }


        const invoice =
            invoiceData[invoiceId];


        if (!invoice) {

            console.error(
                "Invoice data not found:",
                invoiceId
            );

            return;

        }


        /* =================================================
           FILL INVOICE DETAILS
        ================================================= */

        if (invoiceModalId) {

            invoiceModalId.textContent =
                invoiceId;

        }


        if (invoiceNumber) {

            invoiceNumber.textContent =
                invoiceId;

        }


        if (invoiceBookingId) {

            invoiceBookingId.textContent =
                invoice.bookingId;

        }


        if (invoiceDate) {

            invoiceDate.textContent =
                invoice.date;

        }


        if (invoiceService) {

            invoiceService.textContent =
                invoice.service;

        }


        if (invoiceStatus) {

            invoiceStatus.textContent =
                invoice.status;

        }


        if (invoiceDescription) {

            invoiceDescription.textContent =
                invoice.service;

        }


        if (invoiceAmount) {

            invoiceAmount.textContent =
                invoice.amount;

        }


        if (invoiceSubtotal) {

            invoiceSubtotal.textContent =
                invoice.amount;

        }


        if (invoiceTotal) {

            invoiceTotal.textContent =
                invoice.amount;

        }


        /* =================================================
           STORE CURRENT INVOICE ID
           FOR POPUP DOWNLOAD BUTTON
        ================================================= */

        if (modalDownloadInvoice) {

            modalDownloadInvoice.dataset.invoice =
                invoiceId;

        }


        /* =================================================
           SHOW INVOICE POPUP
        ================================================= */

        invoiceModal.classList.remove(
            "hidden"
        );

        invoiceModal.classList.add(
            "flex"
        );

        document.body.classList.add(
            "overflow-hidden"
        );


        console.log(
            "Invoice popup opened:",
            invoiceId
        );

    }


    /* =====================================================
       CLOSE INVOICE POPUP
    ===================================================== */

    function closeInvoiceModalFunction() {

        if (!invoiceModal) {
            return;
        }


        invoiceModal.classList.add(
            "hidden"
        );

        invoiceModal.classList.remove(
            "flex"
        );

        document.body.classList.remove(
            "overflow-hidden"
        );

    }


    /* =====================================================
       VIEW BUTTON
       
       View icon → Open invoice popup
    ===================================================== */

    document
        .querySelectorAll(".invoice-view-btn")
        .forEach(function (button) {

            button.addEventListener(
                "click",
                function (event) {

                    event.preventDefault();

                    event.stopPropagation();


                    const invoiceId =
                        button.getAttribute(
                            "data-invoice"
                        );


                    if (!invoiceId) {

                        console.error(
                            "Invoice ID not found."
                        );

                        return;

                    }


                    openInvoiceModal(
                        invoiceId
                    );

                }
            );

        });


    /* =====================================================
   HISTORY DOWNLOAD BUTTON
   Download icon → OPEN INVOICE POPUP
===================================================== */

document
    .querySelectorAll(".invoice-download-btn")
    .forEach(function (button) {

        button.addEventListener(
            "click",
            function (event) {

                event.preventDefault();
                event.stopPropagation();

                const invoiceId =
                    button.getAttribute("data-invoice");

                if (!invoiceId) {
                    console.error("Invoice ID not found.");
                    return;
                }

                console.log(
                    "Opening invoice popup:",
                    invoiceId
                );

                /*
                 * IMPORTANT:
                 * Do NOT download PDF here.
                 * Only open the invoice popup.
                 */

                openInvoiceModal(invoiceId);

            }
        );

    });


    /* =====================================================
       POPUP DOWNLOAD BUTTON
       
       Popup Download button → DOWNLOAD PDF
    ===================================================== */

    if (modalDownloadInvoice) {

        modalDownloadInvoice.addEventListener(
            "click",
            async function (event) {

                event.preventDefault();

                event.stopPropagation();


                const invoiceId =
                    modalDownloadInvoice.dataset.invoice;


                if (!invoiceId) {

                    console.error(
                        "Current invoice ID not found."
                    );

                    alert(
                        "Invoice could not be identified."
                    );

                    return;

                }


                console.log(
                    "Downloading invoice PDF:",
                    invoiceId
                );


                await downloadInvoiceAsPDF(
                    invoiceId
                );

            }
        );

    }


    /* =====================================================
       DOWNLOAD INVOICE AS PDF
    ===================================================== */

    async function downloadInvoiceAsPDF(
        invoiceId
    ) {

        if (!invoiceContent) {

            console.error(
                "#invoiceContent not found"
            );

            alert(
                "Invoice content was not found."
            );

            return;

        }


        if (
            typeof html2pdf ===
            "undefined"
        ) {

            console.error(
                "html2pdf is not loaded."
            );

            alert(
                "Invoice PDF library is not loaded."
            );

            return;

        }


        console.log(
            "Generating PDF:",
            invoiceId
        );
        


        /* =================================================
           SAVE ORIGINAL STYLES
        ================================================= */

        const oldHeight =
            invoiceContent.style.height;

        const oldMaxHeight =
            invoiceContent.style.maxHeight;

        const oldOverflow =
            invoiceContent.style.overflow;

        const oldOverflowY =
            invoiceContent.style.overflowY;

        const oldWidth =
            invoiceContent.style.width;


        try {

            /* =============================================
               EXPAND INVOICE TEMPORARILY
            ============================================= */

            invoiceContent.style.height =
                "auto";

            invoiceContent.style.maxHeight =
                "none";

            invoiceContent.style.overflow =
                "visible";

            invoiceContent.style.overflowY =
                "visible";

            invoiceContent.style.width =
                "100%";


            /* =============================================
               WAIT FOR BROWSER RENDER
            ============================================= */

            await new Promise(function (resolve) {

                requestAnimationFrame(
                    function () {

                        requestAnimationFrame(
                            resolve
                        );

                    }
                );

            });


            /* =============================================
               PDF OPTIONS
            ============================================= */

            const options = {

                margin: 8,

                filename:
                    `${invoiceId}.pdf`,

                image: {

                    type: "jpeg",

                    quality: 0.98

                },

                html2canvas: {

                    scale: 2,

                    useCORS: true,

                    allowTaint: false,

                    backgroundColor:
                        "#ffffff",

                    scrollX: 0,

                    scrollY: 0,

                    windowWidth:
                        invoiceContent.scrollWidth

                },

                jsPDF: {

                    unit: "mm",

                    format: "a4",

                    orientation:
                        "portrait"

                },

                pagebreak: {

                    mode: [
                        "css",
                        "legacy"
                    ]

                }

            };


            /* =============================================
               GENERATE PDF
            ============================================= */

            await html2pdf()

                .set(options)

                .from(invoiceContent)

                .save();


            console.log(
                "PDF downloaded successfully:",
                invoiceId
            );

        }

        catch (error) {

            console.error(
                "Invoice PDF error:",
                error
            );

            alert(
                "Unable to download invoice."
            );

        }

        finally {

            /* =============================================
               RESTORE ORIGINAL STYLES
            ============================================= */

            invoiceContent.style.height =
                oldHeight;

            invoiceContent.style.maxHeight =
                oldMaxHeight;

            invoiceContent.style.overflow =
                oldOverflow;

            invoiceContent.style.overflowY =
                oldOverflowY;

            invoiceContent.style.width =
                oldWidth;

        }

    }


    /* =====================================================
       CLOSE BUTTON
    ===================================================== */

    if (closeInvoiceModal) {

        closeInvoiceModal.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                event.stopPropagation();


                closeInvoiceModalFunction();

            }
        );

    }


    /* =====================================================
       CLICK OUTSIDE POPUP
    ===================================================== */

    if (invoiceModal) {

        invoiceModal.addEventListener(
            "click",
            function (event) {

                if (
                    event.target ===
                    invoiceModal
                ) {

                    closeInvoiceModalFunction();

                }

            }
        );

    }


    /* =====================================================
       ESC KEY
    ===================================================== */

    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key ===
                "Escape"
            ) {

                if (
                    invoiceModal &&
                    !invoiceModal.classList.contains(
                        "hidden"
                    )
                ) {

                    closeInvoiceModalFunction();

                }

            }

        }
    );

});
/* =====================================================
   EDIT CARD - CREDIT / DEBIT TOGGLE
===================================================== */

const creditCardBtn =
    document.getElementById("creditCardBtn");

const debitCardBtn =
    document.getElementById("debitCardBtn");

const cardDetailsTitle =
    document.getElementById("cardDetailsTitle");


/* =====================================================
   CREDIT CARD
===================================================== */

if (creditCardBtn) {

    creditCardBtn.addEventListener(
        "click",
        function () {

            /* Active Credit */

            creditCardBtn.classList.add(
                "bg-[#FFC949]",
                "text-white"
            );

            creditCardBtn.classList.remove(
                "bg-white",
                "text-gray-600",
                "border",
                "border-gray-300"
            );


            /* Inactive Debit */

            debitCardBtn.classList.remove(
                "bg-[#FFC949]",
                "text-white"
            );

            debitCardBtn.classList.add(
                "bg-white",
                "text-gray-600",
                "border",
                "border-gray-300"
            );


            /* Change heading */

            if (cardDetailsTitle) {

                cardDetailsTitle.textContent =
                    "Credit Card Details";

            }

        }
    );

}


/* =====================================================
   DEBIT CARD
===================================================== */

if (debitCardBtn) {

    debitCardBtn.addEventListener(
        "click",
        function () {

            /* Active Debit */

            debitCardBtn.classList.add(
                "bg-[#FFC949]",
                "text-white"
            );

            debitCardBtn.classList.remove(
                "bg-white",
                "text-gray-600",
                "border",
                "border-gray-300"
            );


            /* Inactive Credit */

            creditCardBtn.classList.remove(
                "bg-[#FFC949]",
                "text-white"
            );

            creditCardBtn.classList.add(
                "bg-white",
                "text-gray-600",
                "border",
                "border-gray-300"
            );


            /* Change heading */

            if (cardDetailsTitle) {

                cardDetailsTitle.textContent =
                    "Debit Card Details";

            }

        }
    );

}


/* =====================================================
   PREVIOUS BUTTON
===================================================== */

const backToPaymentMethodsBtn =
    document.getElementById(
        "backToPaymentMethodsBtn"
    );


if (backToPaymentMethodsBtn) {

    backToPaymentMethodsBtn.addEventListener(
        "click",
        function () {

            /*
             * Go back to the previous page
             */

            window.history.back();

        }
    );

}


/* =====================================================
   CANCEL BUTTON
===================================================== */

const cancelEditCardBtn =
    document.getElementById(
        "cancelEditCardBtn"
    );


if (cancelEditCardBtn) {

    cancelEditCardBtn.addEventListener(
        "click",
        function () {

            window.history.back();

        }
    );

}
/* =====================================================
   CREDIT / DEBIT CARD SWITCH
===================================================== */

function selectCardType(type) {

    const creditBtn =
        document.getElementById("creditCardBtn");

    const debitBtn =
        document.getElementById("debitCardBtn");

    const title =
        document.getElementById("cardDetailsTitle");


    if (!creditBtn || !debitBtn) {
        console.error("Credit/Debit buttons not found");
        return;
    }


    if (type === "credit") {

        creditBtn.className =
            "bg-[#FFC949] text-white font-semibold text-sm py-2 px-4 rounded-full";

        debitBtn.className =
            "bg-white border border-gray-300 text-gray-600 font-semibold text-sm py-2 px-4 rounded-full";


        if (title) {
            title.innerText = "Credit Card Details";
        }

    }


    if (type === "debit") {

        debitBtn.className =
            "bg-[#FFC949] text-white font-semibold text-sm py-2 px-4 rounded-full";

        creditBtn.className =
            "bg-white border border-gray-300 text-gray-600 font-semibold text-sm py-2 px-4 rounded-full";


        if (title) {
            title.innerText = "Debit Card Details";
        }

    }

}


/* =====================================================
   PREVIOUS BUTTON
===================================================== */

function goBackFromEditCard() {

    window.history.back();

}
/* =====================================================
   UPI VALIDATION
===================================================== */

const upiIdInput =
    document.getElementById("upiIdInput");

const upiError =
    document.getElementById("upiError");

const upiSuccess =
    document.getElementById("upiSuccess");

const submitUpiBtn =
    document.getElementById("submitUpiBtn");

const cancelUpiBtn =
    document.getElementById("cancelUpiBtn");


/* =====================================================
   VALIDATE UPI ID
===================================================== */

function validateUpiId() {

    if (!upiIdInput) {
        return false;
    }


    /* Remove spaces from beginning/end */

    const upiId =
        upiIdInput.value.trim().toLowerCase();


    /* Put cleaned value back */

    upiIdInput.value = upiId;


    /* Reset messages */

    if (upiError) {
        upiError.classList.add("hidden");
        upiError.textContent = "";
    }

    if (upiSuccess) {
        upiSuccess.classList.add("hidden");
    }


    /* Remove previous border */

    upiIdInput.classList.remove(
        "border-red-500",
        "border-[#00B884]"
    );


    /* ================================================
       EMPTY CHECK
    ================================================= */

    if (!upiId) {

        showUpiError(
            "Please enter your UPI ID."
        );

        return false;

    }


    /* ================================================
       SPACE CHECK
    ================================================= */

    if (/\s/.test(upiId)) {

        showUpiError(
            "UPI ID cannot contain spaces."
        );

        return false;

    }


    /* ================================================
       UPI FORMAT
       
       Examples:
       name@upi
       rishi@oksbi
       user123@paytm
       abc.xyz@okaxis
    ================================================= */

    const upiRegex =
        /^[a-zA-Z0-9][a-zA-Z0-9._-]{1,99}@[a-zA-Z][a-zA-Z0-9._-]{1,49}$/;


    if (!upiRegex.test(upiId)) {

        showUpiError(
            "Please enter a valid UPI ID, for example example@upi."
        );

        return false;

    }


    /* ================================================
       @ CHECK
    ================================================= */

    const atCount =
        (upiId.match(/@/g) || []).length;


    if (atCount !== 1) {

        showUpiError(
            "UPI ID must contain only one @ symbol."
        );

        return false;

    }


    /* ================================================
       SUCCESS
    ================================================= */

    upiIdInput.classList.add(
        "border-[#00B884]"
    );


    if (upiSuccess) {

        upiSuccess.classList.remove(
            "hidden"
        );

    }


    return true;

}


/* =====================================================
   SHOW UPI ERROR
===================================================== */

function showUpiError(message) {

    if (upiError) {

        upiError.textContent =
            message;

        upiError.classList.remove(
            "hidden"
        );

    }


    if (upiSuccess) {

        upiSuccess.classList.add(
            "hidden"
        );

    }


    if (upiIdInput) {

        upiIdInput.classList.remove(
            "border-[#00B884]"
        );

        upiIdInput.classList.add(
            "border-red-500"
        );

    }

}


/* =====================================================
   LIVE VALIDATION
===================================================== */

if (upiIdInput) {

    upiIdInput.addEventListener(
        "input",
        function () {

            /*
             * Convert to lowercase
             * and remove spaces.
             */

            this.value =
                this.value
                    .toLowerCase()
                    .replace(/\s/g, "");


            /*
             * If user has entered something,
             * validate it.
             */

            if (this.value.length > 0) {

                validateUpiId();

            } else {

                if (upiError) {
                    upiError.classList.add("hidden");
                }

                if (upiSuccess) {
                    upiSuccess.classList.add("hidden");
                }

                this.classList.remove(
                    "border-red-500",
                    "border-[#00B884]"
                );

            }

        }
    );


    /* Validate when user leaves field */

    upiIdInput.addEventListener(
        "blur",
        function () {

            validateUpiId();

        }
    );

}


/* =====================================================
   VERIFY & SAVE
===================================================== */

if (submitUpiBtn) {

    submitUpiBtn.addEventListener(
        "click",
        function (event) {

            event.preventDefault();
            event.stopPropagation();


            /* Validate first */

            const isValid =
                validateUpiId();


            if (!isValid) {

                upiIdInput.focus();

                return;

            }


            /* =========================================
               VALID UPI FORMAT
            ========================================= */

            const upiId =
                upiIdInput.value.trim();


            console.log(
                "Valid UPI ID:",
                upiId
            );


            /*
             * At this point the frontend format
             * is valid.
             *
             * If you have a Django/API verification
             * endpoint, call it here to verify that
             * the UPI ID actually exists.
             */


            alert(
                "UPI ID format is valid."
            );


            /*
             * Your actual save/API code can go here.
             */

        }
    );

}


/* =====================================================
   CANCEL UPI
===================================================== */

if (cancelUpiBtn) {

    cancelUpiBtn.addEventListener(
        "click",
        function (event) {

            event.preventDefault();
            event.stopPropagation();


            if (upiIdInput) {

                upiIdInput.value = "";

                upiIdInput.classList.remove(
                    "border-red-500",
                    "border-[#00B884]"
                );

            }


            if (upiError) {

                upiError.classList.add(
                    "hidden"
                );

                upiError.textContent = "";

            }


            if (upiSuccess) {

                upiSuccess.classList.add(
                    "hidden"
                );

            }


            /*
             * Show payment methods screen again.
             */

            const paymentMethodsMainContent =
                document.getElementById(
                    "paymentMethodsMainContent"
                );

            const addUpiMainContent =
                document.getElementById(
                    "addUpiMainContent"
                );


            if (addUpiMainContent) {

                addUpiMainContent.classList.add(
                    "hidden"
                );

                addUpiMainContent.classList.remove(
                    "flex"
                );

            }


            if (paymentMethodsMainContent) {

                paymentMethodsMainContent.classList.remove(
                    "hidden"
                );

                paymentMethodsMainContent.classList.add(
                    "flex"
                );

            } else {

                window.history.back();

            }

        }
    );

}
