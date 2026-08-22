import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaArrowLeft, FaBuilding, FaCalendarAlt, FaClock, FaMapMarkerAlt, FaLaptop, FaUserTie } from "react-icons/fa";
import "./ViewInterview.css";

const ViewInterview = () => {
  const { id } = useParams(); // Gets the ID from the URL
  const navigate = useNavigate();
  
  const [schedule, setSchedule] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchScheduleDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8081/api/interview-schedule/${id}`);
        setSchedule(response.data);
      } catch (err) {
        console.error("Error fetching schedule:", err);
        setError("Could not load interview details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchScheduleDetails();
  }, [id]);

  if (loading) return <div className="view-interview-message">Loading Interview Details...</div>;
  if (error) return <div className="view-interview-message error">{error}</div>;
  if (!schedule) return null;

  // Since we used @ManyToOne, Spring Boot automatically sends the full Company object!
  const company = schedule.company || {};

  return (
    <div className="view-interview-container">
      
      {/* HEADER */}
      <div className="view-header">
        <button className="back-btn" onClick={() => navigate("/faculty/interview-schedule")}>
          <FaArrowLeft /> Back to Schedules
        </button>
        <h1 className="view-title">Interview Details</h1>
        <p className="view-subtitle">Detailed information about the upcoming interview.</p>
      </div>

      <div className="view-card-grid">
        
        {/* LEFT CARD: COMPANY DETAILS */}
        <div className="detail-card">
          <div className="card-header">
            <FaBuilding className="header-icon" />
            <h2>Company Profile</h2>
          </div>
          <div className="card-body">
            <div className="detail-row">
              <span className="label">Company Name:</span>
              <span className="value fw-600">{company.companyName || "N/A"}</span>
            </div>
            <div className="detail-row">
              <span className="label">Internship Role:</span>
              <span className="value">{company.internshipRole || "N/A"}</span>
            </div>
            <div className="detail-row">
              <span className="label">Package / Stipend:</span>
              <span className="value">
                {company.ctcPackage || "N/A"} / ₹{company.monthlyStipend || "N/A"}
              </span>
            </div>
            <div className="detail-row">
              <span className="label">Location:</span>
              <span className="value">{company.location || "N/A"}</span>
            </div>
            <div className="detail-row">
              <span className="label">Website:</span>
              <span className="value">
                {company.website ? (
                  <a href={company.website} target="_blank" rel="noreferrer">{company.website}</a>
                ) : "N/A"}
              </span>
            </div>
          </div>
        </div>

        {/* RIGHT CARD: INTERVIEW DETAILS */}
        <div className="detail-card">
          <div className="card-header primary-bg">
            <FaUserTie className="header-icon white-text" />
            <h2 className="white-text">Interview Schedule</h2>
          </div>
          <div className="card-body">
            <div className="detail-row highlight-row">
              <span className="label">Interview Round:</span>
              <span className="value fw-600 round-badge">{schedule.interviewRound}</span>
            </div>
            <div className="detail-row">
              <span className="label"><FaCalendarAlt className="inline-icon"/> Date:</span>
              <span className="value">{schedule.interviewDate}</span>
            </div>
            <div className="detail-row">
              <span className="label"><FaClock className="inline-icon"/> Time:</span>
              <span className="value">{schedule.interviewTime}</span>
            </div>
            <div className="detail-row">
              <span className="label">Duration:</span>
              <span className="value">{schedule.duration}</span>
            </div>
            <div className="detail-row">
              <span className="label"><FaLaptop className="inline-icon"/> Mode:</span>
              <span className="value">{schedule.interviewMode}</span>
            </div>
            <div className="detail-row">
              <span className="label"><FaMapMarkerAlt className="inline-icon"/> Venue/Link:</span>
              <span className="value">{schedule.venue}</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ViewInterview;