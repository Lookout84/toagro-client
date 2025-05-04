import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { fetchListing } from '@store/slices/listingsSlice';
import { fetchCategories } from '@store/slices/categoriesSlice';
import { MainLayout } from '@components/layout/MainLayout';
import { ListingForm } from '@components/listings/ListingForm';
import { Spinner } from '@components/common/Spinner';
import { Alert } from '@components/common/Alert';

export const EditListingPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { currentListing, isLoading, error } = useAppSelector(state => state.listings);
  const { items: categories } = useAppSelector(state => state.categories);
  const { user } = useAppSelector(state => state.auth);

  useEffect(() => {
    if (id) {
      dispatch(fetchListing(parseInt(id)));
    }
    dispatch(fetchCategories({ active: true }));
  }, [dispatch, id]);

  useEffect(() => {
    // Redirect if user is not the owner
    if (currentListing && user?.id !== currentListing.userId) {
      navigate('/');
    }
  }, [currentListing, user, navigate]);

  if (isLoading) {
    return (
      <MainLayout>
        <div className="flex justify-center items-center h-64">
          <Spinner size="lg" />
        </div>
      </MainLayout>
    );
  }

  if (error || !currentListing) {
    return (
      <MainLayout>
        <Alert variant="error" title="Помилка">
          {error || 'Оголошення не знайдено'}
        </Alert>
      </MainLayout>
    );
  }

  const handleCancel = () => {
    navigate(`/listings/${id}`);
  };

  return (
    <MainLayout>
      <div className="max-w-3xl mx-auto py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Редагувати оголошення</h1>
        <ListingForm 
          listing={currentListing} 
          categories={categories}
          onCancel={handleCancel}
        />
      </div>
    </MainLayout>
  );
};