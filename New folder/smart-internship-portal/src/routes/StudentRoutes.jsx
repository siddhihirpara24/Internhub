import { Routes, Route } from "react-router-dom";

// Layout & Route Protection
import StudentLayout from "../layouts/StudentLayout";
import ProtectedRoute from "../pages/auth/ProtectedRoute";

// ======================================================
// STUDENT PAGES
// ======================================================
import Home from "../pages/student/Home"; // This is your Student Dashboard
import Academic from "../pages/student/Academic";
import Internships from "../pages/student/Internships";
import Notification from "../pages/student/Notification";
import OptOutForm from "../pages/student/OptOutForm";
import Profile from "../pages/student/Profile";
import TrackApplicant from "../pages/student/TrackApplicant";

function StudentRoutes() {
  return (
    <Routes>
      {/* 
        1. Wrap everything in ProtectedRoute so unauthenticated users get kicked out.
        2. Wrap everything in StudentLayout so the Sidebar and Header appear.
      */}
      <Route 
        element={
          <ProtectedRoute>
            <StudentLayout />
          </ProtectedRoute>
        }
      >
        
        {/* 
          Remember: No leading slashes! These automatically attach to /student/
          Example: "dashboard" safely becomes -> http://localhost:5173/student/dashboard
        */}
        <Route path="dashboard" element={<Home />} />
        <Route path="academic" element={<Academic />} />
        <Route path="internships" element={<Internships />} />
        <Route path="notification" element={<Notification />} />
        <Route path="opt-out" element={<OptOutForm />} />
        <Route path="profile" element={<Profile />} />
        <Route path="track-applicant" element={<TrackApplicant />} />
        
      </Route>
    </Routes>
  );
}

export default StudentRoutes;