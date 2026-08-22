import "./Charts.css";

import BarChartCard from "./BarChart";
import DoughnutChart from "./DoughnutChart";
import PlacementChart from "./PlacementChart";

function Charts() {
  return (
    <div className="charts-container">

      <BarChartCard />

      <DoughnutChart />

      <PlacementChart />

    </div>
  );
}

export default Charts;