import React, { useState } from 'react';
import { User } from '../../types/auth.types';
import { Input } from '@components/common/Input';
import { Button } from '@components/common/Button';
import { PencilIcon, CameraIcon } from '@heroicons/react/24/outline';

interface UserSettingsProps {
  user: User;
  onUpdate: (data: FormData) => void;
}

export const UserSettings: React.FC<UserSettingsProps> = ({ user, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    phoneNumber: user.phoneNumber || '',
  });
  const [avatar, setAvatar] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(user.avatar || null);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatar(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('phoneNumber', formData.phoneNumber);
    if (avatar) {
      formDataToSend.append('avatar', avatar);
    }
    onUpdate(formDataToSend);
    setIsEditing(false);
  };

  if (!isEditing) {
    return (
      <div>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-6">
            <div className="relative">
              {avatarPreview ? (
                <img
                  src={avatarPreview}
                  alt={user.name}
                  className="h-20 w-20 rounded-full object-cover"
                />
              ) : (
                <div className="h-20 w-20 rounded-full bg-gray-200 flex items-center justify-center">
                  <span className="text-2xl text-gray-500">{user.name[0]}</span>
                </div>
              )}
              {isEditing && (
                <label className="absolute bottom-0 right-0 bg-white rounded-full p-1.5 border border-gray-300 cursor-pointer hover:bg-gray-50">
                  <CameraIcon className="h-4 w-4 text-gray-600" />
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleAvatarChange}
                  />
                </label>
              )}
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900">{user.name}</h3>
              <p className="text-sm text-gray-500">{user.email}</p>
              {user.phoneNumber && (
                <p className="text-sm text-gray-500">{user.phoneNumber}</p>
              )}
            </div>
          </div>
          <Button
            variant="outline"
            onClick={() => setIsEditing(true)}
            icon={<PencilIcon className="h-5 w-5" />}
          >
            Редагувати
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-500">Email</label>
            <p className="mt-1 text-sm text-gray-900">{user.email}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-500">Телефон</label>
            <p className="mt-1 text-sm text-gray-900">{user.phoneNumber || 'Не вказано'}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-500">Роль</label>
            <p className="mt-1 text-sm text-gray-900">
              {user.role === 'ADMIN' ? 'Адміністратор' : 'Користувач'}
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-500">Статус верифікації</label>
            <p className="mt-1 text-sm text-gray-900">
              {user.isVerified ? 'Верифікований' : 'Неверифікований'}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex items-center gap-6">
        <div className="relative">
          {avatarPreview ? (
            <img
              src={avatarPreview}
              alt={user.name}
              className="h-20 w-20 rounded-full object-cover"
            />
          ) : (
            <div className="h-20 w-20 rounded-full bg-gray-200 flex items-center justify-center">
              <span className="text-2xl text-gray-500">{user.name[0]}</span>
            </div>
          )}
          <label className="absolute bottom-0 right-0 bg-white rounded-full p-1.5 border border-gray-300 cursor-pointer hover:bg-gray-50">
            <CameraIcon className="h-4 w-4 text-gray-600" />
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleAvatarChange}
            />
          </label>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <Input
          label="Ім'я"
          value={formData.name}
          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
          required
        />
        <Input
          label="Email"
          value={formData.email}
          disabled
          className="bg-gray-50"
        />
        <Input
          label="Номер телефону"
          value={formData.phoneNumber}
          onChange={(e) => setFormData(prev => ({ ...prev, phoneNumber: e.target.value }))}
        />
      </div>

      <div className="flex justify-end gap-4">
        <Button
          variant="outline"
          onClick={() => setIsEditing(false)}
        >
          Скасувати
        </Button>
        <Button type="submit">
          Зберегти зміни
        </Button>
      </div>
    </form>
  );
};