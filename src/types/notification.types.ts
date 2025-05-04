export interface Notification {
    id: number;
    userId: number;
    type: 'EMAIL' | 'SMS' | 'PUSH' | 'IN_APP';
    subject?: string;
    content: string;
    read: boolean;
    readAt?: string;
    priority: 'LOW' | 'NORMAL' | 'HIGH';
    metadata?: Record<string, unknown>;
    linkUrl?: string;
    createdAt: string;
    updatedAt: string;
  }
  
  export interface NotificationSettings {
    email: boolean;
    sms: boolean;
    push: boolean;
    newsletterSubscribed: boolean;
    marketingSubscribed: boolean;
  }
  
  export interface NotificationPreferences {
    newListings: boolean;
    newMessages: boolean;
    paymentReminders: boolean;
    listingUpdates: boolean;
    dailyDigest: boolean;
  }