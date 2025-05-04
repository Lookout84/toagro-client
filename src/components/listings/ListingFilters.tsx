import React, { useState, useEffect } from 'react';
import { Input } from '@components/common/Input';
import { Button } from '@components/common/Button';
import { Dropdown } from '@components/common/Dropdown';
import { Category } from '../../types/category.types';
import { ListingFilters as FilterType } from '../../types/listing.types';
import { MagnifyingGlassIcon, FunnelIcon } from '@heroicons/react/24/outline';

interface ListingFiltersProps {
  categories: Category[];
  onFilterChange: (filters: FilterType) => void;
  initialFilters?: FilterType;
}

export const ListingFilters: React.FC<ListingFiltersProps> = ({
  categories,
  onFilterChange,
  initialFilters = {},
}) => {
  const [filters, setFilters] = useState<FilterType>(initialFilters);
  const [showAdvanced, setShowAdvanced] = useState(false);

  useEffect(() => {
    setFilters(initialFilters);
  }, [initialFilters]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleCategoryChange = (categoryId: number | undefined) => {
    setFilters(prev => ({ ...prev, categoryId }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFilterChange(filters);
  };

  const handleReset = () => {
    setFilters({});
    onFilterChange({});
  };

  const sortOptions = [
    { value: 'createdAt:desc', label: 'Найновіші' },
    { value: 'createdAt:asc', label: 'Найстаріші' },
    { value: 'price:asc', label: 'Дешевші спочатку' },
    { value: 'price:desc', label: 'Дорожчі спочатку' },
    { value: 'views:desc', label: 'Популярні' },
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex gap-4">
        <div className="flex-1">
          <Input
            name="search"
            value={filters.search || ''}
            onChange={handleInputChange}
            placeholder="Пошук оголошень..."
            icon={<MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />}
          />
        </div>
        <Button type="submit" variant="primary">
          Пошук
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => setShowAdvanced(!showAdvanced)}
          icon={<FunnelIcon className="h-5 w-5" />}
        >
          Фільтри
        </Button>
      </div>

      {showAdvanced && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg">
          <Dropdown
            options={[
              { value: '', label: 'Всі категорії' },
              ...categories.map(cat => ({ value: cat.id.toString(), label: cat.name })),
            ]}
            value={filters.categoryId?.toString() || ''}
            onChange={(value) => handleCategoryChange(value ? parseInt(value) : undefined)}
            placeholder="Категорія"
          />
          
          <Input
            name="minPrice"
            type="number"
            value={filters.minPrice || ''}
            onChange={handleInputChange}
            placeholder="Мін. ціна"
          />
          
          <Input
            name="maxPrice"
            type="number"
            value={filters.maxPrice || ''}
            onChange={handleInputChange}
            placeholder="Макс. ціна"
          />
          
          <Input
            name="location"
            value={filters.location || ''}
            onChange={handleInputChange}
            placeholder="Локація"
          />
          
          <div className="col-span-full flex gap-4">
            <Dropdown
              options={sortOptions}
              value={`${filters.sortBy || 'createdAt'}:${filters.sortOrder || 'desc'}`}
              onChange={(value) => {
                const [sortBy, sortOrder] = value.split(':');
                setFilters(prev => ({ ...prev, sortBy: sortBy as any, sortOrder: sortOrder as any }));
              }}
              placeholder="Сортування"
            />
            
            <Button type="button" variant="outline" onClick={handleReset}>
              Скинути фільтри
            </Button>
          </div>
        </div>
      )}
    </form>
  );
};