import apiClient from './apiClient';
import {
  Payment,
  CreatePaymentData,
  PaymentResponse,
} from '@types/payment.types';

export const paymentsApi = {
  createPayment: (data: CreatePaymentData) =>
    apiClient.post<PaymentResponse>('/transactions', data),

  getUserPayments: () =>
    apiClient.get<{ payments: Payment[] }>('/transactions'),

  getPaymentDetails: (transactionId: string) =>
    apiClient.get<{ payment: Payment }>(`/transactions/${transactionId}`),
};