import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { 
  FaBuilding, FaMapMarkerAlt, FaGlobe, FaUserTie, 
  FaPhone, FaEnvelope, FaCalendarAlt, FaBriefcase, 
  FaClock, FaMoneyBillWave, FaTools, FaAward, 
  FaClipboardList, FaSave, FaTimes, FaArrowLeft, FaEdit 
} from "react-icons/fa";
import "./EditCompany.css";

const EditCompany = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [company, setCompany] = useState({
    companyName: "",
    location: "",
    companyLink: "",
    hrName: "",
    hrMobile: "",
    hrEmail: "",
    companyEstablishment: "",
    internshipRole: "",
    internshipDuration: "",
    monthlyStipend: "",
    requiredSkills: "",
    companyPackage: "",
    round1: "",
    round2: "",
    round3: "",
    registrationStartDate: "",
    registrationEndDate: "",
    registrationStatus: ""
  });

  // 1. Fetch Company Data from Database and Map it to React State
  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const response = await axios.get(`http://localhost:8081/api/company/${id}`);
        const dbData = response.data;
        
        // We explicitly map the database data to the form fields so they fill up automatically!
        setCompany({
          companyName: dbData.companyName || "",
          location: dbData.location || "",
          // Safely handle different names from your Spring Boot DTO
          companyLink: dbData.companyLink || dbData.website || "", 
          hrName: dbData.hrName || "",
          hrMobile: dbData.hrMobile || "",
          hrEmail: dbData.hrEmail || "",
          // Safely handle establishment
          companyEstablishment: dbData.companyEstablishment || dbData.establishmentYear || "", 
          internshipRole: dbData.internshipRole || "",
          internshipDuration: dbData.internshipDuration || "",
          monthlyStipend: dbData.monthlyStipend || "",
          requiredSkills: dbData.requiredSkills || "",
          // Safely handle package
          companyPackage: dbData.companyPackage || dbData.ctcPackage || dbData.packageAmount || "", 
          round1: dbData.round1 || "",
          round2: dbData.round2 || "",
          round3: dbData.round3 || "",
          registrationStartDate: dbData.registrationStartDate || "",
          registrationEndDate: dbData.registrationEndDate || "",
          registrationStatus: dbData.registrationStatus || ""
        });
      } catch (error) {
        console.error("Error fetching company:", error);
        alert("Unable to fetch company details.");
      } finally {
        setLoading(false);
      }
    };

    fetchCompany();
  }, [id]);

  // Handle Form Changes as the user types
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCompany({
      ...company,
      [name]: value
    });
  };

  // 2. Submit Updated Data to Database (Mapped back to Spring Boot format)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Map it back to what Spring Boot expects before sending
      const payload = {
        ...company,
        website: company.companyLink,
        establishmentYear: company.companyEstablishment,
        packageAmount: company.companyPackage
      };

      await axios.put(`http://localhost:8081/api/company/${id}`, payload);
      alert("Company Updated Successfully");
      navigate("/faculty/company-list");
    } catch (error) {
      console.error("Update Error:", error);
      alert("Unable to update company.");
    }
  };

  if (loading) {
    return (
      <div className="edit-company-page ec-flex-center">
        <div className="ec-loading-text">Loading Company Details...</div>
      </div>
    );
  }

  return (
    <div className="edit-company-page">
      
      {/* HEADER SECTION */}
      <div className="ec-page-header">
        <div>
          <h1 className="ec-page-title"><FaEdit /> Edit Company</h1>
          <p className="ec-page-subtitle">Update company and internship information.</p>
        </div>
        <button type="button" className="ec-btn-back" onClick={() => navigate("/faculty/company-list")}>
          <FaArrowLeft /> Back to Company List
        </button>
      </div>

      <form onSubmit={handleSubmit} className="ec-form-container">
        
        {/* SECTION 1: COMPANY INFORMATION */}
        <div className="section-card">
          <h3 className="section-title"><FaBuilding /> Company Information</h3>
          <div className="form-grid">
            <div className="form-group">
              <label><FaBuilding /> Company Name</label>
              <input type="text" name="companyName" value={company.companyName} onChange={handleChange} required placeholder="e.g. TCS" />
            </div>
            <div className="form-group">
              <label><FaMapMarkerAlt /> Location</label>
              <input type="text" name="location" value={company.location} onChange={handleChange} required placeholder="e.g. Ahmedabad" />
            </div>
            <div className="form-group">
              <label><FaGlobe /> Company Website / Link</label>
              <input type="url" name="companyLink" value={company.companyLink} onChange={handleChange} placeholder="https://www.tcs.com" />
            </div>
            <div className="form-group">
              <label><FaCalendarAlt /> Company Establishment Year</label>
              <input type="number" name="companyEstablishment" value={company.companyEstablishment} onChange={handleChange} placeholder="e.g. 1968" />
            </div>
          </div>
        </div>

        {/* SECTION 2: HR / CONTACT INFORMATION */}
        <div className="section-card">
          <h3 className="section-title"><FaUserTie /> HR / Contact Information</h3>
          <div className="form-grid">
            <div className="form-group">
              <label><FaUserTie /> HR Name</label>
              <input type="text" name="hrName" value={company.hrName} onChange={handleChange} required placeholder="e.g. Rahul Shah" />
            </div>
            <div className="form-group">
              <label><FaPhone /> HR Mobile Number</label>
              <input type="tel" name="hrMobile" value={company.hrMobile} onChange={handleChange} required placeholder="e.g. 9876543210" />
            </div>
            <div className="form-group">
              <label><FaEnvelope /> HR Email</label>
              <input type="email" name="hrEmail" value={company.hrEmail} onChange={handleChange} required placeholder="e.g. rahul@tcs.com" />
            </div>
          </div>
        </div>

        {/* SECTION 3: INTERNSHIP INFORMATION */}
        <div className="section-card">
          <h3 className="section-title"><FaBriefcase /> Internship Information</h3>
          <div className="form-grid">
            <div className="form-group">
              <label><FaBriefcase /> Internship Role</label>
              <input type="text" name="internshipRole" value={company.internshipRole} onChange={handleChange} required placeholder="e.g. Java Developer Intern" />
            </div>
            <div className="form-group">
              <label><FaClock /> Internship Duration</label>
              <select name="internshipDuration" value={company.internshipDuration} onChange={handleChange} required>
                <option value="">Select Duration</option>
                <option value="3 Months">3 Months</option>
                <option value="6 Months">6 Months</option>
                <option value="9 Months">9 Months</option>
                <option value="12 Months">12 Months</option>
              </select>
            </div>
            <div className="form-group">
              <label><FaMoneyBillWave /> Monthly Stipend</label>
              <input type="text" name="monthlyStipend" value={company.monthlyStipend} onChange={handleChange} required placeholder="e.g. 15000" />
            </div>
            <div className="form-group">
              <label><FaAward /> Company Package</label>
              <input type="text" name="companyPackage" value={company.companyPackage} onChange={handleChange} required placeholder="e.g. 6 LPA" />
            </div>
            <div className="form-group ec-col-span-full">
              <label><FaTools /> Required Skills</label>
              <textarea name="requiredSkills" value={company.requiredSkills} onChange={handleChange} rows="3" required placeholder="e.g. Java, Spring Boot, MySQL, Git"></textarea>
            </div>
          </div>
        </div>

        {/* SECTION 4: INTERVIEW PROCESS */}
        <div className="section-card">
          <h3 className="section-title"><FaClipboardList /> Interview Process</h3>
          <div className="ec-rounds-grid">
            
            {/* Round 1 */}
            <div className="ec-round-box">
              <h4 className="ec-round-title">Round 1</h4>
              <div className="ec-radio-group">
                <label className={`ec-radio-label ${company.round1 === "Aptitude" ? "selected" : ""}`}>
                  <input type="radio" name="round1" value="Aptitude" checked={company.round1 === "Aptitude"} onChange={handleChange} /> Aptitude
                </label>
                <label className={`ec-radio-label ${company.round1 === "Technical" ? "selected" : ""}`}>
                  <input type="radio" name="round1" value="Technical" checked={company.round1 === "Technical"} onChange={handleChange} /> Technical
                </label>
                <label className={`ec-radio-label ${company.round1 === "HR" ? "selected" : ""}`}>
                  <input type="radio" name="round1" value="HR" checked={company.round1 === "HR"} onChange={handleChange} /> HR
                </label>
              </div>
            </div>

            {/* Round 2 */}
            <div className="ec-round-box">
              <h4 className="ec-round-title">Round 2</h4>
              <div className="ec-radio-group">
                <label className={`ec-radio-label ${company.round2 === "Aptitude" ? "selected" : ""}`}>
                  <input type="radio" name="round2" value="Aptitude" checked={company.round2 === "Aptitude"} onChange={handleChange} /> Aptitude
                </label>
                <label className={`ec-radio-label ${company.round2 === "Technical" ? "selected" : ""}`}>
                  <input type="radio" name="round2" value="Technical" checked={company.round2 === "Technical"} onChange={handleChange} /> Technical
                </label>
                <label className={`ec-radio-label ${company.round2 === "HR" ? "selected" : ""}`}>
                  <input type="radio" name="round2" value="HR" checked={company.round2 === "HR"} onChange={handleChange} /> HR
                </label>
              </div>
            </div>

            {/* Round 3 */}
            <div className="ec-round-box">
              <h4 className="ec-round-title">Round 3</h4>
              <div className="ec-radio-group">
                <label className={`ec-radio-label ${company.round3 === "Aptitude" ? "selected" : ""}`}>
                  <input type="radio" name="round3" value="Aptitude" checked={company.round3 === "Aptitude"} onChange={handleChange} /> Aptitude
                </label>
                <label className={`ec-radio-label ${company.round3 === "Technical" ? "selected" : ""}`}>
                  <input type="radio" name="round3" value="Technical" checked={company.round3 === "Technical"} onChange={handleChange} /> Technical
                </label>
                <label className={`ec-radio-label ${company.round3 === "HR" ? "selected" : ""}`}>
                  <input type="radio" name="round3" value="HR" checked={company.round3 === "HR"} onChange={handleChange} /> HR
                </label>
              </div>
            </div>

          </div>
        </div>

        {/* SECTION 5: REGISTRATION INFORMATION */}
        <div className="section-card">
          <h3 className="section-title"><FaCalendarAlt /> Registration Information</h3>
          <div className="form-grid">
            <div className="form-group">
              <label>Registration Start Date</label>
              <input type="date" name="registrationStartDate" value={company.registrationStartDate} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Registration End Date</label>
              <input type="date" name="registrationEndDate" value={company.registrationEndDate} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Registration Status</label>
              <select name="registrationStatus" value={company.registrationStatus} onChange={handleChange}>
                <option value="">Select Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>
        </div>

        {/* FORM ACTIONS */}
        <div className="ec-form-actions">
          <button type="submit" className="ec-btn-submit">
            <FaSave /> Update Company
          </button>
          <button type="button" className="ec-btn-cancel" onClick={() => navigate("/faculty/company-list")}>
            <FaTimes /> Cancel
          </button>
        </div>

      </form>
    </div>
  );
};

export default EditCompany;