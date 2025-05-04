import React from 'react';
import { AdminLayout } from '@components/layout/AdminLayout';
import { UsersList } from '@components/admin/UsersList';
import { User } from '@types/auth.types';

export const AdminUsersPage: React.FC = () => {
  const handleEdit = (user: User) => {
    // TODO: Implement edit functionality
    console.log('Edit user:', user);
  };

  const handleDelete = (userId: number) => {
    // TODO: Implement delete functionality
    console.log('Delete user:', userId);
  };

  const handleBanToggle = (userId: number, isBanned: boolean) => {
    // TODO: Implement ban/unban functionality
    console.log('Toggle ban for user:', userId, isBanned);
  };

  return (
    <AdminLayout>
      <UsersList
        onEdit={handleEdit}
        onDelete={handleDelete}
        onBanToggle={handleBanToggle}
      />
    </AdminLayout>
  );
};