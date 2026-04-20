import { DashBoardLayout } from "../../Components/Admin/DashBoardLayout";
import { Chart as ChartJS } from "chart.js/auto";
import { Bar, Doughnut, Line } from "react-chartjs-2";

import "./AdminDashBoardPage.css";

export default function AdminDashBoardPage() {
  const maroon = "#733939";
  const gold = "#d3a23e";

  // 🔥 Gradient generator
  const getGradient = (ctx, chartArea, colorStart, colorEnd) => {
    const gradient = ctx.createLinearGradient(
      0,
      chartArea.bottom,
      0,
      chartArea.top,
    );
    gradient.addColorStop(0, colorStart);
    gradient.addColorStop(1, colorEnd);
    return gradient;
  };

  // 🔥 Premium chart options (WITH TOOLTIP)
  const premiumOptions = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: { mode: "index", intersect: false },

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
        titleColor: gold,
        bodyColor: "#fff",
        padding: 14,
        cornerRadius: 8,
        borderColor: gold,
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
          callback: (value) =>   value,
        },
      },
      x: {
        grid: { display: false },
        ticks: {
          color: "#666",
        },
      },
    },
  };

  // 🔥 Line chart data with gradient

  const dealsData = {
    labels: ["Apr", "May", "Jun", "july", "Aug"],
    datasets: [
      {
        label: "Deals Closed",
        data: [12, 19, 8, 25, 18, ], // realistic monthly deals
        borderColor: "#733939",
        backgroundColor: "rgba(115, 57, 57, 0.1)",
        tension: 0.3, // slight curve (professional)
        fill: true,
        pointRadius: 5,
        pointBackgroundColor: "#733939",
        pointHoverRadius: 7,
        borderWidth: 3,
      },
    ],
  };

  const dealsOptions = {
    responsive: true,
    maintainAspectRatio: false,

    plugins: {
      legend: {
        display: true,
        labels: {
          color: "#444",
          font: { weight: "600" },
        },
      },

      tooltip: {
        backgroundColor: "#111",
        titleColor: "#d3a23e",
        bodyColor: "#fff",
        borderColor: "#d3a23e",
        borderWidth: 1,
        callbacks: {
          label: (ctx) => `${ctx.raw} deals closed`,
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
    <DashBoardLayout isAdmin={true}>
      {/* 🔥 LINE CHART */}
      <div className="container">
      <div className="flex-1 chart">
         <h6 className="c">  Deals Closed per month</h6>
         <div className="h-full">
        <Line className="line-chart" data={dealsData} options={dealsOptions} />
        </div>
      </div>

      <div className="flex flex-1 gap-1  responsive-row">
        <div className="flex-1 chart">
          <h6 className="">Number of associates</h6>
          <div className="flex-1">
          <Bar
            data={{
              labels: [ "Apr", "May", "Jun", "july", "Aug"],
              datasets: [
                {
                  label: "Total Associates",
                  data: [5, 8, 6, 10, 9],
                  backgroundColor: maroon,
                  borderRadius: 8,
                },
              ],
            }}
            options={premiumOptions}
          />
          </div>
        </div>

        {/* 🔥 DOUGHNUT */}
        <div className="flex-1 chart">
          <h6 className="">Revenue, Commission, Profit</h6>
          <div className="h-full">
          <Doughnut
            data={{
              labels: ["Revenue", "Commission", "Profit"],
              datasets: [
                {
                  data: [500000, 120000, 380000],
                  backgroundColor: [maroon, gold, "green",],
                  borderWidth: 0,
                  cutout: "70%",
                },
              ],
            }}
            options={{
              plugins: {
                legend: {
                  position: "bottom",
                  labels: { color: "#444" },
                },
                tooltip: {
                  backgroundColor: "#111",
                  titleColor: gold,
                  bodyColor: "#fff",
                  padding: 12,
                  cornerRadius: 8,
                  callbacks: {
                    label: function (context) {
                      return `${context.label}: $${context.raw}`;
                    },
                  },
                },
              },
            }}
          />
          </div>
        </div>
      </div>
      </div>
    </DashBoardLayout>
  );
}
