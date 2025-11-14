import '../styles/Services.css';

const Services = () => {
  return (
    <div className="services-container">
      <h1>Our Services</h1>
      <div className="services-grid">
        <div className="service-item">
          <i className="fas fa-motorcycle"></i>
          <h3>Two Wheeler Services</h3>
          <ul>
            <li>Regular Maintenance</li>
            <li>Engine Repair</li>
            <li>Brake Service</li>
            <li>Tire Change</li>
          </ul>
        </div>
        <div className="service-item">
          <i className="fas fa-car"></i>
          <h3>Four Wheeler Services</h3>
          <ul>
            <li>Full Service</li>
            <li>Engine Diagnostics</li>
            <li>AC Service</li>
            <li>Wheel Alignment</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Services; 