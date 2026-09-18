import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import {
  FaUserGraduate,
  FaIdCard,
  FaBuilding,
  FaCalendarAlt,
  FaEnvelope,
  FaPhone,
  FaClipboardList,
  FaCommentAlt,
  FaCheckCircle,
  FaArrowLeft
} from "react-icons/fa";

import "./OptOutForm.css";

function OptOutForm() {
  const navigate = useNavigate();

  // =====================================================
  // FORM DATA
  // =====================================================
  const [formData, setFormData] = useState({
    studentName: "",
    enrollmentNo: "",
    department: "",
    semester: "",
    email: "",
    mobile: "",
    reason: "",
    detailedReason: "",
    confirmation: false
  });

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // =====================================================
  // GET LOGGED-IN STUDENT DETAILS
  // =====================================================
  useEffect(() => {
    const fetchStudentDetails = async () => {
      try {
        const token = localStorage.getItem("token");

        // Token not found
        if (!token) {
          alert("Please login first.");
          navigate("/student-login");
          return;
        }

        const response = await axios.get(
          "http://localhost:8081/api/opt-out/student-details",
          { headers: { Authorization: `Bearer ${token}` } }
        );

        const student = response.data;

        // Set fetched student details with smart fallbacks!
        setFormData((previousData) => ({
          ...previousData,
          studentName: student.studentName || student.name || "",
          enrollmentNo: student.enrollmentNo || student.enrollmentNumber || "",
          department: student.department || student.dept || "",
          semester: student.semester || student.sem || "",
          email: student.email || "",
          mobile: student.mobile || student.mobileNumber || ""
        }));
        
      } catch (error) {
        console.error("Student details fetch error:", error);

        if (error.response) {
          if (error.response.status === 401) {
            alert("Session expired. Please login again.");
            localStorage.removeItem("token");
            navigate("/student-login");
          } 
          // 🌟 Smart check for missing academic details!
          else if (typeof error.response.data === "string" && error.response.data.toLowerCase().includes("academic")) {
            alert("You must complete your Academic Details before you can access the Opt-Out Form!");
            navigate("/student/academic"); // Automatically redirects them!
          } 
          else {
            alert(error.response.data?.message || error.response.data || "Unable to fetch student details.");
          }
        } else {
          alert("Backend server is not connected.");
        }
      } finally {
        setLoading(false);
      }
    }; // 🌟 FIXED: This closing bracket was accidentally deleted!

    fetchStudentDetails();
  }, [navigate]);

  // =====================================================
  // HANDLE FORM CHANGE
  // =====================================================
  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    
    setFormData((previousData) => ({
      ...previousData,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  // =====================================================
  // SUBMIT OPT-OUT FORM
  // =====================================================
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Confirmation check
    if (!formData.confirmation) {
      alert("Please confirm that the information provided is correct.");
      return;
    }

    // Reason check
    if (!formData.reason) {
      alert("Please select a reason for Opt-Out.");
      return;
    }

    // Detailed reason check
    if (!formData.detailedReason.trim()) {
      alert("Please enter detailed reason.");
      return;
    }

    try {
      setSubmitting(true);
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Session expired. Please login again.");
        navigate("/student-login");
        return;
      }

      // Only send the fields the backend needs
      const requestData = {
        reason: formData.reason,
        detailedReason: formData.detailedReason
      };

      const response = await axios.post(
        "http://localhost:8081/api/opt-out",
        requestData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        }
      );

      console.log("Opt-Out Response:", response.data);
      alert("Opt-Out Request Submitted Successfully.");
      navigate("/student/dashboard");

    } catch (error) {
      console.error("Opt-Out submit error:", error);

      if (error.response) {
        alert(error.response.data?.message || error.response.data || "Unable to submit Opt-Out Request.");
      } else {
        alert("Backend server is not connected.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  // =====================================================
  // LOADING SCREEN
  // =====================================================
  if (loading) {
    return (
      <div className="optout-page">
        <div className="optout-card">
          <div className="card-heading">
            <div className="heading-icon">
              <FaClipboardList />
            </div>
            <div>
              <h3>Loading Student Details...</h3>
              <p>Please wait while we fetch your student information.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // =====================================================
  // MAIN PAGE
  // =====================================================
  return (
    <div className="optout-page">
      {/* HEADER */}
      <div className="optout-header">
        <div>
          <h2>Opt-Out Form</h2>
          <p>Submit a request to opt out from campus placement activities.</p>
        </div>
        <button
          type="button"
          className="back-btn"
          onClick={() => navigate("/student/dashboard")}
        >
          <FaArrowLeft /> Back
        </button>
      </div>

      {/* MAIN CARD */}
      <div className="optout-card">
        {/* CARD HEADER */}
        <div className="card-heading">
          <div className="heading-icon">
            <FaClipboardList />
          </div>
          <div>
            <h3>Placement Opt-Out Request</h3>
            <p>Student details are automatically fetched from your account.</p>
          </div>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit}>
          
          {/* STUDENT INFORMATION */}
          <div className="section">
            <div className="section-title">
              <FaUserGraduate />
              <h4>Student Information</h4>
            </div>

            <div className="form-grid">
              
              {/* STUDENT NAME */}
              <div className="form-group">
                <label>Student Name<span>*</span></label>
                <div className="input-wrapper">
                  <FaUserGraduate />
                  <input type="text" name="studentName" value={formData.studentName} readOnly />
                </div>
              </div>

              {/* ENROLLMENT NUMBER */}
              <div className="form-group">
                <label>Enrollment / Roll Number<span>*</span></label>
                <div className="input-wrapper">
                  <FaIdCard />
                  <input type="text" name="enrollmentNo" value={formData.enrollmentNo} readOnly />
                </div>
              </div>

              {/* DEPARTMENT */}
              <div className="form-group">
                <label>Department<span>*</span></label>
                <div className="input-wrapper">
                  <FaBuilding />
                  <input type="text" name="department" value={formData.department} readOnly />
                </div>
              </div>

              {/* SEMESTER */}
              <div className="form-group">
                <label>Semester<span>*</span></label>
                <div className="input-wrapper">
                  <FaCalendarAlt />
                  <input type="text" name="semester" value={formData.semester} readOnly />
                </div>
              </div>

              {/* EMAIL */}
              <div className="form-group">
                <label>Email Address<span>*</span></label>
                <div className="input-wrapper">
                  <FaEnvelope />
                  <input type="email" name="email" value={formData.email} readOnly />
                </div>
              </div>

              {/* MOBILE */}
              <div className="form-group">
                <label>Mobile Number<span>*</span></label>
                <div className="input-wrapper">
                  <FaPhone />
                  <input type="text" name="mobile" value={formData.mobile} readOnly />
                </div>
              </div>

            </div>
          </div>

          {/* OPT-OUT INFORMATION */}
          <div className="section">
            <div className="section-title">
              <FaClipboardList />
              <h4>Opt-Out Information</h4>
            </div>

            <div className="form-grid single-column">
              
              {/* REASON */}
              <div className="form-group">
                <label>Reason for Opt-Out<span>*</span></label>
                <div className="input-wrapper">
                  <FaClipboardList />
                  <select name="reason" value={formData.reason} onChange={handleChange} required>
                    <option value="">Select Reason</option>
                    <option value="Higher Studies">Higher Studies</option>
                    <option value="Already Placed">Already Placed</option>
                    <option value="Personal Reasons">Personal Reasons</option>
                    <option value="Government Job">Government Job</option>
                    <option value="Family Business">Family Business</option>
                    <option value="Entrepreneurship">Entrepreneurship</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              {/* DETAILED REASON */}
              <div className="form-group">
                <label>Detailed Reason<span>*</span></label>
                <div className="textarea-wrapper">
                  <FaCommentAlt />
                  <textarea
                    name="detailedReason"
                    placeholder="Please explain the reason for opting out..."
                    value={formData.detailedReason}
                    onChange={handleChange}
                    rows="5"
                    required
                  />
                </div>
              </div>

            </div>
          </div>

          {/* CONFIRMATION */}
          <div className="confirmation-box">
            <div className="checkbox-container">
              <input
                type="checkbox"
                name="confirmation"
                id="confirmation"
                checked={formData.confirmation}
                onChange={handleChange}
              />
              <label htmlFor="confirmation">
                <strong>I confirm that the information provided above is correct.</strong>
                <small>
                  I understand that submitting this request may prevent me from
                  participating in future campus placement drives, according to the placement policy.
                </small>
              </label>
            </div>
          </div>

          {/* BUTTONS */}
          <div className="button-area">
            {/* CANCEL */}
            <button
              type="button"
              className="cancel-btn"
              onClick={() => navigate("/student/dashboard")}
              disabled={submitting}
            >
              <FaArrowLeft /> Cancel
            </button>

            {/* SUBMIT */}
            <button type="submit" className="submit-btn" disabled={submitting}>
              <FaCheckCircle />
              {submitting ? "Submitting..." : "Submit Opt-Out Request"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

export default OptOutForm;