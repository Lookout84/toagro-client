import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { getProfile } from '@store/slices/authSlice';
import { fetchUserListings } from '@store/slices/listingsSlice';
import { MainLayout } from '@components/layout/MainLayout';
import { UserProfile } from '@components/user/UserProfile';
import { Card } from '@components/common/Card';
import { ListingCard } from '@components/listings/ListingCard';
import { Tabs } from '@components/common/Tabs';
import { Button } from '@components/common/Button';
import { PencilIcon } from '@heroicons/react/24/outline';

export const ProfilePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(state => state.auth);
  const { userListings } = useAppSelector(state => state.listings);

  useEffect(() => {
    dispatch(getProfile());
    dispatch(fetchUserListings());
  }, [dispatch]);

  if (!user) return null;

  const tabs = [
    { id: 'profile', label: 'Профіль' },
    { id: 'listings', label: 'Мої оголошення' },
    { id: 'reviews', label: 'Відгуки' },
  ];

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto py-8">
        <div className="mb-8">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-6">
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="h-24 w-24 rounded-full object-cover"
                />
              ) : (
                <div className="h-24 w-24 rounded-full bg-gray-200 flex items-center justify-center">
                  <span className="text-3xl text-gray-500">{user.name[0]}</span>
                </div>
              )}
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{user.name}</h1>
                <p className="text-gray-500">{user.email}</p>
                {user.phoneNumber && (
                  <p className="text-gray-500 mt-1">{user.phoneNumber}</p>
                )}
              </div>
            </div>
            <Button variant="outline" icon={<PencilIcon className="h-5 w-5" />}>
              Редагувати профіль
            </Button>
          </div>
        </div>

        <Tabs defaultValue="profile" tabs={tabs}>
          <Tabs.Content value="profile">
            <UserProfile user={user} />
          </Tabs.Content>
          <Tabs.Content value="listings">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {userListings.map(listing => (
                <ListingCard key={listing.id} listing={listing} />
              ))}
              {userListings.length === 0 && (
                <Card className="col-span-full text-center py-12">
                  <p className="text-gray-500">Ви ще не створили жодного оголошення</p>
                </Card>
              )}
            </div>
          </Tabs.Content>
          <Tabs.Content value="reviews">
            <Card>
              <p className="text-gray-500 text-center py-12">Функція відгуків скоро буде доступна</p>
            </Card>
          </Tabs.Content>
        </Tabs>
      </div>
    </MainLayout>
  );
};