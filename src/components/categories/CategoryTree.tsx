import React, { useState } from 'react';
import { CategoryTree as TreeType } from '../../types/category.types';
import { ChevronRightIcon, ChevronDownIcon, TagIcon } from '@heroicons/react/24/outline';

interface CategoryTreeProps {
  categories: TreeType[];
  onSelect?: (category: TreeType) => void;
  level?: number;
}

export const CategoryTree: React.FC<CategoryTreeProps> = ({ 
  categories, 
  onSelect,
  level = 0 
}) => {
  const [expandedIds, setExpandedIds] = useState<Set<number>>(new Set());

  const toggleExpand = (id: number) => {
    const newExpanded = new Set(expandedIds);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedIds(newExpanded);
  };

  return (
    <ul className={`${level > 0 ? 'ml-6' : ''}`}>
      {categories.map((category) => {
        const hasChildren = category.children && category.children.length > 0;
        const isExpanded = expandedIds.has(category.id);

        return (
          <li key={category.id} className="mb-2">
            <div className="flex items-center gap-2 py-1 px-2 rounded hover:bg-gray-50">
              {hasChildren && (
                <button
                  onClick={() => toggleExpand(category.id)}
                  className="p-1 hover:bg-gray-200 rounded"
                >
                  {isExpanded ? (
                    <ChevronDownIcon className="h-4 w-4 text-gray-600" />
                  ) : (
                    <ChevronRightIcon className="h-4 w-4 text-gray-600" />
                  )}
                </button>
              )}
              {!hasChildren && <div className="w-5" />}
              
              <TagIcon className="h-4 w-4 text-primary-green" />
              
              <button
                onClick={() => onSelect?.(category)}
                className="text-sm font-medium text-gray-900 hover:text-primary-green"
              >
                {category.name}
              </button>
              
              {category._count?.listings !== undefined && (
                <span className="text-xs text-gray-500 ml-auto">
                  ({category._count.listings})
                </span>
              )}
            </div>

            {hasChildren && isExpanded && (
              <CategoryTree
                categories={category.children}
                onSelect={onSelect}
                level={level + 1}
              />
            )}
          </li>
        );
      })}
    </ul>
  );
};