import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { 
    FaArrowLeft, 
    FaUserGraduate, 
    FaFilePdf,
    FaUser,
    FaEnvelope,
    FaPhone,
    FaIdCard,
    FaVenusMars,
    FaMapMarkerAlt,
    FaMap,
    FaBuilding,
    FaBook,
    FaInfoCircle,
    FaChartLine,
    FaExclamationCircle,
    FaImage,FaTools, FaDownload
} from "react-icons/fa";
import "./ViewStudent.css";

const ViewStudent = () => {

  
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleDownloadReport = async () => {
  try {
    const token = localStorage.getItem("facultyToken");
    const response = await axios.get(`http://localhost:8081/api/students/${id}/pdf`, {
      headers: { Authorization: `Bearer ${token}` }, responseType: "blob",
    });
    const blobUrl = window.URL.createObjectURL(new Blob([response.data], { type: "application/pdf" }));
    const link = document.createElement("a");
    link.href = blobUrl;
    const safeName = (student?.enrollmentNumber || "student").replace(/[^a-zA-Z0-9_-]/g, "_");
    link.setAttribute("download", `${safeName}_report.pdf`);
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(blobUrl);
  } catch (error) {
    console.error("Error downloading report:", error);
    alert("Failed to download report. Please try again.");
  }
};

  useEffect(() => {
    const fetchStudentDetails = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("facultyToken"); 
        const response = await axios.get(`http://localhost:8081/api/students/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setStudent(response.data);
      } catch (error) {
        console.error("Error fetching student details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStudentDetails();
  }, [id]);

  const safeRender = (val, isBadge = false, badgeClass = "") => {
    if (val === null || val === undefined || val === "" || val === "null" || String(val).trim() === "") {
      return <span style={{color: '#94a3b8', fontWeight: 'bold'}}>-</span>;
    }
    if (isBadge) {
      return <span className={`vs-badge ${badgeClass}`}>{val}</span>;
    }
    return val;
  };

  if (loading) return <div className="loading-state">Loading student details from database...</div>;
  if (!student) return <div className="loading-state">Student not found in database.</div>;

  const finalDept = student.department || student.Department || student.dept;
  const finalSem = student.semester || student.Semester || student.sem;
  const finalCgpa1 = student.cgpaSem1 || student.cgpa_sem1;
  const finalCgpa2 = student.cgpaSem2 || student.cgpa_sem2;
  const finalBacklog = student.backlog !== undefined ? student.backlog : student.Backlog;

  return (
    <div className="view-student-container">
      {/* Header */}
      <div className="vs-header">
        <div>
          <h1 className="vs-title">Student Details</h1>
          <p className="vs-subtitle">Complete registration and academic information.</p>
        </div>
        <button className="back-btn" onClick={() => navigate(-1)}>
          <FaArrowLeft /> Back
        </button>
        <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "16px" }}>
          <button className="vs-download-btn" onClick={handleDownloadReport}>
          <FaDownload size={16} /> Download Full Report (PDF)
          </button>
        </div>

      </div>

      {/* Profile Card */}
      <div className="vs-profile-card">
        <div className="vs-profile-photo">
          {student.photoPath && student.photoPath !== "null" ? (
            <img src={`http://localhost:8081${student.photoPath}`} alt={student.name} />
          ) : (
            <FaUserGraduate size={50} color="#2563EB" />
          )}
        </div>
        <div className="vs-profile-info">
          <h2>{safeRender(student.name)}</h2>
          <p>{safeRender(finalDept)} Student</p>
          <span className="vs-enrollment">Enrollment No: {safeRender(student.enrollmentNumber)}</span>
        </div>
      </div>

      <div className="vs-grid-layout">
        {/* Section 1: Personal Info */}
        <div className="vs-card">
          <h3 className="vs-card-title">Personal Information</h3>
          <div className="vs-info-grid">
            <div className="vs-info-item">
              <label><FaUser className="vs-icon" /> Full Name</label>
              <p>{safeRender(student.name)}</p>
            </div>
            <div className="vs-info-item">
              <label><FaEnvelope className="vs-icon" /> Email Address</label>
              <p>{safeRender(student.email)}</p>
            </div>
            <div className="vs-info-item">
              <label><FaPhone className="vs-icon" /> Mobile Number</label>
              <p>{safeRender(student.mobileNumber)}</p>
            </div>
            <div className="vs-info-item">
              <label><FaIdCard className="vs-icon" /> Enrollment Number</label>
              <p>{safeRender(student.enrollmentNumber)}</p>
            </div>
            <div className="vs-info-item">
              <label><FaVenusMars className="vs-icon" /> Gender</label>
              <p>{safeRender(student.gender)}</p>
            </div>
            <div className="vs-info-item">
              <label><FaMapMarkerAlt className="vs-icon" /> Address</label>
              <p>{safeRender(student.address)}</p>
            </div>
            <div className="vs-info-item">
              <label><FaMap className="vs-icon" /> Hometown</label>
              <p>{safeRender(student.hometown)}</p>
            </div>
          </div>
        </div>

        {/* Section 2: Academic Info */}
        <div className="vs-card">
          <h3 className="vs-card-title">Academic Information</h3>
          <div className="vs-academic-list">
            <div className="vs-academic-row">
              <span><FaBuilding className="vs-icon"/> Department</span>
              <strong>{safeRender(finalDept)}</strong>
            </div>
            <div className="vs-academic-row">
              <span><FaBook className="vs-icon"/> Semester</span>
              <strong>{finalSem && finalSem !== "null" && finalSem !== "" ? finalSem : "-"}</strong>
            </div>
            <div className="vs-academic-row">
              <span><FaInfoCircle className="vs-icon"/> Division</span>
              <strong>{safeRender(student.division)}</strong>
            </div>
            <div className="vs-academic-row">
              <span><FaChartLine className="vs-icon"/> CGPA Sem 1</span>
              {safeRender(finalCgpa1, true, "vs-badge-blue")}
            </div>
            <div className="vs-academic-row">
              <span><FaChartLine className="vs-icon"/> CGPA Sem 2</span>
              {safeRender(finalCgpa2, true, "vs-badge-blue")}
            </div>
            <div className="vs-academic-row">
              <span><FaExclamationCircle className="vs-icon"/> Backlog</span>
              {finalBacklog !== null && finalBacklog !== undefined && finalBacklog !== "" && finalBacklog !== "null" ? (
                 <span className={`vs-badge ${Number(finalBacklog) > 0 ? 'vs-badge-red' : 'vs-badge-green'}`}>
                   {finalBacklog}
                 </span>
              ) : (
                safeRender(null)
              )}
            </div>
            <div className="vs-academic-row">
              <span><FaTools className="vs-icon"/> Skills</span>
              <strong>{[student.skill1, student.skill2].filter((s) => s && s !== "null" && s.trim() !== "").join(", ") || "-"}</strong>
            </div>
          </div>
        </div>

        {/* Section 3: Documents */}
        <div className="vs-card">
          <h3 className="vs-card-title">Documents</h3>
          <div className="vs-docs-container">
            <div className="vs-doc-item">
              <span><FaImage className="vs-icon"/> Student Photo</span>
              {student.photoPath && student.photoPath !== "null" ? (
                <div className="vs-doc-preview">
                  <img src={`http://localhost:8081${student.photoPath}`} alt="Student" />
                </div>
              ) : (
                <p className="vs-no-doc">No photo uploaded</p>
              )}
            </div>
            
            <div className="vs-doc-item">
              <span><FaFilePdf className="vs-icon"/> Resume</span>
              {student.resumePath && student.resumePath !== "null" ? (
                <a 
                  href={`http://localhost:8081${student.resumePath}`} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="vs-download-btn"
                  download
                >
                  <FaFilePdf size={18} /> View / Download Resume
                </a>
              ) : (
                <p className="vs-no-doc">No resume uploaded</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewStudent;