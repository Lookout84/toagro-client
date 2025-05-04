import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { fetchUserListings, deleteListing } from '@store/slices/listingsSlice';
import { MainLayout } from '@components/layout/MainLayout';
import { Card } from '@components/common/Card';
import { Button } from '@components/common/Button';
import { Dropdown } from '@components/common/Dropdown';
import { ListingCard } from '@components/listings/ListingCard';
import { Pagination } from '@components/common/Pagination';
import { Spinner } from '@components/common/Spinner';
import { Alert } from '@components/common/Alert';
import { PlusIcon, FunnelIcon } from '@heroicons/react/24/outline';

export const UserListingsPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { userListings, isLoading, error, meta } = useAppSelector(state => state.listings);
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    dispatch(fetchUserListings({ page: currentPage, limit: 12 }));
  }, [dispatch, currentPage]);

  const handleDelete = async (listingId: number) => {
    try {
      await dispatch(deleteListing(listingId)).unwrap();
      dispatch(fetchUserListings({ page: currentPage, limit: 12 }));
    } catch (error) {
      console.error('Failed to delete listing:', error);
    }
  };

  const filterOptions = [
    { value: 'all', label: 'Всі оголошення' },
    { value: 'active', label: 'Активні' },
    { value: 'inactive', label: 'Неактивні' },
  ];

  const filteredListings = userListings.filter(listing => {
    if (filter === 'active') return listing.active;
    if (filter === 'inactive') return !listing.active;
    return true;
  });

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Мої оголошення</h1>
            <p className="mt-2 text-sm text-gray-600">
              Управляйте вашими оголошеннями
            </p>
          </div>
          <Link to="/create-listing">
            <Button icon={<PlusIcon className="h-5 w-5" />}>
              Додати оголошення
            </Button>
          </Link>
        </div>

        {/* Filters */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            <Dropdown
              options={filterOptions}
              value={filter}
              onChange={setFilter}
              className="w-48"
            />
          </div>
          <p className="text-sm text-gray-500">
            Всього: {userListings.length} оголошень
          </p>
        </div>

        {error && (
          <Alert variant="error" className="mb-6">
            {error}
          </Alert>
        )}

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Spinner size="lg" />
          </div>
        ) : filteredListings.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredListings.map((listing) => (
                <div key={listing.id} className="relative">
                  <ListingCard listing={listing} />
                  <div className="mt-2 flex gap-2">
                    <Link to={`/listings/${listing.id}/edit`} className="flex-1">
                      <Button variant="outline" size="sm" className="w-full">
                        Редагувати
                      </Button>
                    </Link>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1 border-red-300 text-red-600 hover:bg-red-50"
                      onClick={() => handleDelete(listing.id)}
                    >
                      Видалити
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {meta && meta.totalPages > 1 && (
              <div className="mt-8">
                <Pagination
                  currentPage={meta.page}
                  totalPages={meta.totalPages}
                  onPageChange={setCurrentPage}
                />
              </div>
            )}
          </>
        ) : (
          <Card className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {filter === 'all' ? 'Ви ще не створили жодного оголошення' : 
               filter === 'active' ? 'Немає активних оголошень' : 
               'Немає неактивних оголошень'}
            </h3>
            <p className="text-gray-500 mb-6">
              Розпочніть продавати свої товари просто зараз
            </p>
            <Link to="/create-listing">
              <Button>Створити оголошення</Button>
            </Link>
          </Card>
        )}
      </div>
    </MainLayout>
  );
};