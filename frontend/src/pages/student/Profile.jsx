import { useEffect, useState } from "react";
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaIdCard, FaCode, FaEdit, FaSave } from "react-icons/fa";
import api from "../../api/axiosInstance";
import { useProfile } from "../../context/useProfile";
import "./Profile.css";

function Profile() {
  const { profile } = useProfile();
  
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    fullName: "", email: "", enrollmentNumber: "",
    mobileNumber: "", hometown: "", department: "",
    gender: "", skill1: "", skill2: "",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/student/academic");
        setForm({
          fullName: res.data.fullName || "",
          email: res.data.email || "",
          enrollmentNumber: res.data.enrollmentNumber || "",
          mobileNumber: res.data.mobileNumber || "",
          hometown: res.data.hometown || "",
          department: res.data.department || "",
          gender: res.data.gender || "",
          skill1: res.data.skill1 || "",
          skill2: res.data.skill2 || "",
        });
      } catch (err) {
        console.error("Failed to load profile", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSave = async () => {
    try {
      await api.post("/student/academic", {
        mobileNumber: form.mobileNumber,
        hometown: form.hometown,
        skill1: form.skill1,
        skill2: form.skill2,
      });
      alert("Profile updated successfully");
      setEdit(false);
    } catch (err) {
      alert("Failed to save profile",err);
    }
  };

  if (loading) return <p style={{ padding: 40 }}>Loading...</p>;

  return (
    <div className="student-profile">
      <div className="profile-page-header">
        <div>
          <h2>My Profile</h2>
          <p>View and manage your personal information.</p>
        </div>
        {!edit ? (
          <button className="edit-profile-btn" onClick={() => setEdit(true)}><FaEdit /> Edit Profile</button>
        ) : (
          <button className="edit-profile-btn" onClick={handleSave}><FaSave /> Save Profile</button>
        )}
      </div>

      <div className="profile-main-card">
        <div className="profile-top">
          <div className="profile-image-wrapper">
            {profile.photoUrl ? (
                          <img
                            src={profile.photoUrl}
                            alt="Profile"
                            style={{ width: "100%", height: "100%", objectFit: "cover" }}
                          />
                        ) : (
                          <FaUser className="profile-fallback-icon" />
                        )}
          </div>
          <div className="profile-basic">
            <h1>{form.fullName}</h1>
            <p className="student-role">Student</p>
            <div className="student-id">
              <FaIdCard />
              <span>Enrollment: <strong>{form.enrollmentNumber}</strong></span>
            </div>
          </div>
        </div>

        <div className="profile-section">
          <div className="section-title"><FaUser /><h3>Personal Information</h3></div>
          <div className="profile-grid">
            <div className="profile-info-box">
              <div className="info-icon"><FaEnvelope /></div>
              <div><label>Email Address</label><p>{form.email}</p></div>
            </div>

            <div className="profile-info-box">
              <div className="info-icon"><FaPhone /></div>
              <div>
                <label>Phone Number</label>
                {edit ? (
                  <input type="tel" name="mobileNumber" value={form.mobileNumber} onChange={handleChange} maxLength={10} />
                ) : (
                  <p>{form.mobileNumber || "-"}</p>
                )}
              </div>
            </div>

            <div className="profile-info-box">
              <div className="info-icon"><FaMapMarkerAlt /></div>
              <div>
                <label>Home Town</label>
                {edit ? (
                  <input type="text" name="hometown" value={form.hometown} onChange={handleChange} />
                ) : (
                  <p>{form.hometown || "-"}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="profile-section skills-section">
          <div className="section-title"><FaCode /><h3>Technical Skills (max 2)</h3></div>
          {edit ? (
            <div className="profile-grid">
              <div className="profile-info-box">
                <div><label>Skill 1</label><input type="text" name="skill1" value={form.skill1} onChange={handleChange} /></div>
              </div>
              <div className="profile-info-box">
                <div><label>Skill 2</label><input type="text" name="skill2" value={form.skill2} onChange={handleChange} /></div>
              </div>
            </div>
          ) : (
            <div className="skills-list">
              {form.skill1 && <span className="skill-tag">{form.skill1}</span>}
              {form.skill2 && <span className="skill-tag">{form.skill2}</span>}
              {!form.skill1 && !form.skill2 && <p style={{ color: "#94a3b8" }}>No skills added yet.</p>}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;