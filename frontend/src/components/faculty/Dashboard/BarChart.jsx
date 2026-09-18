import { useEffect, useState } from "react";
import axios from "axios";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LabelList } from "recharts";

function PlacementBarChart() {
  const [data, setData] = useState([
    { name: "Registered", value: 0 }, { name: "Applied", value: 0 },
    { name: "Aptitude", value: 0 }, { name: "Technical", value: 0 },
    { name: "HR", value: 0 }, { name: "Placed", value: 0 },
  ]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get("http://localhost:8081/api/stats/dashboard");
        const s = res.data;
        setData([
          { name: "Registered", value: s.registered || 0 },
          { name: "Applied", value: s.applied || 0 },
          { name: "Aptitude", value: s.aptitudePass || 0 },
          { name: "Technical", value: s.technicalPass || 0 },
          { name: "HR", value: s.hrPass || 0 },
          { name: "Placed", value: s.placed || 0 },
        ]);
      } catch (err) { console.error("Failed to fetch placement progress stats", err); }
    };
    fetchStats();
  }, []);

  return (
    <div className="chart-card">
      <h3>Placement Progress</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 25, right: 20, left: 0, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" tick={{ fontSize: 12 }} interval={0} />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" fill="#2F66E5" radius={[5, 5, 0, 0]} barSize={60}>
            <LabelList dataKey="value" position="top" style={{ fill: "#333", fontWeight: "600", fontSize: 14 }} />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default PlacementBarChart;