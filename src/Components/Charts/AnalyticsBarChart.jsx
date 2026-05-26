import { Bar } from "react-chartjs-2";

export default function AnalyticsBarChart({
  title,
  labels,
  datasetLabel,
  data,
  color = "#733939",
}) {
  const premiumOptions = {
    responsive: true,
    maintainAspectRatio: false,

    interaction: {
      mode: "index",
      intersect: false,
    },

    plugins: {
      legend: {
        position: "top",

        labels: {
          color: "#444",
          font: {
            size: 12,
            weight: "600",
          },

          usePointStyle: true,
          padding: 20,
        },
      },

      tooltip: {
        backgroundColor: "#111",
        titleColor: "#d3a23e",
        bodyColor: "#fff",
        padding: 14,
        cornerRadius: 8,
        borderColor: "#d3a23e",
        borderWidth: 1,
        displayColors: true,

        callbacks: {
          label: function (context) {
            return `${context.dataset.label}: ${context.raw.toLocaleString()}`;
          },
        },
      },
    },

    scales: {
      y: {
        beginAtZero: true,

        grid: {
          color: "rgba(0,0,0,0.05)",
          drawBorder: false,
        },

        ticks: {
          color: "#666",
        },
      },

      x: {
        grid: {
          display: false,
        },

        ticks: {
          color: "#666",
        },
      },
    },
  };

  return (
    <div className="flex-1 chart">
      <h6>{title}</h6>

      <div className="h-full">
        <Bar
          data={{
            labels,

            datasets: [
              {
                label: datasetLabel,
                data,
                backgroundColor: color,
                borderRadius: 8,
              },
            ],
          }}
          options={premiumOptions}
        />
      </div>
    </div>
  );
}