import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LabelList,
} from "recharts";

const data = [
  { name: "Registered", value: 250 },
  { name: "Applied", value: 180 },
  { name: "Aptitude", value: 120 },
  { name: "Technical", value: 85 },
  { name: "HR", value: 70 },
  { name: "Placed", value: 70 },
];

function PlacementBarChart() {
  return (
    <div className="chart-card">
      <h3>Placement Progress</h3>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={data}
          margin={{
            top: 25,
            right: 20,
            left: 0,
            bottom: 20,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis
            dataKey="name"
            tick={{ fontSize: 12 }}
            interval={0}
          />

          <YAxis />

          <Tooltip />

          <Bar
            dataKey="value"
            fill="#2F66E5"
            radius={[5, 5, 0, 0]}
            barSize={60}
          >
            <LabelList
              dataKey="value"
              position="top"
              style={{
                fill: "#333",
                fontWeight: "600",
                fontSize: 14,
              }}
            />
          </Bar>

        </BarChart>
      </ResponsiveContainer>

    </div>
  );
}

export default PlacementBarChart;