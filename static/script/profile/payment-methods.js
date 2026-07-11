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

            // Filter rows
            rows.forEach(row => {
                if (status === "all" || row.getAttribute("data-status") === status) {
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
});
