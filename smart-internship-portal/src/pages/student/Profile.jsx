import {
    FaUser,
    FaEnvelope,
    FaPhone,
    FaMapMarkerAlt,
    FaIdCard,
    FaGraduationCap,
    FaUniversity,
    FaCalendarAlt,
    FaCode,
    FaEdit,
} from "react-icons/fa";

import "./Profile.css";

function Profile() {

    // Design purpose static data
    const student = {
        name: "Meet Patel",
        studentId: "STU2026001",
        email: "meetpatel@gmail.com",
        phone: "+91 98765 43210",
        gender: "Male",
        dob: "15 March 2003",
        department: "Computer Engineering",
        course: "B.E. Computer Engineering",
        university: "Gujarat Technological University",
        semester: "8th Semester",
        enrollmentYear: "2022",
        cgpa: "8.42",
        skills: "Java, React, Spring Boot, MySQL",
        address: "Ahmedabad, Gujarat, India",
    };

    return (

        <div className="student-profile">

            {/* ================= HEADER ================= */}

            <div className="profile-page-header">

                <div>
                    <h2>My Profile</h2>

                    <p>
                        View and manage your personal and academic information.
                    </p>
                </div>

                <button className="edit-profile-btn">
                    <FaEdit />
                    Edit Profile
                </button>

            </div>


            {/* ================= PROFILE TOP CARD ================= */}

            <div className="profile-main-card">

                <div className="profile-top">

                    {/* Profile Image */}

                    <div className="profile-image-wrapper">

                        <img
                            src="/student.png"
                            alt="Student"
                            onError={(e) => {
                                e.target.style.display = "none";
                                e.target.parentElement.classList.add(
                                    "profile-fallback"
                                );
                            }}
                        />

                        <FaUser className="profile-fallback-icon" />

                    </div>


                    {/* Basic Information */}

                    <div className="profile-basic">

                        <h1>{student.name}</h1>

                        <p className="student-role">
                            Student
                        </p>

                        <div className="student-id">

                            <FaIdCard />

                            <span>
                                Student ID: <strong>{student.studentId}</strong>
                            </span>

                        </div>

                        <div className="profile-status">
                            Active Student
                        </div>

                    </div>

                </div>


                {/* ================= PERSONAL INFORMATION ================= */}

                <div className="profile-section">

                    <div className="section-title">

                        <FaUser />

                        <h3>Personal Information</h3>

                    </div>


                    <div className="profile-grid">

                        <div className="profile-info-box">

                            <div className="info-icon">
                                <FaUser />
                            </div>

                            <div>
                                <label>Full Name</label>
                                <p>{student.name}</p>
                            </div>

                        </div>


                        <div className="profile-info-box">

                            <div className="info-icon">
                                <FaEnvelope />
                            </div>

                            <div>
                                <label>Email Address</label>
                                <p>{student.email}</p>
                            </div>

                        </div>


                        <div className="profile-info-box">

                            <div className="info-icon">
                                <FaPhone />
                            </div>

                            <div>
                                <label>Phone Number</label>
                                <p>{student.phone}</p>
                            </div>

                        </div>


                        <div className="profile-info-box">

                            <div className="info-icon">
                                <FaUser />
                            </div>

                            <div>
                                <label>Gender</label>
                                <p>{student.gender}</p>
                            </div>

                        </div>


                        <div className="profile-info-box">

                            <div className="info-icon">
                                <FaCalendarAlt />
                            </div>

                            <div>
                                <label>Date of Birth</label>
                                <p>{student.dob}</p>
                            </div>

                        </div>


                        <div className="profile-info-box">

                            <div className="info-icon">
                                <FaMapMarkerAlt />
                            </div>

                            <div>
                                <label>Address</label>
                                <p>{student.address}</p>
                            </div>

                        </div>

                    </div>

                </div>


                {/* ================= ACADEMIC INFORMATION ================= */}

                <div className="profile-section">

                    <div className="section-title">

                        <FaGraduationCap />

                        <h3>Academic Information</h3>

                    </div>


                    <div className="profile-grid">

                        <div className="profile-info-box">

                            <div className="info-icon">
                                <FaGraduationCap />
                            </div>

                            <div>
                                <label>Course</label>
                                <p>{student.course}</p>
                            </div>

                        </div>


                        <div className="profile-info-box">

                            <div className="info-icon">
                                <FaUniversity />
                            </div>

                            <div>
                                <label>University</label>
                                <p>{student.university}</p>
                            </div>

                        </div>


                        <div className="profile-info-box">

                            <div className="info-icon">
                                <FaGraduationCap />
                            </div>

                            <div>
                                <label>Department</label>
                                <p>{student.department}</p>
                            </div>

                        </div>


                        <div className="profile-info-box">

                            <div className="info-icon">
                                <FaCalendarAlt />
                            </div>

                            <div>
                                <label>Current Semester</label>
                                <p>{student.semester}</p>
                            </div>

                        </div>


                        <div className="profile-info-box">

                            <div className="info-icon">
                                <FaCalendarAlt />
                            </div>

                            <div>
                                <label>Enrollment Year</label>
                                <p>{student.enrollmentYear}</p>
                            </div>

                        </div>


                        <div className="profile-info-box">

                            <div className="info-icon cgpa-icon">
                                <FaGraduationCap />
                            </div>

                            <div>
                                <label>CGPA</label>
                                <p className="cgpa">
                                    {student.cgpa}
                                </p>
                            </div>

                        </div>

                    </div>

                </div>


                {/* ================= SKILLS ================= */}

                <div className="profile-section skills-section">

                    <div className="section-title">

                        <FaCode />

                        <h3>Technical Skills</h3>

                    </div>


                    <div className="skills-list">

                        {student.skills.split(",").map((skill, index) => (

                            <span className="skill-tag" key={index}>
                                {skill.trim()}
                            </span>

                        ))}

                    </div>

                </div>

            </div>

        </div>
    );
}

export default Profile;