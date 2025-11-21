import type { FC } from "react";
import { useCart } from "../../context/CartContext";
import { Link, Navigate, useNavigate } from "react-router-dom";
import "../styles/Cart.css";
import type { User, CartItem,Product } from '../types/order';

export interface CartContextType {
  cart: CartItem[];
  addToCart: (p: Product) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, q: number) => void;
  user: { id: string } | null;
  loading: boolean;
}

const Cart: FC = () => {
  const { cart, removeFromCart, updateQuantity, user, loading } =
    useCart() as CartContextType;

  const navigate = useNavigate();

  // Redirect if not logged in
  if (!loading && !user) {
    return <Navigate to="/login" />;
  }

  // Show loading state
  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cart.length === 0) {
    return (
      <div className="cart-empty">
        <h2>Your cart is empty</h2>
        <Link to="/shop" className="continue-shopping">
          Continue Shopping
        </Link>
      </div>
    );
  }

  // typed handler
  const handleQuantityUpdate = (productId: number, newQuantity: number) => {
    if (newQuantity >= 1) {
      updateQuantity(productId, newQuantity);
    }
  };

  const handleCheckout = () => {
    navigate("/checkout");
  };

  return (
    <div className="cart-container">
      <h1>Shopping Cart</h1>

      <div className="cart-items">
        {cart.map((item) => (
          <div key={item.id} className="cart-item">
            <div className="item-image">
              <i className={item.iconClass}></i>
            </div>

            <div className="item-details">
              <h3>{item.name}</h3>
              <p>{item.description}</p>
              <div className="item-price">₹{item.price.toFixed(2)}</div>
            </div>

            <div className="item-quantity">
              <button
                onClick={() =>
                  handleQuantityUpdate(item.id, item.quantity - 1)
                }
                disabled={item.quantity <= 1}
              >
                -
              </button>

              <span>{item.quantity}</span>

              <button
                onClick={() =>
                  handleQuantityUpdate(item.id, item.quantity + 1)
                }
              >
                +
              </button>
            </div>

            <div className="item-total">
              ₹{(item.price * item.quantity).toFixed(2)}
            </div>

            <button
              className="remove-item"
              onClick={() => removeFromCart(item.id)}
              aria-label={`Remove ${item.name} from cart`}
            >
              <i className="fas fa-trash"></i>
            </button>
          </div>
        ))}
      </div>

      <div className="cart-summary">
        <div className="total">
          <span>Total:</span>
          <span>₹{total.toFixed(2)}</span>
        </div>

        <button className="checkout-btn" onClick={handleCheckout}>
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
