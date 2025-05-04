import React from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '@store/hooks';
import { logout } from '@store/slices/authSlice';
import { Button } from '@components/common/Button';
import { 
  HomeIcon,
  UsersIcon,
  BuildingStorefrontIcon,
  TagIcon,
  CurrencyDollarIcon,
  CogIcon,
  ChartBarIcon,
  ArrowRightOnSquareIcon,
  Bars3Icon,
  XMarkIcon
} from '@heroicons/react/24/outline';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  const menuItems = [
    { path: '/admin', icon: HomeIcon, label: 'Dashboard' },
    { path: '/admin/users', icon: UsersIcon, label: 'Користувачі' },
    { path: '/admin/listings', icon: BuildingStorefrontIcon, label: 'Оголошення' },
    { path: '/admin/categories', icon: TagIcon, label: 'Категорії' },
    { path: '/admin/payments', icon: CurrencyDollarIcon, label: 'Платежі' },
    { path: '/admin/analytics', icon: ChartBarIcon, label: 'Аналітика' },
    { path: '/admin/settings', icon: CogIcon, label: 'Налаштування' },
  ];

  const isActivePath = (path: string) => {
    return location.pathname === path || (path !== '/admin' && location.pathname.startsWith(path));
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 transform ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 transition duration-200 ease-in-out z-50 lg:z-auto`}
      >
        <div className="w-64 h-full bg-white border-r border-gray-200 flex flex-col">
          {/* Sidebar header */}
          <div className="h-16 flex items-center justify-between px-6 border-b border-gray-200">
            <div className="flex items-center gap-2">
              <img src="/logo.svg" alt="ToAgro" className="h-8 w-8" />
              <span className="text-xl font-bold text-gray-900">Admin Panel</span>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-gray-400 hover:text-gray-500"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const active = isActivePath(item.path);
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                    active
                      ? 'bg-primary-green text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <Icon className="h-5 w-5 mr-3" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* User section */}
          <div className="border-t border-gray-200 p-4">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-primary-green/10 flex items-center justify-center">
                <span className="text-primary-green font-medium">{user?.name?.[0]}</span>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-700">{user?.name}</p>
                <p className="text-xs text-gray-500">{user?.email}</p>
              </div>
            </div>
            <div className="mt-4 flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="flex-1"
                onClick={() => navigate('/')}
                icon={<HomeIcon className="h-4 w-4" />}
              >
                На сайт
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="flex-1"
                onClick={handleLogout}
                icon={<ArrowRightOnSquareIcon className="h-4 w-4" />}
              >
                Вихід
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:ml-64 flex flex-col min-h-screen">
        {/* Top bar */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden text-gray-400 hover:text-gray-500"
          >
            <Bars3Icon className="h-6 w-6" />
          </button>
          <div className="flex-1 ml-4 lg:ml-0">
            <h1 className="text-lg font-semibold text-gray-900">
              {menuItems.find(item => isActivePath(item.path))?.label || 'Admin Panel'}
            </h1>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};