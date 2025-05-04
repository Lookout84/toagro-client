import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { fetchCategoryBySlug, fetchCategories } from '@store/slices/categoriesSlice';
import { fetchListings } from '@store/slices/listingsSlice';
import { MainLayout } from '@components/layout/MainLayout';
import { ListingFilters } from '@components/listings/ListingFilters';
import { ListingsList } from '@components/listings/ListingsList';
import { Pagination } from '@components/common/Pagination';
import { CategoryCard } from '@components/categories/CategoryCard';
import { Spinner } from '@components/common/Spinner';
import { Alert } from '@components/common/Alert';
import { ListingFilters as FilterType } from '@types/listing.types';

export const CategoryPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const { currentCategory, isLoading: categoryLoading, items: categories } = useAppSelector(state => state.categories);
  const { items: listings, isLoading: listingsLoading, meta } = useAppSelector(state => state.listings);

  const [filters, setFilters] = useState<FilterType>(() => ({
    page: parseInt(searchParams.get('page') || '1'),
    search: searchParams.get('search') || '',
    categoryId: undefined, // Will be set based on category
    minPrice: searchParams.get('minPrice') 
      ? parseInt(searchParams.get('minPrice')!) 
      : undefined,
    maxPrice: searchParams.get('maxPrice') 
      ? parseInt(searchParams.get('maxPrice')!) 
      : undefined,
    location: searchParams.get('location') || '',
    sortBy: (searchParams.get('sortBy') as FilterType['sortBy']) || 'createdAt',
    sortOrder: (searchParams.get('sortOrder') as FilterType['sortOrder']) || 'desc',
  }));

  useEffect(() => {
    if (slug) {
      dispatch(fetchCategoryBySlug(slug));
    }
    dispatch(fetchCategories({ active: true }));
  }, [dispatch, slug]);

  useEffect(() => {
    if (currentCategory) {
      const updatedFilters = { ...filters, categoryId: currentCategory.id };
      dispatch(fetchListings(updatedFilters));
      
      // Update URL params
      const params = new URLSearchParams();
      Object.entries(updatedFilters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          params.set(key, value.toString());
        }
      });
      setSearchParams(params);
    }
  }, [dispatch, currentCategory, filters]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleFilterChange = (newFilters: FilterType) => {
    setFilters({ ...newFilters, page: 1, categoryId: currentCategory?.id });
  };

  const handlePageChange = (page: number) => {
    setFilters(prev => ({ ...prev, page }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (categoryLoading) {
    return (
      <MainLayout>
        <div className="flex justify-center items-center h-64">
          <Spinner size="lg" />
        </div>
      </MainLayout>
    );
  }

  if (!currentCategory) {
    return (
      <MainLayout>
        <Alert variant="error" title="Помилка">
          Категорію не знайдено
        </Alert>
      </MainLayout>
    );
  }

  // Filter subcategories
  const subcategories = categories.filter(cat => cat.parentId === currentCategory.id);

  return (
    <MainLayout>
      <div className="py-8">
        {/* Category Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{currentCategory.name}</h1>
          {currentCategory.description && (
            <p className="text-gray-600">{currentCategory.description}</p>
          )}
        </div>

        {/* Subcategories */}
        {subcategories.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Підкатегорії</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {subcategories.map(category => (
                <CategoryCard key={category.id} category={category} />
              ))}
            </div>
          </div>
        )}

        {/* Filters */}
        <div className="mb-8">
          <ListingFilters
            categories={categories}
            onFilterChange={handleFilterChange}
            initialFilters={filters}
          />
        </div>

        {/* Listings */}
        <ListingsList
          listings={listings}
          isLoading={listingsLoading}
        />

        {meta && meta.totalPages > 1 && (
          <div className="mt-8">
            <Pagination
              currentPage={meta.page}
              totalPages={meta.totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </div>
    </MainLayout>
  );
};