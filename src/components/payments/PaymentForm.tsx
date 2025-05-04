import React, { useState } from 'react';
import { useAppDispatch } from '@store/hooks';
import { createPayment } from '@store/slices/paymentsSlice';
import { Input } from '@components/common/Input';
import { Button } from '@components/common/Button';
import { Dropdown } from '@components/common/Dropdown';
import { Alert } from '@components/common/Alert';
import { CreatePaymentData } from '@types/payment.types';
import { CreditCardIcon, BanknotesIcon, LockClosedIcon } from '@heroicons/react/24/outline';

interface PaymentFormProps {
  amount: number;
  description: string;
  orderId?: string;
  onSuccess?: (paymentLink: string) => void;
  onError?: (error: string) => void;
}

export const PaymentForm: React.FC<PaymentFormProps> = ({
  amount,
  description,
  orderId,
  onSuccess,
  onError
}) => {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardHolder: '',
    paymentMethod: 'card'
  });

  const paymentMethods = [
    { value: 'card', label: 'Платіжна картка' },
    { value: 'bank_transfer', label: 'Банківський переказ' },
    { value: 'cash', label: 'Готівка' },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const paymentData: CreatePaymentData = {
        amount,
        description,
        orderId,
      };

      const result = await dispatch(createPayment(paymentData)).unwrap();
      if (result.paymentLink) {
        onSuccess?.(result.paymentLink);
      }
    } catch (error: any) {
      onError?.(error?.message || 'Помилка обробки платежу');
    } finally {
      setIsLoading(false);
    }
  };

  const formatCardNumber = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    const groups = cleaned.match(/.{1,4}/g);
    return groups ? groups.join(' ') : cleaned;
  };

  const formatExpiryDate = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length >= 2) {
      return cleaned.slice(0, 2) + (cleaned.length > 2 ? '/' + cleaned.slice(2, 4) : '');
    }
    return cleaned;
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Деталі платежу</h3>
        <div className="flex items-center justify-between">
          <span className="text-gray-600">Сума до оплати:</span>
          <span className="text-xl font-bold text-gray-900">₴{amount.toLocaleString()}</span>
        </div>
      </div>

      <Dropdown
        label="Спосіб оплати"
        options={paymentMethods}
        value={formData.paymentMethod}
        onChange={(value) => setFormData(prev => ({ ...prev, paymentMethod: value }))}
        icon={<CreditCardIcon className="h-5 w-5 text-gray-400" />}
      />

      {formData.paymentMethod === 'card' && (
        <>
          <Input
            label="Номер картки"
            value={formData.cardNumber}
            onChange={(e) => setFormData(prev => ({ 
              ...prev, 
              cardNumber: formatCardNumber(e.target.value) 
            }))}
            placeholder="1234 5678 9012 3456"
            maxLength={19}
            icon={<CreditCardIcon className="h-5 w-5 text-gray-400" />}
            required
          />

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Термін дії"
              value={formData.expiryDate}
              onChange={(e) => setFormData(prev => ({ 
                ...prev, 
                expiryDate: formatExpiryDate(e.target.value) 
              }))}
              placeholder="MM/YY"
              maxLength={5}
              required
            />
            <Input
              label="CVV"
              value={formData.cvv}
              onChange={(e) => setFormData(prev => ({ ...prev, cvv: e.target.value }))}
              maxLength={3}
              placeholder="123"
              icon={<LockClosedIcon className="h-5 w-5 text-gray-400" />}
              required
            />
          </div>

          <Input
            label="Ім'я на картці"
            value={formData.cardHolder}
            onChange={(e) => setFormData(prev => ({ ...prev, cardHolder: e.target.value }))}
            placeholder="IVAN IVANOV"
            required
          />
        </>
      )}

      {formData.paymentMethod === 'bank_transfer' && (
        <Alert variant="info" title="Банківський переказ">
          <p>Реквізити для переказу будуть надані після підтвердження замовлення</p>
        </Alert>
      )}

      {formData.paymentMethod === 'cash' && (
        <Alert variant="info" title="Оплата готівкою">
          <p>Оплата здійснюється при отриманні товару</p>
        </Alert>
      )}

      <div className="border-t pt-4">
        <p className="text-xs text-gray-500 mb-4">
          Наданням даних картки ви підтверджуєте згоду на обробку персональних даних
        </p>
        <Button
          type="submit"
          className="w-full"
          size="lg"
          isLoading={isLoading}
          icon={<LockClosedIcon className="h-5 w-5" />}
        >
          Оплатити {amount.toLocaleString()}₴
        </Button>
      </div>
    </form>
  );
};