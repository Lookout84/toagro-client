import { useAppSelector, useAppDispatch } from '@store/hooks';
import { login, logout, register } from '@store/slices/authSlice';
import { LoginData, RegisterData } from '../types/auth.types';

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const { user, isAuthenticated, isLoading, error } = useAppSelector((state) => state.auth);

  const handleLogin = async (data: LoginData) => {
    return dispatch(login(data)).unwrap();
  };

  const handleRegister = async (data: RegisterData) => {
    return dispatch(register(data)).unwrap();
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  const isAdmin = user?.role === 'ADMIN';

  return {
    user,
    isAuthenticated,
    isLoading,
    error,
    isAdmin,
    login: handleLogin,
    register: handleRegister,
    logout: handleLogout,
  };
};