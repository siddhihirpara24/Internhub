import { 
  FaUserGraduate, FaUserTie, 
  FaFileAlt, FaSearch, FaBell, 
  FaBuilding, FaCalendarCheck, FaChartPie 
} from 'react-icons/fa';
import './Features.css';

const Features = () => {
  return (
    <div className="features-page">
      
      {/* Page Header (Light Theme) */}
      <section className="page-header">
        <div className="home-container text-center">
          <h1 className="page-title">Powerful Portal Features</h1>
          <p className="page-subtitle">
            Everything our college needs to manage campus internships and placements smoothly from start to finish.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="features-main-content">
        <div className="home-container">
          
          {/* Student Features Section */}
          <div className="feature-group">
            <div className="feature-group-header">
              <FaUserGraduate className="group-icon student-icon" />
              <h2 className="section-title">Features for Students</h2>
            </div>
            
            <div className="feature-cards-grid">
              <div className="feature-card">
                <div className="feature-icon-wrapper"><FaSearch /></div>
                <h3>Find Internships</h3>
                <p>View all active campus internship drives and company requirements in one place.</p>
              </div>
              
              <div className="feature-card">
                <div className="feature-icon-wrapper"><FaFileAlt /></div>
                <h3>One-Click Apply</h3>
                <p>Upload your resume once and apply to multiple companies with just a single click.</p>
              </div>
              
              <div className="feature-card">
                <div className="feature-icon-wrapper"><FaBell /></div>
                <h3>Live Updates</h3>
                <p>Get real-time notifications about interview schedules, shortlists, and final results.</p>
              </div>
            </div>
          </div>

          {/* Faculty Features Section */}
          <div className="feature-group faculty-group">
            <div className="feature-group-header">
              <FaUserTie className="group-icon faculty-icon" />
              <h2 className="section-title">Features for Faculty</h2>
            </div>
            
            <div className="feature-cards-grid">
              <div className="feature-card">
                <div className="feature-icon-wrapper"><FaBuilding /></div>
                <h3>Company Management</h3>
                <p>Add visiting companies, manage HR contacts, and post available internship roles.</p>
              </div>
              
              <div className="feature-card">
                <div className="feature-icon-wrapper"><FaCalendarCheck /></div>
                <h3>Schedule Interviews</h3>
                <p>Organize aptitude tests, technical rounds, and HR interviews for shortlisted students.</p>
              </div>
              
              <div className="feature-card">
                <div className="feature-icon-wrapper"><FaChartPie /></div>
                <h3>Placement Reports</h3>
                <p>Generate automatic reports of placed students, company visits, and overall statistics.</p>
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};

export default Features;