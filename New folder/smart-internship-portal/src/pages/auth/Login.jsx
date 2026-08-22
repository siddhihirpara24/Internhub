import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";
import studentImg from "../../assets/student.png";

const API_URL = "http://localhost:8081/api/auth";

const Login = () => {
  const navigate = useNavigate();

  const [step, setStep] = useState(1); // 1 = login form, 2 = OTP form
  const [login, setLogin] = useState({
    email: "",
    password: ""
  });
/**/
const [errors, setErrors] = useState({
  email: "",
  password: ""
});
/**/

  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setLogin({
      ...login,
      [e.target.name]: e.target.value
    });
      // Remove red border when user starts typing
      setErrors({
      ...errors,
      [e.target.name]: ""
      
  });

  setMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    /**/
     setErrors({
    email: "",
    password: ""
  });
    /**/
    setLoading(true);

    try {
      const res = await axios.post(`${API_URL}/login`, login);
      // backend returns plain strings like "OTP_SENT", "Email not found", "Incorrect password"
      if (res.data === "OTP_SENT") {
        setStep(2);
      } 
      /**/
      else if (res.data === "Email not found") {
    setErrors({
      email: "Email not found",
      password: ""
    });
  } else if (res.data === "Incorrect password") {
    setErrors({
      email: "",
      password: "Incorrect password"
    });
  }/* */
      else {
        setMessage(res.data);
      }
    } catch (err) {
      setMessage(err.response?.data || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  
  const handleOtpSubmit = async (e) => {
  e.preventDefault();
  setMessage("");
  setLoading(true);

  try {
    const res = await axios.post(`${API_URL}/verify-otp`, {
      email: login.email,
      otp
    });

    if (res.data.message === "LOGIN_SUCCESS") {
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);

      if (res.data.role === "ADMIN") {
        navigate("/admin-dashboard");
      } else {
        navigate("/student/dashboard");
      }
    } else {
      setMessage(res.data.message);
    }
  } catch (err) {
    setMessage(err.response?.data || "OTP verification failed.");
  } finally {
    setLoading(false);
  }
};
  /*
  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const res = await axios.post(`${API_URL}/verify-otp`, {
        email: login.email,
        otp
      });

      if (res.data === "LOGIN_SUCCESS") {
        navigate("/dashboard");
      } else {
        setMessage(res.data);
      }
    } catch (err) {
      setMessage(err.response?.data || "OTP verification failed.");
    } finally {
      setLoading(false);
    }
  };
  */

  return (
    <div className="login-page">
      <div className="login-container">
        {/* Left Side */}
        <div className="left-panel">
          <h1>Smart Internship Portal</h1>
          <p>
            Access your dashboard to track projects, monitor internship
            progress, submit reports, and communicate with mentors and faculty.
          </p>
          <img src={studentImg} alt="Student" className="student-img" />
        </div>

        {/* Right Side */}
        <div className="login-card">
          {step === 1 && (
            <>
              <h2>Welcome Back</h2>
              <p>Login to your account</p>

              <form onSubmit={handleSubmit}>
                <div className="input-group">
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter email"
                    value={login.email}
                    onChange={handleChange}
                    className={errors.email ? "input-error" : ""}
                    required
                  />
                  {errors.email && (<span className="field-error">{errors.email}</span>)}
                </div>

                <div className="input-group">
                  <label>Password</label>
                  <input
                    type="password"
                    name="password"
                    placeholder="Enter password"
                    value={login.password}
                    onChange={handleChange}
                    className={errors.password ? "input-error" : ""}
                    required
                  />
                  {errors.password && (<span className="field-error">{errors.password}</span>)}
                </div>

                <div className="forgot-password">
                  <Link to="/forgot-password">Forgot Password?</Link>
                </div>

                <button type="submit" className="login-btn" disabled={loading}>
                  {loading ? "Logging in..." : "Login"}
                </button>
              </form>

              <div className="register-link">
                Don't have an account? <Link to="/student-register">Register</Link>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <h2>Verify OTP</h2>
              <p>We sent a code to {login.email}</p>

              <form onSubmit={handleOtpSubmit}>
                <div className="input-group">
                  <label>OTP</label>
                  <input
                    type="text"
                    name="otp"
                    placeholder="Enter 6-digit OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    maxLength={6}
                    required
                  />
                </div>

                <button type="submit" className="login-btn" disabled={loading}>
                  {loading ? "Verifying..." : "Verify OTP"}
                </button>
              </form>
            </>
          )}

          {message && <p className="error-message">{message}</p>}
        </div>
      </div>
    </div>
  );
};

export default Login;