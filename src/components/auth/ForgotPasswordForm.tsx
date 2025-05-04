import React, { useState } from 'react';
import { authApi } from '@api/authApi';
import { Input } from '@components/common/Input';
import { Button } from '@components/common/Button';
import { Alert } from '@components/common/Alert';
import { EnvelopeIcon } from '@heroicons/react/24/outline';

export const ForgotPasswordForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      await authApi.forgotPassword({ email });
      setSuccess(true);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Помилка при відправці інструкцій');
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <Alert variant="success" title="Перевірте вашу пошту">
        Інструкції з відновлення пароля надіслані на вказану email адресу
      </Alert>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <Alert variant="error" title="Помилка">
          {error}
        </Alert>
      )}
      
      <Input
        label="Email адреса"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        icon={<EnvelopeIcon className="h-5 w-5 text-gray-400" />}
        required
      />

      <Button
        type="submit"
        className="w-full"
        isLoading={isLoading}
      >
        Надіслати інструкції
      </Button>
    </form>
  );
};