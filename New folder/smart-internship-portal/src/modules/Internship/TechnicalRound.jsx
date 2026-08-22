import { useState } from "react";
import { FaSearch, FaEye, FaEdit } from "react-icons/fa";

import "./AptitudeRound.css";

function TechnicalRound() {

    const [search, setSearch] = useState("");

    const [students] = useState([

        {
            id: 1,
            photo: "https://i.pravatar.cc/100?img=1",
            enrollmentNo: "23MCA001",
            studentName: "Rahul Patel",
            companyName: "TCS",
            status: "Pass"
        },

        {
            id: 2,
            photo: "https://i.pravatar.cc/100?img=3",
            enrollmentNo: "23MCA003",
            studentName: "Amit Kumar",
            companyName: "Wipro",
            status: "Pass"
        },

        {
            id: 3,
            photo: "https://i.pravatar.cc/100?img=5",
            enrollmentNo: "23MCA005",
            studentName: "Karan Shah",
            companyName: "Capgemini",
            status: "Fail"
        },

        {
            id: 4,
            photo: "https://i.pravatar.cc/100?img=7",
            enrollmentNo: "23MCA007",
            studentName: "Sneha Joshi",
            companyName: "Infosys",
            status: "Pending"
        },

        {
            id: 5,
            photo: "https://i.pravatar.cc/100?img=8",
            enrollmentNo: "23MCA008",
            studentName: "Rohan Mehta",
            companyName: "Accenture",
            status: "Pass"
        }

    ]);

    const filteredStudents = students.filter((student) =>

        student.studentName.toLowerCase().includes(search.toLowerCase()) ||
        student.enrollmentNo.toLowerCase().includes(search.toLowerCase()) ||
        student.companyName.toLowerCase().includes(search.toLowerCase())

    );

    return (

        <div className="student-page">

            {/* Header */}

            <div className="student-header">

                <div>

                    <h2>Technical Round</h2>

                    <p>Manage Technical Round Results.</p>

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

                            <th>Enrollment No</th>

                            <th>Student Name</th>

                            <th>Company</th>

                            <th>Status</th>

                            <th>Action</th>

                        </tr>

                    </thead>

                    <tbody>

                        {

                            filteredStudents.length === 0 ?

                                (

                                    <tr>

                                        <td colSpan="7">

                                            No Student Found

                                        </td>

                                    </tr>

                                )

                                :

                                filteredStudents.map((student) => (

                                    <tr key={student.id}>

                                        <td>{student.id}</td>

                                        <td>

                                            <img
                                                src={student.photo}
                                                alt={student.studentName}
                                                className="student-photo"
                                            />

                                        </td>

                                        <td>{student.enrollmentNo}</td>

                                        <td>{student.studentName}</td>

                                        <td>{student.companyName}</td>

                                        <td>

                                            <span className={`status ${student.status.toLowerCase()}`}>

                                                {student.status}

                                            </span>

                                        </td>

                                        <td>

                                            <div className="action-btns">

                                                <button className="view-btn">

                                                    <FaEye />

                                                </button>

                                                <button className="edit-btn">

                                                    <FaEdit />

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

export default TechnicalRound;