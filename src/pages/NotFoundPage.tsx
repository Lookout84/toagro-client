import React from 'react';
import { Link } from 'react-router-dom';
import { MainLayout } from '@components/layout/MainLayout';
import { Button } from '@components/common/Button';
import { HomeIcon } from '@heroicons/react/24/outline';

export const NotFoundPage: React.FC = () => {
  return (
    <MainLayout>
      <div className="min-h-[60vh] flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-9xl font-bold text-primary-green mb-4">404</h1>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Сторінку не знайдено</h2>
          <p className="text-lg text-gray-600 mb-8">
            Вибачте, але сторінка, яку ви шукаєте, не існує
          </p>
          <Button
            variant="primary"
            size="lg"
            icon={<HomeIcon className="h-5 w-5" />}
          >
            <Link to="/">Повернутися на головну</Link>
          </Button>
        </div>
      </div>
    </MainLayout>
  );
};