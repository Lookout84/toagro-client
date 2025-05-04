import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { fetchListing, deleteListing } from '@store/slices/listingsSlice';
import { MainLayout } from '@components/layout/MainLayout';
import { ListingDetails } from '@components/listings/ListingDetails';
import { Spinner } from '@components/common/Spinner';
import { Alert } from '@components/common/Alert';

export const ListingDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { currentListing, isLoading, error } = useAppSelector(state => state.listings);
  const { user } = useAppSelector(state => state.auth);

  useEffect(() => {
    if (id) {
      dispatch(fetchListing(parseInt(id)));
    }
  }, [dispatch, id]);

  const handleEdit = () => {
    if (currentListing) {
      navigate(`/listings/${currentListing.id}/edit`);
    }
  };

  const handleDelete = async () => {
    if (currentListing) {
      try {
        await dispatch(deleteListing(currentListing.id)).unwrap();
        navigate('/my-listings');
      } catch (error) {
        console.error('Failed to delete listing:', error);
      }
    }
  };

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

  return (
    <MainLayout>
      <ListingDetails
        listing={currentListing}
        onEdit={user?.id === currentListing.userId ? handleEdit : undefined}
        onDelete={user?.id === currentListing.userId ? handleDelete : undefined}
      />
    </MainLayout>
  );
};