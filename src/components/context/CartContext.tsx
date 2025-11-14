import React, { createContext, useContext, useState, useEffect } from 'react';
import type { FC, PropsWithChildren } from 'react';
import { useNavigate } from 'react-router-dom';

interface User {
  id: number;
  name: string;
  email: string;
  cart?: CartItem[];
  // add phone / orders if you store them
}

export interface Product {
  id: number;
  name: string;
  price: number;
  iconClass?: string;
  description?: string;
  category: string;
}

export interface CartItem extends Product {
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  updateUserCart: (newCart: CartItem[]) => void;
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  logout: () => void;
  loading: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: FC<PropsWithChildren<{}>> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null') as User | null;
      if (currentUser) {
        setUser(currentUser);
        const users = JSON.parse(localStorage.getItem('users') || '[]') as User[];
        const existingUser = users.find(u => u.email === currentUser.email);
        const userCart = existingUser?.cart || [];
        setCart(userCart as CartItem[]);
      }
    } catch (error) {
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
      const users = JSON.parse(localStorage.getItem('users') || '[]') as (User & { cart?: CartItem[] })[];
      if (!user) return;
      const userIndex = users.findIndex(u => u.email === user.email);
      if (userIndex >= 0) {
        users[userIndex].cart = newCart;
        localStorage.setItem('users', JSON.stringify(users));
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

    const safeProduct = {
      ...product,
      iconClass: product.iconClass,
    };

    const newCart = [...cart];
    const itemIndex = newCart.findIndex(item => item.id === safeProduct.id);

    if (itemIndex >= 0) {
      newCart[itemIndex].quantity += 1;
    } else {
      newCart.push({ ...safeProduct, quantity: 1 } as CartItem);
    }

    updateUserCart(newCart);
  };

  const removeFromCart = (productId: number) => {
    const newCart = cart.filter(item => item.id !== productId);
    updateUserCart(newCart);
  };

  const updateQuantity = (productId: number, quantity: number) => {
    const newCart = cart
      .map(item => (item.id === productId ? { ...item, quantity: Math.max(0, quantity) } : item))
      .filter(item => item.quantity > 0);
    updateUserCart(newCart);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        updateUserCart,
        user,
        setUser,
        logout,
        loading,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error('useCart must be used within CartProvider');
  }
  return ctx;
};
