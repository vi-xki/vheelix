import React from "react";
import type  { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

/* ------------------ Types ------------------ */
interface ProtectedRouteProps {
  children: ReactNode;
  adminOnly?: boolean;
}

interface AdminUser {
  role: string;
}

/* ------------------ Component ------------------ */

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  adminOnly = false,
}) => {
  const { user, loading } = useCart();

  const adminUser: AdminUser | null = JSON.parse(
    localStorage.getItem("adminUser") || "null"
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  if (adminOnly) {
    return adminUser?.role === "admin"
      ? children
      : <Navigate to="/admin/login" />;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
