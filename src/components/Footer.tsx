import { Link } from 'react-router-dom';
import './styles/Footer.css';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import AccessTimeIcon from '@mui/icons-material/AccessTime';


const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>Vheelix Garage</h3>
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
          <ul className="footer-contact-info">
            <li><LocationOnIcon /> 123 Mechanic Street, City</li>
            <li><PhoneIcon /> +1 234 567 8900</li>
            <li><EmailIcon /> info@mechanicare.com</li>
            <li><AccessTimeIcon /> Mon-Sat: 8:00 AM - 6:00 PM</li>
          </ul>

        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2025 Vheelix Garage. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer; 