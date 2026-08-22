import { FaGraduationCap, FaChalkboardTeacher, FaBullseye, FaLightbulb, FaCheckCircle } from 'react-icons/fa';
import './About.css';

// Using a new clean, professional academic image of students collaborating
const ABOUT_IMAGE_URL = "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800&h=600"; 

const About = () => {
  return (
    <div className="about-page">
      {/* Page Header */}
      <section className="page-header">
        <div className="home-container text-center">
          <h1 className="page-title">About Smart Internship Portal</h1>
          <p className="page-subtitle">
            Bridging the gap between students, faculty, and industry opportunities through a centralized digital campus platform.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="about-main-content">
        <div className="home-container about-grid">
          <div className="about-text-content">
            <h2 className="section-title">Empowering Campus Internships</h2>
            <p className="about-paragraph">
              The Smart Internship Portal is an exclusive campus initiative designed to streamline the entire internship lifecycle. Managing student applications, company interactions, and placement tracking traditionally involved extensive paperwork and manual coordination. Our portal digitizes this entire process.
            </p>
            <p className="about-paragraph">
              By bringing both students and faculty onto a single unified platform, we ensure transparency, efficiency, and better career outcomes for our college students.
            </p>
            
            <ul className="about-benefits-list">
              <li><FaCheckCircle className="check-icon" /> Centralized student profiles and resumes</li>
              <li><FaCheckCircle className="check-icon" /> Real-time application tracking</li>
              <li><FaCheckCircle className="check-icon" /> Automated interview scheduling by faculty</li>
              <li><FaCheckCircle className="check-icon" /> Comprehensive placement analytics</li>
            </ul>
          </div>
          <div className="about-image-wrapper">
             <img src={ABOUT_IMAGE_URL} alt="Campus students collaborating" className="about-featured-image" />
          </div>
        </div>
      </section>

      {/* Mission and Vision */}
      <section className="mission-vision-section">
        <div className="home-container mission-grid">
          <div className="mission-card">
            <div className="mission-icon"><FaBullseye /></div>
            <h3>Our Mission</h3>
            <p>
              To provide a seamless, paperless, and highly efficient platform that simplifies internship management for both college students and faculty coordinators.
            </p>
          </div>
          <div className="mission-card">
            <div className="mission-icon"><FaLightbulb /></div>
            <h3>Our Vision</h3>
            <p>
              To maximize on-campus placement opportunities by equipping our academic institution with modern digital tools to track, manage, and secure top internships.
            </p>
          </div>
        </div>
      </section>

      {/* Roles Section */}
      <section className="roles-section">
        <div className="home-container">
          <div className="section-header-center">
            <h2 className="section-title">Designed for Our Campus</h2>
            <p className="section-subtitle">A dual-panel architecture tailored specifically for our academic ecosystem.</p>
          </div>
          
          <div className="roles-grid">
            <div className="role-card">
              <div className="role-header">
                <FaGraduationCap className="role-icon" />
                <h3>For Students</h3>
              </div>
              <p>
                Students get a dedicated dashboard to discover active internship drives, apply to companies with a single click, upload resumes, and track their interview rounds in real-time. No more missing out on important campus placement updates.
              </p>
            </div>
            
            <div className="role-card">
              <div className="role-header">
                <FaChalkboardTeacher className="role-icon" />
                <h3>For Faculty</h3>
              </div>
              <p>
                Faculty members and placement officers get full administrative control to register companies, post internship opportunities, shortlist students, schedule interview rounds, and generate comprehensive placement reports.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;