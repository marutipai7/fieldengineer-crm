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
