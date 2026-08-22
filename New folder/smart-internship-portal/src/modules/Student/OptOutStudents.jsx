import { useState, useEffect } from "react";
import axios from "axios";
import { FaEye, FaTrash } from "react-icons/fa"; // 🌟 ADDED TRASH ICON
import "./OptOutStudents.css";

const OptOutStudents = () => {
  const [optOutList, setOptOutList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOptOuts = async () => {
      try {
        const token = localStorage.getItem("facultyToken"); 
        
        const response = await axios.get("http://localhost:8081/api/opt-out/all", {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        setOptOutList(response.data);
      } catch (error) {
        console.error("Error fetching opt-out students:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchOptOuts();
  }, []);

  // 🌟 NEW: Delete Function
  const handleDelete = async (id, studentName) => {
    // Show confirmation popup before deleting
    if (!window.confirm(`Are you sure you want to delete the opt-out request for ${studentName}?`)) {
      return;
    }

    try {
      const token = localStorage.getItem("facultyToken");
      await axios.delete(`http://localhost:8081/api/opt-out/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      // Instantly remove the row from the screen without reloading the page!
      setOptOutList(optOutList.filter(student => student.id !== id));
      
    } catch (error) {
      console.error("Error deleting opt-out request:", error);
      alert("Failed to delete request. Make sure your backend API is running.");
    }
  };

  return (
    <div className="oos-container">
      <div className="oos-header">
        <div>
          <h2 className="oos-title">Opt-Out Students</h2>
          <p className="oos-subtitle">View all students who have opted out of placement drives.</p>
        </div>
        <div className="oos-count-badge">
          Total: {optOutList.length}
        </div>
      </div>

      <div className="oos-table-card">
        {loading ? (
          <div className="oos-loading-msg">Loading data from database...</div>
        ) : optOutList.length === 0 ? (
          <div className="oos-empty-msg">No students have opted out yet.</div>
        ) : (
          <table className="oos-table">
            <thead>
              <tr>
                <th>Student Details</th>
                <th>Enrollment No.</th>
                <th>Department</th>
                <th>Semester</th>
                <th>Reason</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {optOutList.map((student, index) => (
                <tr key={index}>
                  <td>
                    <div className="oos-student-meta">
                      <strong>{student.studentName}</strong>
                      <span>{student.email}</span>
                    </div>
                  </td>
                  <td>{student.enrollmentNo || "-"}</td>
                  <td>{student.department || "-"}</td>
                  <td>{student.semester || "-"}</td>
                  <td>
                    <span className="oos-reason-tag">{student.reason}</span>
                  </td>
                  <td>
                    {/* 🌟 NEW: Action Buttons Container */}
                    <div className="oos-action-buttons">
                      <button 
                        className="oos-action-btn" 
                        onClick={() => alert(`Detailed Reason for ${student.studentName}:\n\n${student.detailedReason}`)}
                      >
                        <FaEye /> View
                      </button>
                      <button 
                        className="oos-delete-btn" 
                        onClick={() => handleDelete(student.id, student.studentName)}
                      >
                        <FaTrash /> Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default OptOutStudents;