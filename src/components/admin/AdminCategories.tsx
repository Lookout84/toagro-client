import React, { useState, useEffect } from 'react';
import { Card } from '@components/common/Card';
import { Button } from '@components/common/Button';
import { Input } from '@components/common/Input';
import { Modal } from '@components/common/Modal';
import { Dropdown } from '@components/common/Dropdown';
import { Category } from '../../types/category.types';
import { 
  PlusIcon, 
  PencilIcon, 
  TrashIcon, 
  TagIcon,
  CheckCircleIcon,
  XCircleIcon,
} from '@heroicons/react/24/outline';

interface AdminCategoriesProps {
  onAdd?: (category: Omit<Category, 'id' | 'createdAt' | 'updatedAt'>) => void;
  onEdit?: (id: number, category: Partial<Category>) => void;
  onDelete?: (id: number) => void;
  onToggleActive?: (id: number, active: boolean) => void;
}

export const AdminCategories: React.FC<AdminCategoriesProps> = ({
  onAdd,
  onEdit,
  onDelete,
  onToggleActive
}) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      // TODO: Call API to fetch categories
      // const response = await adminApi.getCategories();
      // setCategories(response.data);
      
      // Mock data for now
      const mockCategories: Category[] = [
        {
          id: 1,
          name: 'Пшениця',
          slug: 'wheat',
          description: 'Всі види пшениці',
          image: undefined,
          parentId: undefined,
          active: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          _count: { children: 2, listings: 120 }
        },
        {
          id: 2,
          name: 'Озима пшениця',
          slug: 'winter-wheat',
          description: 'Озима пшениця',
          image: undefined,
          parentId: 1,
          active: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          _count: { children: 0, listings: 85 }
        },
        {
          id: 3,
          name: 'Кукурудза',
          slug: 'corn',
          description: 'Всі види кукурудзи',
          image: undefined,
          parentId: undefined,
          active: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          _count: { children: 1, listings: 95 }
        },
      ];
      setCategories(mockCategories);
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddCategory = (newCategory: Omit<Category, 'id' | 'createdAt' | 'updatedAt'>) => {
    onAdd?.(newCategory);
    setShowAddModal(false);
    fetchCategories();
  };

  const handleEditCategory = (id: number, editedData: Partial<Category>) => {
    onEdit?.(id, editedData);
    setEditingCategory(null);
    fetchCategories();
  };

  const handleDeleteCategory = () => {
    if (categoryToDelete) {
      onDelete?.(categoryToDelete.id);
      setCategoryToDelete(null);
      setShowDeleteModal(false);
      fetchCategories();
    }
  };

  const CategoryForm: React.FC<{
    category?: Category | null;
    onSubmit: (data: Omit<Category, 'id' | 'createdAt' | 'updatedAt'>) => void;
    onClose: () => void;
  }> = ({ category, onSubmit, onClose }) => {
    const [formData, setFormData] = useState({
      name: category?.name || '',
      slug: category?.slug || '',
      description: category?.description || '',
      parentId: category?.parentId || undefined,
      image: category?.image || '',
      active: category?.active ?? true,
    });

    const generateSlug = (name: string) => {
      return name
        .toLowerCase()
        .replace(/[^a-z0-9а-я]/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '');
    };

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const name = e.target.value;
      setFormData(prev => ({
        ...prev,
        name,
        slug: prev.slug || generateSlug(name),
      }));
    };

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      onSubmit(formData);
    };

    const parentOptions = categories
      .filter(cat => cat.id !== category?.id && !cat.parentId)
      .map(cat => ({ value: cat.id.toString(), label: cat.name }));

    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Назва категорії"
          value={formData.name}
          onChange={handleNameChange}
          required
        />
        <Input
          label="Slug"
          value={formData.slug}
          onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
          required
        />
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Опис
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            className="w-full rounded-md border border-gray-300 p-2"
            rows={3}
          />
        </div>
        <Dropdown
          label="Батьківська категорія"
          options={[{ value: '', label: 'Немає' }, ...parentOptions]}
          value={formData.parentId?.toString() || ''}
          onChange={(value) => setFormData(prev => ({ ...prev, parentId: value ? parseInt(value) : undefined }))}
        />
        <Input
          label="URL зображення"
          value={formData.image}
          onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
        />
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="active"
            checked={formData.active}
            onChange={(e) => setFormData(prev => ({ ...prev, active: e.target.checked }))}
            className="h-4 w-4 rounded border-gray-300 text-primary-green focus:ring-primary-green"
          />
          <label htmlFor="active" className="text-sm font-medium text-gray-700">
            Активна категорія
          </label>
        </div>
        <div className="flex justify-end gap-4 pt-4">
          <Button variant="outline" onClick={onClose}>
            Скасувати
          </Button>
          <Button type="submit">
            {category ? 'Зберегти' : 'Створити'}
          </Button>
        </div>
      </form>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Категорії</h2>
        <Button 
          onClick={() => setShowAddModal(true)}
          icon={<PlusIcon className="h-5 w-5" />}
        >
          Додати категорію
        </Button>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full text-center">Loading categories...</div>
        ) : (
          categories.map((category) => (
          <Card key={category.id} className="hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                {category.image ? (
                  <img src={category.image} alt={category.name} className="h-10 w-10 rounded object-cover" />
                ) : (
                  <div className="h-10 w-10 rounded bg-primary-green/10 flex items-center justify-center">
                    <TagIcon className="h-6 w-6 text-primary-green" />
                  </div>
                )}
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{category.name}</h3>
                  <p className="text-sm text-gray-500">/{category.slug}</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onToggleActive?.(category.id, !category.active)}
                icon={category.active ? (
                  <CheckCircleIcon className="h-5 w-5 text-green-600" />
                ) : (
                  <XCircleIcon className="h-5 w-5 text-red-600" />
                )}
              />
            </div>
            <p className="text-sm text-gray-600 mb-4">{category.description}</p>
            <div className="flex items-center justify-between border-t pt-4">
              <div className="text-sm text-gray-500">
                {category._count?.listings || 0} оголошень
              </div>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setEditingCategory(category)}
                  icon={<PencilIcon className="h-5 w-5" />}
                >
                  Редагувати
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setCategoryToDelete(category);
                    setShowDeleteModal(true);
                  }}
                  icon={<TrashIcon className="h-5 w-5" />}
                >
                  Видалити
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Add Category Modal */}
      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Додати нову категорію"
      >
        <CategoryForm onSubmit={handleAddCategory} onClose={() => setShowAddModal(false)} />
      </Modal>

      {/* Edit Category Modal */}
      <Modal
        isOpen={!!editingCategory}
        onClose={() => setEditingCategory(null)}
        title="Редагувати категорію"
      >
        {editingCategory && (
          <CategoryForm
            category={editingCategory}
            onSubmit={(data) => handleEditCategory(editingCategory.id, data)}
            onClose={() => setEditingCategory(null)}
          />
        )}
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Підтвердити видалення"
      >
        <p className="text-gray-500 mb-6">
          Ви впевнені, що хочете видалити категорію "{categoryToDelete?.name}"?
          {categoryToDelete?._count?.listings ? ` Це може вплинути на ${categoryToDelete._count.listings} оголошень.` : ''}
        </p>
        <div className="flex justify-end gap-4">
          <Button variant="outline" onClick={() => setShowDeleteModal(false)}>
            Скасувати
          </Button>
          <Button onClick={handleDeleteCategory} className="bg-red-600 hover:bg-red-700">
            Видалити
          </Button>
        </div>
      </Modal>
    </div>
  );
};