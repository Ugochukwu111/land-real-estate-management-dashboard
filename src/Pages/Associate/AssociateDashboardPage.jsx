import "chart.js/auto";

import AnalyticsBarChart from "../../Components/Charts/AnalyticsBarChart";
import AnalyticsLineChart from "../../Components/Charts/AnalyticsLineChart";
import AnalyticsPieChart from "../../Components/Charts/AnalyticsPieChart";

import AnalyticsDashboardLayout from "../../Components/Charts/AnalyticsDashboardLayout";

export default function AssociateDashBoardPage() {
  const months = ["Apr", "May", "Jun", "Jul", "Aug"];

  return (
    <AnalyticsDashboardLayout

      lineChart={
        <AnalyticsLineChart
          title="Monthly Commission"
          labels={months}
          datasetLabel="Commission Earned"
          data={[200, 450, 300, 700, 500]}
          color="#d3a23e"
          fillColor="rgba(211, 162, 62, 0.15)"
        />
      }

      barChart={
        <AnalyticsBarChart
          title="Referrals"
          labels={months}
          datasetLabel="Successful Referrals"
          data={[2, 4, 1, 7, 3]}
          color="#733939"
        />
      }

      doughnutChart={
        <AnalyticsPieChart
          title="Lead Status"
          labels={["Converted", "Pending", "Lost"]}
          data={[12, 7, 3]}
          colors={["green", "#d3a23e", "#733939"]}
        />
      }

    />
  );
}