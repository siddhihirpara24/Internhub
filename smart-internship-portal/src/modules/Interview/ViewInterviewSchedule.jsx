import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaPlus, FaSearch, FaEye, FaEdit, FaTrash } from "react-icons/fa";
import "./ViewInterviewSchedule.css"; 

const ViewInterviewSchedule = () => {
  const navigate = useNavigate();
  
  const [schedules, setSchedules] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    axios
      .get("http://localhost:8081/api/interview-schedule")
      .then((response) => {
        setSchedules(response.data);
      })
      .catch((error) => {
        console.error("Error fetching interview schedules:", error);
        alert("Unable to fetch interview schedules.");
      })
      .finally(() => {
        setLoading(false); 
      });
  }, []);

  const deleteSchedule = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this interview schedule?"
    );
    
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:8081/api/interview-schedule/${id}`);
      alert("Interview Schedule Deleted Successfully");
      
      const res = await axios.get("http://localhost:8081/api/interview-schedule");
      setSchedules(res.data);
      
    } catch (error) {
      console.error("Delete Error:", error);
      alert("Unable to delete interview schedule.");
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    return date.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
  };

  const formatTime = (timeString) => {
    if (!timeString) return "-";
    const parts = timeString.split(":");
    if (parts.length < 2) return timeString;
    const date = new Date();
    date.setHours(parseInt(parts[0], 10));
    date.setMinutes(parseInt(parts[1], 10));
    return date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
  };

  // 🌟 DYNAMIC STATUS CALCULATION
  const getDynamicStatus = (schedule) => {
    if (schedule.status && schedule.status.toLowerCase().includes("cancelled")) {
        return "Cancelled";
    }
    
    if (!schedule.interviewDate) return "Upcoming";

    const today = new Date();
    today.setHours(0, 0, 0, 0); 
    const scheduleDate = new Date(schedule.interviewDate);
    scheduleDate.setHours(0, 0, 0, 0); 
    
    if (scheduleDate < today) return "Completed";
    if (scheduleDate.getTime() === today.getTime()) return "Active";
    return "Upcoming";
  };

  const getStatusClass = (status) => {
    const s = status?.toLowerCase() || "upcoming";
    if (s.includes("completed")) return "schedule-status completed";
    if (s.includes("cancelled")) return "schedule-status cancelled";
    if (s.includes("active")) return "schedule-status active"; 
    if (s.includes("pending")) return "schedule-status pending";
    return "schedule-status upcoming";
  };
  
  const getRoundClass = (round) => {
      const r = round?.toLowerCase() || "";
      if (r.includes("aptitude")) return "schedule-round aptitude";
      if (r.includes("technical")) return "schedule-round technical";
      if (r.includes("hr")) return "schedule-round hr";
      return "schedule-round default";
  };

  // 🌟 Search uses Dynamic Status
  const filteredSchedules = schedules.filter((schedule) => {
    const companyName = schedule.companyName || schedule.company?.companyName || "";
    const searchLower = search.toLowerCase();
    const dynamicStatus = getDynamicStatus(schedule);

    return (
      companyName.toLowerCase().includes(searchLower) ||
      schedule.interviewRound?.toLowerCase().includes(searchLower) ||
      schedule.venue?.toLowerCase().includes(searchLower) ||
      schedule.interviewMode?.toLowerCase().includes(searchLower) ||
      dynamicStatus.toLowerCase().includes(searchLower) 
    );
  });

  return (
    <div className="view-schedule">
      
      <div className="schedule-header">
        <div>
          <h1 className="header-title">Interview Schedule</h1>
          <p className="header-subtitle">Manage and monitor all company interview schedules.</p>
        </div>
        <button className="add-btn" onClick={() => navigate("/faculty/add-interview-schedule")}>
          <FaPlus /> Add Interview Schedule
        </button>
      </div>

      <div className="schedule-toolbar">
        <div className="interview-search-box">
          <FaSearch className="interview-search-icon" />
          <input
            type="text"
            placeholder="Search company, round, venue..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="table-container">
        {loading ? (
          <div className="loading-state">Loading Interview Schedules...</div>
        ) : (
          <>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Company</th>
                  <th>Round</th>
                  <th>Date & Time</th>
                  <th>Duration</th>
                  <th>Location</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredSchedules.length > 0 ? (
                  filteredSchedules.map((schedule) => {
                    const scheduleId = schedule.interviewId || schedule.id;
                    const companyName = schedule.companyName || schedule.company?.companyName || "N/A";
                    
                    // 🌟 USE DYNAMIC STATUS HERE
                    const displayStatus = getDynamicStatus(schedule);

                    return (
                      <tr key={scheduleId}>
                        <td>{scheduleId}</td>
                        <td className="fw-600">{companyName}</td>
                        <td>
                          <span className={getRoundClass(schedule.interviewRound)}>
                            {schedule.interviewRound}
                          </span>
                        </td>
                        
                        {/* COMBINED DATE & TIME */}
                        <td>
                          <div style={{ fontWeight: "500", color: "#1E40AF" }}>{formatDate(schedule.interviewDate)}</div>
                          <div style={{ fontSize: "0.85rem", color: "#64748B" }}>{formatTime(schedule.interviewTime)}</div>
                        </td>
                        
                        <td>{schedule.duration}</td>
                        
                        {/* COMBINED MODE & VENUE */}
                        <td>
                          <div style={{ fontWeight: "500" }}>{schedule.interviewMode}</div>
                          <div style={{ fontSize: "0.85rem", color: "#64748B" }}>{schedule.venue}</div>
                        </td>
                        
                        <td>
                          <span className={getStatusClass(displayStatus)}>
                            {displayStatus}
                          </span>
                        </td>
                        <td>
                          <div className="iv-actions-cell">
                            
                            {/* VIEW BUTTON */}
                            <button
                              className="iv-action-btn iv-view-btn"
                              title="View"
                              onClick={() => navigate(`/faculty/view-interview-schedule/${scheduleId}`)}
                            >
                              <FaEye size={16} color="white" />
                            </button>
                            
                            {/* EDIT BUTTON */}
                            <button
                              className="iv-action-btn iv-edit-btn"
                              title="Edit"
                              onClick={() => navigate(`/faculty/edit-interview-schedule/${scheduleId}`)}
                            >
                              <FaEdit size={16} color="white" />
                            </button>
                            
                            {/* DELETE BUTTON */}
                            <button
                              className="iv-action-btn iv-delete-btn"
                              title="Delete"
                              onClick={() => deleteSchedule(scheduleId)}
                            >
                              <FaTrash size={16} color="white" />
                            </button>
                            
                          </div>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="8" className="empty-state">
                      {schedules.length === 0
                        ? "No Interview Schedules Found"
                        : "No matching interview schedules found."}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            
            <div className="table-footer">
              Total Interview Schedules: {filteredSchedules.length}
            </div>
          </>
        )}
      </div>

    </div>
  );
};

export default ViewInterviewSchedule;