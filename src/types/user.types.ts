export interface UserProfile {
  id: number;
  email: string;
  name: string;
  phoneNumber?: string;
  avatar?: string;
  role: 'USER' | 'ADMIN';
  isVerified: boolean;
  createdAt: string;
}

export interface UpdateProfileData {
  name?: string;
  phoneNumber?: string;
  avatar?: string;
}

export interface UserChangePasswordData {
  currentPassword: string;
  newPassword: string;
}

export type User = {
  id: string;
  email: string;
  name: string;
  phone?: string;
  avatar?: string;
};

export interface UpdateUserData {
  name?: string;
  email?: string;
  phone?: string;
  avatar?: string;
}

export type UserData = UserProfile;