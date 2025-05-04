import { useState, useCallback } from 'react';
import { AxiosResponse, AxiosError } from 'axios';

interface ApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

interface UseApiResult<T> {
  state: ApiState<T>;
  execute: () => Promise<void>;
}

export const useApi = <T,>(
  apiCall: () => Promise<AxiosResponse<T>>
): UseApiResult<T> => {
  const [state, setState] = useState<ApiState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  const execute = useCallback(async () => {
    setState((prev) => ({ ...prev, loading: true, error: null }));

    try {
      const response = await apiCall();
      setState({
        data: response.data,
        loading: false,
        error: null,
      });
    } catch (error) {
      const axiosError = error as AxiosError;
      let errorMessage = 'Щось пішло не так';
      
      if ((axiosError.response?.data as { message?: string })?.message) {
        errorMessage = (axiosError.response?.data as { message?: string })?.message || errorMessage;
      } else if (axiosError.message) {
        errorMessage = axiosError.message;
      }

      setState({
        data: null,
        loading: false,
        error: errorMessage,
      });
    }
  }, [apiCall]);

  return { state, execute };
};