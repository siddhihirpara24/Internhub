import { useEffect, useState } from "react";
import api from "../../api/axiosInstance";
import {FaBriefcase,FaFileAlt,FaCheckCircle,FaClock,FaBuilding,FaCalendarAlt,/*FaArrowRight,*/FaChartLine} from "react-icons/fa";
import "./Home.css";

export default function Home() {
  const [progress, setProgress] = useState(0);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const academicRes = await api.get("/student/academic");
        setProgress(academicRes.data.completionPercentage);

        const appsRes = await api.get("/student/applications");
        setApplications(appsRes.data || []);
      } catch (err) {
        console.error("Failed to load dashboard data", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const degrees = Math.round((progress / 100) * 360);
  const selectedCount = applications.filter(a => a.overallStatus === "Selected").length;
  const pendingCount = applications.filter(a => a.overallStatus === "Under Review").length;

  const stats = [
    { title: "Total Applications", value: applications.length, icon: <FaFileAlt />, className: "purple" },
    { title: "Selected", value: selectedCount, icon: <FaCheckCircle />, className: "green" },
    { title: "Pending", value: pendingCount, icon: <FaClock />, className: "orange" },
    { title: "Profile Complete", value: `${progress}%`, icon: <FaBriefcase />, className: "blue" },
  ];

  const recentApplications = [...applications]
    .sort((a, b) => new Date(b.appliedDate) - new Date(a.appliedDate))
    .slice(0, 5);

  return (
    <main className="student-dashboard">
      <div className="dashboard-heading">
        <div>
          <h1>Student Dashboard</h1>
          <p>Welcome back! Here's an overview of your internship activities.</p>
        </div>
        <div className="dashboard-date">
          <FaCalendarAlt />
          <span>{new Date().toLocaleDateString("en-GB", { month: "long", year: "numeric" })}</span>
        </div>
      </div>

      <div className="student-stats">
        {stats.map((stat, index) => (
          <div className="student-stat-card" key={index}>
            <div className={`stat-icon ${stat.className}`}>{stat.icon}</div>
            <div className="stat-content"><h2>{stat.value}</h2><p>{stat.title}</p></div>
          </div>
        ))}
      </div>

      <div className="dashboard-main-grid">
        <div className="dashboard-section progress-section" style={{ gridColumn: "1 / -1" }}>
          <div className="section-header">
            <div>
              <h2>Profile Completion</h2>
              <p>Complete your academic details to reach 100%.</p>
            </div>
          </div>
          <div className="progress-circle-area">
            <div className="progress-circle" style={{ background: `conic-gradient(#2563eb 0deg ${degrees}deg, #e5e7eb ${degrees}deg 360deg)` }}>
              <div className="progress-inner"><strong>{progress}%</strong><span>Complete</span></div>
            </div>
          </div>
        </div>
      </div>

      <div className="dashboard-section applications-section">
        <div className="section-header">
          <div>
            <h2>Recent Applications</h2>
            <p>Track your latest internship applications.</p>
          </div>
        </div>

        <div className="application-table-wrapper">
          <table className="application-table">
            <thead>
              <tr><th>Company</th><th>Position</th><th>Applied Date</th><th>Status</th></tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan="4">Loading...</td></tr>
              ) : recentApplications.length === 0 ? (
                <tr><td colSpan="4">No applications yet.</td></tr>
              ) : (
                recentApplications.map((app) => (
                  <tr key={app.id}>
                    <td>
                      <div className="table-company">
                        <div className="small-company-logo"><FaBuilding /></div>
                        <strong>{app.company}</strong>
                      </div>
                    </td>
                    <td>{app.role}</td>
                    <td>{app.appliedDate}</td>
                    <td>
                      <span className={`application-status ${app.overallStatus === "Selected" ? "selected" : app.overallStatus === "Rejected" ? "under-review" : "pending"}`}>
                        {app.overallStatus}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="quick-actions">
        <div className="quick-action-content">
          <div className="quick-action-icon"><FaChartLine /></div>
          <div>
            <h3>Keep your profile updated</h3>
            <p>Complete your academic and profile details to improve your internship opportunities.</p>
          </div>
        </div>
      </div>
    </main>
  );
}