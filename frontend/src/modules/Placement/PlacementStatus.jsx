import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaSearch, FaEye } from "react-icons/fa";
import "./PlacementStatus.css";

function PlacementStatus() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [studentsRes, applicationsRes, companiesRes] = await Promise.all([
          axios.get("http://localhost:8081/api/students"),
          axios.get("http://localhost:8081/api/admin/applications"),
          axios.get("http://localhost:8081/api/company/all"),
        ]);
        const students = studentsRes.data || [];
        const applications = applicationsRes.data || [];
        const companies = companiesRes.data || [];

        const getPackageFor = (companyName) => {
          const company = companies.find((c) => (c.companyName || "").toLowerCase() === (companyName || "").toLowerCase());
          return company?.ctcPackage || "-";
        };

        const combined = students.map((student) => {
          const myApplications = applications.filter((a) => (a.email || "").toLowerCase() === (student.email || "").toLowerCase());
          const placedApp = myApplications.find((a) => a.overallStatus === "Selected");
          const inProgressApp = myApplications.find((a) => a.overallStatus === "Under Review");

          let status = "Not Placed", company = "-", placementDate = "-", pkg = "-";
          if (placedApp) {
            status = "Placed"; company = placedApp.company; placementDate = placedApp.appliedDate || "-"; pkg = getPackageFor(placedApp.company);
          } else if (inProgressApp) {
            status = "Waiting"; company = inProgressApp.company;
          }

          return { id: student.id, enrollmentNo: student.enrollmentNumber, studentName: student.name,
                    department: student.department, company, package: pkg, placementDate, status };
        });

        setRows(combined);
      } catch (error) {
        console.error("Error fetching placement status:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const totalStudents = rows.length;
  const placedCount = rows.filter((r) => r.status === "Placed").length;
  const notPlacedCount = totalStudents - placedCount;
  const placementRate = totalStudents > 0 ? Math.round((placedCount / totalStudents) * 100) : 0;

  const filteredStudents = rows.filter((student) => {
    const keyword = search.toLowerCase();
    const matchesSearch = (student.studentName || "").toLowerCase().includes(keyword) ||
      (student.enrollmentNo || "").toLowerCase().includes(keyword) || (student.company || "").toLowerCase().includes(keyword);
    const matchesStatus = statusFilter === "All" || student.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="placement-status-page">
      <div className="placement-header">
        <h1>Placement Status</h1>
        <p>Manage placed students and final placement results.</p>
      </div>

      <div className="placement-cards">
        <div className="placement-card"><h1>{loading ? "-" : totalStudents}</h1><p>Total Students</p></div>
        <div className="placement-card"><h1>{loading ? "-" : placedCount}</h1><p>Placed Students</p></div>
        <div className="placement-card"><h1>{loading ? "-" : notPlacedCount}</h1><p>Not Placed</p></div>
        <div className="placement-card"><h1>{loading ? "-" : `${placementRate}%`}</h1><p>Placement Rate</p></div>
      </div>

      <div className="toolbar">
        <div className="student-search-box">
          <FaSearch className="search-icon" />
          <input type="text" placeholder="Search Student..." value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option>All</option><option>Placed</option><option>Waiting</option><option>Not Placed</option>
        </select>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr><th>ID</th><th>Enrollment</th><th>Student Name</th><th>Department</th><th>Company</th>
                <th>Package</th><th>Placement Date</th><th>Status</th><th>Action</th></tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="9" style={{ padding: "20px" }}>Loading placement data...</td></tr>
            ) : filteredStudents.length === 0 ? (
              <tr><td colSpan="9" style={{ padding: "20px", color: "#64748b" }}>No students found.</td></tr>
            ) : (
              filteredStudents.map((student) => (
                <tr key={student.id}>
                  <td>{student.id}</td><td>{student.enrollmentNo}</td><td>{student.studentName}</td>
                  <td>{student.department || "-"}</td><td>{student.company}</td><td>{student.package}</td>
                  <td>{student.placementDate}</td>
                  <td><span className={`status ${student.status.toLowerCase().replace(" ", "-")}`}>{student.status}</span></td>
                  <td>
                    <div className="action-btns">
                      <button className="view-btn" onClick={() => navigate(`/faculty/student/view/${student.id}`)}><FaEye /></button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PlacementStatus;