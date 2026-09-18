import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaSearch, FaEye, FaTrash, FaUserGraduate, FaFilePdf } from "react-icons/fa";  //FaEdit
import "./AllStudents.css";

const AllStudents = () => {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [searchTerm, setSearchTerm] = useState("");
  const [deptFilter, setDeptFilter] = useState("All");
  const [semFilter, setSemFilter] = useState("All");
  const [backlogFilter, setBacklogFilter] = useState("All");

  useEffect(() => {
    const fetchStudents = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("facultyToken"); 
        const response = await axios.get("http://localhost:8081/api/students", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setStudents(response.data);
      } catch (error) {
        console.error("Error fetching students from database:", error);
        setStudents([]); 
      } finally {
        setLoading(false);
      }
    };
    fetchStudents();
  }, []);

  const handleDownloadPdf = async (student) => {
    try {
      const token = localStorage.getItem("facultyToken");
      const response = await axios.get(`http://localhost:8081/api/students/${student.id}/pdf`, {
        headers: { Authorization: `Bearer ${token}` },
        responseType: "blob",
      });
      const blobUrl = window.URL.createObjectURL(new Blob([response.data], { type: "application/pdf" }));
      const link = document.createElement("a");
      link.href = blobUrl;
      const safeName = (student.enrollmentNumber || student.name || "student").replace(/[^a-zA-Z0-9_-]/g, "_");
      link.setAttribute("download", `${safeName}_report.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Error downloading student PDF:", error);
      alert("Failed to download PDF. Please try again.");
    }
};

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      try {
        const token = localStorage.getItem("facultyToken");
        await axios.delete(`http://localhost:8081/api/students/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setStudents(students.filter(s => s.id !== id));
        alert("Student deleted successfully!");
      } catch (error) {
        console.error("Error deleting student:", error);
        alert("Failed to delete student. Please try again.");
      }
    }
  };

  const safeRender = (val, isBadge = false, badgeClass = "") => {
    if (val === null || val === undefined || val === "" || val === "null" || String(val).trim() === "") {
      return <span style={{color: '#94a3b8', fontWeight: 'bold'}}>-</span>;
    }
    if (isBadge) {
      // USING PROTECTED STU-BADGE CLASS
      return <span className={`stu-badge ${badgeClass}`}>{val}</span>;
    }
    return val;
  };

  const filteredStudents = students.filter(student => {
    const matchesSearch = (
      (student.name?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
      (student.email?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
      (student.enrollmentNumber?.toLowerCase() || "").includes(searchTerm.toLowerCase())
    );
    const studentDept = student.department || student.Department || "";
    const matchesDept = deptFilter === "All" || studentDept === deptFilter;
    const studentSem = student.semester || student.Semester || "";
    const matchesSem = semFilter === "All" || studentSem === semFilter;
    const backlogCount = Number(student.backlog || student.Backlog) || 0;
    
    let matchesBacklog = true;
    if (backlogFilter === "No Backlog") matchesBacklog = backlogCount === 0;
    if (backlogFilter === "Has Backlog") matchesBacklog = backlogCount > 0;

    return matchesSearch && matchesDept && matchesSem && matchesBacklog;
  });

  return (
    <div className="all-students-container">
      <div className="students-header">
        <div>
          <h1 className="header-title">Student Management</h1>
          <p className="header-subtitle">View and manage all registered students and their academic information.</p>
        </div>
        <div className="total-badge">
          Total Students: <span>{filteredStudents.length}</span>
        </div>
      </div>

      <div className="students-toolbar">
        <div className="search-box">
          <FaSearch className="search-icon" />
          <input type="text" placeholder="Search by name, email or enrollment no..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        </div>
        <div className="filters-group">
          <select value={deptFilter} onChange={(e) => setDeptFilter(e.target.value)} className="filter-select">
            <option value="All">All Departments</option>
            <option value="MCA">MCA</option>
            <option value="BCA">BCA</option>
            <option value="BTech">BTech</option>
          </select>
          <select value={semFilter} onChange={(e) => setSemFilter(e.target.value)} className="filter-select">
            <option value="All">All Semesters</option>
            <option value="3">Semester 3</option>
          </select>
          <select value={backlogFilter} onChange={(e) => setBacklogFilter(e.target.value)} className="filter-select">
            <option value="All">All Students</option>
            <option value="No Backlog">No Backlog</option>
            <option value="Has Backlog">Has Backlog</option>
          </select>
        </div>
      </div>

      <div className="students-table-card">
        {loading ? (
          <div className="loading-state">Loading students from database...</div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Student</th>
                <th>Enrollment No.</th>
                <th>Department</th>
                <th>Semester</th>
                <th>CGPA</th>
                <th>Backlog</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.length > 0 ? (
                filteredStudents.map((student) => {
                  const finalDept = student.department || student.Department || student.dept;
                  const finalSem = student.semester || student.Semester || student.sem;
                  const finalCgpa = student.cgpaSem2 || student.cgpa_sem2 || student.cgpaSem1 || student.cgpa_sem1;
                  const finalBacklog = student.backlog !== undefined ? student.backlog : student.Backlog;
                  
                  return (
                    <tr key={student.id}>
                      <td>{student.id}</td>
                      <td>
                        <div className="student-info-cell">
                          <div className="student-photo">
                            {student.photoPath && student.photoPath !== "null" ? (
                              <img src={`http://localhost:8081${student.photoPath}`} alt="profile" />
                            ) : (
                              <FaUserGraduate size={20} color="#2563EB" />
                            )}
                          </div>
                          <div className="student-details">
                            <span className="student-name">{safeRender(student.name)}</span>
                            <span className="student-email">{safeRender(student.email)}</span>
                          </div>
                        </div>
                      </td>
                      <td className="fw-500">{safeRender(student.enrollmentNumber)}</td>
                      
                      {/* USING PROTECTED CLASSES */}
                      <td>{safeRender(finalDept, true, "stu-badge-dept")}</td>
                      
                      <td>{finalSem && finalSem !== "null" && finalSem !== "" ? `Semester ${finalSem}` : safeRender(null)}</td>
                      
                      <td>{safeRender(finalCgpa, true, "stu-badge-cgpa")}</td>
                      
                      <td>
                        {finalBacklog !== null && finalBacklog !== undefined && finalBacklog !== "" && finalBacklog !== "null" ? (
                          <span className={`stu-badge ${Number(finalBacklog) > 0 ? 'stu-badge-danger' : 'stu-badge-success'}`}>
                            {finalBacklog}
                          </span>
                        ) : (
                          safeRender(null)
                        )}
                      </td>
                      
                      <td>
                        <div className="actions-cell">
                          <button className="stu-action-btn stu-view-btn" onClick={() => navigate(`/faculty/student/view/${student.id}`)}><FaEye size={16} /></button>
                          <button className="stu-action-btn stu-pdf-btn" onClick={() => handleDownloadPdf(student)} title="Download PDF"><FaFilePdf size={16} /></button>
                          {/*<button className="stu-action-btn stu-edit-btn" onClick={() => navigate(`/faculty/student/edit/${student.id}`)}><FaEdit size={16} /></button>*/}
                          <button className="stu-action-btn stu-delete-btn" onClick={() => handleDelete(student.id)}><FaTrash size={16} /></button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="8" className="empty-state">No students found in the database.</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AllStudents;