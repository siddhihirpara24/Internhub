import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {FaSearch,FaEye,FaBuilding,FaBriefcase,FaCalendarAlt,FaCheckCircle,FaClock,FaTimesCircle,FaArrowLeft} from "react-icons/fa";
import "./TrackApplicant.css";

export default function TrackApplicant() 
{
  const navigate = useNavigate();

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

    /*
     * Fetch Student Applications
     *
     * Change this API URL according to your Spring Boot controller.
     */
  useEffect(() => 
  {
    let ignore = false;

    const fetchApplications = async () => {

      try 
      {
        setLoading(true);

        const response = await axios.get( "http://localhost:8080/api/applications");

        if (!ignore) 
        {
          setApplications( Array.isArray(response.data) ? response.data : [] );
        }

      } 
      catch (error) 
      {
        console.error("Application Fetch Error:",error);
        if (!ignore) 
        {
          setApplications([]);
        }
      } 
      finally 
      {
        if (!ignore) 
        {
          setLoading(false);
        }
      }

        };

        fetchApplications();

        return () => {
            ignore = true;
        };

    }, []);

    /*
     * Status Class
     */
  const getStatusClass = (status) => {

   const value = (status || "").toLowerCase();
    if (
          value.includes("selected") ||
          value.includes("placed") ||
          value.includes("approved")
        ) {
          return "selected";
        }

    if (
          value.includes("rejected") ||
          value.includes("failed") ||
          value.includes("cancelled")
        ) {
          return "rejected";
        }

    if (
          value.includes("interview") ||
          value.includes("technical") ||
          value.includes("hr") ||
          value.includes("aptitude")
        ) {
          return "interview";
        }

        return "pending";
    };

    /*
     * Status Icon
     */
  const getStatusIcon = (status) => {

    const statusClass = getStatusClass(status);

      if (statusClass === "selected") {
          return <FaCheckCircle />;
        }

      if (statusClass === "rejected") {
          return <FaTimesCircle />;
        }

      if (statusClass === "interview") {
          return <FaClock />;
        }
        return <FaClock />;
    };

    /*
     * Search + Filter
     */
  const filteredApplications = applications.filter((item) => {

    const companyName =
      item.company?.companyName ||
      item.companyName ||
        "";

    const role =
      item.role ||
      item.jobRole ||
      item.internshipRole ||
        "";

    const status =
      item.status ||
        "";

    const searchText =
      `${companyName} ${role} ${status}`.toLowerCase();

    const matchesSearch =
      searchText.includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All" ||
      status.toLowerCase() === statusFilter.toLowerCase();

      return matchesSearch && matchesStatus;
    });


  return (
    <main className="track-application">
      {/* =========================
            HEADER
      ========================== */}
      <div className="application-header">
        <div>
          <h2> Track Application </h2>
          <p> Track your internship and placement applications. </p>
        </div>

        <button className="back-btn" onClick={() => navigate("/dashboard")} >
          <FaArrowLeft />
          Back
        </button>
      </div>

      {/* =========================
            SUMMARY
        ========================== */}
      <div className="application-summary">

        <div className="summary-card">

          <div className="summary-icon blue">
            <FaBriefcase />
          </div>

          <div>
            <h3>
              {applications.length}
            </h3>
            <p>
              Total Applications
            </p>
          </div>
        </div>

        <div className="summary-card">

          <div className="summary-icon orange">
            <FaClock />
          </div>
          <div>
            <h3>{ applications.filter( item => getStatusClass(item.status) === "pending" ).length } </h3>
            <p> Pending </p>
          </div>
        
        </div>
                
        <div className="summary-card">

          <div className="summary-icon purple">
            <FaCalendarAlt />
          </div>
          <div>
            <h3>{ applications.filter( item => getStatusClass(item.status) === "interview" ).length } </h3>
            <p> Interviews </p>
          </div>

        </div>

        <div className="summary-card">

          <div className="summary-icon green">
            <FaCheckCircle />
          </div>

          <div>
            <h3> { applications.filter( item => getStatusClass(item.status) === "selected" ).length } </h3>
            <p> Selected </p>
          </div>
        </div>
      
      </div>
      {/* =========================
            TOOLBAR
      ========================== */}
      <div className="application-toolbar">

        <div className="search-box">
          <FaSearch />
          <input type="text" placeholder="Search company, role or status..." value={search} onChange={(e) => setSearch(e.target.value) } />
        </div>

        <select
          className="status-filter"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value) } >

          <option value="All">
            All Status
          </option>

          <option value="Pending">
            Pending
          </option>

          <option value="Interview">
            Interview
          </option>

          <option value="Selected">
            Selected
          </option>

          <option value="Rejected">
            Rejected
          </option>

        </select>

      </div>
      {/* =========================
              APPLICATION TABLE
      ========================== */}
      
      <div className="application-card">

        <div className="table-header">
          <div>
            <h3> My Applications </h3>
            <p> View and track your application progress. </p>
          </div>

          <span className="application-count">

            {filteredApplications.length}
            {" "}
            Applications
          </span>
        </div>

        <div className="table-container">

          <table>
            <thead>
              <tr>
                <th> # </th>
                <th> Company </th>
                <th> Role </th>
                <th> Applied Date </th>
                <th> Current Round </th>
                <th> Status </th> 
                <th> Action </th>
              </tr>
            </thead>            
            
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="7" className="empty-row" >
                    Loading Applications...
                  </td>
                </tr>

                ) : filteredApplications.length === 0 ? (
                <tr>
                  <td colSpan="7" className="empty-row" >
                    <FaBriefcase />
                    <span>
                      No Applications Found
                    </span>
                  </td>
                </tr>

                ) : ( filteredApplications.map( (item, index) => {  const companyName =
                      item.company?.companyName ||
                      item.companyName ||
                      "N/A";
                      const role =
                      item.role ||
                      item.jobRole ||
                      item.internshipRole ||
                      "N/A";

                      const appliedDate =
                      item.appliedDate ||
                      item.applicationDate ||
                      "-";

                      const round =
                      item.currentRound ||
                      item.interviewRound ||
                      item.round ||
                      "Application";

                      const status =
                      item.status ||
                      "Pending";

                      return (

                        <tr key={ item.applicationId || item.id || index } >
                          <td>
                            <span className="serial">
                              {index + 1}
                            </span>
                          </td>
                          <td>
                            <div className="company-info">

                              <div className="company-icon">
                                <FaBuilding />
                              </div>

                              <div>
                                <strong>
                                  {companyName}
                                </strong>
                                <small>
                                  Internship / Placement
                                </small>
                              </div>

                            </div>

                          </td>
                          
                          <td>
                            <span className="role-text">
                              {role}
                            </span>
                          </td>
                          
                          <td>
                            <div className="date-info">
                              <FaCalendarAlt />
                              {appliedDate}

                            </div>
                          </td>
                          
                          <td>
                            <span className="round-badge">
                              {round}
                            </span>
                          </td>

                          <td>
                            <span className={`application-status ${getStatusClass(status)}`}  >
                              {getStatusIcon(status)}
                              {status}
                            </span>
                          </td>
                          
                          <td>
                            <button className="view-btn" onClick={() => navigate( `/view-application/${ item.applicationId || item.id }`)}
                                    title="View Application"
                            >
                              <FaEye />
                              View
                            </button>

                          </td>
                        </tr>
                      );

                    })
                  )}

            </tbody>
          </table>
         </div>
      </div>
      
    </main>
  );
}

