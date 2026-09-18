import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { FaUniversity, FaUserGraduate, FaUserTie, FaBars, FaTimes } from 'react-icons/fa';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="public-header">
      <div className="header-container">
        <Link to="/" className="header-logo" onClick={() => setIsMenuOpen(false)}>
          <FaUniversity className="logo-icon" />
          <div className="logo-text">
            <span className="logo-title">SMART</span>
            <span className="logo-subtitle">INTERNSHIP PORTAL</span>
          </div>
        </Link>

        <nav className="header-nav">
          <NavLink to="/" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Home</NavLink>
          <NavLink to="/about" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>About</NavLink>
          <NavLink to="/features" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Features</NavLink>
          <NavLink to="/contact" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Contact</NavLink>
        </nav>

        <div className="header-actions">
          <Link to="/student-login" className="btn btn-student-login">
            <FaUserGraduate /> Student Login
          </Link>
          <Link to="/faculty-login" className="btn btn-faculty-login">
            <FaUserTie /> Faculty Login
          </Link>
        </div>

        <button className="mobile-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {isMenuOpen && (
        <div className="mobile-menu">
          <NavLink to="/" className="mobile-nav-link" onClick={() => setIsMenuOpen(false)}>Home</NavLink>
          <NavLink to="/about" className="mobile-nav-link" onClick={() => setIsMenuOpen(false)}>About</NavLink>
          <NavLink to="/features" className="mobile-nav-link" onClick={() => setIsMenuOpen(false)}>Features</NavLink>
          <NavLink to="/contact" className="mobile-nav-link" onClick={() => setIsMenuOpen(false)}>Contact</NavLink>
          <div className="mobile-menu-actions">
            <Link to="/student-login" className="btn btn-student-login mobile-full-btn" onClick={() => setIsMenuOpen(false)}>
              <FaUserGraduate /> Student Login
            </Link>
            <Link to="/faculty-login" className="btn btn-faculty-login mobile-full-btn" onClick={() => setIsMenuOpen(false)}>
              <FaUserTie /> Faculty Login
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;