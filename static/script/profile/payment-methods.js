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
