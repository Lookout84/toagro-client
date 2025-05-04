import React from 'react';
import { ListingCard } from './ListingCard';
import { Listing } from '@types/listing.types';
import { Spinner } from '@components/common/Spinner';

interface ListingsListProps {
  listings: Listing[];
  isLoading?: boolean;
  error?: string | null;
}

export const ListingsList: React.FC<ListingsListProps> = ({
  listings,
  isLoading = false,
  error = null,
}) => {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Spinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (listings.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Оголошення не знайдено</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {listings.map((listing) => (
        <ListingCard key={listing.id} listing={listing} />
      ))}
    </div>
  );
};