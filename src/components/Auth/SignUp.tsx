import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Auth.css";

interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  phone: string;
  cart: any[];
  orders: any[];
}

interface FormData {
  name: string;
  email: string;
  password: string;
  phone: string;
}

const SignUp: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
    phone: "",
  });

  const [error, setError] = useState<string>("");

  // Handle Input Change
  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement>
  ): void => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    const users: User[] = JSON.parse(localStorage.getItem("users") || "[]");

    if (users.some((user) => user.email === formData.email)) {
      setError("Email already exists");
      return;
    }

    const newUser: User = {
      ...formData,
      id: Date.now(),
      cart: [],
      orders: [],
    };

    users.push(newUser);

    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("currentUser", JSON.stringify(newUser));

    navigate("/shop");
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Sign Up for Vizon Garage</h2>
        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              name="name"
              type="text"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <input
              name="email"
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <input
              name="phone"
              type="tel"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <input
              name="password"
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </div>

          <button type="submit" className="submit-button">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
