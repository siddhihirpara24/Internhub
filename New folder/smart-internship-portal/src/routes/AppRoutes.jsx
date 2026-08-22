import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// ======================================================
// LAYOUTS
// ======================================================
import PublicLayout from "../layouts/PublicLayout";

// ======================================================
// PUBLIC PAGES
// ======================================================
import Home from "../pages/public/Home";
import About from "../pages/public/About";
import Features from "../pages/public/Features";
import Contact from "../pages/public/Contact";

// ======================================================
// AUTH PAGES (All Public)
// ======================================================
import FacultyLogin from "../pages/auth/FacultyLogin";
import StudentLogin from "../pages/auth/Login"; 
import StudentRegister from "../pages/auth/StudentRegister";
import ForgotPassword from "../pages/auth/ForgotPassword";

// ======================================================
// SPLIT ROUTERS (The Magic Files!)
// ======================================================
import FacultyRoutes from "./FacultyRoutes";
import StudentRoutes from "./StudentRoutes";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ==================================================
            1. PUBLIC WEBSITE (Has Header and Footer)
        ================================================== */}
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="features" element={<Features />} />
          <Route path="contact" element={<Contact />} />
          
          {/* Authentication Pages */}
          <Route path="faculty-login" element={<FacultyLogin />} />
          <Route path="student-login" element={<StudentLogin />} />
          <Route path="student-register" element={<StudentRegister />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
        </Route>

        {/* ==================================================
            2. FACULTY PORTAL (Delegates to FacultyRoutes.jsx)
        ================================================== */}
        {/* The /* means: If URL starts with /faculty, let FacultyRoutes handle it! */}
        <Route path="/faculty/*" element={<FacultyRoutes />} />


        {/* ==================================================
            3. STUDENT PORTAL (Delegates to StudentRoutes.jsx)
        ================================================== */}
        {/* The /* means: If URL starts with /student, let StudentRoutes handle it! */}
        <Route path="/student/*" element={<StudentRoutes />} />


        {/* ==================================================
            4. 404 / UNKNOWN ROUTE (Redirects to Home)
        ================================================== */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;