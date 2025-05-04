import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { fetchUserPayments } from '@store/slices/paymentsSlice';
import { MainLayout } from '@components/layout/MainLayout';
import { Card } from '@components/common/Card';
import { Button } from '@components/common/Button';
import { Badge } from '@components/common/Badge';
import { Spinner } from '@components/common/Spinner';
import { formatCurrency, formatDate } from '@utils/formatters';
import { Payment } from '@types/payment.types';
import { CreditCardIcon, EyeIcon, CloudArrowDownIcon } from '@heroicons/react/24/outline';

export const PaymentsPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items: payments, isLoading, error } = useAppSelector(state => state.payments);
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed' | 'failed'>('all');

  useEffect(() => {
    dispatch(fetchUserPayments());
  }, [dispatch]);

  const getStatusBadge = (status: Payment['status']) => {
    const statusConfig: Record<Payment['status'], { variant: 'success' | 'warning' | 'error' | 'info', label: string }> = {
      PENDING: { variant: 'warning', label: 'В очікуванні' },
      COMPLETED: { variant: 'success', label: 'Завершений' },
      FAILED: { variant: 'error', label: 'Невдалий' },
      REFUNDED: { variant: 'info', label: 'Повернутий' },
    };
    const config = statusConfig[status];
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  const filteredPayments = payments.filter(payment => {
    if (filter === 'all') return true;
    return payment.status === filter.toUpperCase();
  });

  const totalPaid = payments
    .filter(p => p.status === 'COMPLETED')
    .reduce((sum, payment) => sum + payment.amount, 0);

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Платежі</h1>
          <p className="mt-2 text-sm text-gray-600">Історія ваших платежів та транзакцій</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          <Card>
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-lg">
                <CreditCardIcon className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Всього оплачено</p>
                <p className="text-lg font-bold text-gray-900">{formatCurrency(totalPaid)}</p>
              </div>
            </div>
          </Card>
          <Card>
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-lg">
                <CreditCardIcon className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Всього транзакцій</p>
                <p className="text-lg font-bold text-gray-900">{payments.length}</p>
              </div>
            </div>
          </Card>
          <Card>
            <div className="flex items-center">
              <div className="p-3 bg-yellow-100 rounded-lg">
                <CreditCardIcon className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">В очікуванні</p>
                <p className="text-lg font-bold text-gray-900">
                  {payments.filter(p => p.status === 'PENDING').length}
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Filters */}
        <div className="mb-6">
          <div className="flex gap-2">
            {['all', 'pending', 'completed', 'failed'].map((status) => (
              <Button
                key={status}
                variant={filter === status ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setFilter(status as any)}
              >
                {status === 'all' && 'Всі'}
                {status === 'pending' && 'В очікуванні'}
                {status === 'completed' && 'Завершені'}
                {status === 'failed' && 'Невдалі'}
              </Button>
            ))}
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Spinner size="lg" />
          </div>
        ) : error ? (
          <Card className="text-center py-12">
            <p className="text-red-500">{error}</p>
          </Card>
        ) : filteredPayments.length > 0 ? (
          <Card>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ID транзакції
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Сума
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Статус
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Дата
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Дії
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredPayments.map((payment) => (
                    <tr key={payment.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {payment.transactionId}
                        </div>
                        {payment.orderId && (
                          <div className="text-sm text-gray-500">
                            Замовлення: {payment.orderId}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {formatCurrency(payment.amount, payment.currency)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getStatusBadge(payment.status)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {formatDate(payment.createdAt)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex gap-2">
                          <Link to={`/payments/${payment.transactionId}`}>
                            <Button
                              variant="ghost"
                              size="sm"
                              icon={<EyeIcon className="h-5 w-5" />}
                            >
                              Деталі
                            </Button>
                          </Link>
                          {payment.status === 'COMPLETED' && (
                            <Button
                              variant="ghost"
                              size="sm"
                              icon={<CloudArrowDownIcon className="h-5 w-5" />}
                            >
                              Квитанція
                            </Button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        ) : (
          <Card className="text-center py-12">
            <CreditCardIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Поки що немає платежів
            </h3>
            <p className="text-gray-500">
              Ваша історія платежів з'явиться тут після першої транзакції
            </p>
          </Card>
        )}
      </div>
    </MainLayout>
  );
};