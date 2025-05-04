import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { getProfile, changePassword } from '@store/slices/authSlice';
import { fetchNotificationPreferences, updateNotificationPreferences } from '@store/slices/notificationsSlice';
import { MainLayout } from '@components/layout/MainLayout';
import { Card } from '@components/common/Card';
import { Button } from '@components/common/Button';
import { Input } from '@components/common/Input';
import { Tabs } from '@components/common/Tabs';
import { Alert } from '@components/common/Alert';
import { UserSettings } from '@components/user/UserSettings';
import { ChangePasswordData } from '../types/auth.types';

export const SettingsPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { user, isLoading: authLoading, error: authError } = useAppSelector(state => state.auth);
  const { preferences, isLoading: notificationsLoading } = useAppSelector(state => state.notifications);
  const [activeTab, setActiveTab] = useState('account');
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    dispatch(getProfile());
    dispatch(fetchNotificationPreferences());
  }, [dispatch]);

  const showSuccess = (message: string) => {
    setSuccessMessage(message);
    setTimeout(() => setSuccessMessage(null), 3000);
  };

  const handlePasswordChange = async (data: ChangePasswordData) => {
    try {
      await dispatch(changePassword(data)).unwrap();
      showSuccess('Пароль успішно змінено');
    } catch (error) {
      // Error handled by Redux state
    }
  };

  const handlePreferencesUpdate = async (prefs: any) => {
    try {
      await dispatch(updateNotificationPreferences(prefs)).unwrap();
      showSuccess('Налаштування сповіщень збережені');
    } catch (error) {
      console.error('Failed to update preferences:', error);
    }
  };

  const tabs = [
    { id: 'account', label: 'Акаунт' },
    { id: 'notifications', label: 'Сповіщення' },
    { id: 'password', label: 'Пароль' },
    { id: 'privacy', label: 'Приватність' },
  ];

  if (authLoading) {
    return (
      <MainLayout>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary-green border-t-transparent" />
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Налаштування</h1>
        
        {successMessage && (
          <Alert variant="success" className="mb-6">
            {successMessage}
          </Alert>
        )}

        {authError && (
          <Alert variant="error" className="mb-6">
            {authError}
          </Alert>
        )}

        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          tabs={tabs}
          className="mb-6"
        >
          <Tabs.Content value="account">
            <Card>
              <h2 className="text-lg font-medium text-gray-900 mb-6">Інформація акаунту</h2>
              {user ? (
                <UserSettings 
                  user={user} 
                  onUpdate={(data) => {
                    // TODO: Implement profile update
                    console.log('Update profile:', data);
                  }}
                />
              ) : (
                <p className="text-gray-500">Завантаження...</p>
              )}
            </Card>
          </Tabs.Content>

          <Tabs.Content value="notifications">
            <Card>
              <h2 className="text-lg font-medium text-gray-900 mb-6">Налаштування сповіщень</h2>
              {notificationsLoading ? (
                <p className="text-gray-500">Завантаження...</p>
              ) : (
                <div className="space-y-6">
                  {preferences && Object.entries(preferences).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-medium text-gray-900">
                          {key === 'newListings' && 'Нові оголошення'}
                          {key === 'newMessages' && 'Нові повідомлення'}
                          {key === 'paymentReminders' && 'Нагадування про платежі'}
                          {key === 'listingUpdates' && 'Оновлення оголошень'}
                          {key === 'dailyDigest' && 'Щоденний дайджест'}
                        </h3>
                      </div>
                      <input
                        type="checkbox"
                        checked={value as boolean}
                        onChange={(e) => {
                          handlePreferencesUpdate({
                            ...preferences,
                            [key]: e.target.checked
                          });
                        }}
                        className="h-4 w-4 rounded border-gray-300 text-primary-green focus:ring-primary-green"
                      />
                    </div>
                  ))}
                </div>
              )}
            </Card>
          </Tabs.Content>

          <Tabs.Content value="password">
            <Card>
              <h2 className="text-lg font-medium text-gray-900 mb-6">Зміна пароля</h2>
              <PasswordChangeForm onSubmit={handlePasswordChange} isLoading={authLoading} />
            </Card>
          </Tabs.Content>

          <Tabs.Content value="privacy">
            <Card>
              <h2 className="text-lg font-medium text-gray-900 mb-6">Налаштування приватності</h2>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">Показувати профіль публічно</h3>
                    <p className="text-sm text-gray-500">Дозволити іншим користувачам бачити ваш профіль</p>
                  </div>
                  <input
                    type="checkbox"
                    defaultChecked
                    className="h-4 w-4 rounded border-gray-300 text-primary-green focus:ring-primary-green"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">Показувати контактну інформацію</h3>
                    <p className="text-sm text-gray-500">Дозволити іншим бачити вашу контактну інформацію</p>
                  </div>
                  <input
                    type="checkbox"
                    defaultChecked
                    className="h-4 w-4 rounded border-gray-300 text-primary-green focus:ring-primary-green"
                  />
                </div>
              </div>
              <div className="mt-8 pt-8 border-t border-gray-200">
                <h3 className="text-sm font-medium text-red-600 mb-2">Небезпечна зона</h3>
                <p className="text-sm text-gray-500 mb-4">Видалення акаунту - це незворотня дія.</p>
                <Button variant="primary" className="bg-red-600 hover:bg-red-700">
                  Видалити акаунт
                </Button>
              </div>
            </Card>
          </Tabs.Content>
        </Tabs>
      </div>
    </MainLayout>
  );
};

const PasswordChangeForm: React.FC<{
  onSubmit: (data: ChangePasswordData) => void;
  isLoading: boolean;
}> = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.newPassword !== formData.confirmPassword) {
      setError('Нові паролі не співпадають');
      return;
    }

    if (formData.newPassword.length < 8) {
      setError('Новий пароль повинен містити принаймні 8 символів');
      return;
    }

    onSubmit({
      currentPassword: formData.currentPassword,
      newPassword: formData.newPassword,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <Alert variant="error">{error}</Alert>
      )}
      
      <Input
        label="Поточний пароль"
        type="password"
        value={formData.currentPassword}
        onChange={(e) => setFormData(prev => ({ ...prev, currentPassword: e.target.value }))}
        required
      />
      
      <Input
        label="Новий пароль"
        type="password"
        value={formData.newPassword}
        onChange={(e) => setFormData(prev => ({ ...prev, newPassword: e.target.value }))}
        required
      />
      
      <Input
        label="Підтвердити новий пароль"
        type="password"
        value={formData.confirmPassword}
        onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
        required
      />
      
      <Button type="submit" isLoading={isLoading}>
        Змінити пароль
      </Button>
    </form>
  );
};