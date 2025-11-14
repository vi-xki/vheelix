import { Link } from 'react-router-dom';
import '../styles/Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <header className="hero-section">
        <h1>Welcome to Vizon Garage</h1>
        <p>Expert repairs for two-wheelers and four-wheelers</p>
        <Link to="/services" className="cta-button">Book Service</Link>
      </header>

      <section className="services-preview">
        <h2>Our Services</h2>
        <div className="services-grid">
          <div className="service-card">
            <i className="fas fa-motorcycle service-icon"></i>
            <h3>Two Wheeler Services</h3>
            <p>Motorcycle and scooter repairs and maintenance</p>
          </div>
          <div className="service-card">
            <i className="fas fa-car service-icon"></i>
            <h3>Four Wheeler Services</h3>
            <p>Car repairs, maintenance, and diagnostics</p>
          </div>
        </div>
      </section>

      <section className="why-choose-us">
        <h2>Why Choose Us?</h2>
        <div className="features-grid">
          <div className="feature">
            <i className="fas fa-tools"></i>
            <h3>Expert Mechanics</h3>
            <p>Certified professionals with years of experience</p>
          </div>
          <div className="feature">
            <i className="fas fa-clock"></i>
            <h3>Quick Service</h3>
            <p>Fast and reliable repair services</p>
          </div>
          <div className="feature">
            <i className="fas fa-dollar-sign"></i>
            <h3>Best Prices</h3>
            <p>Competitive pricing with no hidden charges</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home; 