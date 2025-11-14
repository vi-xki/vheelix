// src/context/CartContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

export interface Product {
  id: string | number;
  title?: string;
  price?: number;
  description?: string;
  // optional fields you used
  image?: string | null;
  iconClass?: string;
  [key: string]: any; // keep flexible for extra props
}

export interface CartItem extends Product {
  quantity: number;
}

export interface User {
  name?: string;
  email: string;
  password?: string;
  cart?: CartItem[];
  [key: string]: any;
}

interface CartContextType {
  cart: CartItem[];
  user: User | null;
  loading: boolean;
  setUser: (u: User | null) => void;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string | number) => void;
  updateQuantity: (productId: string | number, quantity: number) => void;
  updateUserCart: (newCart: CartItem[]) => void;
  logout: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null') as User | null;
      if (currentUser) {
        setUser(currentUser);
        const users = (JSON.parse(localStorage.getItem('users') || '[]') as User[]) || [];
        const userCart = users.find(u => u.email === currentUser.email)?.cart || [];
        setCart(userCart);
      }
    } catch (error) {
      // keep the error handling but do not crash
      // eslint-disable-next-line no-console
      console.error('Error loading user data:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = () => {
    localStorage.removeItem('currentUser');
    setUser(null);
    setCart([]);
    navigate('/');
  };

  const updateUserCart = (newCart: CartItem[]) => {
    try {
      const users = (JSON.parse(localStorage.getItem('users') || '[]') as User[]) || [];
      if (!user) {
        // if no logged-in user, just update local state
        setCart(newCart);
        return;
      }

      const userIndex = users.findIndex(u => u.email === user.email);

      if (userIndex >= 0) {
        users[userIndex] = { ...users[userIndex], cart: newCart };
        localStorage.setItem('users', JSON.stringify(users));
        setCart(newCart);
      } else {
        // if user not found in users list, still set cart locally
        setCart(newCart);
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error updating cart:', error);
    }
  };

  const addToCart = (product: Product) => {
    if (!user) {
      alert('Please login to add items to cart');
      return;
    }

    const safeProduct: Product = {
      ...product,
      image: undefined, // you intentionally removed image earlier
      iconClass: product.iconClass,
    };

    const newCart = [...cart];
    const itemIndex = newCart.findIndex(item => item.id === safeProduct.id);

    if (itemIndex >= 0) {
      newCart[itemIndex] = {
        ...newCart[itemIndex],
        quantity: newCart[itemIndex].quantity + 1,
      };
    } else {
      newCart.push({ ...(safeProduct as Product), quantity: 1 } as CartItem);
    }

    updateUserCart(newCart);
  };

  const removeFromCart = (productId: string | number) => {
    const newCart = cart.filter(item => item.id !== productId);
    updateUserCart(newCart);
  };

  const updateQuantity = (productId: string | number, quantity: number) => {
    const newCart = cart
      .map(item =>
        item.id === productId ? { ...item, quantity: Math.max(0, Math.floor(quantity)) } : item
      )
      .filter(item => item.quantity > 0);

    updateUserCart(newCart);
  };

  const value: CartContextType = {
    cart,
    user,
    loading,
    setUser,
    addToCart,
    removeFromCart,
    updateQuantity,
    updateUserCart,
    logout,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = (): CartContextType => {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return ctx;
};
