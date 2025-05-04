import apiClient from './apiClient';
import {
  Listing,
  CreateListingData,
  UpdateListingData,
  ListingFilters,
  ListingsResponse,
} from '@types/listing.types';

export const listingsApi = {
  getListings: (params?: ListingFilters) =>
    apiClient.get<ListingsResponse>('/listings', { params }),

  getListing: (id: number) =>
    apiClient.get<{ listing: Listing }>(`/listings/${id}`),

  createListing: (data: CreateListingData) =>
    apiClient.post<{ listing: Listing }>('/listings', data),

  updateListing: (id: number, data: UpdateListingData) =>
    apiClient.put<{ listing: Listing }>(`/listings/${id}`, data),

  deleteListing: (id: number) =>
    apiClient.delete(`/listings/${id}`),

  getUserListings: (params?: { page?: number; limit?: number }) =>
    apiClient.get<ListingsResponse>('/listings/user/me', { params }),

  uploadImages: (files: File[]) => {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append('images', file);
    });
    return apiClient.post('/listings/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
};