import React from 'react';
import { AdminLayout } from '@components/layout/AdminLayout';
import { AdminListings } from '@components/admin/AdminListings';
import { Listing } from '../../types/listing.types';

export const AdminListingsPage: React.FC = () => {
  const handleApprove = (listingId: number) => {
    // TODO: Implement approve functionality
    console.log('Approve listing:', listingId);
  };

  const handleReject = (listingId: number) => {
    // TODO: Implement reject functionality
    console.log('Reject listing:', listingId);
  };

  const handleView = (listing: Listing) => {
    // TODO: Implement view functionality
    console.log('View listing:', listing);
  };

  const handleEdit = (listing: Listing) => {
    // TODO: Implement edit functionality
    console.log('Edit listing:', listing);
  };

  const handleDeactivate = (listingId: number) => {
    // TODO: Implement deactivate functionality
    console.log('Deactivate listing:', listingId);
  };

  return (
    <AdminLayout>
      <AdminListings
        onApprove={handleApprove}
        onReject={handleReject}
        onView={handleView}
        onEdit={handleEdit}
        onDeactivate={handleDeactivate}
      />
    </AdminLayout>
  );
};