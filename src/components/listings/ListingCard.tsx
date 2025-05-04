import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@components/common/Card';
import { Listing } from '../../types/listing.types';
import { formatCurrency, formatDate } from '@utils/formatters';
import { MapPinIcon, ClockIcon, EyeIcon } from '@heroicons/react/24/outline';

interface ListingCardProps {
  listing: Listing;
}

export const ListingCard: React.FC<ListingCardProps> = ({ listing }) => {
  const mainImage = listing.images?.[0] || '/assets/images/placeholder.jpg';

  return (
    <Card hover className="overflow-hidden">
      <Link to={`/listings/${listing.id}`}>
        <div className="aspect-w-16 aspect-h-9 mb-4">
          <img
            src={mainImage}
            alt={listing.title}
            className="w-full h-48 object-cover rounded-lg"
          />
        </div>
        
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-gray-900 truncate">
            {listing.title}
          </h3>
          
          <p className="text-xl font-bold text-primary-green">
            {formatCurrency(listing.price)}
          </p>
          
          <p className="text-gray-600 line-clamp-2">
            {listing.description}
          </p>
          
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <MapPinIcon className="h-4 w-4" />
            <span>{listing.location}</span>
          </div>
          
          <div className="flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <ClockIcon className="h-4 w-4" />
              <span>{formatDate(listing.createdAt)}</span>
            </div>
            <div className="flex items-center gap-1">
              <EyeIcon className="h-4 w-4" />
              <span>{listing.views}</span>
            </div>
          </div>
        </div>
      </Link>
    </Card>
  );
};