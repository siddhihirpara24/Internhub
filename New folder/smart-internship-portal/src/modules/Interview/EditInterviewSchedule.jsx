import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { 
    FaBuilding, FaClipboardList, FaCalendarAlt, 
    FaClock, FaHourglassHalf, FaLaptop, 
    FaMapMarkerAlt, FaSave, FaTimes, FaArrowLeft 
} from "react-icons/fa";
import "./EditInterviewSchedule.css";

const EditInterviewSchedule = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [companies, setCompanies] = useState([]);
    const [companiesLoading, setCompaniesLoading] = useState(true);
    const [loading, setLoading] = useState(true);

    // Removed "status" from state
    const [schedule, setSchedule] = useState({
        companyId: "",
        interviewRound: "",
        interviewDate: "",
        interviewTime: "",
        duration: "",
        interviewMode: "",
        venue: ""
    });

    // Fetch Active Companies
    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                setCompaniesLoading(true);
                const response = await axios.get("http://localhost:8081/api/company/all");
                const activeCompanies = response.data.filter(
                    company => company.registrationStatus?.toLowerCase() === "active"
                );
                setCompanies(activeCompanies);
            } catch (error) {
                console.warn("Could not find /api/company/all, trying /api/company...", error.message);
                try {
                    const fallbackRes = await axios.get("http://localhost:8081/api/company");
                    const activeCompanies = fallbackRes.data.filter(
                        company => company.registrationStatus?.toLowerCase() === "active"
                    );
                    setCompanies(activeCompanies);
                } catch (fallbackError) {
                    console.error("Error fetching companies:", fallbackError);
                    alert("Unable to fetch companies. Please check if your backend is running.");
                }
            } finally {
                setCompaniesLoading(false);
            }
        };
        fetchCompanies();
    }, []);

    // Fetch Existing Interview Schedule
    useEffect(() => {
        const fetchSchedule = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`http://localhost:8081/api/interview-schedule/${id}`);
                const data = response.data;

                // 👇 FIX: Checks both 'id' and 'companyId' to guarantee it auto-selects!
                const selectedCompanyId = data.company?.id || data.company?.companyId || data.companyId || "";

                setSchedule({
                    companyId: selectedCompanyId,
                    interviewRound: data.interviewRound || "",
                    interviewDate: data.interviewDate || "",
                    interviewTime: data.interviewTime ? data.interviewTime.substring(0, 5) : "",
                    duration: data.duration || "",
                    interviewMode: data.interviewMode || "",
                    venue: data.venue || ""
                });
            } catch (error) {
                console.error("Error fetching interview schedule:", error);
                alert("Unable to fetch interview schedule details.");
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchSchedule();
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSchedule({
            ...schedule,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation (Removed status)
        if (!schedule.companyId || !schedule.interviewRound || !schedule.interviewDate || 
            !schedule.interviewTime || !schedule.duration || !schedule.interviewMode || 
            !schedule.venue) {
            alert("Please fill all required fields.");
            return;
        }

        try {
            await axios.put(`http://localhost:8081/api/interview-schedule/${id}`, {
                companyId: Number(schedule.companyId),
                interviewRound: schedule.interviewRound,
                interviewDate: schedule.interviewDate,
                interviewTime: schedule.interviewTime,
                duration: schedule.duration,
                interviewMode: schedule.interviewMode,
                venue: schedule.venue
            });

            alert("Interview Schedule Updated Successfully");
            navigate("/faculty/interview-schedule");
        } catch (error) {
            console.error("Failed to update:", error);
            alert("Unable to update interview schedule.");
        }
    };

    const handleCancel = () => {
        navigate("/faculty/interview-schedule");
    };

    const today = new Date().toISOString().split("T")[0];
    const isExistingPastDate = schedule.interviewDate && schedule.interviewDate < today;
    const minDate = isExistingPastDate ? schedule.interviewDate : today;

    if (loading || companiesLoading) {
        return <div className="edit-loading">Loading Interview Schedule...</div>;
    }

    return (
        <div className="edit-interview-page">
            <div className="edit-header">
                <div>
                    <h1>Edit Interview Schedule</h1>
                    <p>Update interview schedule information.</p>
                </div>
                <button type="button" className="back-btn" onClick={() => navigate("/faculty/interview-schedule")}>
                    <FaArrowLeft /> Back to Schedule
                </button>
            </div>

            <div className="edit-card">
                <div className="card-section-title">
                    <FaClipboardList className="section-icon" />
                    <h2>Interview Information</h2>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="form-grid">
                        
                        {/* Company Name */}
                        <div className="form-group">
                            <label><FaBuilding className="input-icon" /> Company Name</label>
                            <select 
                                name="companyId" 
                                value={schedule.companyId} 
                                onChange={handleChange}
                            >
                                <option value="">Select Active Company</option>
                                {companies.map((company) => {
                                    // Make sure it matches the ID correctly
                                    const cId = company.id || company.companyId;
                                    return (
                                        <option key={cId} value={cId}>
                                            {company.companyName}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>

                        {/* Interview Round */}
                        <div className="form-group">
                            <label><FaClipboardList className="input-icon" /> Interview Round</label>
                            <select 
                                name="interviewRound" 
                                value={schedule.interviewRound} 
                                onChange={handleChange}
                            >
                                <option value="">Select Interview Round</option>
                                <option value="Aptitude">Aptitude</option>
                                <option value="Technical">Technical</option>
                                <option value="HR">HR</option>
                            </select>
                        </div>

                        {/* Interview Date */}
                        <div className="form-group">
                            <label><FaCalendarAlt className="input-icon" /> Interview Date</label>
                            <input 
                                type="date" 
                                name="interviewDate" 
                                value={schedule.interviewDate} 
                                onChange={handleChange}
                                min={minDate}
                            />
                        </div>

                        {/* Interview Time */}
                        <div className="form-group">
                            <label><FaClock className="input-icon" /> Interview Time</label>
                            <input 
                                type="time" 
                                name="interviewTime" 
                                value={schedule.interviewTime} 
                                onChange={handleChange}
                            />
                        </div>

                        {/* Duration */}
                        <div className="form-group">
                            <label><FaHourglassHalf className="input-icon" /> Duration</label>
                            <select 
                                name="duration" 
                                value={schedule.duration} 
                                onChange={handleChange}
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

                        {/* Interview Mode */}
                        <div className="form-group">
                            <label><FaLaptop className="input-icon" /> Interview Mode</label>
                            <select 
                                name="interviewMode" 
                                value={schedule.interviewMode} 
                                onChange={handleChange}
                            >
                                <option value="">Select Interview Mode</option>
                                <option value="Offline">Offline</option>
                                <option value="Online">Online</option>
                            </select>
                        </div>

                        {/* Venue (Spans full width now since Status is gone) */}
                        <div className="form-group" style={{ gridColumn: "1 / -1" }}>
                            <label><FaMapMarkerAlt className="input-icon" /> Venue</label>
                            <input 
                                type="text" 
                                name="venue" 
                                value={schedule.venue} 
                                onChange={handleChange}
                                placeholder="Enter venue or meeting link"
                            />
                        </div>

                    </div>

                    <div className="form-footer">
                        <button type="submit" className="update-btn">
                            <FaSave /> Update Schedule
                        </button>
                        <button type="button" className="cancel-btn" onClick={handleCancel}>
                            <FaTimes /> Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditInterviewSchedule;