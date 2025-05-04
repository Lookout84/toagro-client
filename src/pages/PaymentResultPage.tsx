import React, { useEffect } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { fetchPaymentDetails } from '@store/slices/paymentsSlice';
import { MainLayout } from '@components/layout/MainLayout';
import { Card } from '@components/common/Card';
import { Button } from '@components/common/Button';
import { Spinner } from '@components/common/Spinner';
import { formatCurrency, formatDate } from '@utils/formatters';
import { 
  CheckCircleIcon, 
  XCircleIcon, 
  ClockIcon,
  ArrowLeftIcon,
  CloudArrowDownIcon
} from '@heroicons/react/24/outline';

export const PaymentResultPage: React.FC = () => {
  const { transactionId } = useParams<{ transactionId: string }>();
  const dispatch = useAppDispatch();
  const location = useLocation();
  const { currentPayment, isLoading, error } = useAppSelector(state => state.payments);
  
  const queryParams = new URLSearchParams(location.search);
  const status = queryParams.get('status') || 'unknown';

  useEffect(() => {
    if (transactionId) {
      dispatch(fetchPaymentDetails(transactionId));
    }
  }, [dispatch, transactionId]);

  const renderStatusIcon = () => {
    if (status === 'success' || currentPayment?.status === 'COMPLETED') {
      return <CheckCircleIcon className="h-16 w-16 text-green-500" />;
    }
    if (status === 'failed' || currentPayment?.status === 'FAILED') {
      return <XCircleIcon className="h-16 w-16 text-red-500" />;
    }
    return <ClockIcon className="h-16 w-16 text-yellow-500" />;
  };

  const renderStatusMessage = () => {
    if (status === 'success' || currentPayment?.status === 'COMPLETED') {
      return {
        title: 'Платіж успішний!',
        description: 'Ваш платіж успішно оброблено. Дякуємо за покупку.',
        color: 'text-green-700'
      };
    }
    if (status === 'failed' || currentPayment?.status === 'FAILED') {
      return {
        title: 'Помилка платежу',
        description: 'На жаль, платіж не вдалося обробити. Спробуйте ще раз.',
        color: 'text-red-700'
      };
    }
    return {
      title: 'Обробка платежу',
      description: 'Ваш платіж обробляється. Це може зайняти кілька хвилин.',
      color: 'text-yellow-700'
    };
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

  const statusMessage = renderStatusMessage();

  return (
    <MainLayout>
      <div className="max-w-3xl mx-auto py-8">
        <Link to="/payments" className="inline-flex items-center text-primary-green hover:text-primary-green-hover mb-6">
          <ArrowLeftIcon className="h-5 w-5 mr-2" />
          Повернутися до платежів
        </Link>

        <Card className="text-center mb-8">
          <div className="flex justify-center mb-6">
            {renderStatusIcon()}
          </div>
          <h1 className={`text-2xl font-bold mb-2 ${statusMessage.color}`}>
            {statusMessage.title}
          </h1>
          <p className="text-gray-600 mb-6">
            {statusMessage.description}
          </p>
          {status === 'failed' || currentPayment?.status === 'FAILED' ? (
            <Button variant="primary" size="lg">
              Спробувати знову
            </Button>
          ) : (
            <Button variant="outline" size="lg">
              <Link to="/">Повернутися на головну</Link>
            </Button>
          )}
        </Card>

        {currentPayment && (
          <Card>
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Деталі транзакції</h2>
            <div className="space-y-4">
              <div className="flex justify-between border-b border-gray-200 pb-2">
                <span className="text-gray-500">ID транзакції</span>
                <span className="font-medium">{currentPayment.transactionId}</span>
              </div>
              {currentPayment.orderId && (
                <div className="flex justify-between border-b border-gray-200 pb-2">
                  <span className="text-gray-500">ID замовлення</span>
                  <span className="font-medium">{currentPayment.orderId}</span>
                </div>
              )}
              <div className="flex justify-between border-b border-gray-200 pb-2">
                <span className="text-gray-500">Сума</span>
                <span className="font-medium">{formatCurrency(currentPayment.amount, currentPayment.currency)}</span>
              </div>
              <div className="flex justify-between border-b border-gray-200 pb-2">
                <span className="text-gray-500">Дата створення</span>
                <span className="font-medium">{formatDate(currentPayment.createdAt)}</span>
              </div>
              {currentPayment.completedAt && (
                <div className="flex justify-between border-b border-gray-200 pb-2">
                  <span className="text-gray-500">Дата завершення</span>
                  <span className="font-medium">{formatDate(currentPayment.completedAt)}</span>
                </div>
              )}
              {currentPayment.paymentMethod && (
                <div className="flex justify-between border-b border-gray-200 pb-2">
                  <span className="text-gray-500">Метод оплати</span>
                  <span className="font-medium">{currentPayment.paymentMethod}</span>
                </div>
              )}
            </div>

            {currentPayment.status === 'COMPLETED' && (
              <div className="mt-6 pt-6 border-t border-gray-200">
                <Button 
                  variant="outline" 
                  className="w-full"
                  icon={<CloudArrowDownIcon className="h-5 w-5" />}
                >
                  Завантажити квитанцію
                </Button>
              </div>
            )}
          </Card>
        )}

        {error && (
          <Card className="mt-6 text-center py-6">
            <p className="text-red-500">{error}</p>
          </Card>
        )}
      </div>
    </MainLayout>
  );
};