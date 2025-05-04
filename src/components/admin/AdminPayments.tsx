import React, { useState, useEffect } from 'react';
import { Card } from '@components/common/Card';
import { Button } from '@components/common/Button';
import { Input } from '@components/common/Input';
import { Badge } from '@components/common/Badge';
import { Pagination } from '@components/common/Pagination';
import { Dropdown } from '@components/common/Dropdown';
import { Payment } from '@types/payment.types';
import { formatCurrency, formatDate } from '@utils/formatters';
import { 
  MagnifyingGlassIcon,
  EyeIcon,
  ArrowPathIcon,
  DocumentDuplicateIcon,
  CheckCircleIcon,
  XCircleIcon,
  ExclamationCircleIcon,
  CreditCardIcon
} from '@heroicons/react/24/outline';

interface AdminPaymentsProps {
  onRefund?: (paymentId: number) => void;
  onViewDetails?: (payment: Payment) => void;
}

export const AdminPayments: React.FC<AdminPaymentsProps> = ({ onRefund, onViewDetails }) => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState('');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });

  const itemsPerPage = 10;

  useEffect(() => {
    fetchPayments();
  }, [currentPage, searchTerm, statusFilter, dateRange]);

  const fetchPayments = async () => {
    setLoading(true);
    try {
      // TODO: Call API to fetch payments
      // const response = await adminApi.getPayments({ page: currentPage, search: searchTerm, status: statusFilter, dateRange });
      // setPayments(response.data);
      
      // Mock data for now
      const mockPayments: Payment[] = Array.from({ length: itemsPerPage }, (_, i) => ({
        id: i + 1,
        userId: Math.floor(Math.random() * 100) + 1,
        amount: Math.floor(Math.random() * 10000) + 100,
        currency: 'UAH',
        status: ['PENDING', 'COMPLETED', 'FAILED', 'REFUNDED'][Math.floor(Math.random() * 4)] as Payment['status'],
        transactionId: `TRX${i.toString().padStart(8, '0')}`,
        orderId: `ORD${i.toString().padStart(6, '0')}`,
        paymentMethod: ['card', 'bank_transfer', 'paypal'][Math.floor(Math.random() * 3)],
        createdAt: new Date().toISOString(),
        completedAt: Math.random() > 0.5 ? new Date().toISOString() : undefined,
      }));
      setPayments(mockPayments);
    } catch (error) {
      console.error('Failed to fetch payments:', error);
    } finally {
      setLoading(false);
    }
  };

  const statusOptions = [
    { value: '', label: 'Всі статуси' },
    { value: 'PENDING', label: 'В очікуванні' },
    { value: 'COMPLETED', label: 'Завершені' },
    { value: 'FAILED', label: 'Невдалі' },
    { value: 'REFUNDED', label: 'Повернуті' },
  ];

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

  const getPaymentMethodLabel = (method: string | undefined) => {
    const methods: Record<string, string> = {
      card: 'Картка',
      bank_transfer: 'Банківський переказ',
      paypal: 'PayPal',
    };
    return methods[method || ''] || method;
  };

  const PaymentSummary: React.FC = () => {
    const totalAmount = payments.reduce((sum, payment) => 
      payment.status === 'COMPLETED' ? sum + payment.amount : sum, 0
    );
    const successfulCount = payments.filter(p => p.status === 'COMPLETED').length;
    const pendingCount = payments.filter(p => p.status === 'PENDING').length;
    const failedCount = payments.filter(p => p.status === 'FAILED').length;

    return (
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 mb-6">
        <Card className="bg-green-50 border-green-200">
          <div className="flex items-center">
            <CheckCircleIcon className="h-8 w-8 text-green-600 mr-3" />
            <div>
              <p className="text-sm text-green-600">Всього платежів</p>
              <p className="text-2xl font-bold text-green-700">{formatCurrency(totalAmount)}</p>
            </div>
          </div>
        </Card>
        <Card className="bg-blue-50 border-blue-200">
          <div className="flex items-center">
            <CheckCircleIcon className="h-8 w-8 text-blue-600 mr-3" />
            <div>
              <p className="text-sm text-blue-600">Успішні</p>
              <p className="text-2xl font-bold text-blue-700">{successfulCount}</p>
            </div>
          </div>
        </Card>
        <Card className="bg-yellow-50 border-yellow-200">
          <div className="flex items-center">
            <ExclamationCircleIcon className="h-8 w-8 text-yellow-600 mr-3" />
            <div>
              <p className="text-sm text-yellow-600">В очікуванні</p>
              <p className="text-2xl font-bold text-yellow-700">{pendingCount}</p>
            </div>
          </div>
        </Card>
        <Card className="bg-red-50 border-red-200">
          <div className="flex items-center">
            <XCircleIcon className="h-8 w-8 text-red-600 mr-3" />
            <div>
              <p className="text-sm text-red-600">Невдалі</p>
              <p className="text-2xl font-bold text-red-700">{failedCount}</p>
            </div>
          </div>
        </Card>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <PaymentSummary />

      {/* Filters */}
      <div className="flex flex-wrap gap-4">
        <div className="flex-1 min-w-[300px]">
          <Input
            placeholder="Пошук по ID транзакції або користувачу..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            icon={<MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />}
          />
        </div>
        <div className="w-48">
          <Dropdown
            options={statusOptions}
            value={statusFilter}
            onChange={setStatusFilter}
            placeholder="Фільтр за статусом"
          />
        </div>
        <div className="flex gap-2">
          <Input
            type="date"
            value={dateRange.start}
            onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
            className="w-40"
          />
          <Input
            type="date"
            value={dateRange.end}
            onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
            className="w-40"
          />
        </div>
      </div>

      {/* Payments Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID транзакції
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Користувач
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Сума
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Метод оплати
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Статус
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Дата створення
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Дії
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {payments.map((payment) => (
                <tr key={payment.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <CreditCardIcon className="h-5 w-5 text-gray-400 mr-2" />
                      <div>
                        <div className="text-sm font-medium text-gray-900">{payment.transactionId}</div>
                        <div className="text-sm text-gray-500">Замовлення: {payment.orderId}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">ID: {payment.userId}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {formatCurrency(payment.amount, payment.currency)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {getPaymentMethodLabel(payment.paymentMethod)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(payment.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {formatDate(payment.createdAt, { dateStyle: 'short', timeStyle: 'short' })}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onViewDetails?.(payment)}
                        icon={<EyeIcon className="h-5 w-5" />}
                      >
                        Деталі
                      </Button>
                      {payment.status === 'COMPLETED' && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onRefund?.(payment.id)}
                          icon={<ArrowPathIcon className="h-5 w-5" />}
                        >
                          Повернути
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        icon={<DocumentDuplicateIcon className="h-5 w-5" />}
                        onClick={() => {
                          navigator.clipboard.writeText(payment.transactionId);
                        }}
                      >
                        Копіювати
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={10} // TODO: Calculate based on total items
        onPageChange={setCurrentPage}
      />
    </div>
  );
};