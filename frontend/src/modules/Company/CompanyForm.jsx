import { useState } from 'react';
import './CompanyForm.css';

const CompanyForm = () => {
  const [formData, setFormData] = useState({
    // Company Information
    companyName: '',
    location: '',
    website: '',
    establishmentYear: '',
    internshipRole: '',
    internshipDuration: '',
    monthlyStipend: '',
    package: '',
    requiredSkills: '',
    
    // HR Information
    hrName: '',
    hrMobile: '',
    hrEmail: '',
    
    // Interview Round Configuration
    round1: '',
    round2: '',
    round3: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // We map React's 'package' field to 'ctcPackage' to perfectly match your Java Entity!
    const payload = {
        ...formData,
        packageAmount: formData.package 
    };

    try {
        // Retrieve the JWT token from localStorage that was saved during login
        const token = localStorage.getItem('facultyToken');

        // Make the POST request to your Spring Boot API
        const response = await fetch('http://localhost:8081/api/company/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // CRITICAL FIX: Send the JWT Token so Spring Security allows the request!
                'Authorization': `Bearer ${token}` 
            },
            body: JSON.stringify(payload)
        });

        if (response.ok) {
            // Success! 
            const savedCompany = await response.json(); 
            alert(`Success! Added ${savedCompany.companyName} to the database.`);

            // This perfectly clears the form back to blank!
            setFormData({
                companyName: '',
                location: '',
                website: '',
                establishmentYear: '',
                internshipRole: '',
                internshipDuration: '',
                monthlyStipend: '',
                package: '',
                requiredSkills: '',
                hrName: '',
                hrMobile: '',
                hrEmail: '',
                round1: '',
                round2: '',
                round3: ''
            });
            
        } else {
            // If Spring Security completely blocked us (Token expired or missing)
            if (response.status === 401 || response.status === 403) {
                alert("Security Error: Your session expired or you are not authorized. Please log out and log in again.");
            } else {
                // If it's a normal backend error
                const errorMessage = await response.text();
                alert("Backend Error: " + errorMessage);
            }
        }
    } catch (error) {
        console.error('Network Error:', error);
        alert("Failed to connect to the server. Make sure Spring Boot is running!");
    }
  };

  return (
    <div className="company-form-container">
      <div className="company-form-card">
        <h2 className="form-heading">Add New Company</h2>
        <p className="form-subtitle">Enter company details and configure the interview process</p>

        <form onSubmit={handleSubmit}>
          
          {/* Company Information Section */}
          <div className="form-section">
            <h3 className="section-title">Company Information</h3>
            <div className="form-grid">
              <div className="form-group">
                <label>Company Name</label>
                <input type="text" name="companyName" value={formData.companyName} onChange={handleChange} required placeholder="e.g. TCS" />
              </div>
              <div className="form-group">
                <label>Location</label>
                <input type="text" name="location" value={formData.location} onChange={handleChange} required placeholder="e.g. Pune, Maharashtra" />
              </div>
              <div className="form-group">
                <label>Company Website / Link</label>
                <input type="url" name="website" value={formData.website} onChange={handleChange} placeholder="https://www..." />
              </div>
              <div className="form-group">
                <label>Establishment Year</label>
                <input type="number" name="establishmentYear" value={formData.establishmentYear} onChange={handleChange} placeholder="e.g. 1968"  />
              </div>
              <div className="form-group">
                <label>Internship Role</label>
                <input type="text" name="internshipRole" value={formData.internshipRole} onChange={handleChange} required placeholder="e.g. Software Engineer Intern" />
              </div>
              <div className="form-group">
                <label>Internship Duration</label>
                <select name="internshipDuration" value={formData.internshipDuration} onChange={handleChange} required>
                  <option value="" disabled>Select Duration</option>
                  <option value="1 Month">1 Month</option>
                  <option value="2 Months">2 Months</option>
                  <option value="3 Months">3 Months</option>
                  <option value="6 Months">6 Months</option>
                  <option value="1 Year">1 Year</option>
                </select>
              </div>
              <div className="form-group">
                <label>Monthly Stipend</label>
                <input type="text" name="monthlyStipend" value={formData.monthlyStipend} onChange={handleChange} placeholder="e.g. ₹15,000" />
              </div>
              <div className="form-group">
                <label>Company Package (CTC)</label>
                <input type="text" name="package" value={formData.package} onChange={handleChange} placeholder="e.g. 7 LPA" />
              </div>
              <div className="form-group full-width">
                <label>Required Skills</label>
                <textarea name="requiredSkills" value={formData.requiredSkills} onChange={handleChange} rows="3" placeholder="e.g. React, Java, Spring Boot, MySQL" required></textarea>
              </div>
            </div>
          </div>

          {/* HR Information Section */}
          <div className="form-section">
            <h3 className="section-title">HR Information</h3>
            <div className="form-grid">
              <div className="form-group">
                <label>HR Name</label>
                <input type="text" name="hrName" value={formData.hrName} onChange={handleChange} required placeholder="Enter HR Name" />
              </div>
              <div className="form-group">
                <label>HR Mobile Number</label>
                <input type="tel" name="hrMobile" value={formData.hrMobile} onChange={handleChange} required placeholder="e.g. 9876543210" />
              </div>
              <div className="form-group">
                <label>HR Email</label>
                <input type="email" name="hrEmail" value={formData.hrEmail} onChange={handleChange} required placeholder="hr@company.com" />
              </div>
            </div>
          </div>

          {/* Interview Round Configuration Section */}
          <div className="form-section">
            <h3 className="section-title">Interview Round Configuration</h3>
            <p className="section-description">Select the type of interview for each consecutive round.</p>
            
            <div className="rounds-container">
              {/* Round 1 */}
              <div className="round-group">
                <label className="round-label">Round 1</label>
                <div className="radio-group">
                  <label className="radio-item">
                    <input type="radio" name="round1" value="Aptitude" checked={formData.round1 === 'Aptitude'} onChange={handleChange} required />
                    Aptitude
                  </label>
                  <label className="radio-item">
                    <input type="radio" name="round1" value="Technical" checked={formData.round1 === 'Technical'} onChange={handleChange} />
                    Technical
                  </label>
                  <label className="radio-item">
                    <input type="radio" name="round1" value="HR" checked={formData.round1 === 'HR'} onChange={handleChange} />
                    HR
                  </label>
                </div>
              </div>

              {/* Round 2 */}
              <div className="round-group">
                <label className="round-label">Round 2</label>
                <div className="radio-group">
                  <label className="radio-item">
                    <input type="radio" name="round2" value="Aptitude" checked={formData.round2 === 'Aptitude'} onChange={handleChange} required />
                    Aptitude
                  </label>
                  <label className="radio-item">
                    <input type="radio" name="round2" value="Technical" checked={formData.round2 === 'Technical'} onChange={handleChange} />
                    Technical
                  </label>
                  <label className="radio-item">
                    <input type="radio" name="round2" value="HR" checked={formData.round2 === 'HR'} onChange={handleChange} />
                    HR
                  </label>
                </div>
              </div>

              {/* Round 3 */}
              <div className="round-group">
                <label className="round-label">Round 3</label>
                <div className="radio-group">
                  <label className="radio-item">
                    <input type="radio" name="round3" value="Aptitude" checked={formData.round3 === 'Aptitude'} onChange={handleChange} required />
                    Aptitude
                  </label>
                  <label className="radio-item">
                    <input type="radio" name="round3" value="Technical" checked={formData.round3 === 'Technical'} onChange={handleChange} />
                    Technical
                  </label>
                  <label className="radio-item">
                    <input type="radio" name="round3" value="HR" checked={formData.round3 === 'HR'} onChange={handleChange} />
                    HR
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="submit-btn">Save Company Configuration</button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default CompanyForm;