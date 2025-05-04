import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { login } from '@store/slices/authSlice';
import { Input } from '@components/common/Input';
import { Button } from '@components/common/Button';
import { Alert } from '@components/common/Alert';
import { EnvelopeIcon, LockClosedIcon } from '@heroicons/react/24/outline';

export const LoginForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isLoading, error } = useAppSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await dispatch(login(formData)).unwrap();
      navigate('/');
    } catch (error) {
      // Error is handled by Redux state
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      {error && (
        <Alert variant="error" title="Помилка входу">
          {error}
        </Alert>
      )}
      
      <Input
        name="email"
        type="email"
        label="Email адреса"
        value={formData.email}
        onChange={handleChange}
        icon={<EnvelopeIcon className="h-5 w-5 text-gray-400" />}
        required
      />

      <Input
        name="password"
        type="password"
        label="Пароль"
        value={formData.password}
        onChange={handleChange}
        icon={<LockClosedIcon className="h-5 w-5 text-gray-400" />}
        required
      />

      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <input
            id="remember-me"
            name="remember-me"
            type="checkbox"
            className="h-4 w-4 text-primary-green focus:ring-primary-green/50 border-gray-300 rounded"
          />
          <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
            Запам'ятати мене
          </label>
        </div>

        <div className="text-sm">
          <a href="/forgot-password" className="font-medium text-primary-green hover:text-primary-green-hover">
            Забули пароль?
          </a>
        </div>
      </div>

      <Button
        type="submit"
        className="w-full"
        isLoading={isLoading}
      >
        Увійти
      </Button>
    </form>
  );
};