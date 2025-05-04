export interface Payment {
    id: number;
    userId: number;
    amount: number;
    currency: string;
    status: 'PENDING' | 'COMPLETED' | 'FAILED' | 'REFUNDED';
    transactionId: string;
    orderId?: string;
    paymentMethod?: string;
    createdAt: string;
    completedAt?: string;
  }
  
  export interface CreatePaymentData {
    amount: number;
    currency?: string;
    description: string;
    orderId?: string;
  }
  
  export interface PaymentResponse {
    payment: Payment;
    paymentLink: string;
  }