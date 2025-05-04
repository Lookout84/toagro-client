import React from 'react';
import { Notification } from '@types/notification.types';
import { Card } from '@components/common/Card';
import { Badge } from '@components/common/Badge';
import { formatRelativeTime } from '@utils/formatters';
import { 
  BellIcon, 
  EnvelopeIcon, 
  CreditCardIcon, 
  TagIcon,
  CheckCircleIcon,
  XMarkIcon,
  ExclamationCircleIcon,
  InformationCircleIcon
} from '@heroicons/react/24/outline';

interface NotificationItemProps {
  notification: Notification;
  onMarkAsRead?: (id: number) => void;
  onDelete?: (id: number) => void;
  onClick?: (notification: Notification) => void;
}

export const NotificationItem: React.FC<NotificationItemProps> = ({
  notification,
  onMarkAsRead,
  onDelete,
  onClick
}) => {
  const getIcon = () => {
    const type = notification.metadata?.type || '';
    switch (type) {
      case 'newMessage':
        return <EnvelopeIcon className="h-6 w-6 text-blue-500" />;
      case 'paymentSuccess':
        return <CreditCardIcon className="h-6 w-6 text-green-500" />;
      case 'paymentFailed':
        return <CreditCardIcon className="h-6 w-6 text-red-500" />;
      case 'listingStatusChange':
        return <TagIcon className="h-6 w-6 text-purple-500" />;
      case 'info':
        return <InformationCircleIcon className="h-6 w-6 text-blue-500" />;
      case 'warning':
        return <ExclamationCircleIcon className="h-6 w-6 text-yellow-500" />;
      case 'error':
        return <XMarkIcon className="h-6 w-6 text-red-500" />;
      case 'success':
        return <CheckCircleIcon className="h-6 w-6 text-green-500" />;
      default:
        return <BellIcon className="h-6 w-6 text-gray-400" />;
    }
  };

  const getPriorityBadge = () => {
    switch (notification.priority) {
      case 'HIGH':
        return <Badge variant="error">Високий</Badge>;
      case 'NORMAL':
        return <Badge variant="warning">Нормальний</Badge>;
      case 'LOW':
        return <Badge variant="info">Низький</Badge>;
      default:
        return null;
    }
  };

  return (
    <Card 
      className={`cursor-pointer ${!notification.read ? 'bg-primary-green/5 border-primary-green/20' : ''}`}
      onClick={() => onClick?.(notification)}
    >
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 mt-1">{getIcon()}</div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {notification.subject && (
                <h3 className="text-sm font-medium text-gray-900 truncate">
                  {notification.subject}
                </h3>
              )}
              {getPriorityBadge()}
            </div>
            <span className="text-xs text-gray-500">
              {formatRelativeTime(notification.createdAt)}
            </span>
          </div>
          
          <p className="mt-1 text-sm text-gray-600">{notification.content}</p>
          
          {!notification.read && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onMarkAsRead?.(notification.id);
              }}
              className="mt-2 text-xs text-primary-green hover:text-primary-green-hover"
            >
              Позначити як прочитане
            </button>
          )}
        </div>
        
        <div className="flex-shrink-0 ml-4">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete?.(notification.id);
            }}
            className="p-1 text-gray-400 hover:text-red-500 rounded-full hover:bg-gray-100"
          >
            <XMarkIcon className="h-5 w-5" />
          </button>
        </div>
      </div>
    </Card>
  );
};