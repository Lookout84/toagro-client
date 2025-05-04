export interface Profile {
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
  
  export interface ChangePasswordData {
    currentPassword: string;
    newPassword: string;
  }