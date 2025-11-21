// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './components/pages/Home';
import Services from './components/pages/Services';
import Booking from './components/pages/Booking';
import About from './components/pages/About';
import Contact from './components/pages/Contact';
import SignUp from './components/Auth/SignUp';
import Login from './components/Auth/Login';
import Shop from './components/pages/Shop';
import Cart from './components/pages/Cart';
// import Checkout from './pages/Checkout';
// import OrderConfirmation from './pages/OrderConfirmation';
// import './styles/App.css';
import { CartProvider } from './context/CartContext';
import ProtectedRoute from './components/ProtectedRoute';
// import AdminLogin from './components/Auth/AdminLogin';
// import AdminDashboard from './pages/admin/Dashboard';

const App: React.FC = () => {
  return (
    <Router>
      <CartProvider>
        <div className="app">
          <Navbar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/services" element={<Services />} />
              <Route path="/booking" element={<Booking />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/login" element={<Login />} />

              <Route
                path="/shop"
                element={
                  <ProtectedRoute>
                    <Shop />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/cart"
                element={
                  <ProtectedRoute>
                    <Cart />
                  </ProtectedRoute>
                }
              />
{/* 
              <Route
                path="/checkout"
                element={
                  <ProtectedRoute>
                    <Checkout />
                  </ProtectedRoute>
                }
              /> */}

              {/* <Route
                path="/order-confirmation"
                element={
                  <ProtectedRoute>
                    <OrderConfirmation />
                  </ProtectedRoute>
                }
              /> */}

              {/* <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin" element={<AdminLogin />} /> */}

              {/* <Route
                path="/admin/dashboard"
                element={
                  <ProtectedRoute adminOnly>
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              /> */}

              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </CartProvider>
    </Router>
  );
};

export default App;
