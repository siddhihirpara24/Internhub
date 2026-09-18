import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axiosInstance";
import {FaSearch,/*FaEye,*/FaBuilding,FaBriefcase,/*FaCalendarAlt,*/FaCheck, FaTimes,FaCheckCircle,FaClock,FaTimesCircle,FaArrowLeft} from "react-icons/fa";
import "./TrackApplicant.css";

export default function TrackApplicant() 
{
  const navigate = useNavigate();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const res = await api.get("/student/applications");
        setApplications(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("Application fetch error", err);
        setApplications([]);
      } finally {
        setLoading(false);
      }
    };
    fetchApplications();
  }, []);

  const getCurrentRound = (app) => {
    if (app.hrStatus !== "Pending") return "HR Interview";
    if (app.technicalStatus !== "Pending") return "Technical";
    return "Aptitude";
  };

  // const RoundIcon = ({ status }) => {
  //   if (status === "Pass") return <FaCheckCircle style={{ color: "#16a34a" }} />;
  //   if (status === "Fail") return <FaTimesCircle style={{ color: "#dc2626" }} />;
  //   return <FaClock style={{ color: "#f59e0b" }} />;
  // };

  const RoundStepper = ({ app }) => {
  const steps = [
    { label: "Aptitude", status: app.aptitudeStatus },
    { label: "Technical", status: app.technicalStatus },
    { label: "HR", status: app.hrStatus },
  ];
  const stepClass = (status) => {
    if (status === "Pass") return "round-step-circle step-pass";
    if (status === "Fail") return "round-step-circle step-fail";
    return "round-step-circle step-pending";
  };
  return (
    <div className="round-stepper">
      {steps.map((step, idx) => (
        <div className="round-step" key={step.label}>
          <div className="round-step-node">
            <div className={stepClass(step.status)}>
              {step.status === "Pass" ? <FaCheck size={12} /> : step.status === "Fail" ? <FaTimes size={12} /> : idx + 1}
            </div>
            <span className="round-step-label">{step.label}</span>
          </div>
          {idx < steps.length - 1 && (
            <div className={`round-step-line ${step.status === "Pass" ? "line-complete" : ""}`} />
          )}
        </div>
      ))}
    </div>
  );
};

  const filtered = applications.filter((a) => {
    const text = `${a.company} ${a.role} ${a.overallStatus}`.toLowerCase();
    const matchesSearch = text.includes(search.toLowerCase());
    const matchesStatus = statusFilter === "All" || a.overallStatus === statusFilter;
    return matchesSearch && matchesStatus;
  });


  return (
    <main className="track-application">
      <div className="application-header">
        <div>
          <h2>Track Application</h2>
          <p>Track your internship and placement applications.</p>
        </div>
        <button className="back-btn" onClick={() => navigate("/dashboard")}>
          <FaArrowLeft /> Back
        </button>
      </div>

      <div className="application-summary">
        <div className="summary-card">
          <div className="summary-icon blue"><FaBriefcase /></div>
          <div><h3>{applications.length}</h3><p>Total Applications</p></div>
        </div>
        <div className="summary-card">
          <div className="summary-icon orange"><FaClock /></div>
          <div><h3>{applications.filter(a => a.overallStatus === "Under Review").length}</h3><p>Under Review</p></div>
        </div>
        <div className="summary-card">
          <div className="summary-icon green"><FaCheckCircle /></div>
          <div><h3>{applications.filter(a => a.overallStatus === "Selected").length}</h3><p>Selected</p></div>
        </div>
        <div className="summary-card">
          <div className="summary-icon purple"><FaTimesCircle /></div>
          <div><h3>{applications.filter(a => a.overallStatus === "Rejected").length}</h3><p>Rejected</p></div>
        </div>
      </div>

      <div className="application-toolbar">
        <div className="search-box">
          <FaSearch />
          <input type="text" placeholder="Search company, role or status..." value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <select className="status-filter" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="All">All Status</option>
          <option value="Under Review">Under Review</option>
          <option value="Selected">Selected</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>

      <div className="application-card">
        <div className="table-header">
          <div><h3>My Applications</h3><p>View and track your application progress.</p></div>
          <span className="application-count">{filtered.length} Applications</span>
        </div>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>#</th><th>Company</th><th>Role</th><th>Applied Date</th>
                <th>Current Round</th><th>Round Progress</th><th>Status</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan="7" className="empty-row">Loading Applications...</td></tr>
              ) : filtered.length === 0 ? (
                <tr><td colSpan="7" className="empty-row"><FaBriefcase /><span>No Applications Found</span></td></tr>
              ) : (
                filtered.map((app, index) => (
                  <tr key={app.id}>
                    <td>{index + 1}</td>
                    <td>
                      <div className="company-info">
                        <div className="company-icon"><FaBuilding /></div>
                        <strong>{app.company}</strong>
                      </div>
                    </td>
                    <td>{app.role}</td>
                    <td>{app.appliedDate}</td>
                    <td><span className="round-badge">{getCurrentRound(app)}</span></td>
                    <td><RoundStepper app={app} /></td>
                    <td>
                      <span className={`application-status ${app.overallStatus === "Selected" ? "selected" : app.overallStatus === "Rejected" ? "rejected" : "pending"}`}>
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
    </main>
  );
}

