import "./AnalyticsDashboardLayout.css";

export default function AnalyticsDashboardLayout({
  lineChart,
  barChart,
  doughnutChart,
}) {
  return (
    <div>
      <div className="container">
        {lineChart}

        {/* BAR + DOUGHNUT */}
        <div className="flex flex-1 gap-1 responsive-row">
          {barChart}
          {doughnutChart}
        </div>
      </div>
    </div>
  );
}
