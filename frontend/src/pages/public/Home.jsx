
import { 
  FaUserGraduate,
  FaBuilding, FaCalendarAlt, FaGraduationCap
} from 'react-icons/fa';
import './Home.css';

const HERO_IMAGE_URL = "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800&h=600"; 

const Home = () => {
  return (
    <div className="home-wrapper">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="home-container hero-grid">
          <div className="hero-content">
            <div className="hero-badge">
              <FaGraduationCap className="badge-icon" />
              COLLEGE CAMPUS INTERNSHIP PORTAL
            </div>
            <h1 className="hero-title">Smart Internship Portal</h1>
            <h2 className="hero-subtitle">
              Manage Your <span className="highlight-text">Campus Internship Journey</span>
            </h2>
            <p className="hero-desc">
              A centralized platform for college students and faculty to manage campus internships, applications, interview rounds and placement activities.
            </p>
          </div>
          <div className="hero-visual">
            <div className="image-card">
              <img src={HERO_IMAGE_URL} alt="College students collaborating" className="hero-image" />
            </div>
          </div>
        </div>
      </section>

      {/* Portal Introduction */}
      <section className="intro-section">
        <div className="home-container">
          <div className="section-header-center">
            <h2 className="section-title">One Portal for Campus Internship Management</h2>
            <p className="section-subtitle">
              Smart Internship Portal helps students and faculty manage the complete campus internship process through one centralized system.
            </p>
          </div>
          <div className="intro-grid">
            <div className="intro-card">
              <div className="intro-icon-wrapper"><FaUserGraduate /></div>
              <h3>Student Management</h3>
              <p>Students can manage their internship profile and applications.</p>
            </div>
            <div className="intro-card">
              <div className="intro-icon-wrapper"><FaBuilding /></div>
              <h3>Campus Companies</h3>
              <p>Faculty can manage companies and available internship opportunities.</p>
            </div>
            <div className="intro-card">
              <div className="intro-icon-wrapper"><FaCalendarAlt /></div>
              <h3>Interview & Placement</h3>
              <p>Faculty can manage interview rounds, schedules and placement status.</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;