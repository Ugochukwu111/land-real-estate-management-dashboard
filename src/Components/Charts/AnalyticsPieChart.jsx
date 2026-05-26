import { Doughnut } from "react-chartjs-2";

export default function AnalyticsPieChart({
  title,
  labels,
  data,
  colors = ["#733939", "#d3a23e", "green"],
}) {
  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,

    plugins: {
      legend: {
        position: "bottom",

        labels: {
          color: "#444",
          padding: 20,
          usePointStyle: true,

          font: {
            size: 12,
            weight: "600",
          },
        },
      },

      tooltip: {
        backgroundColor: "#111",
        titleColor: "#d3a23e",
        bodyColor: "#fff",
        padding: 12,
        cornerRadius: 8,
        borderColor: "#d3a23e",
        borderWidth: 1,

        callbacks: {
          label: function (context) {
            return `${context.label}: ${context.raw.toLocaleString()}`;
          },
        },
      },
    },

    cutout: "70%",
  };

  return (
    <div className="flex-1 chart">
      <h6>{title}</h6>

      <div className=" h-full">
        <Doughnut
          data={{
            labels,

            datasets: [
              {
                data,
                backgroundColor: colors,
                borderWidth: 0,
              },
            ],
          }}
          options={doughnutOptions}
        />
      </div>
    </div>
  );
}