import apiClient from './apiClient';
import {
  Category,
  CategoryTree,
  CreateCategoryData,
  UpdateCategoryData,
  CategoryFilters,
} from '../types/category.types';

export const categoriesApi = {
  getCategories: (params?: CategoryFilters) =>
    apiClient.get<{ categories: Category[] }>('/categories', { params }),

  getCategory: (id: number) =>
    apiClient.get<{ category: Category }>(`/categories/${id}`),

  getCategoryBySlug: (slug: string) =>
    apiClient.get<{ category: Category }>(`/categories/slug/${slug}`),

  getCategoryTree: () =>
    apiClient.get<{ categoryTree: CategoryTree[] }>('/categories/tree'),

  createCategory: (data: CreateCategoryData) =>
    apiClient.post<{ category: Category }>('/categories', data),

  updateCategory: (id: number, data: UpdateCategoryData) =>
    apiClient.put<{ category: Category }>(`/categories/${id}`, data),

  deleteCategory: (id: number) =>
    apiClient.delete(`/categories/${id}`),
};