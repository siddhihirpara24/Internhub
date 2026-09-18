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
  FaTimes,
  FaCheckCircle,
} from "react-icons/fa";
import api from "../../api/axiosInstance";
import "./Internships.css";

function Internships() {
  const [isPlaced, setIsPlaced] = useState(false);

  const [profileComplete, setProfileComplete] = useState(0);
  const [loadingProfile, setLoadingProfile] = useState(true);

  const [internships, setInternships] = useState([]);
  const [loadingCompanies, setLoadingCompanies] = useState(true);
  const [search, setSearch] = useState("");

  const [optedOut, setOptedOut] = useState(false);
  const [loadingOptOut, setLoadingOptOut] = useState(true);

  // Applied internships (fetched from /student/applications so the
  // Apply button reflects real submitted applications)
  const [appliedKeys, setAppliedKeys] = useState([]);

  // Apply modal state
  const [applyModal, setApplyModal] = useState(null);
  const [applyForm, setApplyForm] = useState({
    enrollmentNumber: "",
    email: "",
    fullName: "",
    hometown: "",
    category: "",
    agree: false,
  });

  useEffect(() => {
    // 1. Fetch Student Profile Progress + pre-fill apply form + fetch existing applications
    const fetchProfileAndApplications = async () => {
      try {
        const res = await api.get("/student/academic");
        setProfileComplete(res.data.completionPercentage);
        setApplyForm((prev) => ({
          ...prev,
          enrollmentNumber: res.data.enrollmentNumber || "",
          email: res.data.email || "",
          fullName: res.data.fullName || "",
          hometown: res.data.hometown || "",
        }));

        const appsRes = await api.get("/student/applications");
        const apps = appsRes.data || [];
        setAppliedKeys(apps.map((a) => `${a.company}-${a.role}`));
        setIsPlaced(apps.some((a) => (a.overallStatus || "").toLowerCase() === "selected"));
      } catch (err) {
        console.error("Failed to load profile/applications", err);
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

  const fetchOptOutStatus = async () => {
  try {
    const res = await api.get("/opt-out/check");
    setOptedOut(!!res.data?.optedOut);
  } catch (err) {
    console.error("Failed to load opt-out status", err);
  } finally {
    setLoadingOptOut(false);
  }
};

    fetchProfileAndApplications();
    fetchCompanies();
    fetchOptOutStatus();   // ← add this call
  }, []);

  const isProfileReady = profileComplete === 100;

  const openApplyModal = (company) => {
    if (!isProfileReady) return;
    setApplyModal(company);
  };

  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setApplyForm({ ...applyForm, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmitApplication = async (e) => {
    e.preventDefault();
    if (!applyForm.agree) {
      alert("Please accept the terms and conditions to proceed.");
      return;
    }
    try {
      const res = await api.post("/student/apply", {
        company: applyModal.companyName,
        role: applyModal.internshipRole,
        enrollmentNumber: applyForm.enrollmentNumber,
        fullName: applyForm.fullName,
        hometown: applyForm.hometown,
        category: applyForm.category,
      });
      if (res.data === "Applied successfully") {
        setAppliedKeys([
          ...appliedKeys,
          `${applyModal.companyName}-${applyModal.internshipRole}`,
        ]);
        setApplyModal(null);
      }
      alert(res.data);
    } catch (err) {
      alert("Failed to apply. Please try again.");
      console.error(err);
    }
  };

  // const todayFormatted = new Date().toLocaleDateString("en-GB", {
  //   day: "2-digit", month: "long", year: "numeric",
  // });

  const parseLocalDate = (dateStr) => {
  if (!dateStr) return null;
  const datePart = String(dateStr).split("T")[0];
  const parts = datePart.split("-").map(Number);
  if (parts.length !== 3 || parts.some(Number.isNaN)) return null;
  const [year, month, day] = parts;
  return new Date(year, month - 1, day);
};

  // Calculates if the button should be active, locked, or closed based on today's date!
  const checkApplicationStatus = (startStr, endStr) => {
    if (!startStr || !endStr) return { isOpen: false, text: "Dates Not Set" };

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const start = parseLocalDate(startStr);
    const end = parseLocalDate(endStr);

    if (!start || !end) return { isOpen: false, text: "Dates Not Set" };
    if (today < start) return { isOpen: false, text: "Opening Soon" };
    if (today > end) return { isOpen: false, text: "Closed" };
    return { isOpen: true, text: "Apply Now" };
  };

  // Formats dates to look beautiful (e.g. 19 Aug 2026)
  const formatDate = (dateString) => {
    if (!dateString) return "TBD";
    const date = parseLocalDate(dateString);
    if (!date || isNaN(date.getTime())) return dateString;
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

       {/* ================= OPT-OUT CHECK ================= */}
    {!loadingOptOut && optedOut ? (
      <div className="profile-warning-banner">
        <FaLock />
        <span>
          You have opted out of campus placements, so internship listings are
          no longer shown here. Contact your placement coordinator if this was
          a mistake.
        </span>
      </div>
    ) : (
      <>

      {/* ================= PROFILE COMPLETION BANNER ================= */}
      {!loadingProfile && !isProfileReady && (
        <div className="profile-warning-banner">
          <FaLock />
          <span>
            Complete your Academic Details ({profileComplete}% done) to unlock the Apply button.
          </span>
        </div>
      )}

      {isPlaced && (
        <div className="profile-warning-banner" style={{ background: "#dcfce7", color: "#166534" }}>
          <FaCheckCircle />
          <span>Congratulations — you have been placed! You can no longer apply to further internships.</span>
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
    </>
    )}

      <div className="internship-grid">
        {loadingCompanies ? (
          <p style={{ padding: '20px', fontWeight: '500' }}>Loading Active Companies from Database...</p>
        ) : filteredInternships.length === 0 ? (
          <p style={{ padding: '20px', color: '#64748b' }}>No active internships available right now.</p>
        ) : (
          filteredInternships.map((company) => {

            const status = checkApplicationStatus(company.registrationStartDate, company.registrationEndDate);
            const key = `${company.companyName}-${company.internshipRole}`;
            const alreadyApplied = appliedKeys.includes(key);
            const isApplyEnabled = isProfileReady && status.isOpen && !alreadyApplied && !isPlaced;

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
                    onClick={() => openApplyModal(company)}
                    title={
                       isPlaced
                        ? "You have already been placed and cannot apply to further internships"
                      : !isProfileReady
                        ? "Complete your Academic Details first"
                        : (!status.isOpen ? "Application window is not active" : "")
                    }
                  >
                    {alreadyApplied ? (<><FaCheckCircle /> Applied</>) : isPlaced ? ("Placed") : !isProfileReady ? ("Locked") :( status.text)}
                    {isApplyEnabled ? <FaArrowRight /> : (!alreadyApplied ? <FaLock /> : null)}
                  </button>

                </div>
              </div>
            );
          })
        )}
      </div>

      {/* ================= APPLY MODAL ================= */}
      {applyModal && (
        <div className="modal-overlay" onClick={() => setApplyModal(null)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setApplyModal(null)}><FaTimes /></button>
            <h2>Apply — {applyModal.internshipRole}</h2>
            <p style={{ color: "#64748b", marginBottom: "20px" }}>{applyModal.companyName}</p>

            <form onSubmit={handleSubmitApplication} className="apply-form">
              <div className="form-group">
                <label>Enrollment Number</label>
                <input type="text" value={applyForm.enrollmentNumber} readOnly />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input type="email" value={applyForm.email} readOnly />
              </div>
              <div className="form-group">
                <label>Full Name</label>
                <input type="text" value={applyForm.fullName} readOnly />
              </div>
              <div className="form-group">
                <label>Home Town</label>
                <input type="text" value={applyForm.hometown} readOnly />
              </div>
              <div className="form-group">
                <label>Category</label>
                <select name="category" value={applyForm.category} onChange={handleFormChange} required>
                  <option value="">Select Category</option>
                  <option value="General">General</option>
                  <option value="OBC">OBC</option>
                  <option value="SC">SC</option>
                  <option value="ST">ST</option>
                  <option value="EWS">EWS</option>
                </select>
              </div>
              <div className="form-group">
                <label>Application Date</label>
                <input type="text" value={parseLocalDate} readOnly />
              </div>

              <div className="terms-box">
                <label style={{ display: "flex", gap: "8px", alignItems: "flex-start" }}>
                  <input type="checkbox" name="agree" checked={applyForm.agree} onChange={handleFormChange} />
                  <span style={{ fontSize: "13px" }}>
                    I confirm that the details provided are accurate. I understand that providing false information
                    may lead to disqualification from campus placement activities, and I agree to abide by the
                    college's internship and placement policies.
                  </span>
                </label>
              </div>

              <button type="submit" className="apply-btn" style={{ width: "100%", marginTop: "16px" }}>
                Submit Application
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Internships;
