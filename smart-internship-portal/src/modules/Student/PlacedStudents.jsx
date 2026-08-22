import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  FaSearch,
  FaEye,
  FaEdit,
  FaTrash,
  FaCheckCircle,
} from "react-icons/fa";

import "./PlacedStudents.css";

function PlacedStudents() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");

  const [students] = useState([
    {
      studentId: 1,
      photo: "https://i.pravatar.cc/100?img=1",
      enrollmentNo: "SVGU001",
      studentName: "Rahul Patel",
      company: "TCS",
      package: "4.5 LPA",
      department: "MCA",
      semester: "4",
      status: "Placed",
    },
    {
      studentId: 2,
      photo: "https://i.pravatar.cc/100?img=2",
      enrollmentNo: "SVGU002",
      studentName: "Priya Shah",
      company: "Infosys",
      package: "5 LPA",
      department: "MCA",
      semester: "4",
      status: "Placed",
    },
    {
      studentId: 3,
      photo: "https://i.pravatar.cc/100?img=3",
      enrollmentNo: "SVGU003",
      studentName: "Jay Mehta",
      company: "Wipro",
      package: "3.8 LPA",
      department: "BCA",
      semester: "6",
      status: "Placed",
    },
    {
      studentId: 4,
      photo: "https://i.pravatar.cc/100?img=4",
      enrollmentNo: "SVGU004",
      studentName: "Krisha Patel",
      company: "Capgemini",
      package: "4.2 LPA",
      department: "MCA",
      semester: "4",
      status: "Placed",
    },
    {
      studentId: 5,
      photo: "https://i.pravatar.cc/100?img=5",
      enrollmentNo: "SVGU005",
      studentName: "Amit Joshi",
      company: "Accenture",
      package: "6 LPA",
      department: "MCA",
      semester: "4",
      status: "Placed",
    },
  ]);

  const deleteStudent = () => {
    alert("Delete functionality will be connected with backend.");
  };

  const filteredStudents = students.filter((student) => {
    const keyword = search.toLowerCase();

    return (
      student.studentName.toLowerCase().includes(keyword) ||
      student.enrollmentNo.toLowerCase().includes(keyword) ||
      student.company.toLowerCase().includes(keyword)
    );
  });

  return (
    <div className="student-page">

      {/* Header */}

      <div className="student-header">

        <div>
          <h2>Placed Students</h2>
          <p>Students successfully placed in companies.</p>
        </div>

      </div>

      {/* Search */}

      <div className="toolbar">

        <div className="student-search-box">

          <FaSearch className="search-icon" />

          <input
            type="text"
            placeholder="Search Placed Student..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

        </div>

      </div>

      {/* Table */}

      <div className="table-container">

        <table>

          <thead>

            <tr>
              <th>ID</th>
              <th>Photo</th>
              <th>Enrollment</th>
              <th>Name</th>
              <th>Company</th>
              <th>Package</th>
              <th>Department</th>
              <th>Semester</th>
              <th>Status</th>
              <th>Action</th>
            </tr>

          </thead>

          <tbody>

            {filteredStudents.map((student) => (

              <tr key={student.studentId}>

                <td>{student.studentId}</td>

                <td>
                  <img
                    src={student.photo}
                    alt=""
                    className="student-photo"
                  />
                </td>

                <td>{student.enrollmentNo}</td>

                <td>{student.studentName}</td>

                <td>{student.company}</td>

                <td>{student.package}</td>

                <td>{student.department}</td>

                <td>{student.semester}</td>

                <td>
                  <span className="status placed">
                    <FaCheckCircle /> {student.status}
                  </span>
                </td>

                <td>

                  <div className="action-btns">

                    <button
                      className="view-btn"
                      onClick={() =>
                        navigate(`/view-student/${student.studentId}`)
                      }
                    >
                      <FaEye />
                    </button>

                    <button
                      className="edit-btn"
                      onClick={() =>
                        navigate(`/edit-student/${student.studentId}`)
                      }
                    >
                      <FaEdit />
                    </button>

                    <button
                      className="delete-btn"
                      onClick={() =>
                        deleteStudent(student.studentId)
                      }
                    >
                      <FaTrash />
                    </button>

                  </div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default PlacedStudents;