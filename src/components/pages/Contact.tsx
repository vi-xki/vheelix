import '../styles/Contact.css';

const Contact = () => {
  return (
    <div className="contact-container">
      <h1>Contact Us</h1>
      <div className="contact-content">
        <div className="contact-info">
          <div className="info-item">
            <i className="fas fa-map-marker-alt"></i>
            <h3>Address</h3>
            <p>123 Mechanic Street, City, State 12345</p>
          </div>
          <div className="info-item">
            <i className="fas fa-phone"></i>
            <h3>Phone</h3>
            <p>+1 234 567 8900</p>
          </div>
          <div className="info-item">
            <i className="fas fa-envelope"></i>
            <h3>Email</h3>
            <p>info@mechanicare.com</p>
          </div>
        </div>
        <form className="contact-form">
          <input type="text" placeholder="Name" required />
          <input type="email" placeholder="Email" required />
          <input type="text" placeholder="Subject" required />
          <textarea placeholder="Message" required></textarea>
          <button type="submit">Send Message</button>
        </form>
      </div>
    </div>
  );
};

export default Contact; 