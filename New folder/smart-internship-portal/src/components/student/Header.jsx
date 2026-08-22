import { Menu, X } from "lucide-react";
import { FaSearch, FaBell, FaEnvelope, FaUserCircle } from "react-icons/fa";
import { useProfile } from "../../context/useProfile";
import "./StudentHeader.css";

export default function Header({collapsed,setCollapsed}) {
  const { profile } = useProfile();

  return (

<header className={collapsed ? "student-header student-header-collapsed" : "student-header student-header-expanded"}>

      {/* MENU / CLOSE BUTTON */}
      <button className="student-menu-btn" onClick={() => setCollapsed(!collapsed)} type="button">

        { collapsed ? ( <X size={24} /> ) : ( <Menu size={24} /> ) }

      </button>

      <h2 className="student-text">
        Student
      </h2>

      {/* SEARCH */}

      <div className="student-top_bar-search">
        <FaSearch className="student-search-icon" />

        <input type="text" placeholder="Search..."/>
      </div>

      {/* RIGHT SIDE */}

    <div className="student-top_bar-right">

        {/* DATE */}
        <div className="student-top_bar-date">

          <strong>
            Friday, 7 August
          </strong>

          <span>
            2026
          </span>

        </div>

        {/* NOTIFICATION */}

        <button type="button" className="student-top_bar-icon-btn">
          <FaBell />
          <span className="student-notification-badge">
            3
          </span>
        </button>

        {/* MESSAGE */}

        <button type="button" className="student-top_bar-icon-btn">
          <FaEnvelope />
          <span className="student-notification-badge">
            2
          </span>
        </button>

        {/* PROFILE */}

        <div className="student-top_bar-profile">
          <div className="student-profile-avatar">
             {profile.photoUrl ? (
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
              {profile.name || "Student"}
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