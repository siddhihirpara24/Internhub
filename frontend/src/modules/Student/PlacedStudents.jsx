import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaSearch, FaEye, FaCheckCircle } from "react-icons/fa";

import "./PlacedStudents.css";
import "../Internship/AptitudeRound.css";

function PlacedStudents() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [students, setStudents] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [appsRes, companiesRes] = await Promise.all([
          axios.get("http://localhost:8081/api/admin/applications"),
          axios.get("http://localhost:8081/api/company/all"),
        ]);
        setStudents((appsRes.data || []).filter((a) => a.overallStatus === "Selected"));
        setCompanies(companiesRes.data || []);
      } catch (error) {
        console.error("Error fetching placed students:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const getPackage = (companyName) => {
    const company = companies.find((c) => (c.companyName || "").toLowerCase() === (companyName || "").toLowerCase());
    return company?.ctcPackage || "Not specified";
  };

  const filteredStudents = students.filter((student) => {
    const keyword = search.toLowerCase();
    return (
      (student.fullName || "").toLowerCase().includes(keyword) ||
      (student.enrollmentNumber || "").toLowerCase().includes(keyword) ||
      (student.company || "").toLowerCase().includes(keyword)
    );
  });

  return (
    <div className="student-page">
      <div className="student-header">
        <div>
          <h2>Placed Students</h2>
          <p>Students who passed all interview rounds and are officially placed.</p>
        </div>
      </div>

      <div className="toolbar">
        <div className="student-search-box">
          <FaSearch className="search-icon" />
          <input type="text" placeholder="Search Placed Student..." value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>ID</th><th>Enrollment</th><th>Name</th><th>Company</th><th>Package</th>
              <th>Department</th><th>Semester</th><th>Status</th><th>Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="9" style={{ padding: "20px" }}>Loading placed students...</td></tr>
            ) : filteredStudents.length === 0 ? (
              <tr><td colSpan="9" style={{ padding: "20px", color: "#64748b" }}>No students have been placed yet.</td></tr>
            ) : (
              filteredStudents.map((student) => (
                <tr key={student.id}>
                  <td>{student.id}</td>
                  <td>{student.enrollmentNumber}</td>
                  <td>{student.fullName}</td>
                  <td>{student.company}</td>
                  <td>{getPackage(student.company)}</td>
                  <td>{student.department || "-"}</td>
                  <td>{student.semester || "-"}</td>
                  <td><span className="status placed"><FaCheckCircle style={{ marginRight: 6 }} />Placed</span></td>
                  <td>
                    <div className="action-btns">
                      <button className="view-btn" onClick={() => navigate(`/faculty/student/view/${student.studentId}`)}><FaEye /></button>
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

export default PlacedStudents;