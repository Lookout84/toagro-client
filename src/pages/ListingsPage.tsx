import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { fetchListings } from '@store/slices/listingsSlice';
import { fetchCategories } from '@store/slices/categoriesSlice';
import { MainLayout } from '@components/layout/MainLayout';
import { ListingFilters } from '@components/listings/ListingFilters';
import { ListingsList } from '@components/listings/ListingsList';
import { Pagination } from '@components/common/Pagination';
import { ListingFilters as FilterType } from '@types/listing.types';

export const ListingsPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const { items: listings, isLoading, meta } = useAppSelector(state => state.listings);
  const { items: categories } = useAppSelector(state => state.categories);

  const [filters, setFilters] = useState<FilterType>(() => ({
    page: parseInt(searchParams.get('page') || '1'),
    search: searchParams.get('search') || '',
    categoryId: searchParams.get('categoryId') 
      ? parseInt(searchParams.get('categoryId')!) 
      : undefined,
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
    dispatch(fetchCategories({ active: true }));
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchListings(filters));
    
    // Update URL params
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        params.set(key, value.toString());
      }
    });
    setSearchParams(params);
  }, [dispatch, filters, setSearchParams]);

  const handleFilterChange = (newFilters: FilterType) => {
    setFilters({ ...newFilters, page: 1 });
  };

  const handlePageChange = (page: number) => {
    setFilters(prev => ({ ...prev, page }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <MainLayout>
      <div className="py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Оголошення</h1>
        
        <div className="mb-8">
          <ListingFilters
            categories={categories}
            onFilterChange={handleFilterChange}
            initialFilters={filters}
          />
        </div>

        <ListingsList
          listings={listings}
          isLoading={isLoading}
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