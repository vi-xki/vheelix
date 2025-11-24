import React, { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Auth.css';

interface AdminData {
  role: string;
  loginTime: string;
}

const AdminLogin: React.FC = () => {
  const navigate = useNavigate();
  const [pin, setPin] = useState<string>('');
  const [error, setError] = useState<string>('');
  const ADMIN_PIN = '9832';

  const handlePinChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length <= 4 && /^\d*$/.test(value)) {
      setPin(value);
      setError('');
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (pin === ADMIN_PIN) {
      const adminData: AdminData = {
        role: 'admin',
        loginTime: new Date().toISOString(),
      };

      localStorage.setItem('adminUser', JSON.stringify(adminData));
      setPin('');
      navigate('/admin/dashboard');
    } else {
      setError('Invalid PIN');
      setPin('');
    }
  };

  return (
    <div className="admin-container">
      <nav className="navbar">
        <div className="navbar-container">
          <div className="navbar-logo">
            <i className="fas fa-tools logo-icon"></i>
            <span>Vizon Garage Admin</span>
          </div>
        </div>
      </nav>

      <div className="auth-container">
        <div className="auth-box admin-login">
          <h2>Admin Access</h2>
          <div className="pin-icon">
            <i className="fas fa-lock"></i>
          </div>

          {error && <div className="error-message">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="password"
                placeholder="Enter 4-digit PIN"
                value={pin}
                onChange={handlePinChange}
                maxLength={4}
                pattern="\d*"
                inputMode="numeric"
                autoComplete="off"
                required
                className="pin-input"
              />
            </div>

            <div className="pin-dots">
              {[...Array(4)].map((_, index) => (
                <div 
                  key={index} 
                  className={`pin-dot ${index < pin.length ? 'filled' : ''}`}
                />
              ))}
            </div>

            <button 
              type="submit" 
              className="submit-button"
              disabled={pin.length !== 4}
            >
              Verify PIN
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
