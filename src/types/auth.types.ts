export interface User {
    id: number;
    email: string;
    name: string;
    phoneNumber?: string;
    role: 'USER' | 'ADMIN';
    avatar?: string;
    isVerified: boolean;
    createdAt: string;
    updatedAt: string;
  }
  
  export interface AuthResponse {
    token: string;
    user: User;
  }
  
  export interface LoginData {
    email: string;
    password: string;
  }
  
  export interface RegisterData {
    email: string;
    password: string;
    name: string;
    phoneNumber?: string;
  }
  
  export interface ForgotPasswordData {
    email: string;
  }
  
  export interface ResetPasswordData {
    token: string;
    password: string;
  }
  
  export interface ChangePasswordData {
    currentPassword: string;
    newPassword: string;
  }