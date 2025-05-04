import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@components/common/Card';
import { Category } from '../../types/category.types';
import { TagIcon } from '@heroicons/react/24/outline';

interface CategoryListProps {
  categories: Category[];
  className?: string;
  onCategoryClick?: (category: Category) => void;
}

export const CategoryList: React.FC<CategoryListProps> = ({ 
  categories, 
  className = '',
  onCategoryClick 
}) => {
  const navigate = useNavigate();

  const handleCategoryClick = (category: Category) => {
    if (onCategoryClick) {
      onCategoryClick(category);
    } else {
      navigate(`/categories/${category.slug}`);
    }
  };

  return (
    <div className={`space-y-2 ${className}`}>
      {categories.map((category) => (
        <Card 
          key={category.id} 
          className="cursor-pointer hover:shadow-md transition-shadow"
          onClick={() => handleCategoryClick(category)}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {category.image ? (
                <img 
                  src={category.image} 
                  alt={category.name} 
                  className="h-8 w-8 rounded object-cover"
                />
              ) : (
                <div className="h-8 w-8 rounded bg-primary-green/10 flex items-center justify-center">
                  <TagIcon className="h-5 w-5 text-primary-green" />
                </div>
              )}
              <div>
                <h3 className="font-medium text-gray-900">{category.name}</h3>
                {category.description && (
                  <p className="text-sm text-gray-500 truncate">{category.description}</p>
                )}
              </div>
            </div>
            {category._count?.listings !== undefined && (
              <span className="text-sm text-gray-500">
                {category._count.listings} оголошень
              </span>
            )}
          </div>
        </Card>
      ))}
    </div>
  );
};