import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '@store/hooks';
import { logout } from '@store/slices/authSlice';
import { Button } from '@components/common/Button';
import { UserCircleIcon, Bars3Icon } from '@heroicons/react/24/outline';
import { toggleSidebar } from '@store/slices/uiSlice';
import { NotificationBell } from '@components/notifications/NotificationBell';

export const Header: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <header className="bg-primary-green text-white shadow-lg">
      <div className="container mx-auto">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Mobile Menu */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => dispatch(toggleSidebar())}
              className="md:hidden text-white hover:text-gray-200 transition-colors"
            >
              <Bars3Icon className="h-6 w-6" />
            </button>
            <Link to="/" className="flex items-center gap-2">
              <img src="/logo.svg" alt="ToAgro" className="h-8 w-8" />
              <span className="text-xl font-bold">ToAgro</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/" className="hover:text-gray-200 transition-colors">
              Головна
            </Link>
            <Link to="/listings" className="hover:text-gray-200 transition-colors">
              Оголошення
            </Link>
            <Link to="/categories" className="hover:text-gray-200 transition-colors">
              Категорії
            </Link>
            {isAuthenticated && (
              <Link to="/chat" className="hover:text-gray-200 transition-colors">
                Повідомлення
              </Link>
            )}
          </nav>

          {/* User Actions */}
          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <>
                <NotificationBell />
                <div className="relative" style={{ marginLeft: '8px' }}>
                  <button
                    onClick={() => navigate('/profile')}
                    className="flex items-center gap-2 hover:text-gray-200 transition-colors"
                  >
                    {user?.avatar ? (
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="h-8 w-8 rounded-full object-cover"
                      />
                    ) : (
                      <UserCircleIcon className="h-8 w-8" />
                    )}
                    <span className="hidden md:inline">{user?.name}</span>
                  </button>
                </div>
                <Button variant="secondary" size="sm" onClick={handleLogout}>
                  Вийти
                </Button>
              </>
            ) : (
              <>
                <Button variant="ghost" size="sm" onClick={() => navigate('/login')}>
                  Увійти
                </Button>
                <Button variant="secondary" size="sm" onClick={() => navigate('/register')}>
                  Реєстрація
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
