import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@components/common/Card';
import { Category } from '@types/category.types';

interface CategoryCardProps {
  category: Category;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  const defaultIcon = (
    <div className="w-12 h-12 bg-primary-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
      <span className="text-primary-green text-xl font-bold">{category.name[0]}</span>
    </div>
  );

  return (
    <Link to={`/categories/${category.slug}`}>
      <Card hover className="text-center h-full">
        {category.image ? (
          <img
            src={category.image}
            alt={category.name}
            className="w-12 h-12 object-cover rounded-full mx-auto mb-4"
          />
        ) : (
          defaultIcon
        )}
        <h3 className="text-sm font-medium text-gray-900 mb-1 truncate">{category.name}</h3>
        {category._count?.listings && (
          <p className="text-xs text-gray-500">{category._count.listings} оголошень</p>
        )}
      </Card>
    </Link>
  );
};