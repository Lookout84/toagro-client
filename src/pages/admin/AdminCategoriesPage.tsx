import React from 'react';
import { AdminLayout } from '@components/layout/AdminLayout';
import { AdminCategories } from '@components/admin/AdminCategories';
import { Category } from '@types/category.types';

export const AdminCategoriesPage: React.FC = () => {
  const handleAdd = (category: Omit<Category, 'id' | 'createdAt' | 'updatedAt'>) => {
    // TODO: Implement add functionality
    console.log('Add category:', category);
  };

  const handleEdit = (id: number, category: Partial<Category>) => {
    // TODO: Implement edit functionality
    console.log('Edit category:', id, category);
  };

  const handleDelete = (id: number) => {
    // TODO: Implement delete functionality
    console.log('Delete category:', id);
  };

  const handleToggleActive = (id: number, active: boolean) => {
    // TODO: Implement toggle active functionality
    console.log('Toggle active:', id, active);
  };

  return (
    <AdminLayout>
      <AdminCategories
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onToggleActive={handleToggleActive}
      />
    </AdminLayout>
  );
};