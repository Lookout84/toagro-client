import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { fetchCategories } from '@store/slices/categoriesSlice';
import { MainLayout } from '@components/layout/MainLayout';
import { ListingForm } from '@components/listings/ListingForm';

export const CreateListingPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items: categories } = useAppSelector(state => state.categories);

  useEffect(() => {
    dispatch(fetchCategories({ active: true }));
  }, [dispatch]);

  return (
    <MainLayout>
      <div className="max-w-3xl mx-auto py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Створити оголошення</h1>
        <ListingForm categories={categories} />
      </div>
    </MainLayout>
  );
};