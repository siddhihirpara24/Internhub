import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom"; 
import {
    FaHome,
    FaUserGraduate,
    FaBuilding,
   // FaClipboardList,
    FaCalendarAlt,
    FaChartBar,
    FaSignOutAlt,
    FaChevronDown,
    FaChevronRight,
    FaUniversity
} from "react-icons/fa";

import "./Sidebar.css";

const Sidebar = ({ sidebarOpen }) => {
    const location = useLocation();
    const navigate = useNavigate();

    const [studentOpen, setStudentOpen] = useState(true);
    const [companyOpen, setCompanyOpen] = useState(false);
    //const [interviewOpen, setInterviewOpen] = useState(false);

    // FIXED: Because we use wildcard routing, the actual URL contains /faculty
    const isActive = (path) => location.pathname === `/faculty${path}`;

    // ==================================================
    // LOGOUT LOGIC
    // ==================================================
    const handleLogout = () => {
        localStorage.removeItem('facultyToken');
        localStorage.removeItem('role'); // Also clear the role if you use it!
        navigate('/');
    };

    return (
        <aside className={`sidebar ${sidebarOpen ? "" : "close"}`}>

            {/* ================= Logo ================= */}
            <div className="sidebar-logo">
                <FaUniversity className="logo-icon" />
                <div className="logo-text">
                    <h2>SMART</h2>
                    <h3>INTERNSHIP PORTAL</h3>
                </div>
            </div>

            <div className="faculty-title">
                FACULTY PANEL
            </div>

            {/* ================= Menu ================= */}
            <div className="menu">

                {/* Dashboard */}
                {/* FIXED: Prepend /faculty to the navigation path */}
                <Link to="/faculty/dashboard" className={`menu-item ${isActive("/dashboard") ? "active" : ""}`}>
                    <div className="menu-left">
                        <FaHome />
                        <span>Dashboard</span>
                    </div>
                </Link>

                {/* Student Management */}
                <div className="menu-item" onClick={() => setStudentOpen(!studentOpen)}>
                    <div className="menu-left">
                        <FaUserGraduate />
                        <span>Student Management</span>
                    </div>
                    {studentOpen ? <FaChevronDown /> : <FaChevronRight />}
                </div>

                {studentOpen && (
                    <div className="submenu">
                        <Link to="/faculty/all-students" className={isActive("/all-students") ? "active-submenu" : ""}>All Students</Link>
                        <Link to="/faculty/applied-students" className={isActive("/applied-students") ? "active-submenu" : ""}>Applied Students</Link>
                        <Link to="/faculty/placed-students" className={isActive("/placed-students") ? "active-submenu" : ""}>Placed Students</Link>
                        <Link to="/faculty/optout-students" className={isActive("/optout-students") ? "active-submenu" : ""}>Opt-Out Students</Link>
                    </div>
                )}

                {/* Company Management */}
                <div className="menu-item" onClick={() => setCompanyOpen(!companyOpen)}>
                    <div className="menu-left">
                        <FaBuilding />
                        <span>Company Management</span>
                    </div>
                    {companyOpen ? <FaChevronDown /> : <FaChevronRight />}
                </div>

                {companyOpen && (
                    <div className="submenu">
                        {/* Notice how we prepend /faculty and perfectly match the isActive path */}
                        <Link to="/faculty/company/add-company" className={isActive("/company/add-company") ? "active-submenu" : ""}>Add Company</Link>
                        <Link to="/faculty/company-list" className={isActive("/company-list") ? "active-submenu" : ""}>Company List</Link>
                    </div>
                )}

                {/* Internship Applications 
                <div className="menu-item" onClick={() => setInterviewOpen(!interviewOpen)}>
                    <div className="menu-left">
                        <FaClipboardList />
                        <span>Internship Applications</span>
                    </div>
                    {interviewOpen ? <FaChevronDown /> : <FaChevronRight />}
                </div>

                {interviewOpen && (
                    <div className="submenu">
                        <Link to="/faculty/aptitude-round" className={isActive("/aptitude-round") ? "active-submenu" : ""}>Aptitude Round</Link>
                        <Link to="/faculty/technical-round" className={isActive("/technical-round") ? "active-submenu" : ""}>Technical Round</Link>
                        <Link to="/faculty/hr-round" className={isActive("/hr-round") ? "active-submenu" : ""}>HR Round</Link>
                    </div>
                )}*/}

                {/* Interview Schedule */}
                <Link to="/faculty/interview-schedule" className={`menu-item ${isActive("/interview-schedule") ? "active" : ""}`}>
                    <div className="menu-left">
                        <FaCalendarAlt />
                        <span>Interview Schedule</span>
                    </div>
                </Link>

                {/* Placement Status */}
                <Link to="/faculty/placement-status" className={`menu-item ${isActive("/placement-status") ? "active" : ""}`}>
                    <div className="menu-left">
                        <FaChartBar />
                        <span>Placement Status</span>
                    </div>
                </Link>

            </div>

            {/* ================= Logout ================= */}
            <div className="sidebar-footer">
                <div className="logout-btn" onClick={handleLogout} style={{ cursor: "pointer" }}>
                    <FaSignOutAlt />
                    <span>Logout</span>
                </div>
            </div>

        </aside>
    );
};

export default Sidebar;