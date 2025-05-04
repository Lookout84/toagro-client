import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authApi } from '@api/authApi';
import { Input } from '@components/common/Input';
import { Button } from '@components/common/Button';
import { Alert } from '@components/common/Alert';
import { LockClosedIcon } from '@heroicons/react/24/outline';

interface ResetPasswordFormProps {
  token: string;
}

export const ResetPasswordForm: React.FC<ResetPasswordFormProps> = ({ token }) => {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Паролі не співпадають');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      await authApi.resetPassword(token, { token, password });
      navigate('/login', { 
        state: { message: 'Пароль успішно змінено. Тепер ви можете увійти.' }
      });
    } catch (err: unknown) {
      if (err && typeof err === 'object' && 'response' in err) {
        const errorResponse = err as { response?: { data?: { message?: string } } };
        setError(errorResponse.response?.data?.message || 'Помилка при зміні пароля');
      } else {
        setError('Помилка при зміні пароля');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <Alert variant="error" title="Помилка">
          {error}
        </Alert>
      )}
      
      <Input
        label="Новий пароль"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        icon={<LockClosedIcon className="h-5 w-5 text-gray-400" />}
        required
      />

      <Input
        label="Підтвердити новий пароль"
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        icon={<LockClosedIcon className="h-5 w-5 text-gray-400" />}
        required
      />

      <Button
        type="submit"
        className="w-full"
        isLoading={isLoading}
      >
        Зберегти новий пароль
      </Button>
    </form>
  );
};