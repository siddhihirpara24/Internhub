import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/student/Header";
import Side_Bar from "../components/student/Side_Bar";
import { ProfileProvider } from "../context/ProfileContext";

// Import the brand new CSS file we just made!
import "./StudentLayout.css"; 

const StudentLayout = () => {
  const [collapsed, setCollapsed] = useState(false); // Default to open or closed

  return (
    <ProfileProvider>
      <div className={collapsed ? "student-layout-wrapper collapsed" : "student-layout-wrapper"}>
        
        <Header collapsed={collapsed} setCollapsed={setCollapsed} />
        <Side_Bar collapsed={collapsed} />
        
        {/* THIS is the magic div that was missing the correct class! */}
        <main className="student-content-area">
          <Outlet /> 
        </main>
        
      </div>
    </ProfileProvider>
  );
};

export default StudentLayout;