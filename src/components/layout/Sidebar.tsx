import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAppDispatch } from '@store/hooks';
import { setSidebarOpen } from '@store/slices/uiSlice';
import {
  HomeIcon,
  BuildingStorefrontIcon,
  TagIcon,
  ChatBubbleLeftRightIcon,
  UserIcon,
  Cog6ToothIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';

interface SidebarProps {
  isOpen: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  const dispatch = useAppDispatch();
  const location = useLocation();

  const menuItems = [
    { path: '/', icon: HomeIcon, label: 'Головна' },
    { path: '/listings', icon: BuildingStorefrontIcon, label: 'Оголошення' },
    { path: '/categories', icon: TagIcon, label: 'Категорії' },
    { path: '/chat', icon: ChatBubbleLeftRightIcon, label: 'Повідомлення' },
    { path: '/profile', icon: UserIcon, label: 'Профіль' },
    { path: '/settings', icon: Cog6ToothIcon, label: 'Налаштування' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => dispatch(setSidebarOpen(false))}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed md:sticky md:top-0 md:h-screen
          w-64 h-full bg-white shadow-lg z-50 md:z-auto
          transform transition-transform duration-200 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          md:translate-x-0
        `}
      >
        {/* Close button for mobile */}
        <div className="md:hidden flex justify-end p-4">
          <button
            onClick={() => dispatch(setSidebarOpen(false))}
            className="text-gray-500 hover:text-gray-700"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        {/* Menu items */}
        <nav className="mt-4 px-4">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-lg mb-1
                  transition-colors duration-200
                  ${
                    isActive(item.path)
                      ? 'bg-primary-green text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }
                `}
                onClick={() => dispatch(setSidebarOpen(false))}
              >
                <Icon className="h-5 w-5" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </>
  );
};