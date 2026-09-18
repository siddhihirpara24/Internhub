import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { 
  FaBuilding, FaMapMarkerAlt, FaGlobe, FaCalendarAlt, 
  FaUserTie, FaPhone, FaEnvelope, FaBriefcase, 
  FaClock, FaMoneyBillWave, FaTools, FaAward, 
  FaClipboardList, FaInfoCircle, FaEdit, FaArrowLeft 
} from 'react-icons/fa';
import './ViewCompany.css';

const ViewCompany = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetching data using .then() to avoid any strict linter warnings
    axios.get(`http://localhost:8081/api/company/${id}`)
      .then((response) => {
        setCompany(response.data);
        setError(null);
      })
      .catch((err) => {
        console.error("Axios Error fetching company:", err);
        setError("Unable to fetch company details.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  // Helper to format dates professionally
  const formatDate = (dateString) => {
    if (!dateString) return "Not Assigned";
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-GB', options);
  };

  // Helper to render skills as badges
  const renderSkills = (skillsString) => {
    if (!skillsString) return <span className="vc-text-muted">Not Assigned</span>;
    // Split by comma, remove extra spaces, and filter out empty strings
    const skillsArray = skillsString.split(',').map(s => s.trim()).filter(s => s);
    
    return (
      <div className="vc-skills-wrapper">
        {skillsArray.map((skill, index) => (
          <span key={index} className="vc-skill-badge">{skill}</span>
        ))}
      </div>
    );
  };

  // Loading State
  if (loading) {
    return (
      <div className="vc-page-container vc-flex-center">
        <div className="vc-loading-text">Loading Company Details...</div>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="vc-page-container vc-flex-center">
        <div className="vc-error-text">{error}</div>
        <button className="vc-btn-back-simple" onClick={() => navigate('/faculty/company-list')}>
          <FaArrowLeft /> Back to Company List
        </button>
      </div>
    );
  }

  // Empty Data State
  if (!company) {
    return (
      <div className="vc-page-container vc-flex-center">
        <div className="vc-error-text">Company Not Found</div>
        <button className="vc-btn-back-simple" onClick={() => navigate('/faculty/company-list')}>
          <FaArrowLeft /> Back to Company List
        </button>
      </div>
    );
  }

  // Safe data mapping (Handles both existing Entity fields and requested fields)
  const website = company.companyLink || company.website;
  const establishment = company.companyEstablishment || company.establishmentYear;
  const packageAmount = company.companyPackage || company.ctcPackage || company.packageAmount;
  
  // Status Configuration
  const rawStatus = (company.registrationStatus || "Inactive").toLowerCase();
  let statusClass = "vc-status-inactive";
  let statusLabel = "Inactive";

  if (rawStatus === 'active') {
    statusClass = "vc-status-active";
    statusLabel = "Active";
  } else if (rawStatus === 'pending') {
    statusClass = "vc-status-pending";
    statusLabel = "Pending";
  }

  return (
    <div className="vc-page-container">
      
      {/* PAGE HEADER */}
      <div className="vc-page-header">
        <div>
          <h1 className="vc-page-title">Company Details</h1>
          <p className="vc-page-subtitle">Complete company and internship information.</p>
        </div>
        <button className="vc-btn-back" onClick={() => navigate('/faculty/company-list')}>
          <FaArrowLeft /> Back
        </button>
      </div>

      {/* HEADER CARD */}
      <div className="vc-header-card">
        <div className="vc-hc-main">
          <FaBuilding className="vc-hc-icon" />
          <h2 className="vc-hc-title">{company.companyName}</h2>
        </div>
        <div className="vc-hc-details">
          <span className="vc-hc-location"><FaMapMarkerAlt /> {company.location || "Not Assigned"}</span>
          <span className={`vc-status-badge ${statusClass}`}>{statusLabel}</span>
        </div>
      </div>

      <div className="vc-grid-layout">
        
        {/* SECTION 1: COMPANY INFORMATION */}
        <div className="vc-card">
          <h3 className="vc-card-title">Company Information</h3>
          <div className="vc-info-list">
            <div className="vc-info-item">
              <span className="vc-info-label"><FaInfoCircle /> Company ID</span>
              <span className="vc-info-value">{company.id || company.companyId}</span>
            </div>
            <div className="vc-info-item">
              <span className="vc-info-label"><FaBuilding /> Company Name</span>
              <span className="vc-info-value">{company.companyName}</span>
            </div>
            <div className="vc-info-item">
              <span className="vc-info-label"><FaMapMarkerAlt /> Location</span>
              <span className="vc-info-value">{company.location || "Not Assigned"}</span>
            </div>
            <div className="vc-info-item">
              <span className="vc-info-label"><FaGlobe /> Website</span>
              <span className="vc-info-value">
                {website ? (
                  <a href={website} target="_blank" rel="noopener noreferrer" className="vc-link">
                    {website}
                  </a>
                ) : "Not Assigned"}
              </span>
            </div>
            <div className="vc-info-item">
              <span className="vc-info-label"><FaCalendarAlt /> Establishment</span>
              <span className="vc-info-value">{establishment || "Not Assigned"}</span>
            </div>
          </div>
        </div>

        {/* SECTION 2: HR INFORMATION */}
        <div className="vc-card">
          <h3 className="vc-card-title">HR / Contact Information</h3>
          <div className="vc-info-list">
            <div className="vc-info-item">
              <span className="vc-info-label"><FaUserTie /> HR Name</span>
              <span className="vc-info-value">{company.hrName || "Not Assigned"}</span>
            </div>
            <div className="vc-info-item">
              <span className="vc-info-label"><FaPhone /> HR Mobile Number</span>
              <span className="vc-info-value">
                {company.hrMobile ? (
                  <a href={`tel:${company.hrMobile}`} className="vc-link">{company.hrMobile}</a>
                ) : "Not Assigned"}
              </span>
            </div>
            <div className="vc-info-item">
              <span className="vc-info-label"><FaEnvelope /> HR Email</span>
              <span className="vc-info-value">
                {company.hrEmail ? (
                  <a href={`mailto:${company.hrEmail}`} className="vc-link">{company.hrEmail}</a>
                ) : "Not Assigned"}
              </span>
            </div>
          </div>
        </div>

        {/* SECTION 3: INTERNSHIP INFORMATION */}
        <div className="vc-card vc-full-width">
          <h3 className="vc-card-title">Internship Information</h3>
          <div className="vc-info-grid">
            <div className="vc-info-item">
              <span className="vc-info-label"><FaBriefcase /> Internship Role</span>
              <span className="vc-info-value">{company.internshipRole || "Not Assigned"}</span>
            </div>
            <div className="vc-info-item">
              <span className="vc-info-label"><FaClock /> Internship Duration</span>
              <span className="vc-info-value">{company.internshipDuration || "Not Assigned"}</span>
            </div>
            <div className="vc-info-item">
              <span className="vc-info-label"><FaMoneyBillWave /> Monthly Stipend</span>
              <span className="vc-info-value">{company.monthlyStipend || "Not Assigned"}</span>
            </div>
            <div className="vc-info-item">
              <span className="vc-info-label"><FaAward /> Company Package</span>
              <span className="vc-info-value">{packageAmount || "Not Assigned"}</span>
            </div>
            <div className="vc-info-item vc-col-span-full">
              <span className="vc-info-label"><FaTools /> Required Skills</span>
              <div className="vc-info-value">{renderSkills(company.requiredSkills)}</div>
            </div>
          </div>
        </div>

        {/* SECTION 4: INTERVIEW PROCESS */}
        <div className="vc-card vc-full-width">
          <h3 className="vc-card-title">Interview Process</h3>
          <div className="vc-rounds-container">
            <div className="vc-round-box">
              <span className="vc-round-number">ROUND 1</span>
              <span className="vc-round-name"><FaClipboardList /> {company.round1 || "Not Assigned"}</span>
            </div>
            <div className="vc-round-box">
              <span className="vc-round-number">ROUND 2</span>
              <span className="vc-round-name"><FaClipboardList /> {company.round2 || "Not Assigned"}</span>
            </div>
            <div className="vc-round-box">
              <span className="vc-round-number">ROUND 3</span>
              <span className="vc-round-name"><FaClipboardList /> {company.round3 || "Not Assigned"}</span>
            </div>
          </div>
        </div>

        {/* SECTION 5: REGISTRATION INFORMATION */}
        <div className="vc-card vc-full-width">
          <h3 className="vc-card-title">Registration Information</h3>
          <div className="vc-info-grid">
            <div className="vc-info-item">
              <span className="vc-info-label"><FaCalendarAlt /> Registration Start Date</span>
              <span className="vc-info-value">{formatDate(company.registrationStartDate)}</span>
            </div>
            <div className="vc-info-item">
              <span className="vc-info-label"><FaCalendarAlt /> Registration End Date</span>
              <span className="vc-info-value">{formatDate(company.registrationEndDate)}</span>
            </div>
            <div className="vc-info-item">
              <span className="vc-info-label"><FaInfoCircle /> Registration Status</span>
              <span className="vc-info-value">
                <span className={`vc-status-badge ${statusClass}`}>{statusLabel}</span>
              </span>
            </div>
          </div>
        </div>

      </div>

      {/* FOOTER ACTIONS */}
      <div className="vc-footer-actions">
        <button className="vc-btn-back-bottom" onClick={() => navigate('/faculty/company-list')}>
          <FaArrowLeft /> Back
        </button>
        <button className="vc-btn-edit" onClick={() => navigate(`/faculty/edit-company/${company.id || company.companyId}`)}>
          <FaEdit /> Edit Company
        </button>
      </div>

    </div>
  );
};

export default ViewCompany;