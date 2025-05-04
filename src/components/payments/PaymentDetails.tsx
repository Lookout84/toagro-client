import React from 'react';
import { Payment } from '@types/payment.types';
import { Card } from '@components/common/Card';
import { Badge } from '@components/common/Badge';
import { formatCurrency, formatDate } from '@utils/formatters';
import { CreditCardIcon, ReceiptRefundIcon, DocumentTextIcon } from '@heroicons/react/24/outline';

interface PaymentDetailsProps {
  payment: Payment;
  onRefund?: () => void;
  showRefundButton?: boolean;
}

export const PaymentDetails: React.FC<PaymentDetailsProps> = ({ 
  payment, 
  onRefund,
  showRefundButton = false 
}) => {
  const getStatusBadge = () => {
    const statusConfig = {
      PENDING: { variant: 'warning' as const, label: 'В очікуванні' },
      COMPLETED: { variant: 'success' as const, label: 'Завершено' },
      FAILED: { variant: 'error' as const, label: 'Невдало' },
      REFUNDED: { variant: 'info' as const, label: 'Повернуто' },
    };
    const config = statusConfig[payment.status];
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  const getPaymentMethodLabel = () => {
    const methods: Record<string, string> = {
      card: 'Картка',
      bank_transfer: 'Банківський переказ',
      cash: 'Готівка',
      paypal: 'PayPal',
    };
    return methods[payment.paymentMethod || ''] || payment.paymentMethod;
  };

  return (
    <Card>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <CreditCardIcon className="h-6 w-6 text-primary-green" />
          <h2 className="text-xl font-semibold text-gray-900">
            Деталі платежу #{payment.id}
          </h2>
        </div>
        {getStatusBadge()}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-500">ID транзакції</label>
            <p className="mt-1 text-gray-900 font-mono">{payment.transactionId}</p>
          </div>

          {payment.orderId && (
            <div>
              <label className="text-sm font-medium text-gray-500">ID замовлення</label>
              <p className="mt-1 text-gray-900 font-mono">{payment.orderId}</p>
            </div>
          )}

          <div>
            <label className="text-sm font-medium text-gray-500">Сума</label>
            <p className="mt-1 text-gray-900">
              {formatCurrency(payment.amount, payment.currency)}
            </p>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-500">Метод оплати</label>
            <p className="mt-1 text-gray-900">{getPaymentMethodLabel()}</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-500">Дата створення</label>
            <p className="mt-1 text-gray-900">{formatDate(payment.createdAt)}</p>
          </div>

          {payment.completedAt && (
            <div>
              <label className="text-sm font-medium text-gray-500">Дата завершення</label>
              <p className="mt-1 text-gray-900">{formatDate(payment.completedAt)}</p>
            </div>
          )}

          <div>
            <label className="text-sm font-medium text-gray-500">Користувач</label>
            <p className="mt-1 text-gray-900">ID: {payment.userId}</p>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-500">Статус</label>
            <p className="mt-1">{getStatusBadge()}</p>
          </div>
        </div>
      </div>

      {payment.status === 'COMPLETED' && showRefundButton && (
        <div className="mt-6 pt-6 border-t border-gray-200">
          <button
            onClick={onRefund}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-green"
          >
            <ReceiptRefundIcon className="h-5 w-5 mr-2 text-gray-500" />
            Повернути кошти
          </button>
        </div>
      )}

      {payment.status === 'COMPLETED' && (
        <div className="mt-6 pt-6 border-t border-gray-200">
          <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-green">
            <DocumentTextIcon className="h-5 w-5 mr-2 text-gray-500" />
            Завантажити квитанцію
          </button>
        </div>
      )}
    </Card>
  );
};