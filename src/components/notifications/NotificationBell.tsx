import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '@store/hooks';
import { fetchNotifications, markNotificationAsRead } from '@store/slices/notificationsSlice';
import { BellIcon, EnvelopeIcon, CreditCardIcon, TagIcon } from '@heroicons/react/24/outline';
import { formatRelativeTime } from '@utils/formatters';

export const NotificationBell: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const { items: notifications, unreadCount } = useAppSelector(state => state.notifications);

  useEffect(() => {
    dispatch(fetchNotifications({ page: 1, limit: 5 }));
  }, [dispatch]);

  const handleNotificationClick = (notification: any) => {
    if (!notification.read) {
      dispatch(markNotificationAsRead(notification.id));
    }
    
    if (notification.linkUrl) {
      navigate(notification.linkUrl);
    }
    setIsOpen(false);
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'newMessage':
        return <EnvelopeIcon className="h-5 w-5 text-blue-500" />;
      case 'paymentSuccess':
      case 'paymentFailed':
        return <CreditCardIcon className="h-5 w-5 text-green-500" />;
      case 'listingStatusChange':
        return <TagIcon className="h-5 w-5 text-purple-500" />;
      default:
        return <BellIcon className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-1 text-white hover:text-gray-200 transition-colors"
      >
        <BellIcon className="h-6 w-6" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full flex items-center justify-center text-xs font-bold text-white">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-50">
          <div className="py-1">
            <div className="px-4 py-2 border-b border-gray-200">
              <h3 className="text-sm font-semibold text-gray-900">Сповіщення</h3>
            </div>
            {notifications.length > 0 ? (
              <>
                {notifications.map((notification) => (
                  <button
                    key={notification.id}
                    onClick={() => handleNotificationClick(notification)}
                    className={`w-full text-left px-4 py-3 hover:bg-gray-50 ${
                      !notification.read ? 'bg-primary-green/5' : ''
                    }`}
                  >
                    <div className="flex gap-3">
                      <div className="flex-shrink-0">
                        {getNotificationIcon(notification.metadata?.type || '')}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {notification.content}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {formatRelativeTime(notification.createdAt)}
                        </p>
                      </div>
                      {!notification.read && (
                        <div className="flex-shrink-0">
                          <div className="h-2 w-2 bg-primary-green rounded-full"></div>
                        </div>
                      )}
                    </div>
                  </button>
                ))}
                <div className="border-t border-gray-200">
                  <button
                    onClick={() => {
                      navigate('/notifications');
                      setIsOpen(false);
                    }}
                    className="w-full text-center py-2 text-sm text-primary-green hover:bg-gray-50"
                  >
                    Переглянути всі
                  </button>
                </div>
              </>
            ) : (
              <div className="px-4 py-6 text-center text-sm text-gray-500">
                Немає нових сповіщень
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};