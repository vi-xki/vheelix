import '../styles/About.css';

const About = () => {
  return (
    <div className="about-container">
      <h1>About Us</h1>
      <div className="about-content">
        <div className="about-text">
          <p>Welcome to MechaniCare, your trusted partner in vehicle maintenance and repair. With years of experience in both two-wheeler and four-wheeler services, we pride ourselves on delivering quality workmanship and exceptional customer service.</p>
          <p>Our team of certified mechanics uses the latest tools and technology to ensure your vehicle receives the best care possible.</p>
        </div>
        <div className="about-features">
          <div className="feature">
            <i className="fas fa-tools"></i>
            <h3>Expert Mechanics</h3>
            <p>Skilled professionals with years of experience</p>
          </div>
          <div className="feature">
            <i className="fas fa-check-circle"></i>
            <h3>Quality Service</h3>
            <p>Guaranteed satisfaction with our work</p>
          </div>
          <div className="feature">
            <i className="fas fa-clock"></i>
            <h3>Quick Turnaround</h3>
            <p>Efficient service with minimal wait time</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About; 