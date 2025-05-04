import apiClient from './apiClient';
import {
  Message,
  Conversation,
  SendMessageData,
  ConversationResponse,
} from '@types/chat.types';

export const chatApi = {
  sendMessage: (data: SendMessageData) =>
    apiClient.post<{ message: Message }>('/chat/messages', data),

  getConversation: (userId: number, params?: { page?: number; limit?: number }) =>
    apiClient.get<ConversationResponse>(`/chat/conversations/${userId}`, { params }),

  getUserConversations: () =>
    apiClient.get<{ conversations: Conversation[] }>('/chat/conversations'),

  markMessagesAsRead: (userId: number) =>
    apiClient.post(`/chat/conversations/${userId}/read`),

  getUnreadCount: () =>
    apiClient.get<{ count: number }>('/chat/unread'),
};