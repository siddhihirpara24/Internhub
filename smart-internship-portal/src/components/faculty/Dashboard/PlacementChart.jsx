import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
} from "recharts";

import "./Charts.css";

const data = [
  { name: "Placed (70)", value: 70 },
  { name: "Failed (40)", value: 40 },
  { name: "Waiting (45)", value: 45 },
  { name: "Opt-Out (25)", value: 25 },
];

const colors = [
  "#22C55E",
  "#EF4444",
  "#F59E0B",
  "#60A5FA",
];

function PlacementChart() {
  return (
    <div className="chart-card">

      <h3 className="chart-title">
        Placement Status
      </h3>

      <ResponsiveContainer width="100%" height={260}>
        <PieChart>

          <Pie
            data={data}
            dataKey="value"
            innerRadius={45}
            outerRadius={75}
            paddingAngle={2}
          >
            {data.map((item,index)=>(
              <Cell key={index} fill={colors[index]} />
            ))}
          </Pie>

          <Tooltip />

          <Legend
            layout="vertical"
            align="right"
            verticalAlign="middle"
          />

        </PieChart>
      </ResponsiveContainer>

    </div>
  );
}

export default PlacementChart;