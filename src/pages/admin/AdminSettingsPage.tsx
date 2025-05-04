import React from 'react';
import { AdminLayout } from '@components/layout/AdminLayout';
import { Card } from '@components/common/Card';
import { Button } from '@components/common/Button';
import { Input } from '@components/common/Input';
import { Dropdown } from '@components/common/Dropdown';
import { Alert } from '@components/common/Alert';
import { 
  CogIcon, 
  BellIcon, 
  CreditCardIcon, 
  ShieldCheckIcon,
  EnvelopeIcon,
  GlobeEuropeAfricaIcon
} from '@heroicons/react/24/outline';

export const AdminSettingsPage: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [success, setSuccess] = React.useState(false);

  const languages = [
    { value: 'uk', label: 'Українська' },
    { value: 'en', label: 'English' },
    { value: 'ru', label: 'Русский' },
  ];

  const currencies = [
    { value: 'UAH', label: 'UAH (₴)' },
    { value: 'USD', label: 'USD ($)' },
    { value: 'EUR', label: 'EUR (€)' },
  ];

  const notificationTypes = [
    { value: 'email', label: 'Email' },
    { value: 'sms', label: 'SMS' },
    { value: 'push', label: 'Push-сповіщення' },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      // TODO: Call API to save settings
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      console.error('Failed to save settings:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {success && (
          <Alert variant="success" title="Успіх">
            Налаштування успішно збережені
          </Alert>
        )}

        {/* Site Settings */}
        <Card>
          <div className="flex items-center gap-2 mb-6">
            <CogIcon className="h-6 w-6 text-primary-green" />
            <h2 className="text-lg font-medium text-gray-900">Налаштування сайту</h2>
          </div>
          <form className="space-y-4">
            <Input
              label="Назва сайту"
              defaultValue="ToAgro"
              placeholder="Введіть назву сайту"
            />
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Опис сайту
              </label>
              <textarea
                defaultValue="Аграрний маркетплейс для купівлі і продажу сільськогосподарської продукції та обладнання"
                className="w-full rounded-md border border-gray-300 p-2"
                rows={3}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Dropdown
                label="Мова за замовчуванням"
                options={languages}
                value="uk"
                onChange={() => {}}
              />
              <Dropdown
                label="Валюта за замовчуванням"
                options={currencies}
                value="UAH"
                onChange={() => {}}
              />
            </div>
          </form>
        </Card>

        {/* Notification Settings */}
        <Card>
          <div className="flex items-center gap-2 mb-6">
            <BellIcon className="h-6 w-6 text-primary-green" />
            <h2 className="text-lg font-medium text-gray-900">Налаштування сповіщень</h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-900">Сповіщення про нові оголошення</h3>
                <p className="text-sm text-gray-500">Надсилати сповіщення адміністраторам про нові оголошення</p>
              </div>
              <input
                type="checkbox"
                defaultChecked
                className="h-4 w-4 rounded border-gray-300 text-primary-green focus:ring-primary-green"
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-900">Сповіщення про платежі</h3>
                <p className="text-sm text-gray-500">Надсилати сповіщення про нові платежі</p>
              </div>
              <input
                type="checkbox"
                defaultChecked
                className="h-4 w-4 rounded border-gray-300 text-primary-green focus:ring-primary-green"
              />
            </div>
          </div>
        </Card>

        {/* Payment Settings */}
        <Card>
          <div className="flex items-center gap-2 mb-6">
            <CreditCardIcon className="h-6 w-6 text-primary-green" />
            <h2 className="text-lg font-medium text-gray-900">Налаштування платежів</h2>
          </div>
          <div className="space-y-4">
            <Input
              label="API ключ платіжної системи"
              type="password"
              placeholder="Введіть API ключ"
            />
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="stripe"
                className="h-4 w-4 rounded border-gray-300 text-primary-green focus:ring-primary-green"
              />
              <label htmlFor="stripe" className="text-sm font-medium text-gray-700">
                Увімкнути Stripe
              </label>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="paypal"
                className="h-4 w-4 rounded border-gray-300 text-primary-green focus:ring-primary-green"
              />
              <label htmlFor="paypal" className="text-sm font-medium text-gray-700">
                Увімкнути PayPal
              </label>
            </div>
          </div>
        </Card>

        {/* Security Settings */}
        <Card>
          <div className="flex items-center gap-2 mb-6">
            <ShieldCheckIcon className="h-6 w-6 text-primary-green" />
            <h2 className="text-lg font-medium text-gray-900">Налаштування безпеки</h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="2fa"
                className="h-4 w-4 rounded border-gray-300 text-primary-green focus:ring-primary-green"
              />
              <label htmlFor="2fa" className="text-sm font-medium text-gray-700">
                Увімкнути двофакторну автентифікацію
              </label>
            </div>
            <Input
              label="Максимальна кількість спроб входу"
              type="number"
              defaultValue="5"
            />
            <Input
              label="Час блокування після спроб входу (хвилин)"
              type="number"
              defaultValue="30"
            />
          </div>
        </Card>

        {/* Email Settings */}
        <Card>
          <div className="flex items-center gap-2 mb-6">
            <EnvelopeIcon className="h-6 w-6 text-primary-green" />
            <h2 className="text-lg font-medium text-gray-900">Налаштування пошти</h2>
          </div>
          <div className="space-y-4">
            <Input
              label="SMTP сервер"
              defaultValue="smtp.example.com"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="SMTP порт"
                type="number"
                defaultValue="587"
              />
              <Input
                label="Email відправника"
                type="email"
                defaultValue="noreply@toagro.com"
              />
            </div>
          </div>
        </Card>

        <div className="flex justify-end">
          <Button 
            onClick={handleSubmit}
            isLoading={isSubmitting}
            className="min-w-[200px]"
          >
            Зберегти налаштування
          </Button>
        </div>
      </div>
    </AdminLayout>
  );
};