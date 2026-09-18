import { useState } from 'react';
import { Outlet } from 'react-router-dom';

import Sidebar from '../components/faculty/Sidebar/Sidebar';
import Topbar from '../components/faculty/Topbar/Topbar';

const FacultyLayout = () => {
  // Master state for the sidebar (True = open, False = collapsed)
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="faculty-layout" style={{ minHeight: '100vh', backgroundColor: '#F8FAFC' }}>
      
      {/* 1. Sidebar fixed on the left */}
      <Sidebar sidebarOpen={sidebarOpen} />

      {/* 2. Topbar fixed on the top */}
      <Topbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* 3. Main Content Wrapper */}
      <div 
        className="faculty-main-content"
        style={{ 
          // Shifts the content when the sidebar opens/closes
          marginLeft: sidebarOpen ? '270px' : '85px', 
          
          // Prevents the Topbar from hiding your content
          paddingTop: '80px', 
          
          transition: 'all 0.3s ease',
          boxSizing: 'border-box'
        }}
      >
        {/* 
            This <Outlet /> is a magical window provided by React Router!
            When you go to /dashboard or /all-students, the content of those 
            pages will be automatically injected right here. 
        */}
        <div style={{ padding: '30px' }}>
          <Outlet />
        </div>

      </div>
      
    </div>
  );
};

export default FacultyLayout;