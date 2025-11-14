// src/pages/auth/Login.tsx
import { useState, useEffect } from 'react';
import type { ChangeEvent, FormEvent, FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import '../styles/Auth.css';

interface User {
  id: number;
  name: string;
  email: string;
  // add other fields if needed (phone, cart, orders...)
}

interface LoginForm {
  email: string;
  password: string;
}

const Login: FC = () => {
  const navigate = useNavigate();

  // useCart has unknown types here — narrow it with a local cast
  const { user, setUser } = useCart() as {
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
  };

  const [formData, setFormData] = useState<LoginForm>({
    email: '',
    password: '',
  });

  const [error, setError] = useState<string>('');

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate('/shop');
    }
  }, [user, navigate]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    setError('');

    try {
      const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');

      const found = users.find(
        (u: any) => u.email === formData.email && u.password === formData.password
      );

      if (found) {
        const userData: User = {
          id: found.id,
          name: found.name,
          email: found.email,
        };

        localStorage.setItem('currentUser', JSON.stringify(userData));
        setUser(userData);
        navigate('/shop');
      } else {
        setError('Invalid email or password');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      // keep the console.log for debugging
      // eslint-disable-next-line no-console
      console.error('Login error:', err);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Login to Vizon Garage</h2>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit}>
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
              name="password"
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </div>
          <button type="submit" className="submit-button">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
