import React from 'react';
import { ForgotPasswordForm } from '@components/auth/ForgotPasswordForm';
import { MainLayout } from '@components/layout/MainLayout';
import { Card } from '@components/common/Card';
import { Link } from 'react-router-dom';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

export const ForgotPasswordPage: React.FC = () => {
  return (
    <MainLayout>
      <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <h2 className="mt-6 text-3xl font-bold text-gray-900">
              Відновлення пароля
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Введіть вашу email адресу для отримання інструкцій з відновлення пароля
            </p>
          </div>
          <Card>
            <ForgotPasswordForm />
          </Card>
          <div className="text-center">
            <Link
              to="/login"
              className="inline-flex items-center text-primary-green hover:text-primary-green-hover"
            >
              <ArrowLeftIcon className="h-5 w-5 mr-2" />
              Повернутися до входу
            </Link>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};