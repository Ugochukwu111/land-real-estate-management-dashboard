import { Line } from "react-chartjs-2";

export default function AnalyticsLineChart({
  title,
  labels,
  datasetLabel,
  data,
  color = "#733939",
  fillColor = "rgba(115, 57, 57, 0.1)",
}) {
  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,

    interaction: {
      mode: "index",
      intersect: false,
    },

    plugins: {
      legend: {
        display: true,

        labels: {
          color: "#444",
          font: {
            weight: "600",
          },
        },
      },

      tooltip: {
        backgroundColor: "#111",
        titleColor: "#d3a23e",
        bodyColor: "#fff",
        borderColor: "#d3a23e",
        borderWidth: 1,
        padding: 14,
        cornerRadius: 8,

        callbacks: {
          label: (context) =>
            `${context.dataset.label}: ${context.raw.toLocaleString()}`,
        },
      },
    },

    scales: {
      y: {
        beginAtZero: true,

        ticks: {
          stepSize: 5,
          color: "#666",
        },

        grid: {
          color: "rgba(0,0,0,0.05)",
        },
      },

      x: {
        ticks: {
          color: "#666",
        },

        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <div className="flex-1 chart ">
      <h6>{title}</h6>

      <div className="h-full">
        <Line
          data={{
            labels,

            datasets: [
              {
                label: datasetLabel,
                data,
                borderColor: color,
                backgroundColor: fillColor,
                tension: 0.3,
                fill: true,
                pointRadius: 5,
                pointHoverRadius: 7,
                pointBackgroundColor: color,
                borderWidth: 3,
              },
            ],
          }}
          options={lineOptions}
        />
      </div>
    </div>
  );
}