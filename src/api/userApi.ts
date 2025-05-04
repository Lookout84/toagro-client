import axios from 'axios';
import { UpdateUserData } from '../types/user.types';

export const userApi = {
  getUserProfile: () => axios.get('/api/user/profile'),
  updateUserProfile: (userData: UpdateUserData) => axios.put('/api/user/profile', userData),
  getUserListings: (page: number, limit: number) => 
    axios.get(`/api/user/listings?page=${page}&limit=${limit}`),
};