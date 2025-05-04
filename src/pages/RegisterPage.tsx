import React from 'react';
import { RegisterForm } from '@components/auth/RegisterForm';
import { MainLayout } from '@components/layout/MainLayout';
import { Card } from '@components/common/Card';

export const RegisterPage: React.FC = () => {
  return (
    <MainLayout>
      <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <h2 className="mt-6 text-3xl font-bold text-gray-900">
              Створіть акаунт
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Вже зареєстровані?{' '}
              <a href="/login" className="font-medium text-primary-green hover:text-primary-green-hover">
                Увійти
              </a>
            </p>
          </div>
          <Card>
            <RegisterForm />
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};