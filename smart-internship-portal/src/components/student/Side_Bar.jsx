import { NavLink, useNavigate } from "react-router-dom";
import { ShieldOff } from "lucide-react";
import { FaTachometerAlt, FaBriefcase, FaUserGraduate, FaClipboardList, FaBell, FaUser, FaSignOutAlt, FaUniversity } from "react-icons/fa";
import "./Side_Bar.css";

export default function Side_Bar({ collapsed }) {
  const navigate = useNavigate();

  const navItems = [
    { to: "/student/dashboard", label: "Dashboard", icon: FaTachometerAlt, end: true },
    { to: "/student/internships", label: "Campus Internship", icon: FaBriefcase },
    { to: "/student/academic", label: "Academic Details", icon: FaUserGraduate },
    { to: "/student/track-applicant", label: "Track Applicant", icon: FaClipboardList },
    { to: "/student/opt-out", label: "OptOutForm", icon: ShieldOff },
    { to: "/student/notification", label: "Notification", icon: FaBell },
    { to: "/student/profile", label: "Profile", icon: FaUser }
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };

  return (
    <aside className={collapsed ? "student-sidebar collapsed" : "student-sidebar"}>
      <div className="student-sidebar-logo">
        <FaUniversity className="student-logo-icon" /> 
        {!collapsed && (
          <div className="student-logo-text">
            <h2>SMART</h2>
            <p>INTERNSHIP PORTAL</p>
          </div>
        )}
      </div>

      {!collapsed && (
        <div className="student-sidebar-title">
          STUDENT PANEL
        </div>
      )}

      {/* Menu List */}
      <div className="student-sidebar-menu">
        <ul>
          {navItems.map(({ to, label, icon: Icon, end }) => (
            <li key={to}>
              <NavLink to={to} end={end} className={({ isActive }) => isActive ? "student-menu-item active" : "student-menu-item"}>
                <Icon size={21} />
                {!collapsed && <span>{label}</span>}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      {/* Logout */}
      <div className="student-sidebar-footer">
        <button className="student-logout-btn" onClick={handleLogout}>
          <FaSignOutAlt size={21} />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
}