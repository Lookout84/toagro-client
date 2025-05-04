import React from 'react';
import { useParams } from 'react-router-dom';
import { ResetPasswordForm } from '@components/auth/ResetPasswordForm';
import { MainLayout } from '@components/layout/MainLayout';
import { Card } from '@components/common/Card';

export const ResetPasswordPage: React.FC = () => {
  const { token } = useParams<{ token: string }>();

  return (
    <MainLayout>
      <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <h2 className="mt-6 text-3xl font-bold text-gray-900">
              Створити новий пароль
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Введіть новий пароль для вашого акаунту
            </p>
          </div>
          <Card>
            {token ? (
              <ResetPasswordForm token={token} />
            ) : (
              <div className="text-center text-red-600">
                Невірне посилання для відновлення пароля
              </div>
            )}
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};