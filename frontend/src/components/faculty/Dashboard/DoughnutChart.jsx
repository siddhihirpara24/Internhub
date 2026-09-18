import { useEffect, useState } from "react";
import axios from "axios";
import { ResponsiveContainer, PieChart, Pie, Cell, Legend, Tooltip } from "recharts";
import "./Charts.css";

const colors = ["#2563EB", "#22C55E", "#F59E0B", "#8B5CF6", "#EF4444", "#4FD1C5", "#EC4899", "#0EA5E9"];

function CompanyChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get("http://localhost:8081/api/stats/dashboard");
        const companyWise = res.data.companyWiseApplications || {};
        setData(Object.entries(companyWise).map(([name, value]) => ({ name: `${name} (${value})`, value })));
      } catch (err) { console.error("Failed to fetch company-wise application stats", err); }
    };
    fetchStats();
  }, []);

  return (
    <div className="chart-card">
      <h3 className="chart-title">Company-wise Applications</h3>
      {data.length === 0 ? (
        <p style={{ padding: "20px", color: "#64748b" }}>No applications yet.</p>
      ) : (
        <ResponsiveContainer width="100%" height={260}>
          <PieChart>
            <Pie data={data} dataKey="value" innerRadius={45} outerRadius={75} paddingAngle={2}>
              {data.map((item, index) => <Cell key={index} fill={colors[index % colors.length]} />)}
            </Pie>
            <Tooltip />
            <Legend layout="vertical" align="right" verticalAlign="middle" />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}

export default CompanyChart;