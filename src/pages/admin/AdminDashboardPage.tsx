import React from 'react';
import { AdminLayout } from '@components/layout/AdminLayout';
import { Dashboard } from '@components/admin/Dashboard';

export const AdminDashboardPage: React.FC = () => {
  return (
    <AdminLayout>
      <Dashboard />
    </AdminLayout>
  );
};