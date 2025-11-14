import { Link } from 'react-router-dom';
import './styles/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>Vizon Garage</h3>
          <p>Professional two-wheeler and four-wheeler repair services.</p>
          <div className="social-links">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-facebook"></i>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-twitter"></i>
              </a>
            </div>
        </div>

        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/services">Services</Link></li>
            <li><Link to="/booking">Book Appointment</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Services</h4>
          <ul>
            <li>Two Wheeler Repair</li>
            <li>Four Wheeler Repair</li>
            <li>Regular Maintenance</li>
            <li>Emergency Services</li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Contact Info</h4>
          <ul className="contact-info">
            <li><i className="fas fa-map-marker-alt"></i> 123 Mechanic Street, City</li>
            <li><i className="fas fa-phone"></i> +1 234 567 8900</li>
            <li><i className="fas fa-envelope"></i> info@mechanicare.com</li>
            <li><i className="fas fa-clock"></i> Mon-Sat: 8:00 AM - 6:00 PM</li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2024 Vizon Garage. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer; 