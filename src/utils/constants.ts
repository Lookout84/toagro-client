// API Endpoints
export const API_ENDPOINTS = {
    AUTH: {
      LOGIN: '/auth/login',
      REGISTER: '/auth/register',
      VERIFY_EMAIL: '/auth/verify',
      FORGOT_PASSWORD: '/auth/forgot-password',
      RESET_PASSWORD: '/auth/reset-password',
      CHANGE_PASSWORD: '/auth/change-password',
      ME: '/auth/me',
    },
    LISTINGS: {
      BASE: '/listings',
      USER: '/listings/user/me',
      UPLOAD: '/listings/upload',
    },
    CATEGORIES: {
      BASE: '/categories',
      TREE: '/categories/tree',
    },
    CHAT: {
      MESSAGES: '/chat/messages',
      CONVERSATIONS: '/chat/conversations',
      UNREAD: '/chat/unread',
    },
    PAYMENTS: {
      BASE: '/transactions',
    },
    NOTIFICATIONS: {
      HISTORY: '/notifications/history',
      SETTINGS: '/notifications/settings',
      PREFERENCES: '/notifications/preferences',
    },
  } as const;
  
  // App Configuration
  export const APP_CONFIG = {
    name: 'ToAgro',
    description: 'Аграрний маркетплейс для купівлі і продажі сільськогосподарської продукції та обладнання',
    defaultCurrency: 'UAH',
    locale: 'uk-UA',
    dateFormat: {
      short: 'dd.MM.yyyy',
      long: 'dd MMMM yyyy, HH:mm',
    },
    pagination: {
      defaultLimit: 10,
      maxLimit: 100,
    },
    imageUpload: {
      maxSize: 5 * 1024 * 1024, // 5MB
      acceptedTypes: ['image/jpeg', 'image/png', 'image/webp'],
      maxImages: 5,
    },
  } as const;
  
  // Routes
  export const ROUTES = {
    HOME: '/',
    LOGIN: '/login',
    REGISTER: '/register',
    FORGOT_PASSWORD: '/forgot-password',
    RESET_PASSWORD: '/reset-password/:token',
    LISTINGS: '/listings',
    LISTING_DETAILS: '/listings/:id',
    CREATE_LISTING: '/create-listing',
    EDIT_LISTING: '/listings/:id/edit',
    CATEGORIES: '/categories',
    CATEGORY: '/categories/:slug',
    PROFILE: '/profile',
    SETTINGS: '/settings',
    MY_LISTINGS: '/my-listings',
    CHAT: '/chat',
    CHAT_USER: '/chat/:userId',
    PAYMENTS: '/payments',
    PAYMENT_RESULT: '/payments/:transactionId',
    ADMIN: {
      DASHBOARD: '/admin',
      USERS: '/admin/users',
      LISTINGS: '/admin/listings',
      CATEGORIES: '/admin/categories',
      PAYMENTS: '/admin/payments',
      SETTINGS: '/admin/settings',
    },
  } as const;
  
  // Local Storage Keys
  export const STORAGE_KEYS = {
    AUTH_TOKEN: 'auth_token',
    THEME: 'theme',
    LANGUAGE: 'language',
    RECENT_SEARCHES: 'recent_searches',
  } as const;
  
  // Theme Configuration
  export const THEMES = {
    LIGHT: 'light',
    DARK: 'dark',
    SYSTEM: 'system',
  } as const;
  
  // Notification Types
  export const NOTIFICATION_TYPES = {
    EMAIL: 'EMAIL',
    SMS: 'SMS',
    PUSH: 'PUSH',
    IN_APP: 'IN_APP',
  } as const;
  
  // Notification Priorities
  export const NOTIFICATION_PRIORITIES = {
    LOW: 'LOW',
    NORMAL: 'NORMAL',
    HIGH: 'HIGH',
  } as const;
  
  // Payment Status
  export const PAYMENT_STATUS = {
    PENDING: 'PENDING',
    COMPLETED: 'COMPLETED',
    FAILED: 'FAILED',
    REFUNDED: 'REFUNDED',
  } as const;
  
  // User Roles
  export const USER_ROLES = {
    USER: 'USER',
    ADMIN: 'ADMIN',
  } as const;