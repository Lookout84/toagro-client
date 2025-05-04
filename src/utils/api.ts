import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { store } from '@store/index';
import { logout } from '@store/slices/authSlice';

// API Response type
export interface ApiResponse<T = any> {
  data: T;
  message?: string;
  success: boolean;
}

// Error response type
export interface ApiError {
  message: string;
  code?: string;
  statusCode?: number;
}

// Create a request wrapper with type safety
export const request = async <T = any>(
  config: AxiosRequestConfig
): Promise<ApiResponse<T>> => {
  try {
    const response: AxiosResponse<ApiResponse<T>> = await axios(config);
    return response.data;
  } catch (error) {
    throw handleApiError(error as AxiosError);
  }
};

// Handle API errors
export const handleApiError = (error: AxiosError): ApiError => {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    const status = error.response.status;
    const data = error.response.data as any;

    // Handle specific error codes
    switch (status) {
      case 401:
        // Unauthorized - token expired or invalid
        store.dispatch(logout());
        return {
          message: 'Сеанс закінчився. Будь ласка, увійдіть знову.',
          code: 'UNAUTHORIZED',
          statusCode: 401,
        };

      case 403:
        // Forbidden
        return {
          message: 'У вас немає прав для виконання цієї дії.',
          code: 'FORBIDDEN',
          statusCode: 403,
        };

      case 404:
        // Not found
        return {
          message: 'Ресурс не знайдено.',
          code: 'NOT_FOUND',
          statusCode: 404,
        };

      case 422:
        // Validation error
        return {
          message: data.message || 'Помилка валідації.',
          code: 'VALIDATION_ERROR',
          statusCode: 422,
        };

      case 429:
        // Too many requests
        return {
          message: 'Занадто багато запитів. Спробуйте пізніше.',
          code: 'TOO_MANY_REQUESTS',
          statusCode: 429,
        };

      case 500:
        // Server error
        return {
          message: 'Серверна помилка. Спробуйте пізніше.',
          code: 'SERVER_ERROR',
          statusCode: 500,
        };

      default:
        return {
          message: data.message || 'Сталася помилка.',
          code: data.code || 'UNKNOWN_ERROR',
          statusCode: status,
        };
    }
  } else if (error.request) {
    // The request was made but no response was received
    return {
      message: 'Немає відповіді від сервера. Перевірте підключення до Інтернету.',
      code: 'NETWORK_ERROR',
    };
  } else {
    // Something happened in setting up the request
    return {
      message: 'Сталася непередбачена помилка.',
      code: 'REQUEST_SETUP_ERROR',
    };
  }
};

// API utility functions
export const api = {
  get: <T = any>(url: string, config?: AxiosRequestConfig) =>
    request<T>({ ...config, method: 'GET', url }),

  post: <T = any>(url: string, data?: any, config?: AxiosRequestConfig) =>
    request<T>({ ...config, method: 'POST', url, data }),

  put: <T = any>(url: string, data?: any, config?: AxiosRequestConfig) =>
    request<T>({ ...config, method: 'PUT', url, data }),

  patch: <T = any>(url: string, data?: any, config?: AxiosRequestConfig) =>
    request<T>({ ...config, method: 'PATCH', url, data }),

  delete: <T = any>(url: string, config?: AxiosRequestConfig) =>
    request<T>({ ...config, method: 'DELETE', url }),
};

// Interceptor for adding auth token
export const setupInterceptors = () => {
  axios.interceptors.request.use(
    (config) => {
      const token = store.getState().auth.token;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      // Handle global errors here if needed
      return Promise.reject(error);
    }
  );
};