// StudentRegister.jsx

import { useState } from "react";
import { Link, useNavigate} from "react-router-dom";
import axios from "axios";
import "./StudentRegister.css";
import studentImg from "../../assets/student.png";

const API_URL = "http://localhost:8081/api/auth";

const StudentRegister = () => {
   const navigate = useNavigate();

    const [student, setStudent] = useState({
        fullName: "",
        email: "",
        mobile: "",
        enrollmentNumber: "",
        password: "",
        confirmPassword: "",
    });

  const [errors, setErrors] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setStudent({
            ...student,
            [e.target.name]: e.target.value,
        });
        // clear that field's error as soon as user starts typing again
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
      }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (student.password !== student.confirmPassword) {
            alert("Passwords do not match!");
            return;
        }
        //
        setLoading(true);
        //
        try {

            const response = await axios.post(
                `${API_URL}/register`,
                {
                    name: student.fullName,
                    enrollmentNumber: student.enrollmentNumber, // temporary: using username as enrollment number
                    email: student.email,
                    mobileNumber: student.mobile,
                    password: student.password,
                    confirmPassword: student.confirmPassword,
                }
            );

            // console.log(response.data);

    //         if (response.data === "Registration successful") {
    //             alert("Registration Successful");

    //             setStudent({
    //                 fullName: "",
    //                 email: "",
    //                 mobile: "",
    //                 enrollmentNumber: "",
    //                 password: "",
    //                 confirmPassword: "",
    //             });
    //         } else {
    //             // backend returned a message like "Email already registered"
    //             alert(response.data);
    //         }

    //     } catch (error) {
    //         console.log(error);
    //         alert(error.response?.data || "Registration Failed");
    //     }
    // };

    if (response.data === "Registration successful") {
        setShowSuccess(true);
      } else {
        // Map backend message to the correct field
        if (response.data === "Email already registered") {
          setErrors({ email: response.data });
        } else if (response.data === "Enrollment number already registered") {
          setErrors({ enrollmentNumber: response.data });
        } else {
          setErrors({ general: response.data });
        }
      }
    } catch (error) {
      setErrors({ general: error.response?.data || "Registration failed. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  const handleSuccessOk = () => {
    setShowSuccess(false);
    navigate("/student-login"); // adjust if your login route is different
  };

  return (
  <div className="register-page">

    <div className="register-container">

      {/* Left Side */}
      <div className="left-panel">
        <h1>Smart Internship Portal</h1>

        <p>
          A centralized platform for students to register, manage internships,
          track progress, submit reports, and collaborate with faculty and
          mentors.
        </p>

        <img src={studentImg} alt="Student" className="student-img" />
      </div>

      {/* Right Side */}
      <div className="register-card">

        <h2>Student Registration</h2>

        <p>Create your Smart Internship Portal account</p>
        {errors.general && (
            <div className="general-error">{errors.general}</div>
          )}
        <form onSubmit={handleSubmit}>

          <div className="input-group">
            <label>Full Name</label>
            <input
              type="text"
              name="fullName"
              placeholder="Enter your full name"
              value={student.fullName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={student.email}
              onChange={handleChange}
              className={errors.email ? "input-error" : ""}
              required
            />
            {errors.email && <span className="field-error">{errors.email}</span>}
          </div>

          <div className="input-group">
            <label>Mobile Number</label>
            <input
              type="tel"
              name="mobile"
              placeholder="Enter mobile number"
              value={student.mobile}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Enrollment Number</label>
            <input
              type="text"
              name="enrollmentNumber"
              placeholder="Enter Your Enrollment"
              value={student.enrollmentNumber}
              onChange={handleChange}
              className={errors.enrollmentNumber ? "input-error" : ""}
              required
            />
            {errors.enrollmentNumber && <span className="field-error">{errors.enrollmentNumber}</span>}
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Create password"
              value={student.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm password"
              value={student.confirmPassword}
              onChange={handleChange}
              className={errors.confirmPassword ? "input-error" : ""}
              required
            />
             {errors.confirmPassword && (
                <span className="field-error">{errors.confirmPassword}</span>
              )}
          </div>

          <button className="register-btn" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>

        </form>

        <div className="login-link">
            Already have an account? <Link to="/">Login</Link>
        </div>

      </div>

    </div>
     {/* Success Modal */}
      {showSuccess && (
        <div className="success-overlay">
          <div className="success-modal">
            <h3>Registration Successful!</h3>
            <p>Your account has been created. You can now log in.</p>
            <button className="success-ok-btn" onClick={handleSuccessOk}>
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};


export default StudentRegister;