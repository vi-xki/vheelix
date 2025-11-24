import React from 'react';
import { useLocation, Link, Navigate } from 'react-router-dom';
import { usePDF } from 'react-to-pdf';
import type { CartItem } from '../../context/CartContext';
import '../styles/OrderConfirmation.css';

interface Address {
  street: string;
  city: string;
  state: string;
  pincode: string;
  phone: string;
}

interface Order {
  id: number;
  items: CartItem[];
  total: number;
  date: string;
  paymentMethod: 'upi' | 'cod';
  status: 'Pending' | 'Completed';
  address: Address;
  paymentDetails: { upiId: string } | null;
}

interface LocationState {
  order: Order;
}

const OrderConfirmation: React.FC = () => {
  const location = useLocation();
  const state = location.state as LocationState | null;
  const order = state?.order;

  const { toPDF, targetRef } = usePDF({
    filename: `order-${order?.id ?? 'invoice'}.pdf`,
  });

  if (!order) {
    // Safe redirect if no order found
    return <Navigate to="/shop" replace />;
  }

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="confirmation-container">
      <div className="confirmation-box" ref={targetRef}>
        <div className="order-header">
          <img
            src="/images/logo.png"
            alt="Vizon Garage Logo"
            className="invoice-logo"
          />
          <div className="company-details">
            <h2>Vizon Garage</h2>
            <p>123 Mechanic Street, City</p>
            <p>Phone: +1 234 567 8900</p>
            <p>Email: info@vizongarageworkshop.com</p>
          </div>
        </div>

        <div className="invoice-details">
          <div className="invoice-row">
            <span>Invoice No:</span>
            <span>#{order.id}</span>
          </div>
          <div className="invoice-row">
            <span>Date:</span>
            <span>{formatDate(order.date)}</span>
          </div>
          <div className="invoice-row">
            <span>Payment Method:</span>
            <span>{order.paymentMethod.toUpperCase()}</span>
          </div>
        </div>

        <div className="order-details">
          <h3>Order Details</h3>
          <table className="order-table">
            <thead>
              <tr>
                <th>Item</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {order.items.map((item: CartItem) => (
                <tr key={item.id}>
                  <td>
                    <div className="item-info">
                      {item.iconClass && <i className={item.iconClass}></i>}
                      <span>{item.name}</span>
                    </div>
                  </td>
                  <td>{item.quantity}</td>
                  <td>₹{item.price?.toFixed(2)}</td>
                  <td>₹{((item.price ?? 0) * (item.quantity ?? 0)).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={3}>Total Amount</td>
                <td>₹{order.total.toFixed(2)}</td>
              </tr>
            </tfoot>
          </table>
        </div>

        <div className="thank-you-message">
          <p>Thank you for your purchase!</p>
          <p>For any queries, please contact our support team.</p>
        </div>
      </div>

      <div className="action-buttons">
        <button onClick={() => toPDF()} className="download-pdf">
          <i className="fas fa-download"></i> Download Invoice
        </button>
        <Link to="/shop" className="continue-shopping">
          Continue Shopping
        </Link>
        <Link to="/orders" className="view-orders">
          View Orders
        </Link>
      </div>
    </div>
  );
};

export default OrderConfirmation;
