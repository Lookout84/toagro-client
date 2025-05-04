import React from 'react';
import { AdminLayout } from '@components/layout/AdminLayout';
import { AdminPayments } from '@components/admin/AdminPayments';
import { Payment } from '../../types/payment.types';

export const AdminPaymentsPage: React.FC = () => {
  const handleRefund = (paymentId: number) => {
    // TODO: Implement refund functionality
    console.log('Refund payment:', paymentId);
  };

  const handleViewDetails = (payment: Payment) => {
    // TODO: Implement view details functionality
    console.log('View payment details:', payment);
  };

  return (
    <AdminLayout>
      <AdminPayments
        onRefund={handleRefund}
        onViewDetails={handleViewDetails}
      />
    </AdminLayout>
  );
};