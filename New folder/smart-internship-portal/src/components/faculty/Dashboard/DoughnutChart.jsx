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
  { name: "TCS (40)", value: 40 },
  { name: "Infosys (35)", value: 35 },
  { name: "Wipro (30)", value: 30 },
  { name: "Accenture (25)", value: 25 },
  { name: "Capgemini (20)", value: 20 },
  { name: "Others (30)", value: 30 },
];

const colors = [
  "#2563EB",
  "#22C55E",
  "#F59E0B",
  "#8B5CF6",
  "#EF4444",
  "#4FD1C5",
];

function CompanyChart() {
  return (
    <div className="chart-card">

      <h3 className="chart-title">
        Company-wise Applications
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

export default CompanyChart;