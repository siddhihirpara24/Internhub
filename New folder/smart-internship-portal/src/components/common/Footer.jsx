
import { Link } from 'react-router-dom';
import { FaUniversity, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="public-footer">
      <div className="footer-container">
        <div className="footer-col brand-col">
          <div className="footer-logo">
            <FaUniversity className="footer-logo-icon" />
            <div className="footer-logo-text">
              <span className="footer-logo-title">SMART</span>
              <span className="footer-logo-subtitle">INTERNSHIP PORTAL</span>
            </div>
          </div>
          <p className="footer-description">
            A smart platform for managing college internships, interviews and placements.
          </p>
        </div>
        
        <div className="footer-col">
          <h4 className="footer-heading">Quick Links</h4>
          <ul className="footer-links">
            <li><Link to="/">Home</Link></li>
            <li><a href="#about">About</a></li>
            <li><a href="#features">Features</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>
        
        <div className="footer-col">
          <h4 className="footer-heading">Portal</h4>
          <ul className="footer-links">
            <li><Link to="/student-login">Student Login</Link></li>
            <li><Link to="/faculty-login">Faculty Login</Link></li>
          </ul>
        </div>
        
        <div className="footer-col contact-col">
          <h4 className="footer-heading">Contact</h4>
          <ul className="footer-links">
            <li>
              <FaEnvelope className="contact-icon" />
              <a href="mailto:support@smartinternship.com">support@smartinternship.com</a>
            </li>
            <li>
              <FaMapMarkerAlt className="contact-icon" />
              <span>Ahmedabad, Gujarat</span>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; 2026 Smart Internship Portal. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;