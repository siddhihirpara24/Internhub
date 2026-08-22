import { useEffect, useState } from "react";
import axios from "axios";
import {
  FaLock,
  FaBuilding,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaMoneyBillWave,
  FaBriefcase,
  FaClock,
  FaCode,
  FaArrowRight,
  FaSearch,
} from "react-icons/fa";
import api from "../../api/axiosInstance";
import "./Internships.css";

function Internships() {
  const [profileComplete, setProfileComplete] = useState(0);
  const [loadingProfile, setLoadingProfile] = useState(true);
  
  const [internships, setInternships] = useState([]);
  const [loadingCompanies, setLoadingCompanies] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    // 1. Fetch Student Profile Progress
    const fetchProgress = async () => {
      try {
        const res = await api.get("/student/academic");
        setProfileComplete(res.data.completionPercentage);
      } catch (err) {
        console.error("Failed to load profile completion", err);
      } finally {
        setLoadingProfile(false);
      }
    };

    // 2. Fetch Companies
    const fetchCompanies = async () => {
      try {
        const res = await axios.get("http://localhost:8081/api/company/all");
        
        // This instantly hides all "Inactive" companies
        const activeCompanies = res.data.filter(c => 
            c.registrationStatus && c.registrationStatus.trim().toLowerCase() === "active"
        );
        
        setInternships(activeCompanies);
      } catch (err) {
        console.error("Failed to fetch companies", err);
      } finally {
        setLoadingCompanies(false);
      }
    };

    fetchProgress();
    fetchCompanies();
  }, []);

  const isProfileReady = profileComplete === 100;

  const handleApply = (company) => {
    if (!isProfileReady) return;
    alert(`Applied to ${company.companyName} - ${company.internshipRole}`);
    // real apply API call goes here later
  };

  // Calculates if the button should be active, locked, or closed based on today's date!
  const checkApplicationStatus = (startStr, endStr) => {
    if (!startStr || !endStr) return { isOpen: false, text: "Dates Not Set" };
    
    const today = new Date();
    today.setHours(0, 0, 0, 0); 

    const start = new Date(startStr);
    const end = new Date(endStr);

    if (today < start) return { isOpen: false, text: "Opening Soon" };
    if (today > end) return { isOpen: false, text: "Closed" };
    return { isOpen: true, text: "Apply Now" };
  };

  // Formats dates to look beautiful (e.g. 19 Aug 2026)
  const formatDate = (dateString) => {
    if (!dateString) return "TBD";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    return date.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
  };

  const renderSkills = (skillsString) => {
    if (!skillsString) return <span className="skill">Not Specified</span>;
    return skillsString.split(',').map((skill, index) => (
      <span className="skill" key={index}>
        {skill.trim()}
      </span>
    ));
  };

  const filteredInternships = internships.filter(c => 
    c.companyName?.toLowerCase().includes(search.toLowerCase()) || 
    c.internshipRole?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="campus-internship">
      {/* ================= HEADER ================= */}
      <div className="internship-header">
        <div>
          <h2>Campus Internship</h2>
          <p>Explore and apply for available campus internship opportunities.</p>
        </div>
      </div>

      {/* ================= PROFILE COMPLETION BANNER ================= */}
      {!loadingProfile && !isProfileReady && (
        <div className="profile-warning-banner">
          <FaLock />
          <span>
            Complete your Academic Details ({profileComplete}% done) to unlock the Apply button.
          </span>
        </div>
      )}

      {/* ================= TOOLBAR ================= */}
      <div className="internship-toolbar">
        <div className="internship-search">
          <FaSearch />
          <input 
            type="text" 
            placeholder="Search company or role..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <select className="internship-filter">
          <option value="">All Internships</option>
          <option value="on-campus">On Campus</option>
          <option value="hybrid">Hybrid</option>
        </select>
      </div>

      {/* ================= SUMMARY ================= */}
      <div className="internship-summary">
        <div className="summary-card">
          <div className="summary-icon blue">
            <FaBriefcase />
          </div>
          <div>
            <h3>{internships.length}</h3>
            <p>Available Internships</p>
          </div>
        </div>

        <div className="summary-card">
          <div className="summary-icon green">
            <FaBuilding />
          </div>
          <div>
            <h3>{new Set(internships.map(c => c.companyName)).size}</h3>
            <p>Companies</p>
          </div>
        </div>

        <div className="summary-card">
          <div className="summary-icon orange">
            <FaCalendarAlt />
          </div>
          <div>
            <h3>Active</h3>
            <p>Registrations</p>
          </div>
        </div>
      </div>

      {/* ================= INTERNSHIP LIST ================= */}
      <div className="internship-section-title">
        <div>
          <h3>Available Opportunities</h3>
          <p>Choose an internship that matches your skills and interests.</p>
        </div>
      </div>

      <div className="internship-grid">
        {loadingCompanies ? (
          <p style={{ padding: '20px', fontWeight: '500' }}>Loading Active Companies from Database...</p>
        ) : filteredInternships.length === 0 ? (
          <p style={{ padding: '20px', color: '#64748b' }}>No active internships available right now.</p>
        ) : (
          filteredInternships.map((company) => {
            
            const status = checkApplicationStatus(company.registrationStartDate, company.registrationEndDate);
            const isApplyEnabled = isProfileReady && status.isOpen;

            return (
              <div className="internship-card" key={company.id}>
                
                <div className="company-top">
                  <div className="company-logo">
                    <FaBuilding />
                  </div>
                  <div className="company-name">
                    <h3>{company.companyName}</h3>
                    <span>Campus Hiring</span>
                  </div>
                </div>

                <div className="internship-role">
                  <h2>{company.internshipRole}</h2>
                  <span className="internship-mode">On Campus</span>
                </div>

                <div className="internship-details">
                  
                  <div className="internship-detail">
                    <FaMapMarkerAlt />
                    <div>
                      <label>Location</label>
                      <p>{company.location}</p>
                    </div>
                  </div>

                  <div className="internship-detail">
                    <FaClock />
                    <div>
                      <label>Duration</label>
                      <p>{company.internshipDuration}</p>
                    </div>
                  </div>

                  <div className="internship-detail">
                    <FaMoneyBillWave />
                    <div>
                      <label>Stipend</label>
                      <p>{company.monthlyStipend || "Not specified"}</p>
                    </div>
                  </div>
                  
                  <div className="internship-detail">
                    <FaBriefcase />
                    <div>
                      <label>Package (CTC)</label>
                      <p>{company.ctcPackage || company.packageAmount || "Not specified"}</p>
                    </div>
                  </div>

                  {/* SHOWS BOTH START AND END DATE CLEARLY! */}
                  <div className="internship-detail">
                    <FaCalendarAlt />
                    <div>
                      <label>Registration Window</label>
                      <p>{formatDate(company.registrationStartDate)} - {formatDate(company.registrationEndDate)}</p>
                    </div>
                  </div>

                </div>

                <div className="skills-area">
                  <div className="skills-heading">
                    <FaCode />
                    <span>Required Skills</span>
                  </div>
                  <div className="skills">
                    {renderSkills(company.requiredSkills)}
                  </div>
                </div>

                <div className="internship-footer">
                  <span className="deadline-text">
                    {status.isOpen 
                        ? `Apply before ${formatDate(company.registrationEndDate)}` 
                        : `Registration ${status.text}`}
                  </span>

                  <button
                    className={`apply-btn ${!isApplyEnabled ? "apply-btn-disabled" : ""}`}
                    disabled={!isApplyEnabled}
                    onClick={() => handleApply(company)}
                    title={
                      !isProfileReady 
                        ? "Complete your Academic Details first" 
                        : (!status.isOpen ? "Application window is not active" : "")
                    }
                  >
                    {!isProfileReady ? "Locked" : status.text}
                    {isApplyEnabled ? <FaArrowRight /> : <FaLock />}
                  </button>
                  
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default Internships;