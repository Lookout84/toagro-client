import React, { useState, useEffect } from 'react';
import { Card } from '@components/common/Card';
import { Button } from '@components/common/Button';
import { Input } from '@components/common/Input';
import { Badge } from '@components/common/Badge';
import { Pagination } from '@components/common/Pagination';
import { Dropdown } from '@components/common/Dropdown';
import { Listing } from '../../types/listing.types';
import { formatCurrency, formatDate } from '@utils/formatters';
import { 
  MagnifyingGlassIcon, 
  CheckCircleIcon, 
  EyeIcon,
  PencilIcon,
  XCircleIcon,
  ArrowTopRightOnSquareIcon
} from '@heroicons/react/24/outline';

interface AdminListingsProps {
  onApprove?: (listingId: number) => void;
  onView?: (listing: Listing) => void;
  onEdit?: (listing: Listing) => void;
  onDeactivate?: (listingId: number) => void;
}

export const AdminListings: React.FC<AdminListingsProps> = ({
  onApprove,
  onView,
  onEdit,
  onDeactivate
}) => {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');

  const itemsPerPage = 10;

  useEffect(() => {
    fetchListings();
  }, [currentPage, searchTerm, statusFilter, categoryFilter]);

  const fetchListings = async () => {
    setLoading(true);
    try {
      // TODO: Call API to fetch admin listings
      // const response = await adminApi.getListings({ page: currentPage, search: searchTerm, status: statusFilter, category: categoryFilter });
      // setListings(response.data.listings);
      
      // Mock data for now
      const mockListings: Listing[] = Array.from({ length: itemsPerPage }, (_, i) => ({
        id: i + 1,
        title: `Оголошення ${i + 1}`,
        description: `Опис оголошення ${i + 1}`,
        price: Math.floor(Math.random() * 10000) + 1000,
        location: `Місто ${i + 1}`,
        category: ['Пшениця', 'Кукурудза', 'Соя', 'Картопля'][Math.floor(Math.random() * 4)],
        categoryId: Math.floor(Math.random() * 10) + 1,
        userId: Math.floor(Math.random() * 100) + 1,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        active: Math.random() > 0.3,
        status: 'active',
        images: ['https://via.placeholder.com/150'],
        views: Math.floor(Math.random() * 1000),
        user: {
          id: i + 1,
          name: `Користувач ${i + 1}`,
          avatar: undefined,
        },
      }));
      setListings(mockListings);
    } catch (error) {
      console.error('Failed to fetch listings:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredListings = listings.filter(listing => 
    listing.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    listing.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const statusOptions = [
    { value: '', label: 'Всі статуси' },
    { value: 'active', label: 'Активні' },
    { value: 'inactive', label: 'Неактивні' },
    { value: 'pending', label: 'На розгляді' },
  ];

  const categoryOptions = [
    { value: '', label: 'Всі категорії' },
    { value: 'wheat', label: 'Пшениця' },
    { value: 'corn', label: 'Кукурудза' },
    { value: 'soy', label: 'Соя' },
    { value: 'potato', label: 'Картопля' },
  ];

  const getStatusBadge = (active: boolean) => {
    return active ? (
      <Badge variant="success">Активне</Badge>
    ) : (
      <Badge variant="warning">Неактивне</Badge>
    );
  };

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex flex-wrap gap-4">
        <div className="flex-1 min-w-[300px]">
          <Input
            placeholder="Пошук оголошень..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            icon={<MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />}
          />
        </div>
        <div className="w-48">
          <Dropdown
            options={statusOptions}
            value={statusFilter}
            onChange={setStatusFilter}
            placeholder="Фільтр за статусом"
          />
        </div>
        <div className="w-48">
          <Dropdown
            options={categoryOptions}
            value={categoryFilter}
            onChange={setCategoryFilter}
            placeholder="Фільтр за категорією"
          />
        </div>
      </div>

      {/* Listings Table */}
      <Card>
        {loading ? (
          <div className="flex justify-center items-center p-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          </div>
        ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Оголошення
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Категорія
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ціна
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Користувач
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Статус
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Дата створення
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Дії
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredListings.map((listing) => (
                <tr key={listing.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="h-16 w-16 flex-shrink-0">
                        <img
                          className="h-16 w-16 rounded object-cover"
                          src={listing.images[0] || 'https://via.placeholder.com/64'}
                          alt=""
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{listing.title}</div>
                        <div className="text-sm text-gray-500">ID: {listing.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge variant="secondary">{listing.category}</Badge>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{formatCurrency(listing.price)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{listing.user.name}</div>
                    <div className="text-sm text-gray-500">ID: {listing.userId}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(listing.active)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{formatDate(listing.createdAt)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onView?.(listing)}
                        icon={<EyeIcon className="h-5 w-5" />}
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onEdit?.(listing)}
                        icon={<PencilIcon className="h-5 w-5" />}
                      />
                      {listing.active ? (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onDeactivate?.(listing.id)}
                          icon={<XCircleIcon className="h-5 w-5" />}
                        />
                      ) : (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onApprove?.(listing.id)}
                          icon={<CheckCircleIcon className="h-5 w-5" />}
                        />
                      )}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => window.open(`/listings/${listing.id}`, '_blank')}
                  icon={<ArrowTopRightOnSquareIcon className="h-5 w-5" />}
                />
              </div>
            </td>
          </tr>
        ))}
      </tbody>
          </table>
        </div>
        )}
      </Card>

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={10} // TODO: Calculate based on total items
        onPageChange={setCurrentPage}
      />
    </div>
  );
};