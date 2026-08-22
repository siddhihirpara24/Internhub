import {
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhoneAlt,
  FaClock,
} from "react-icons/fa";

import "./Contact.css";

const Contact = () => {
  return (
    <div className="contact-page">

      {/* ================= PAGE HEADER ================= */}

      <section className="page-header">
        <div className="home-container text-center">
          <h1 className="page-title">Contact Us</h1>

          <p className="page-subtitle">
            Get in touch with the university placement and internship cell
            for any queries regarding campus internships.
          </p>
        </div>
      </section>

      {/* ================= CONTACT DETAILS ================= */}

      <section className="contact-main-content">
        <div className="home-container">

          <div className="contact-heading">
            <h2>Get in Touch</h2>

            <p>
              For any information or assistance regarding campus internships,
              students can contact the university placement and internship team.
            </p>
          </div>

          <div className="info-cards">

            {/* LOCATION */}

            <div className="info-card">
              <div className="info-icon-wrapper">
                <FaMapMarkerAlt />
              </div>

              <div className="info-text">
                <h3>Location</h3>

                <p>
                  Sardar Vallabhbhai Global University
                  <br />
                  Chimanbhai Patel Institute Campus
                  <br />
                  Opp. Karnavati Club
                  <br />
                  Prahlad Nagar, Ahmedabad
                  <br />
                  Gujarat - 380015
                </p>
              </div>
            </div>

            {/* EMAIL */}

            <div className="info-card">
              <div className="info-icon-wrapper">
                <FaEnvelope />
              </div>

              <div className="info-text">
                <h3>Email Address</h3>

                <p>
                  studentsupport@svgu.ac.in
                  <br />
                  info@svgu.ac.in
                </p>
              </div>
            </div>

            {/* PHONE */}

            <div className="info-card">
              <div className="info-icon-wrapper">
                <FaPhoneAlt />
              </div>

              <div className="info-text">
                <h3>Phone Number</h3>

                <p>
                  079-26926568
                  <br />
                  For internship and placement related queries.
                </p>
              </div>
            </div>

            {/* OFFICE HOURS */}

            <div className="info-card">
              <div className="info-icon-wrapper">
                <FaClock />
              </div>

              <div className="info-text">
                <h3>College Hours</h3>

                <p>
                  Monday to Friday
                  <br />
                  9:00 AM - 4:00 PM
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
};

export default Contact;