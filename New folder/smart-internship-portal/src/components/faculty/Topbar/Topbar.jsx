import { useState, useEffect } from "react";
import axios from "axios";
import "./Topbar.css";

import {
  FaSearch,
  FaUserCircle,
  FaBars,
} from "react-icons/fa";

const Topbar = ({ sidebarOpen, setSidebarOpen }) => {
  const [username, setUsername] = useState("Loading...");

  useEffect(() => {
    const fetchFacultyProfile = async () => {
      // Because of our backend fix, the "facultyToken" is now the logged-in username!
      const loggedInUser = localStorage.getItem("facultyToken");
      
      if (!loggedInUser) {
        setUsername("Faculty");
        return;
      }
      
      try {
        // Fetch the profile directly from your PostgreSQL Database!
        const response = await axios.get(`http://localhost:8081/api/faculty/profile/${loggedInUser}`);
        
        if (response.data && response.data.username) {
          setUsername(response.data.username);
        } else {
          setUsername(loggedInUser); // Fallback
        }
      } catch (error) {
        console.error("Error fetching faculty from DB:", error);
        setUsername(loggedInUser); // Safe fallback so UI doesn't crash
      }
    };

    fetchFacultyProfile();
  }, []);

  // Current Date
  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <header className={`topbar ${sidebarOpen ? "" : "expand"}`}>

      {/* Left Section */}
      <div className="topbar-left">
        <button
          className="menu-btn"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <FaBars />
        </button>

        <div className="title">
          <h2>Dashboard</h2>
          <p>Welcome to Smart Internship Portal</p>
        </div>
      </div>

      {/* Search Box */}
      <div className="topbar-search-box">
        <FaSearch className="topbar-search-icon" />
        <input
          type="text"
          placeholder="Search students, companies..."
        />
      </div>

      {/* Right Section */}
      <div className="topbar-right">
        <span className="today-date">
          {today}
        </span>

        {/* Profile */}
        <div className="profile">
          <FaUserCircle className="profile-icon" />
          <div className="profile-info">
            {/* DYNAMIC USERNAME FETCHED FROM DATABASE! */}
            <h4>{username}</h4>
            <span>Administrator</span>
          </div>
        </div>
      </div>

    </header>
  );
};

export default Topbar;