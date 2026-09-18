import { useEffect, useState } from "react";
import axios from "axios";
import { ResponsiveContainer, PieChart, Pie, Cell, Legend, Tooltip } from "recharts";
import "./Charts.css";

const colors = ["#22C55E", "#EF4444", "#F59E0B", "#60A5FA"];

function PlacementChart() {
  const [data, setData] = useState([
    { name: "Placed (0)", value: 0 }, { name: "Rejected (0)", value: 0 },
    { name: "Waiting (0)", value: 0 }, { name: "Opt-Out (0)", value: 0 },
  ]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get("http://localhost:8081/api/stats/dashboard");
        const s = res.data;
        setData([
          { name: `Placed (${s.placed || 0})`, value: s.placed || 0 },
          { name: `Rejected (${s.rejected || 0})`, value: s.rejected || 0 },
          { name: `Waiting (${s.waiting || 0})`, value: s.waiting || 0 },
          { name: `Opt-Out (${s.optedOut || 0})`, value: s.optedOut || 0 },
        ]);
      } catch (err) { console.error("Failed to fetch placement status stats", err); }
    };
    fetchStats();
  }, []);

  return (
    <div className="chart-card">
      <h3 className="chart-title">Placement Status</h3>
      <ResponsiveContainer width="100%" height={260}>
        <PieChart>
          <Pie data={data} dataKey="value" innerRadius={45} outerRadius={75} paddingAngle={2}>
            {data.map((item, index) => <Cell key={index} fill={colors[index % colors.length]} />)}
          </Pie>
          <Tooltip />
          <Legend layout="vertical" align="right" verticalAlign="middle" />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default PlacementChart;