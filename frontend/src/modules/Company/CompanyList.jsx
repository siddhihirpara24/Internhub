import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaEye, FaEdit, FaTrash, FaSearch, FaPlus, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import './CompanyList.css';

const CompanyList = () => {
  const navigate = useNavigate();
  
  // Data States
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Filter States
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All'); // 'All', 'Active', 'Inactive'

  // Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCompanyId, setSelectedCompanyId] = useState(null);
  const [registrationStartDate, setRegistrationStartDate] = useState('');
  const [registrationEndDate, setRegistrationEndDate] = useState('');

  // Function used by your Delete, Activate, and Deactivate buttons to refresh the table
  const fetchCompanies = async () => {
    try {
      const response = await axios.get('http://localhost:8081/api/company/all');
      setCompanies(response.data);
      setError(null);
    } catch (err) {
      console.error("Axios Error fetching companies:", err);
    }
  };

  // Initial page load
  useEffect(() => {
    axios.get('http://localhost:8081/api/company/all')
      .then((response) => {
        setCompanies(response.data);
        setError(null);
      })
      .catch((err) => {
        console.error("Axios Error:", err);
        setError("Unable to fetch companies.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // Updated Filter functionality (Search + Status)
  const filteredCompanies = companies.filter(company => {
    const searchLower = searchTerm.toLowerCase();
    
    // 1. Check if it matches search text
    const matchesSearch = (
      (company.companyName && company.companyName.toLowerCase().includes(searchLower)) ||
      (company.internshipRole && company.internshipRole.toLowerCase().includes(searchLower)) ||
      (company.location && company.location.toLowerCase().includes(searchLower))
    );

    // 2. Check if it matches the dropdown status
    const isActive = company.registrationStatus === "Active";
    const matchesStatus = 
      statusFilter === 'All' ? true : 
      statusFilter === 'Active' ? isActive : 
      !isActive; // Inactive

    // 3. Return true only if it matches BOTH
    return matchesSearch && matchesStatus;
  });

  // Action: Delete
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this company?")) {
      try {
        await axios.delete(`http://localhost:8081/api/company/${id}`);
        alert("Company deleted successfully.");
        fetchCompanies();
      } catch (err) {
        console.error("Delete Error:", err);
        alert("Failed to delete company.");
      }
    }
  };

  // Action: Open Activate Modal
  const openActivateModal = (id) => {
    setSelectedCompanyId(id);
    setRegistrationStartDate('');
    setRegistrationEndDate('');
    setIsModalOpen(true);
  };

  // Action: Approve Activation
  const handleApproveActivation = async () => {
    if (!registrationStartDate || !registrationEndDate) {
      alert("Start date and End date are required.");
      return;
    }
    if (new Date(registrationEndDate) < new Date(registrationStartDate)) {
      alert("End date cannot be before start date.");
      return;
    }

    try {
      await axios.put(`http://localhost:8081/api/company/${selectedCompanyId}/registration`, {
        registrationStartDate,
        registrationEndDate,
        registrationStatus: "Active"
      });
      setIsModalOpen(false);
      alert("Company registration activated successfully!");
      fetchCompanies();
    } catch (err) {
      console.error("Activation Error:", err);
      alert("Failed to activate company registration.");
    }
  };

  // Action: Deactivate
  const handleDeactivate = async (id) => {
    if (window.confirm("Are you sure you want to deactivate registration for this company?")) {
      try {
        await axios.put(`http://localhost:8081/api/company/${id}/registration`, {
          registrationStartDate: null,
          registrationEndDate: null,
          registrationStatus: "Inactive"
        });
        fetchCompanies();
      } catch (err) {
        console.error("Deactivation Error:", err);
        alert("Failed to deactivate company registration.");
      }
    }
  };

  return (
    <div className="company-list-page">
      {/* Header Section */}
      <div className="cl-header-row">
        <div>
          <h1 className="cl-page-title">Company Management</h1>
          <p className="cl-page-subtitle">Manage all registered internship companies.</p>
        </div>
        <button className="btn-add-company" onClick={() => navigate('/faculty/company/add-company')}>
          <FaPlus /> Add Company
        </button>
      </div>

      {/* Main Card */}
      <div className="cl-card">
        
        {/* Controls Row (Search + Filter) */}
        <div className="cl-controls-row">
          
          {/* Search Box */}
          <div className="cl-search-wrapper">
            <FaSearch className="cl-search-icon" />
            <input 
              type="text" 
              placeholder="Search company..." 
              className="cl-search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Filter Dropdown */}
          <div className="cl-filter-wrapper">
            <span className="cl-filter-label">Filter Status:</span>
            <select 
              className="cl-filter-dropdown"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">All Companies</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

        </div>

        {/* Content State */}
        {loading ? (
          <div className="cl-state-message">Loading Companies...</div>
        ) : error ? (
          <div className="cl-state-message error">{error}</div>
        ) : filteredCompanies.length === 0 ? (
          <div className="cl-state-message">No Companies Found</div>
        ) : (
          <div className="cl-table-responsive">
            <table className="cl-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Company Name</th>
                  <th>Internship Role</th>
                  <th>Duration</th>
                  <th>Monthly Stipend</th>
                  <th>Company Package</th>
                  <th>Registration</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCompanies.map((company) => {
                  const companyId = company.id || company.companyId;
                  const isActive = company.registrationStatus === "Active";

                  return (
                    <tr key={companyId}>
                      <td>{companyId}</td>
                      <td className="cl-fw-600">{company.companyName}</td>
                      <td>{company.internshipRole}</td>
                      <td>{company.internshipDuration}</td>
                      <td>{company.monthlyStipend}</td>
                      <td>{company.ctcPackage || company.companyPackage || "-"}</td>
                      
                      {/* Registration Status & Activate Button */}
                      <td>
                        <div className="cl-registration-cell">
                          <span className={`cl-badge ${isActive ? 'cl-badge-active' : 'cl-badge-inactive'}`}>
                            {isActive ? <><FaCheckCircle /> Active</> : <><FaTimesCircle /> Inactive</>}
                          </span>
                          {isActive ? (
                            <button className="cl-btn-status cl-btn-deactivate" onClick={() => handleDeactivate(companyId)}>Deactivate</button>
                          ) : (
                            <button className="cl-btn-status cl-btn-activate" onClick={() => openActivateModal(companyId)}>Activate</button>
                          )}
                        </div>
                      </td>

                      {/* Action Buttons */}
                      <td>
                        <div className="cl-actions-cell">
                          <button className="cl-btn-icon cl-btn-view" onClick={() => navigate(`/faculty/view-company/${companyId}`)} title="View">
                            <FaEye />
                          </button>
                          <button className="cl-btn-icon cl-btn-edit" onClick={() => navigate(`/faculty/edit-company/${companyId}`)} title="Edit">
                            <FaEdit />
                          </button>
                          <button className="cl-btn-icon cl-btn-delete" onClick={() => handleDelete(companyId)} title="Delete">
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Activation Modal */}
      {isModalOpen && (
        <div className="cl-modal-overlay">
          <div className="cl-modal-content">
            <h3 className="cl-modal-title">Activate Company Registration</h3>
            
            <div className="cl-modal-form">
              <div className="cl-form-group">
                <label>Registration Start Date</label>
                <input 
                  type="date" 
                  value={registrationStartDate} 
                  onChange={(e) => setRegistrationStartDate(e.target.value)} 
                  required
                />
              </div>
              <div className="cl-form-group">
                <label>Registration End Date</label>
                <input 
                  type="date" 
                  value={registrationEndDate} 
                  onChange={(e) => setRegistrationEndDate(e.target.value)} 
                  required
                />
              </div>
            </div>

            <div className="cl-modal-actions">
              <button className="cl-btn-cancel" onClick={() => setIsModalOpen(false)}>Cancel</button>
              <button className="cl-btn-approve" onClick={handleApproveActivation}>Approve</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompanyList;