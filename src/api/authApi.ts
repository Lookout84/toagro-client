import apiClient from './apiClient';
import {
  AuthResponse,
  LoginData,
  RegisterData,
  ForgotPasswordData,
  ResetPasswordData,
  ChangePasswordData,
  User,
} from '@types/auth.types';

export const authApi = {
  register: (data: RegisterData) =>
    apiClient.post<AuthResponse>('/auth/register', data),

  login: (data: LoginData) =>
    apiClient.post<AuthResponse>('/auth/login', data),

  verifyEmail: (token: string) =>
    apiClient.get(`/auth/verify/${token}`),

  forgotPassword: (data: ForgotPasswordData) =>
    apiClient.post('/auth/forgot-password', data),

  resetPassword: (token: string, data: ResetPasswordData) =>
    apiClient.post(`/auth/reset-password/${token}`, data),

  changePassword: (data: ChangePasswordData) =>
    apiClient.post('/auth/change-password', data),

  getProfile: () =>
    apiClient.get<{ user: User }>('/auth/me'),

  updateProfile: (data: FormData) =>
    apiClient.put<{ user: User }>('/auth/me', data),
};