import { useState } from 'react';
import '../styles/Booking.css';

const Booking = () => {
  const [bookingData, setBookingData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    vehicleType: '',
    service: '',
  });

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // Add booking logic here
    console.log(bookingData);
  };

  return (
    <div className="booking-container">
      <h1>Book an Appointment</h1>
      <form onSubmit={handleSubmit} className="booking-form">
        <div className="form-group">
          <input
            type="text"
            placeholder="Full Name"
            value={bookingData.name}
            onChange={(e) => setBookingData({...bookingData, name: e.target.value})}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email"
            value={bookingData.email}
            onChange={(e) => setBookingData({...bookingData, email: e.target.value})}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="tel"
            placeholder="Phone Number"
            value={bookingData.phone}
            onChange={(e) => setBookingData({...bookingData, phone: e.target.value})}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="date"
            value={bookingData.date}
            onChange={(e) => setBookingData({...bookingData, date: e.target.value})}
            required
          />
        </div>
        <div className="form-group">
          <select
            value={bookingData.vehicleType}
            onChange={(e) => setBookingData({...bookingData, vehicleType: e.target.value})}
            required
          >
            <option value="">Select Vehicle Type</option>
            <option value="two-wheeler">Two Wheeler</option>
            <option value="four-wheeler">Four Wheeler</option>
          </select>
        </div>
        <button type="submit" className="submit-button">Book Appointment</button>
      </form>
    </div>
  );
};

export default Booking; 