import React from 'react';
import { Link } from 'react-router-dom';
import { Payment } from '@types/payment.types';
import { Card } from '@components/common/Card';
import { Badge } from '@components/common/Badge';
import { formatCurrency, formatDate } from '@utils/formatters';
import { EyeIcon, CreditCardIcon, BanknotesIcon, ReceiptRefundIcon } from '@heroicons/react/24/outline';

interface PaymentsListProps {
  payments: Payment[];
  isLoading?: boolean;
  error?: string | null;
  onRefund?: (paymentId: number) => void;
}

export const PaymentsList: React.FC<PaymentsListProps> = ({
  payments,
  isLoading = false,
  error = null,
  onRefund
}) => {
  const getStatusBadge = (status: Payment['status']) => {
    const statusConfig = {
      PENDING: { variant: 'warning' as const, label: 'В очікуванні' },
      COMPLETED: { variant: 'success' as const, label: 'Завершено' },
      FAILED: { variant: 'error' as const, label: 'Невдало' },
      REFUNDED: { variant: 'info' as const, label: 'Повернуто' },
    };
    const config = statusConfig[status];
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  const getPaymentIcon = (paymentMethod?: string) => {
    switch (paymentMethod) {
      case 'card':
        return <CreditCardIcon className="h-5 w-5 text-primary-green" />;
      case 'bank_transfer':
        return <BanknotesIcon className="h-5 w-5 text-primary-green" />;
      default:
        return <CreditCardIcon className="h-5 w-5 text-gray-400" />;
    }
  };

  if (isLoading) {
    return (
      <div className="animate-pulse space-y-4">
        {[...Array(5)].map((_, i) => (
          <Card key={i} className="h-24" />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <Card className="text-center py-8">
        <p className="text-red-500">{error}</p>
      </Card>
    );
  }

  if (payments.length === 0) {
    return (
      <Card className="text-center py-8">
        <CreditCardIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-500">Платежів поки немає</p>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {payments.map((payment) => (
        <Card key={payment.id}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-gray-50 rounded-full">
                {getPaymentIcon(payment.paymentMethod)}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-medium text-gray-900">
                    {formatCurrency(payment.amount, payment.currency)}
                  </span>
                  {getStatusBadge(payment.status)}
                </div>
                <p className="text-sm text-gray-500">
                  ID: {payment.transactionId} • {formatDate(payment.createdAt)}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              {payment.status === 'COMPLETED' && onRefund && (
                <button
                  onClick={() => onRefund(payment.id)}
                  className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"
                >
                  <ReceiptRefundIcon className="h-5 w-5" />
                </button>
              )}
              <Link 
                to={`/payments/${payment.transactionId}`}
                className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"
              >
                <EyeIcon className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};