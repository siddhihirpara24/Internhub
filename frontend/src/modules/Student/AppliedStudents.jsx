import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaSearch, FaEye, FaTrash } from "react-icons/fa";

import "./AppliedStudents.css";
import "../Internship/AptitudeRound.css";

function RoundSelector({ value, disabled, onChange }) {
  const options = [
    { key: "Pending", label: "Pending" },
    { key: "Pass", label: "Pass" },
    { key: "Fail", label: "Fail" },
  ];
  return (
    <div className={`round-selector ${disabled ? "round-selector-disabled" : ""}`}>
      {options.map((opt) => (
        <button key={opt.key} type="button" disabled={disabled}
                className={`round-selector-option opt-${opt.key.toLowerCase()} ${value === opt.key ? "active" : ""}`}
                onClick={() => !disabled && onChange(opt.key)}>
          {opt.label}
        </button>
      ))}
    </div>
  );
}

function AppliedStudents() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [students, setStudents] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [appsRes, companiesRes] = await Promise.all([
          axios.get("http://localhost:8081/api/admin/applications"),
          axios.get("http://localhost:8081/api/company/all"),
        ]);
        setStudents(appsRes.data || []);
        setCompanies(companiesRes.data || []);
      } catch (error) {
        console.error("Error fetching applied students:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const getCompanyRounds = (companyName) => {
    const company = companies.find(
      (c) => (c.companyName || "").toLowerCase() === (companyName || "").toLowerCase()
    );
    return {
      round1: company?.round1 || "Round 1",
      round2: company?.round2 || "Round 2",
      round3: company?.round3 || "Round 3",
    };
  };

  const handleRoundChange = async (applicationId, roundKey, newResult) => {
    try {
      const res = await axios.put(
        `http://localhost:8081/api/admin/applications/${applicationId}/status`,
        null,
        { params: { round: roundKey, result: newResult } }
      );
      const updated = res.data;
      setStudents((prev) =>
        prev.map((s) =>
          s.id === applicationId
            ? { ...s, aptitudeStatus: updated.aptitudeStatus, technicalStatus: updated.technicalStatus,
                hrStatus: updated.hrStatus, overallStatus: updated.overallStatus }
            : s
        )
      );
    } catch (error) {
      console.error("Failed to update round status:", error);
      alert("Failed to update round status. Please try again.");
    }
  };

  const deleteStudent = (id) => {
    if (window.confirm("Remove this application from the list view?")) {
      setStudents(students.filter((s) => s.id !== id));
    }
  };

  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      (student.fullName || "").toLowerCase().includes(search.toLowerCase()) ||
      (student.enrollmentNumber || "").toLowerCase().includes(search.toLowerCase()) ||
      (student.company || "").toLowerCase().includes(search.toLowerCase());
    const matchesCompany = !selectedCompany || student.company === selectedCompany;
    return matchesSearch && matchesCompany;
  });

  const appliedCompanyNames = [...new Set(students.map((s) => s.company).filter(Boolean))];

  const statusBadgeClass = (status) => {
    if (status === "Pass") return "status pass";
    if (status === "Fail") return "status fail";
    return "status pending";
  };
  const overallBadgeClass = (status) => {
    if (status === "Selected") return "status placed";
    if (status === "Rejected") return "status fail";
    return "status pending";
  };

  return (
    <div className="student-page">
      <div className="student-header">
        <div>
          <h2>Applied Students</h2>
          <p>Students who have applied for internships — round results update live.</p>
        </div>
      </div>

      <div className="toolbar">
        <div className="student-search-box">
          <FaSearch className="search-icon" />
          <input type="text" placeholder="Search Student..." value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <select value={selectedCompany} onChange={(e) => setSelectedCompany(e.target.value)}
                style={{ padding: "10px 14px", borderRadius: "8px", border: "1px solid #cbd5e1" }}>
          <option value="">All Companies</option>
          {appliedCompanyNames.map((name) => <option key={name} value={name}>{name}</option>)}
        </select>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>ID</th><th>Enrollment</th><th>Name</th><th>Company</th><th>Department</th>
              <th>Semester</th><th>Applied Date</th><th>Round 1</th><th>Round 2</th><th>Round 3</th>
              <th>Overall</th><th>Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="12" style={{ padding: "20px" }}>Loading applications...</td></tr>
            ) : filteredStudents.length === 0 ? (
              <tr><td colSpan="12" style={{ padding: "20px", color: "#64748b" }}>No applications found.</td></tr>
            ) : (
              filteredStudents.map((student) => {
                const rounds = getCompanyRounds(student.company);
                const isFinalized = student.overallStatus === "Selected" || student.overallStatus === "Rejected";
                return (
                  <tr key={student.id}>
                    <td>{student.id}</td>
                    <td>{student.enrollmentNumber}</td>
                    <td>{student.fullName}</td>
                    <td>{student.company}</td>
                    <td>{student.department || "-"}</td>
                    <td>{student.semester || "-"}</td>
                    <td>{student.appliedDate}</td>
                    <td>
                      <div className={statusBadgeClass(student.aptitudeStatus)} style={{ marginBottom: 4 }}>{rounds.round1}</div>
                      <RoundSelector
  value={student.aptitudeStatus || "Pending"}
  disabled={isFinalized}
  onChange={(val) =>
    handleRoundChange(student.id, "aptitude", val)
  }
/>
                    </td>
                    <td>
                      <div className={statusBadgeClass(student.technicalStatus)} style={{ marginBottom: 4 }}>{rounds.round2}</div>
                      <RoundSelector
  value={student.technicalStatus || "Pending"}
  disabled={isFinalized}
  onChange={(val) =>
    handleRoundChange(student.id, "technical", val)
  }
/>
                    </td>
                    <td>
                      <div className={statusBadgeClass(student.hrStatus)} style={{ marginBottom: 4 }}>{rounds.round3}</div>
                      <RoundSelector
  value={student.hrStatus || "Pending"}
  disabled={isFinalized}
  onChange={(val) =>
    handleRoundChange(student.id, "hr", val)
  }
/>
                    </td>
                    <td><span className={overallBadgeClass(student.overallStatus)}>{student.overallStatus}</span></td>
                    <td>
                      <div className="action-btns">
                        <button className="view-btn" onClick={() => navigate(`/faculty/student/view/${student.studentId}`)}><FaEye /></button>
                        <button className="delete-btn" onClick={() => deleteStudent(student.id)}><FaTrash /></button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AppliedStudents;