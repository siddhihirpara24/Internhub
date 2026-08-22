import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    FaSearch,
    FaEye,
    FaEdit
} from "react-icons/fa";

import "./AptitudeRound.css";

function AptitudeRound() {

    const navigate = useNavigate();

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
        photo: "https://i.pravatar.cc/100?img=2",
        enrollmentNo: "23MCA002",
        studentName: "Priya Shah",
        companyName: "Infosys",
        status: "Fail"
    },

    {
        id: 3,
        photo: "https://i.pravatar.cc/100?img=3",
        enrollmentNo: "23MCA003",
        studentName: "Amit Kumar",
        companyName: "Wipro",
        status: "Pass"
    },

    {
        id: 4,
        photo: "https://i.pravatar.cc/100?img=4",
        enrollmentNo: "23MCA004",
        studentName: "Neha Patel",
        companyName: "Accenture",
        status: "Pending"
    },

    {
        id: 5,
        photo: "https://i.pravatar.cc/100?img=5",
        enrollmentNo: "23MCA005",
        studentName: "Karan Shah",
        companyName: "Capgemini",
        status: "Pass"
    }

]);
    const filteredStudents = students.filter((student) => {

        return (

            student.studentName.toLowerCase().includes(search.toLowerCase()) ||

            student.enrollmentNo.toLowerCase().includes(search.toLowerCase())

        );

    });

    return (

        <div className="student-page">

            <div className="student-header">

                <div>

                    <h2>Aptitude Round</h2>

                    <p>
                        Manage aptitude round results.
                    </p>

                </div>

            </div>

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

                            filteredStudents.map((student) => (

                                <tr key={student.id}>

                                    <td>{student.id}</td>

                                    <td>

                                        <img
                                            src={student.photo}
                                            alt="Student"
                                            className="student-photo"
                                        />

                                    </td>

                                    <td>{student.enrollmentNo}</td>

                                    <td>{student.studentName}</td>

                                    <td>{student.companyName}</td>

                                    <td>

                                        <span
                                            className={`status ${student.status.toLowerCase()}`}
                                        >

                                            {student.status}

                                        </span>

                                    </td>

                                    <td>

                                        <div className="action-btns">

                                            <button
                                                className="view-btn"
                                                onClick={() =>
                                                    navigate(`/view-student/${student.id}`)
                                                }
                                            >

                                                <FaEye />

                                            </button>

                                            <button
                                                className="edit-btn"
                                                onClick={() =>
                                                    navigate(`/edit-aptitude/${student.id}`)
                                                }
                                            >

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

export default AptitudeRound;