import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; 
import axios from "axios";
import api from "../../api/axiosInstance";
import {
  FaBriefcase,
  FaFileAlt,
  FaCheckCircle,
  FaClock,
  FaBuilding,
  FaCalendarAlt,
  FaArrowRight,
  FaChartLine
} from "react-icons/fa";
import "./Home.css";

export default function Home() {
  const navigate = useNavigate(); 
  const [progress, setProgress] = useState(0);

  // Dynamic Internship States
  const [availableCount, setAvailableCount] = useState(0);
  const [latestCompanies, setLatestCompanies] = useState([]);

  useEffect(() => {
    // 1. Fetch Profile Progress
    const fetchProgress = async () => {
      try {
        const res = await api.get("/student/academic");
        setProgress(res.data.completionPercentage || 0);
      } catch (err) {
        console.error("Failed to load progress", err);
      }
    };

    // 2. Fetch Total Active Internships from Database
    const fetchInternships = async () => {
      try {
        const res = await axios.get("http://localhost:8081/api/company/all");
        
        const activeInternships = res.data.filter(
          (company) => company.registrationStatus === "Active"
        );
        
        setAvailableCount(activeInternships.length);
        setLatestCompanies(activeInternships.slice(0, 3));
      } catch (err) {
        console.error("Failed to load internships", err);
      }
    };

    fetchProgress();
    fetchInternships();
  }, []);

  const degrees = Math.round((progress / 100) * 360);

  const stats = [
    { title: "Available Internships", value: availableCount, icon: <FaBriefcase />, className: "blue" },
    { title: "Applications", value: "8", icon: <FaFileAlt />, className: "purple" },
    { title: "Selected", value: "2", icon: <FaCheckCircle />, className: "green" },
    { title: "Pending", value: "4", icon: <FaClock />, className: "orange" }
  ];

  const applications = [
    { company: "TCS", role: "Software Developer Intern", date: "05 Aug 2026", status: "Selected" },
    { company: "Infosys", role: "Web Development Intern", date: "03 Aug 2026", status: "Pending" },
    { company: "Wipro", role: "Java Developer Intern", date: "01 Aug 2026", status: "Under Review" }
  ];

  return (
    <main className="student-dashboard">
      
      {/* HEADER */}
      <div className="dashboard-heading">
        <div>
          <h1>Student Dashboard</h1>
          <p>Welcome back! Here's an overview of your internship activities.</p>
        </div>

        <div className="dashboard-date">
          <FaCalendarAlt />
          <span>August 2026</span>
        </div>
      </div>

      {/* STAT CARDS */}
      <div className="student-stats">
        {stats.map((stat, index) => (
          <div className="student-stat-card" key={index}>
            <div className={`stat-icon ${stat.className}`}>
              {stat.icon}
            </div>
            <div className="stat-content">
              <h2>{stat.value}</h2>
              <p>{stat.title}</p>
            </div>
          </div>
        ))}
      </div>

      {/* MAIN DASHBOARD GRID */}
      <div className="dashboard-main-grid">
        
        {/* AVAILABLE INTERNSHIPS */}
        <div className="dashboard-section">
          <div className="section-header">
            <div>
              <h2>Available Internships</h2>
              <p>Explore internship opportunities from companies.</p>
            </div>
            <button className="view-all-btn" onClick={() => navigate('/student/campus-internship')}>
              View All <FaArrowRight />
            </button>
          </div>

          <div className="company-list">
            {latestCompanies.length > 0 ? (
              latestCompanies.map((company, index) => (
                <div className="internship-card" key={index}>
                  <div className="company-logo">
                    <FaBuilding />
                  </div>

                  <div className="internship-info">
                    <h3>{company.companyName}</h3>
                    <h4>{company.internshipRole}</h4>
                    <div className="internship-meta">
                      <span>📍 {company.location || "N/A"}</span>
                      <span>⏱ {company.internshipDuration || "N/A"}</span>
                      <span>💰 {company.monthlyStipend || "N/A"}</span>
                    </div>
                  </div>

                  <button className="apply-btn" onClick={() => navigate('/student/campus-internship')}> 
                    Apply 
                  </button>
                </div>
              ))
            ) : (
              <div style={{ padding: "20px", color: "#64748B", fontSize: "14px" }}>
                No active internships are available right now.
              </div>
            )}
          </div>
        </div>

        {/* APPLICATION PROGRESS */}
        <div className="dashboard-section progress-section">
          <div className="section-header">
            <div>
              <h2>Profile Completion</h2>
              <p>Complete your academic details to reach 100%.</p>
            </div>
          </div>

          <div className="progress-circle-area">
            <div
              className="progress-circle"
              style={{
                background: `conic-gradient(#2563eb 0deg ${degrees}deg, #e5e7eb ${degrees}deg 360deg)`,
              }}
            >
              <div className="progress-inner">
                <strong>{progress}%</strong>
                <span>Complete</span>
              </div>
            </div>
          </div>

          <div className="progress-details">
            <div>
              <span className="dot blue-dot"></span>
              Profile Fields Filled
              <strong>{progress}%</strong>
            </div>
          </div>
        </div>
      </div>

      {/* RECENT APPLICATIONS */}
      <div className="dashboard-section applications-section">
        <div className="section-header">
          <div>
            <h2>Recent Applications</h2>
            <p>Track your latest internship applications.</p>
          </div>
          <button className="view-all-btn" onClick={() => navigate('/student/applications')}>
            View All <FaArrowRight />
          </button>
        </div>

        <div className="application-table-wrapper">
          <table className="application-table">
            <thead>
              <tr>
                <th>Company</th>
                <th>Position</th>
                <th>Applied Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {applications.map((application, index) => (
                <tr key={index}>
                  <td>
                    <div className="table-company">
                      <div className="small-company-logo">
                        <FaBuilding />
                      </div>
                      <strong>{application.company}</strong>
                    </div>
                  </td>
                  <td>{application.role}</td>
                  <td>{application.date}</td>
                  <td>
                    <span className={`application-status ${application.status.toLowerCase().replace(" ", "-")}`}>
                      {application.status}
                    </span>
                  </td>
                  <td>
                    <button className="track-btn" onClick={() => navigate('/student/applications')}>
                       Track 
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* QUICK ACTIONS */}
      <div className="quick-actions">
        <div className="quick-action-content">
          <div className="quick-action-icon">
            <FaChartLine />
          </div>
          <div>
            <h3>Keep your profile updated</h3>
            <p>
              Complete your academic and profile details to improve your
              internship opportunities.
            </p>
          </div>
        </div>
        <button className="profile-btn" onClick={() => navigate('/student/academic-details')}>
          Update Profile <FaArrowRight />
        </button>
      </div>
    </main>
  );
}