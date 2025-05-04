import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { deleteListing } from '@store/slices/listingsSlice';
import { ListingCard } from '@components/listings/ListingCard';
import { Button } from '@components/common/Button';
import { Card } from '@components/common/Card';
import { Listing } from '@types/listing.types';
import { PencilIcon, TrashIcon, PlusIcon } from '@heroicons/react/24/outline';

interface UserListingsProps {
  listings: Listing[];
  isLoading?: boolean;
}

export const UserListings: React.FC<UserListingsProps> = ({ listings, isLoading }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleEdit = (listingId: number) => {
    navigate(`/listings/${listingId}/edit`);
  };

  const handleDelete = async (listingId: number) => {
    if (window.confirm('Ви впевнені, що хочете видалити це оголошення?')) {
      try {
        await dispatch(deleteListing(listingId)).unwrap();
      } catch (error) {
        console.error('Failed to delete listing:', error);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <Card key={i} className="animate-pulse h-64" />
        ))}
      </div>
    );
  }

  if (listings.length === 0) {
    return (
      <Card className="text-center py-12">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Ви ще не створили жодного оголошення
        </h3>
        <p className="text-gray-600 mb-6">
          Розпочніть продавати свої товари та послуги
        </p>
        <Button 
          onClick={() => navigate('/create-listing')}
          icon={<PlusIcon className="h-5 w-5" />}
        >
          Створити оголошення
        </Button>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {listings.map((listing) => (
        <div key={listing.id} className="relative">
          <ListingCard listing={listing} />
          <div className="absolute top-2 right-2 flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleEdit(listing.id)}
              icon={<PencilIcon className="h-4 w-4" />}
              className="bg-white/80 hover:bg-white"
            />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleDelete(listing.id)}
              icon={<TrashIcon className="h-4 w-4" />}
              className="bg-white/80 hover:bg-white text-red-600 hover:text-red-700"
            />
          </div>
        </div>
      ))}
    </div>
  );
};