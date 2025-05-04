import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '@store/hooks';

export const AdminRoute: React.FC = () => {
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (user?.role !== 'ADMIN') {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};