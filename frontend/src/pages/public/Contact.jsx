import { FaMapMarkerAlt, FaEnvelope, FaPhoneAlt } from 'react-icons/fa';
import './Contact.css';

const Contact = () => {
  return (
    <div className="contact-page">
      
      {/* Page Header */}
      <section className="page-header">
        <div className="home-container text-center">
          <h1 className="page-title">Contact Us</h1>
          <p className="page-subtitle">
            Get in touch with the college placement cell for any queries regarding campus internships.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="contact-main-content">
        <div className="home-container">
          <div className="contact-grid">
            
            {/* Contact Information */}
            <div className="contact-info-section">
              <h2 className="section-title">Contact Information</h2>
              <p className="contact-description">
                Our placement team is here to help you. Reach out to us via email or visit the placement office during college hours.
              </p>
              
              <div className="info-cards">
                
                <div className="info-card">
                  <div className="info-icon-wrapper"><FaMapMarkerAlt /></div>
                  <div className="info-text">
                    <h3>Office Location</h3>
                    <p>Placement Cell, Room 204<br />Main College Building<br />Ahmedabad, Gujarat</p>
                  </div>
                </div>
                
                <div className="info-card">
                  <div className="info-icon-wrapper"><FaEnvelope /></div>
                  <div className="info-text">
                    <h3>Email Address</h3>
                    <p>support@smartinternship.com<br />placements@college.edu</p>
                  </div>
                </div>
                
                <div className="info-card">
                  <div className="info-icon-wrapper"><FaPhoneAlt /></div>
                  <div className="info-text">
                    <h3>Phone Number</h3>
                    <p>+91 98765 43210<br />Mon to Fri (9 AM - 4 PM)</p>
                  </div>
                </div>

              </div>
            </div>

            {/* Contact Form */}
            <div className="contact-form-section">
              <div className="form-card">
                <h2 className="form-title">Send a Message</h2>
                <form className="contact-form">
                  <div className="form-group">
                    <label>Full Name</label>
                    <input type="text" placeholder="Enter your name" className="form-input" />
                  </div>
                  
                  <div className="form-group">
                    <label>Email Address</label>
                    <input type="email" placeholder="Enter your email" className="form-input" />
                  </div>
                  
                  <div className="form-group">
                    <label>Subject</label>
                    <input type="text" placeholder="What is this regarding?" className="form-input" />
                  </div>
                  
                  <div className="form-group">
                    <label>Message</label>
                    <textarea placeholder="Write your message here..." className="form-textarea" rows="5"></textarea>
                  </div>
                  
                  <button type="button" className="btn-primary-solid submit-btn">
                    Send Message
                  </button>
                </form>
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
};

export default Contact;