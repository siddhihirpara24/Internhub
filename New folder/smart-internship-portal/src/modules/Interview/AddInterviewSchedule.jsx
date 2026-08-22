import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  FaBuilding,
  FaClipboardList,
  FaCalendarAlt,
  FaClock,
  FaHourglassHalf,
  FaLaptop,
  FaMapMarkerAlt,
  FaSave,
  FaTimes,
  FaArrowLeft,
} from "react-icons/fa";
import "./AddInterviewSchedule.css";

const AddInterviewSchedule = () => {
  const navigate = useNavigate();

  // State for companies fetched from backend
  const [companies, setCompanies] = useState([]);
  const [loadingCompanies, setLoadingCompanies] = useState(true);

  // Form State
  const [schedule, setSchedule] = useState({
    companyId: "",
    interviewRound: "",
    interviewDate: "",
    interviewTime: "",
    duration: "",
    interviewMode: "",
    venue: "",
  });

  // Calculate today's date for validation (prevents past dates)
  const today = new Date().toISOString().split("T")[0];

  // Fetch Companies on Page Load
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await axios.get("http://localhost:8081/api/company/all");
        
        // Filter ONLY Active companies
        const activeCompanies = response.data.filter(
          (company) => company.registrationStatus === "Active"
        );

        setCompanies(activeCompanies);
      } catch (error) {
        console.error("Error fetching companies:", error);
        alert("Unable to fetch active companies.");
      } finally {
        setLoadingCompanies(false);
      }
    };

    fetchCompanies();
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSchedule((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Submit Schedule to Backend
  const handleSubmit = async (e) => {
    e.preventDefault();

    const {
      companyId,
      interviewRound,
      interviewDate,
      interviewTime,
      duration,
      interviewMode,
      venue,
    } = schedule;

    // Strict Validation
    if (
      !companyId ||
      !interviewRound ||
      !interviewDate ||
      !interviewTime ||
      !duration ||
      !interviewMode ||
      !venue
    ) {
      alert("Please fill all required fields.");
      return;
    }

    try {
      await axios.post("http://localhost:8081/api/interview-schedule", schedule);
      alert("Interview Schedule Added Successfully");
      navigate("/faculty/interview-schedule");
    } catch (error) {
      console.error("Error saving schedule:", error);
      alert("Unable to save interview schedule.");
    }
  };

  return (
    <div className="add-schedule-page">
      
      {/* Header Section */}
      <div className="as-header-row">
        <div>
          <h1 className="as-page-title">Add Interview Schedule</h1>
          <p className="as-page-subtitle">Schedule an interview for an active company.</p>
        </div>
        <button
          type="button"
          className="btn-back-schedule"
          onClick={() => navigate("/faculty/interview-schedule")}
        >
          <FaArrowLeft /> Back to Interview Schedule
        </button>
      </div>

      {/* Main Form Card */}
      <form className="as-card" onSubmit={handleSubmit}>
        
        {/* SECTION 1: Company Information */}
        <div className="as-section">
          <h3 className="as-section-title">
            <FaBuilding /> Company Information
          </h3>
          <div className="as-form-group">
            <label>Company Name</label>
            <select
              name="companyId"
              value={schedule.companyId}
              onChange={handleChange}
              required
            >
              <option value="">Select Active Company</option>
              {loadingCompanies ? (
                <option disabled>Loading Active Companies...</option>
              ) : companies.length === 0 ? (
                <option disabled>No Active Companies Available</option>
              ) : (
                companies.map((company) => (
                  <option key={company.id} value={company.id}>
                    {company.companyName}
                  </option>
                ))
              )}
            </select>
          </div>
        </div>

        {/* SECTION 2: Interview Information */}
        <div className="as-section">
          <h3 className="as-section-title">
            <FaClipboardList /> Interview Information
          </h3>
          
          <div className="as-grid-2">
            
            <div className="as-form-group">
              <label><FaClipboardList /> Interview Round</label>
              <select
                name="interviewRound"
                value={schedule.interviewRound}
                onChange={handleChange}
                required
              >
                <option value="">Select Interview Round</option>
                <option value="Aptitude">Aptitude</option>
                <option value="Technical">Technical</option>
                <option value="HR">HR</option>
              </select>
            </div>

            <div className="as-form-group">
              <label><FaCalendarAlt /> Interview Date</label>
              <input
                type="date"
                name="interviewDate"
                value={schedule.interviewDate}
                onChange={handleChange}
                min={today}
                required
              />
            </div>

            <div className="as-form-group">
              <label><FaClock /> Interview Time</label>
              <input
                type="time"
                name="interviewTime"
                value={schedule.interviewTime}
                onChange={handleChange}
                required
              />
            </div>

            <div className="as-form-group">
              <label><FaHourglassHalf /> Duration</label>
              <select
                name="duration"
                value={schedule.duration}
                onChange={handleChange}
                required
              >
                <option value="">Select Duration</option>
                <option value="15 Minutes">15 Minutes</option>
                <option value="30 Minutes">30 Minutes</option>
                <option value="45 Minutes">45 Minutes</option>
                <option value="60 Minutes">60 Minutes</option>
                <option value="90 Minutes">90 Minutes</option>
                <option value="120 Minutes">120 Minutes</option>
              </select>
            </div>

            <div className="as-form-group">
              <label><FaLaptop /> Interview Mode</label>
              <select
                name="interviewMode"
                value={schedule.interviewMode}
                onChange={handleChange}
                required
              >
                <option value="">Select Interview Mode</option>
                <option value="Offline">Offline</option>
                <option value="Online">Online</option>
              </select>
            </div>

            <div className="as-form-group">
              <label><FaMapMarkerAlt /> Venue</label>
              <input
                type="text"
                name="venue"
                value={schedule.venue}
                onChange={handleChange}
                placeholder="e.g. Seminar Hall or Google Meet"
                required
              />
            </div>

          </div>
        </div>

        {/* ACTIONS */}
        <div className="as-form-actions">
          <button type="submit" className="btn-save-schedule">
            <FaSave /> Save Schedule
          </button>
          <button
            type="button"
            className="btn-cancel-schedule"
            onClick={() => navigate("/faculty/interview-schedule")}
          >
            <FaTimes /> Cancel
          </button>
        </div>

      </form>
    </div>
  );
};

export default AddInterviewSchedule;