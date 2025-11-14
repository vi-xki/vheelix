import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './styles/Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { user, cart, logout } = useCart();
  const adminUser = JSON.parse(localStorage.getItem('adminUser') || 'null');

  const handleLogout = () => {
    if (adminUser) {
      localStorage.removeItem('adminUser');
      window.location.href = '/admin/login';
    } else {
      logout();
    }
  };

  // If admin is logged in, show minimal header
  if (adminUser?.role === 'admin') {
    return (
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/admin/dashboard" className="navbar-logo">
            <i className="fas fa-tools logo-icon"></i>
            <span>Vizon Garage Admin</span>
          </Link>
          <button onClick={handleLogout} className="admin-logout-btn">
            <i className="fas fa-sign-out-alt"></i> Logout
          </button>
        </div>
      </nav>
    );
  }

  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  // Public navigation items (shown when not logged in)
  const publicNavItems = [
    { path: '/', label: 'Home' },
    { path: '/services', label: 'Services' },
    { path: '/booking', label: 'Book Now' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' },
  ];

  // Private navigation items (shown when logged in)
  const privateNavItems = [
    { path: '/', label: 'Home' },
    { path: '/shop', label: 'Shop' },
  ];

  const navItems = user ? privateNavItems : publicNavItems;

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <i className="fas fa-tools logo-icon"></i>
          <span>Vizon Garage</span>
        </Link>

        <div className="menu-icon" onClick={() => setIsOpen(!isOpen)}>
          <i className={isOpen ? 'fas fa-times' : 'fas fa-bars'} />
        </div>

        <ul className={isOpen ? 'nav-menu active' : 'nav-menu'}>
          {navItems.map((item) => (
            <li key={item.path} className="nav-item">
              <Link
                to={item.path}
                className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            </li>
          ))}
          
          <li className="nav-item auth-buttons">
            {user ? (
              <>
                <Link to="/cart" className="cart-btn">
                  <i className="fas fa-shopping-cart"></i>
                  {cartItemCount > 0 && <span className="cart-count">{cartItemCount}</span>}
                </Link>
                <div className="user-menu">
                  <span className="user-name">Hi, {user.name}</span>
                  <Link to="/orders" className="nav-link">My Orders</Link>
                  <button onClick={handleLogout} className="logout-btn">Logout</button>
                </div>
              </>
            ) : (
              <>
                <Link to="/login" className="login-btn" onClick={() => setIsOpen(false)}>
                  Login
                </Link>
                <Link to="/signup" className="signup-btn" onClick={() => setIsOpen(false)}>
                  Sign Up
                </Link>
              </>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar; 