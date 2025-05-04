import React, { useEffect } from 'react';
import { Card } from '@components/common/Card';
import { Button } from '@components/common/Button';
import { SalesChart } from '@components/admin/charts/SalesChart';
import { UsersChart } from '@components/admin/charts/UsersChart';
import { ListingsChart } from '@components/admin/charts/ListingsChart';
import { Alert } from '@components/common/Alert';
import { 
  UsersIcon, 
  BuildingStorefrontIcon, 
  CurrencyDollarIcon, 
  ChartBarIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  UserPlusIcon
} from '@heroicons/react/24/outline';

interface DashboardStats {
  totalUsers: number;
  totalListings: number;
  totalRevenue: number;
  newUsersToday: number;
  userGrowth: number;
  listingGrowth: number;
  revenueGrowth: number;
}

export const Dashboard: React.FC = () => {
  const [stats, setStats] = React.useState<DashboardStats>({
    totalUsers: 2456,
    totalListings: 1234,
    totalRevenue: 45890,
    newUsersToday: 23,
    userGrowth: 12.5,
    listingGrowth: -2.3,
    revenueGrowth: 8.7,
  });

  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setIsLoading(true);
    try {
      // Temporary mock data until API is implemented
      setStats({
        totalUsers: 2456,
        totalListings: 1234,
        totalRevenue: 45890,
        newUsersToday: 23,
        userGrowth: 12.5,
        listingGrowth: -2.3,
        revenueGrowth: 8.7,
      });
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Помилка завантаження даних dashboard');
    } finally {
      setIsLoading(false);
    }
  };

  const StatCard: React.FC<{
    title: string;
    value: string | number;
    icon: React.ReactNode;
    growth?: number;
    growthLabel?: string;
  }> = ({ title, value, icon, growth, growthLabel }) => (
    <Card className="hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          {growth !== undefined && (
            <div className={`flex items-center mt-2 ${growth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {growth >= 0 ? (
                <ArrowTrendingUpIcon className="h-4 w-4 mr-1" />
              ) : (
                <ArrowTrendingDownIcon className="h-4 w-4 mr-1" />
              )}
              <span className="text-sm font-medium">{Math.abs(growth)}%</span>
              {growthLabel && <span className="text-sm text-gray-500 ml-1">{growthLabel}</span>}
            </div>
          )}
        </div>
        <div className="p-3 bg-primary-green/10 rounded-lg">
          {icon}
        </div>
      </div>
    </Card>
  );

  if (error) {
    return <Alert variant="error" title="Помилка">{error}</Alert>;
  }

  if (isLoading) {
    return <div className="flex justify-center items-center">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Всього користувачів"
          value={stats.totalUsers.toLocaleString()}
          icon={<UsersIcon className="h-6 w-6 text-primary-green" />}
          growth={stats.userGrowth}
          growthLabel="цього місяця"
        />
        <StatCard
          title="Всього оголошень"
          value={stats.totalListings.toLocaleString()}
          icon={<BuildingStorefrontIcon className="h-6 w-6 text-primary-green" />}
          growth={stats.listingGrowth}
          growthLabel="цього місяця"
        />
        <StatCard
          title="Сумарний дохід"
          value={`₴${stats.totalRevenue.toLocaleString()}`}
          icon={<CurrencyDollarIcon className="h-6 w-6 text-primary-green" />}
          growth={stats.revenueGrowth}
          growthLabel="цього місяця"
        />
        <StatCard
          title="Нові користувачі сьогодні"
          value={stats.newUsersToday}
          icon={<UserPlusIcon className="h-6 w-6 text-primary-green" />}
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Продажі за останні 30 днів</h3>
          <SalesChart />
        </Card>
        <Card>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Реєстрації користувачів</h3>
          <UsersChart />
        </Card>
      </div>

      {/* Full Width Chart */}
      <Card>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Динаміка оголошень</h3>
        <ListingsChart />
      </Card>

      {/* Recent Activity Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Останні дії</h3>
          <div className="space-y-4">
            {[
              { action: 'Нове оголошення', user: 'John Doe', time: '2 хв тому' },
              { action: 'Платіж зарахований', user: 'Jane Smith', time: '10 хв тому' },
              { action: 'Новий користувач', user: 'Bob Johnson', time: '15 хв тому' },
              { action: 'Оновлення категорії', user: 'Alice Brown', time: '25 хв тому' },
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between border-b last:border-0 pb-4 last:pb-0">
                <div>
                  <p className="text-sm font-medium text-gray-900">{item.action}</p>
                  <p className="text-sm text-gray-500">{item.user}</p>
                </div>
                <p className="text-sm text-gray-500">{item.time}</p>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Швидкі дії</h3>
          <div className="grid grid-cols-2 gap-4">
            <Button 
              variant="outline" 
              className="w-full"
              icon={<UsersIcon className="h-5 w-5" />}
            >
              Управління користувачами
            </Button>
            <Button 
              variant="outline" 
              className="w-full"
              icon={<BuildingStorefrontIcon className="h-5 w-5" />}
            >
              Управління оголошеннями
            </Button>
            <Button 
              variant="outline" 
              className="w-full"
              icon={<ChartBarIcon className="h-5 w-5" />}
            >
              Звіти та аналітика
            </Button>
            <Button 
              variant="outline" 
              className="w-full"
              icon={<CurrencyDollarIcon className="h-5 w-5" />}
            >
              Налаштування платежів
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};