import React from 'react';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { markNotificationAsRead, deleteNotification, fetchNotifications } from '@store/slices/notificationsSlice';
import { NotificationItem } from './NotificationItem';
import { Pagination } from '@components/common/Pagination';
import { Dropdown } from '@components/common/Dropdown';
import { Spinner } from '@components/common/Spinner';
import { Card } from '@components/common/Card';
import { BellIcon } from '@heroicons/react/24/outline';

interface NotificationsListProps {
  onNotificationClick?: (notification: any) => void;
}

export const NotificationsList: React.FC<NotificationsListProps> = ({ onNotificationClick }) => {
  const dispatch = useAppDispatch();
  const { items: notifications, isLoading, unreadCount } = useAppSelector(state => state.notifications);
  const [page, setPage] = React.useState(1);
  const [type, setType] = React.useState('all');

  React.useEffect(() => {
    dispatch(fetchNotifications({ page, limit: 10 }));
  }, [dispatch, page]);

  const handleMarkAsRead = (id: number) => {
    dispatch(markNotificationAsRead(id));
  };

  const handleDelete = (id: number) => {
    dispatch(deleteNotification(id));
  };

  const notificationTypes = [
    { value: 'all', label: 'Всі сповіщення' },
    { value: 'unread', label: 'Непрочитані' },
    { value: 'read', label: 'Прочитані' },
  ];

  const filteredNotifications = React.useMemo(() => {
    if (type === 'unread') return notifications.filter(n => !n.read);
    if (type === 'read') return notifications.filter(n => n.read);
    return notifications;
  }, [notifications, type]);

  if (isLoading && notifications.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h2 className="text-lg font-semibold text-gray-900">Сповіщення</h2>
          {unreadCount > 0 && (
            <span className="px-2 py-1 bg-primary-green text-white text-xs rounded-full">
              {unreadCount} непрочитаних
            </span>
          )}
        </div>
        <div className="w-48">
          <Dropdown
            options={notificationTypes}
            value={type}
            onChange={setType}
          />
        </div>
      </div>

      {filteredNotifications.length > 0 ? (
        <div className="space-y-4">
          {filteredNotifications.map((notification) => (
            <NotificationItem
              key={notification.id}
              notification={notification}
              onMarkAsRead={handleMarkAsRead}
              onDelete={handleDelete}
              onClick={onNotificationClick}
            />
          ))}
        </div>
      ) : (
        <Card className="text-center py-12">
          <BellIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {type === 'unread' ? 'Немає непрочитаних сповіщень' :
             type === 'read' ? 'Немає прочитаних сповіщень' :
             'Сповіщення відсутні'}
          </h3>
          <p className="text-gray-500">
            {type === 'unread' ? 'Всі ваші сповіщення прочитані' :
             type === 'read' ? 'Поки що немає прочитаних сповіщень' :
             'Ваші сповіщення з\'являться тут'}
          </p>
        </Card>
      )}

      <Pagination
        currentPage={page}
        totalPages={Math.ceil(notifications.length / 10)}
        onPageChange={setPage}
      />
    </div>
  );
};