import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import "./DashboardCards.css";

import {
  FaUserGraduate,
  FaBuilding,
  FaFileAlt,
  FaCheckCircle,
  FaSignOutAlt,
} from "react-icons/fa";

function DashboardCards() {
  const navigate = useNavigate();

  // ===============================
  // Dynamic States for Database Counts
  // ===============================
  const [studentCount, setStudentCount] = useState(0);
  const [companyCount, setCompanyCount] = useState(0);
  
  // 🌟 Upgraded to a State variable because we built the API for this!
  const [optOutCount, setOptOutCount] = useState(0);
  
  // Because we don't have APIs for these yet, we use standard constants.
  // const applicationsCount = 0;
  // const placedCount = 0;
  const [applicationsCount, setApplicationsCount] = useState(0);
  const [placedCount, setPlacedCount] = useState(0);

  useEffect(() => {
    // 1. Fetch Total Students from Database
    const fetchStudentCount = async () => {
      try {
        const token = localStorage.getItem("facultyToken"); 
        const response = await axios.get("http://localhost:8081/api/students", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setStudentCount(response.data.length);
      } catch (error) {
        console.error("Error fetching students count:", error);
      }
    };

    // 2. Fetch Total Companies from Database
    const fetchCompanyCount = async () => {
      try {
        const token = localStorage.getItem("facultyToken");
        const response = await axios.get("http://localhost:8081/api/company/all", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setCompanyCount(response.data.length);
      } catch (error) {
        console.error("Error fetching companies count:", error);
      }
    };

    // 3. 🌟 Fetch Total Opt-Outs from Database (Using the API we built earlier!)
    const fetchOptOutCount = async () => {
      try {
        const token = localStorage.getItem("facultyToken");
        const response = await axios.get("http://localhost:8081/api/opt-out/all", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setOptOutCount(response.data.length);
      } catch (error) {
        console.error("Error fetching opt-out count:", error);
      }
    };

    const fetchApplicationStats = async () => {
      try {
        const response = await axios.get("http://localhost:8081/api/stats/dashboard");
        setApplicationsCount(response.data.applied || 0);
        setPlacedCount(response.data.placed || 0);
      } catch (error) { console.error("Error fetching application stats:", error); }
    };
    
    fetchApplicationStats(); // call alongside the other fetch*() calls
    fetchStudentCount();
    fetchCompanyCount();
    fetchOptOutCount(); // 🌟 Call it to update the live count!
  }, []);

  // ===============================
  // Dashboard Cards
  // ===============================

  const cards = [
    {
      title: "Total Students",
      value: studentCount,
      icon: <FaUserGraduate />,
      color: "#2563EB",
      bg: "#EAF2FF",
      link: "/faculty/all-students",
    },
    {
      title: "Total Companies",
      value: companyCount,
      icon: <FaBuilding />,
      color: "#7C3AED",
      bg: "#F3E8FF",
      link: "/faculty/company-list",
    },
    {
      title: "Applications",
      value: applicationsCount,
      icon: <FaFileAlt />,
      color: "#3B82F6",
      bg: "#EAF5FF",
      link: "/faculty/applied-students",
    },
    {
      title: "Placed Students",
      value: placedCount,
      icon: <FaCheckCircle />,
      color: "#16A34A",
      bg: "#EAFBF1",
      link: "/faculty/placed-students",
    },
    {
      title: "Opt-Out Students",
      value: optOutCount,
      icon: <FaSignOutAlt />,
      color: "#15803D",
      bg: "#ECFDF5",
      link: "/faculty/optout-students",
    },
  ];

  return (
    <div className="dashboard-cards">
      {cards.map((card, index) => (
        <div className="dashboard-card" key={index}>
          <div
            className="card-icon"
            style={{
              background: card.bg,
              color: card.color,
            }}
          >
            {card.icon}
          </div>

          <div className="card-content">
            <h2>{card.value}</h2>
            <p>{card.title}</p>

            {card.link ? (
              <button
                className="view-all-btn"
                onClick={() => navigate(card.link)}
              >
                View All
              </button>
            ) : (
              <span className="view-all-text">
                View All
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default DashboardCards;