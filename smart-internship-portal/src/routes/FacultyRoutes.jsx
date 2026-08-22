import { Routes, Route, Navigate } from "react-router-dom";

import FacultyLayout from "../layouts/FacultyLayout";

// ======================================================
// FACULTY PAGES (DASHBOARD)
// ======================================================
import Dashboard from "../pages/faculty/Dashboard";

// --- COMPANY MODULE ---
import CompanyForm from "../modules/Company/CompanyForm";
import CompanyList from "../modules/Company/CompanyList";
import ViewCompany from "../modules/Company/ViewCompany";
import EditCompany from "../modules/Company/EditCompany";

// --- INTERVIEW MODULE ---
import ViewInterviewSchedule from "../modules/Interview/ViewInterviewSchedule";
import AddInterviewSchedule from "../modules/Interview/AddInterviewSchedule";
import EditInterviewSchedule from "../modules/Interview/EditInterviewSchedule";
import ViewInterview from "../modules/Interview/ViewInterview";

// --- STUDENT MODULE ---
import AllStudents from "../modules/Student/AllStudents";
import ViewStudent from "../modules/Student/ViewStudent";
import AppliedStudents from "../modules/Student/AppliedStudents";
import PlacedStudents from "../modules/Student/PlacedStudents";
import OptOutStudents from "../modules/Student/OptOutStudents";
// import EditStudent from "../modules/Student/EditStudent"; // <-- Uncomment this when you create EditStudent!

// --- INTERNSHIP MODULE ---
import AptitudeRound from "../modules/Internship/AptitudeRound";
import TechnicalRound from "../modules/Internship/TechnicalRound";
import HRRound from "../modules/Internship/HRRound";

// --- PLACEMENT MODULE ---
import PlacementStatus from "../modules/Placement/PlacementStatus";

function FacultyRoutes() {
  return (
    <Routes>
        <Route element={<FacultyLayout />}>
          
          <Route path="dashboard" element={<Dashboard />} />

          {/* Company Management */}
          <Route path="/company/add-company" element={<CompanyForm />} />
          <Route path="company-list" element={<CompanyList />} />
          <Route path="view-company/:id" element={<ViewCompany />} />
          <Route path="edit-company/:id" element={<EditCompany />} />

          {/* Interview Schedule */}
          <Route path="interview-schedule" element={<ViewInterviewSchedule />} />
          <Route path="add-interview-schedule" element={<AddInterviewSchedule />} />
          <Route path="edit-interview-schedule/:id" element={<EditInterviewSchedule />} />
          <Route path="view-interview-schedule/:id" element={<ViewInterview />} />

          {/* Student Management */}
          <Route path="all-students" element={<AllStudents />} />
          
          {/* FIXED: Changed to "student/view/:id" so it perfectly matches your View Button! */}
          <Route path="student/view/:id" element={<ViewStudent />} />
          {/* <Route path="student/edit/:id" element={<EditStudent />} /> */}
          
          <Route path="applied-students" element={<AppliedStudents />} />
          <Route path="placed-students" element={<PlacedStudents />} />
          <Route path="optout-students" element={<OptOutStudents />} />

          {/* Internship Applications */}
          <Route path="aptitude-round" element={<AptitudeRound />} />
          <Route path="technical-round" element={<TechnicalRound />} />
          <Route path="hr-round" element={<HRRound />} />

          {/* Placement Status */}
          <Route path="placement-status" element={<PlacementStatus />} />

          {/* FIXED: Added a forward slash "/" so it goes back to the real dashboard instead of infinite loop! */}
          <Route path="*" element={<Navigate to="/faculty/dashboard" replace />} />
        </Route>
    </Routes>
  );
}

export default FacultyRoutes;