import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";
import studentImg from "../../assets/student.png";

const API_URL = "http://localhost:8081/api/auth";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const [step, setStep] = useState(1); // 1 = email form, 2 = OTP form
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (errors.email) setErrors({ ...errors, email: "" });
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!email.trim()) {
      setErrors({ email: "Please enter your email" });
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(`${API_URL}/forgot-password`, { email });

      if (res.data === "OTP_SENT") {
        setStep(2);
      } else if (res.data === "Email not found") {
        setErrors({ email: "This email is not registered" });
      } else {
        setMessage(res.data);
      }
    } catch (err) {
      setMessage(err.response?.data || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  
  const handleOtpSubmit = async (e) => {
  e.preventDefault();
  setMessage("");
  setLoading(true);

  try {
    const res = await axios.post(`${API_URL}/verify-otp`, { email, otp });

    if (res.data.message === "LOGIN_SUCCESS") {
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);

      if (res.data.role === "ADMIN") {
        navigate("/admin-dashboard");
      } else {
        navigate("/dashboard");
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
      const res = await axios.post(`${API_URL}/verify-otp`, { email, otp });

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
            Recover access to your account by verifying your email —
            no password needed.
          </p>
          <img src={studentImg} alt="Student" className="student-img" />
        </div>

        {/* Right Side */}
        <div className="login-card">
          {step === 1 && (
            <>
              <h2>Forgot Password</h2>
              <p>Enter your registered email to receive an OTP</p>

              <form onSubmit={handleEmailSubmit}>
                <div className="input-group">
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your registered email"
                    value={email}
                    onChange={handleEmailChange}
                    className={errors.email ? "input-error" : ""}
                  />
                  {errors.email && (
                    <span className="field-error">{errors.email}</span>
                  )}
                </div>

                <button type="submit" className="login-btn" disabled={loading}>
                  {loading ? "Sending OTP..." : "Send OTP"}
                </button>
              </form>

              <div className="register-link">
                Remembered your password? <Link to="/">Login</Link>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <h2>Verify OTP</h2>
              <p>We sent a code to {email}</p>

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

export default ForgotPassword;