import apiClient from './apiClient';
import {
  Notification,
  NotificationSettings,
  NotificationPreferences,
} from '@types/notification.types';

export const notificationsApi = {
  getNotifications: (params?: { page?: number; limit?: number }) =>
    apiClient.get<{
      notifications: Notification[];
      meta: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
      };
    }>('/notifications/history', { params }),

  markAsRead: (id: number) =>
    apiClient.post(`/notifications/history/${id}/read`),

  markAllAsRead: () =>
    apiClient.post('/notifications/history/read'),

  deleteNotification: (id: number) =>
    apiClient.delete(`/notifications/history/${id}`),

  getSettings: () =>
    apiClient.get<{ settings: NotificationSettings }>('/notifications/settings'),

  updateSettings: (settings: NotificationSettings) =>
    apiClient.put('/notifications/settings', { settings }),

  getPreferences: () =>
    apiClient.get<{ preferences: NotificationPreferences }>('/notifications/preferences'),

  updatePreferences: (preferences: NotificationPreferences) =>
    apiClient.put('/notifications/preferences', { preferences }),
};