import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // 1. Imported useNavigate
import { FaUserTie, FaLock, FaUser } from 'react-icons/fa';
import './FacultyLogin.css';

const FacultyLogin = () => {
  const navigate = useNavigate(); // 2. Initialized navigate
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true); 
    
    try {
      const response = await fetch('http://localhost:8081/api/faculty/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password })
      });

      const data = await response.json();

      if (response.ok) {
        alert('Login Successful!');
        localStorage.setItem('facultyToken', data.token);
        
        // 3. THIS IS THE FIX! Redirects to your dashboard instantly.
        navigate('/faculty/dashboard'); 
        
      } else {
        alert('Login Failed: ' + data.message); 
      }
    } catch (error) {
      console.error("Login attempt failed:", error); 
      alert('Connection Error: Could not connect to the server. Is your Spring Boot app running?');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-page-container">
      <div className="auth-card">
        
        <div className="auth-header">
          <div className="auth-icon-wrapper">
            <FaUserTie />
          </div>
          <h2>Faculty Portal</h2>
          <p>Please enter your credentials to access the dashboard.</p>
        </div>

        <form className="auth-form" onSubmit={handleLogin}>
          
          <div className="auth-form-group">
            <label>Username</label>
            <div className="input-with-icon">
              <FaUser className="input-icon" />
              <input 
                type="text" 
                placeholder="Enter your username" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required 
              />
            </div>
          </div>

          <div className="auth-form-group">
            <label>Password</label>
            <div className="input-with-icon">
              <FaLock className="input-icon" />
              <input 
                type="password" 
                placeholder="Enter your password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
              />
            </div>
          </div>

          <button type="submit" className="btn-auth-submit" disabled={isLoading}>
            {isLoading ? 'Connecting...' : 'Secure Login'}
          </button>
          
        </form>

      </div>
    </div>
  );
};

export default FacultyLogin;