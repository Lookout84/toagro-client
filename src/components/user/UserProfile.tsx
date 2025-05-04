import React from 'react';
import { User } from '@types/auth.types';
import { Card } from '@components/common/Card';
import { Badge } from '@components/common/Badge';
import { formatDate } from '@utils/formatters';
import { EnvelopeIcon, PhoneIcon, CalendarIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';

interface UserProfileProps {
  user: User;
}

export const UserProfile: React.FC<UserProfileProps> = ({ user }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Basic Info */}
      <Card>
        <h2 className="text-lg font-semibold mb-4">Основна інформація</h2>
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <EnvelopeIcon className="h-5 w-5 text-gray-400" />
            <span>{user.email}</span>
          </div>
          {user.phoneNumber && (
            <div className="flex items-center gap-3">
              <PhoneIcon className="h-5 w-5 text-gray-400" />
              <span>{user.phoneNumber}</span>
            </div>
          )}
          <div className="flex items-center gap-3">
            <CalendarIcon className="h-5 w-5 text-gray-400" />
            <span>Член з {formatDate(user.createdAt, { year: 'numeric', month: 'long' })}</span>
          </div>
          <div className="flex items-center gap-3">
            <ShieldCheckIcon className="h-5 w-5 text-gray-400" />
            <div className="flex items-center gap-2">
              <span>Верифікація</span>
              <Badge variant={user.isVerified ? 'success' : 'warning'}>
                {user.isVerified ? 'Верифікований' : 'Неверифікований'}
              </Badge>
            </div>
          </div>
        </div>
      </Card>

      {/* Account Status */}
      <Card>
        <h2 className="text-lg font-semibold mb-4">Статус акаунту</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Роль</span>
            <Badge variant={user.role === 'ADMIN' ? 'primary' : 'secondary'}>
              {user.role === 'ADMIN' ? 'Адміністратор' : 'Користувач'}
            </Badge>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Останнє оновлення</span>
            <span>{formatDate(user.updatedAt)}</span>
          </div>
        </div>
      </Card>

      {/* Activity */}
      <Card className="md:col-span-2">
        <h2 className="text-lg font-semibold mb-4">Активність</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-2xl font-bold text-primary-green">0</p>
            <p className="text-sm text-gray-600">Всього оголошень</p>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-2xl font-bold text-primary-green">0</p>
            <p className="text-sm text-gray-600">Активних оголошень</p>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-2xl font-bold text-primary-green">0</p>
            <p className="text-sm text-gray-600">Завершених угод</p>
          </div>
        </div>
      </Card>
    </div>
  );
};