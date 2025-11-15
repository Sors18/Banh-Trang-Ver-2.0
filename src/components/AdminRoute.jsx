// src/components/AdminRoute.jsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function AdminRoute() {
  const { user } = useAuth();

  // Nếu user tồn tại VÀ user.isAdmin là true (hoặc 1), cho phép truy cập
  if (user && user.isAdmin) {
    return <Outlet />; // Hiển thị các trang con (Admin)
  }

  // Nếu không, đá về trang chủ
  return <Navigate to="/" replace />;
}

export default AdminRoute;