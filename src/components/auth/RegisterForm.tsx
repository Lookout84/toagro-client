import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { register } from '@store/slices/authSlice';
import { Input } from '@components/common/Input';
import { Button } from '@components/common/Button';
import { Alert } from '@components/common/Alert';
import { EnvelopeIcon, LockClosedIcon, UserCircleIcon, PhoneIcon } from '@heroicons/react/24/outline';

export const RegisterForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isLoading, error } = useAppSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    phoneNumber: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await dispatch(register(formData)).unwrap();
      navigate('/');
    } catch (error) {
      // Error is handled by Redux state
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      {error && (
        <Alert variant="error" title="Помилка реєстрації">
          {error}
        </Alert>
      )}
      
      <Input
        name="name"
        type="text"
        label="Ім'я"
        value={formData.name}
        onChange={handleChange}
        icon={<UserCircleIcon className="h-5 w-5 text-gray-400" />}
        required
      />

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
        name="phoneNumber"
        type="tel"
        label="Номер телефону (опціонально)"
        value={formData.phoneNumber}
        onChange={handleChange}
        icon={<PhoneIcon className="h-5 w-5 text-gray-400" />}
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

      <div className="flex items-center">
        <input
          id="terms"
          name="terms"
          type="checkbox"
          required
          className="h-4 w-4 text-primary-green focus:ring-primary-green/50 border-gray-300 rounded"
        />
        <label htmlFor="terms" className="ml-2 block text-sm text-gray-900">
          Я погоджуюся з{' '}
          <a href="/terms" className="font-medium text-primary-green hover:text-primary-green-hover">
            умовами використання
          </a>{' '}
          та{' '}
          <a href="/privacy" className="font-medium text-primary-green hover:text-primary-green-hover">
            політикою конфіденційності
          </a>
        </label>
      </div>

      <Button
        type="submit"
        className="w-full"
        isLoading={isLoading}
      >
        Зареєструватись
      </Button>
    </form>
  );
};