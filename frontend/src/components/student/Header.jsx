import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { FaSearch, FaBell, FaEnvelope, FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useProfile } from "../../context/useProfile";
import api from "../../api/axiosInstance";
import "./StudentHeader.css";

export default function Header({ collapsed, setCollapsed }) {
  const { profile } = useProfile();
  const navigate = useNavigate();

  // State for dynamic counts
  const [unreadNotifications, setUnreadNotifications] = useState(0);
  
  // FIX: Removed 'setUnreadMails' to fix the ESLint unused variable warning.
  // When you build your mail API, you can add it back like this:
  // const [unreadMails, setUnreadMails] = useState(0);
  

  // Dynamic Date Calculation
  const today = new Date();
  const weekday = today.toLocaleDateString("en-US", { weekday: "long" });
  const day = today.getDate();
  const month = today.toLocaleDateString("en-US", { month: "long" });
  const year = today.getFullYear();
  const displayDate = `${weekday}, ${day} ${month}`;

  useEffect(() => {
    let ignore = false;
    
    const fetchHeaderData = async () => {
      try {
        // Fetch notifications to get the unread count
        const notifRes = await api.get("/student/notifications");
        if (!ignore && Array.isArray(notifRes.data)) {
          // Count notifications where read/isRead is false
          const unreadCount = notifRes.data.filter(
            (n) => !(n.read || n.isRead)
          ).length;
          setUnreadNotifications(unreadCount);
        }

        // 🌟 Note: If you have an API for Mails/Messages, you can fetch it here!
        // const mailRes = await api.get("/student/messages");
        // if (!ignore && Array.isArray(mailRes.data)) { setUnreadMails(...) }
        
      } catch (error) {
        console.error("Error fetching header data:", error);
      }
    };

    fetchHeaderData();

    return () => { ignore = true; };
  }, []);

  return (
    <header className={collapsed ? "student-header student-header-collapsed" : "student-header student-header-expanded"}>

      {/* MENU / CLOSE BUTTON */}
      <button className="student-menu-btn" onClick={() => setCollapsed(!collapsed)} type="button">
        {collapsed ? <X size={24} /> : <Menu size={24} />}
      </button>

      <h2 className="student-text">
        Student
      </h2>

      {/* SEARCH */}
      <div className="student-top_bar-search">
        <FaSearch className="student-search-icon" />
        <input type="text" placeholder="Search..." />
      </div>

      {/* RIGHT SIDE */}
      <div className="student-top_bar-right">

        {/* DATE (Now Dynamic) */}
        <div className="student-top_bar-date">
          <strong>
            {displayDate}
          </strong>
          <span>
            {year}
          </span>
        </div>

        {/* NOTIFICATION */}
        <button 
          type="button" 
          className="student-top_bar-icon-btn" 
          onClick={() => navigate("/student/notifications")}
          title="View Notifications"
        >
          <FaBell />
          {unreadNotifications > 0 && (
            <span className="student-notification-badge">
              {unreadNotifications}
            </span>
          )}
        </button>

        {/* MESSAGE */}
        <button type="button" className="student-top_bar-icon-btn" title="Messages">
          <FaEnvelope />
          {unreadNotifications > 0 && (
            <span className="student-notification-badge">
              {unreadNotifications}
            </span>
          )}
        </button>

        {/* PROFILE */}
        <div className="student-top_bar-profile">
          <div className="student-profile-avatar">
            {profile?.photoUrl ? (
              <img
                src={profile.photoUrl}
                alt="Profile"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            ) : (
              <FaUserCircle size={60} />
            )}
          </div>

          <div className="student-profile-info">
            <strong>
              {profile?.name || "Student"}
            </strong>
            <span>
              Student
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}