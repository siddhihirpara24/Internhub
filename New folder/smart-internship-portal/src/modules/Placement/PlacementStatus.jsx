import { useState } from "react";
import { FaSearch, FaEye, FaEdit, FaTrash } from "react-icons/fa";
import "./PlacementStatus.css";

function PlacementStatus() {

    const [search, setSearch] = useState("");

    const [statusFilter, setStatusFilter] = useState("All");

    const students = [

        {
            id: 1,
            photo: "https://i.pravatar.cc/100?img=1",
            enrollmentNo: "23MCA001",
            studentName: "Rahul Patel",
            company: "TCS",
            package: "6 LPA",
            placementDate: "10 Aug 2026",
            status: "Placed"
        },

        {
            id: 2,
            photo: "https://i.pravatar.cc/100?img=2",
            enrollmentNo: "23MCA002",
            studentName: "Priya Shah",
            company: "Infosys",
            package: "5.5 LPA",
            placementDate: "-",
            status: "Waiting"
        },

        {
            id: 3,
            photo: "https://i.pravatar.cc/100?img=3",
            enrollmentNo: "23MCA003",
            studentName: "Amit Kumar",
            company: "Accenture",
            package: "7 LPA",
            placementDate: "11 Aug 2026",
            status: "Placed"
        },

        {
            id: 4,
            photo: "https://i.pravatar.cc/100?img=4",
            enrollmentNo: "23MCA004",
            studentName: "Sneha Patel",
            company: "Capgemini",
            package: "-",
            placementDate: "-",
            status: "Not Placed"
        },

        {
            id: 5,
            photo: "https://i.pravatar.cc/100?img=5",
            enrollmentNo: "23MCA005",
            studentName: "Karan Shah",
            company: "Wipro",
            package: "6.2 LPA",
            placementDate: "12 Aug 2026",
            status: "Placed"
        }

    ];

    const filteredStudents = students.filter(student => {

        const matchesSearch =
            student.studentName.toLowerCase().includes(search.toLowerCase()) ||
            student.enrollmentNo.toLowerCase().includes(search.toLowerCase()) ||
            student.company.toLowerCase().includes(search.toLowerCase());

        const matchesStatus =
            statusFilter === "All" || student.status === statusFilter;

        return matchesSearch && matchesStatus;

    });

    return (

        <div className="placement-page">

            {/* Header */}

            <div className="placement-header">

                <div>

                    <h2>Placement Status</h2>

                    <p>Manage placed students and final placement results.</p>

                </div>

            </div>

            {/* Summary Cards */}

            <div className="placement-cards">

                <div className="placement-card">

                    <h1>250</h1>

                    <p>Total Students</p>

                </div>

                <div className="placement-card">

                    <h1>70</h1>

                    <p>Placed Students</p>

                </div>

                <div className="placement-card">

                    <h1>180</h1>

                    <p>Not Placed</p>

                </div>

                <div className="placement-card">

                    <h1>28%</h1>

                    <p>Placement Rate</p>

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

                <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                >

                    <option>All</option>

                    <option>Placed</option>

                    <option>Waiting</option>

                    <option>Not Placed</option>

                </select>

            </div>

            {/* Table */}

            <div className="table-container">

                <table>

                    <thead>

                        <tr>

                            <th>ID</th>

                            <th>Photo</th>

                            <th>Enrollment</th>

                            <th>Student Name</th>

                            <th>Company</th>

                            <th>Package</th>

                            <th>Placement Date</th>

                            <th>Status</th>

                            <th>Action</th>

                        </tr>

                    </thead>

                    <tbody>

                        {

                            filteredStudents.map(student => (

                                <tr key={student.id}>

                                    <td>{student.id}</td>

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

                                    <td>{student.placementDate}</td>

                                    <td>

                                        <span className={`status ${student.status.toLowerCase().replace(" ","-")}`}>

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

                                            <button className="delete-btn">

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

export default PlacementStatus;