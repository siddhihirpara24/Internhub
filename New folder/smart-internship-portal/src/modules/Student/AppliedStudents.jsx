import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaSearch,
  FaEye,
  FaEdit,
  FaTrash
} from "react-icons/fa";

import "./AllStudents.css";

function AppliedStudents() {

    const navigate = useNavigate();

    const [search, setSearch] = useState("");

    const [students, setStudents] = useState([

        {
            studentId: 1,
            enrollmentNo: "23MCA001",
            studentName: "Rahul Sharma",
            email: "rahul@gmail.com",
            mobile: "9876543210",
            department: "MCA",
            semester: "3",
            company: "TCS",
            appliedDate: "05 Aug 2026",
            status: "Applied",
            photo: "https://i.pravatar.cc/100?img=1"
        },

        {
            studentId: 2,
            enrollmentNo: "23MCA002",
            studentName: "Priya Patel",
            email: "priya@gmail.com",
            mobile: "9876543211",
            department: "MCA",
            semester: "3",
            company: "Infosys",
            appliedDate: "06 Aug 2026",
            status: "Applied",
            photo: "https://i.pravatar.cc/100?img=2"
        },

        {
            studentId: 3,
            enrollmentNo: "23MCA003",
            studentName: "Amit Shah",
            email: "amit@gmail.com",
            mobile: "9876543212",
            department: "MCA",
            semester: "3",
            company: "Accenture",
            appliedDate: "07 Aug 2026",
            status: "Applied",
            photo: "https://i.pravatar.cc/100?img=3"
        },

        {
            studentId: 4,
            enrollmentNo: "23MCA004",
            studentName: "Sneha Joshi",
            email: "sneha@gmail.com",
            mobile: "9876543213",
            department: "MCA",
            semester: "3",
            company: "Capgemini",
            appliedDate: "07 Aug 2026",
            status: "Applied",
            photo: "https://i.pravatar.cc/100?img=4"
        }

    ]);

    const deleteStudent = (id) => {

        if (window.confirm("Delete Student Application?")) {

            setStudents(students.filter((s) => s.studentId !== id));

        }

    };

    const filteredStudents = students.filter((student) =>

        student.studentName.toLowerCase().includes(search.toLowerCase()) ||

        student.enrollmentNo.toLowerCase().includes(search.toLowerCase()) ||

        student.company.toLowerCase().includes(search.toLowerCase())

    );

    return (

        <div className="student-page">

            {/* Header */}

            <div className="student-header">

                <div>

                    <h2>Applied Students</h2>

                    <p>Students who have applied for internships.</p>

                </div>

            </div>

            {/* Search */}

            <div className="toolbar">

                <div className="student-search-box">

                    <FaSearch className="search-icon" />

                    <input
                        type="text"
                        placeholder="Search Student..."
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
                            <th>Department</th>
                            <th>Semester</th>
                            <th>Applied Date</th>
                            <th>Status</th>
                            <th>Action</th>

                        </tr>

                    </thead>

                    <tbody>

                        {

                            filteredStudents.map((student) => (

                                <tr key={student.studentId}>

                                    <td>{student.studentId}</td>

                                    <td>

                                        <img
                                            src={student.photo}
                                            alt="student"
                                            className="student-photo"
                                        />

                                    </td>

                                    <td>{student.enrollmentNo}</td>

                                    <td>{student.studentName}</td>

                                    <td>{student.company}</td>

                                    <td>{student.department}</td>

                                    <td>{student.semester}</td>

                                    <td>{student.appliedDate}</td>

                                    <td>

                                        <span className="status pending">

                                            {student.status}

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

                            ))

                        }

                    </tbody>

                </table>

            </div>

        </div>

    );

}

export default AppliedStudents;