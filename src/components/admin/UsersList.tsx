// import React, { useState, useEffect } from 'react';
// import { Card } from '@components/common/Card';
// import { Button } from '@components/common/Button';
// import { Input } from '@components/common/Input';
// import { Badge } from '@components/common/Badge';
// import { Pagination } from '@components/common/Pagination';
// import { Dropdown } from '@components/common/Dropdown';
// import { Listing } from '@types/listing.types';
// import { formatCurrency, formatDate } from '@utils/formatters';
// import { 
//   MagnifyingGlassIcon, 
//   CheckCircleIcon, 
//   XCircleIcon,
//   EyeIcon,
//   PencilIcon,
//   BanIcon,
//   ArrowTopRightOnSquareIcon
// } from '@heroicons/react/24/outline';

// interface AdminListingsProps {
//   onApprove?: (listingId: number) => void;
//   onReject?: (listingId: number) => void;
//   onView?: (listing: Listing) => void;
//   onEdit?: (listing: Listing) => void;
//   onDeactivate?: (listingId: number) => void;
// }

// export const AdminListings: React.FC<AdminListingsProps> = ({
//   onApprove,
//   onReject,
//   onView,
//   onEdit,
//   onDeactivate
// }) => {
//   const [listings, setListings] = useState<Listing[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [currentPage, setCurrentPage] = useState(1);
//   const [statusFilter, setStatusFilter] = useState('');
//   const [categoryFilter, setCategoryFilter] = useState('');

//   const itemsPerPage = 10;

//   useEffect(() => {
//     fetchListings();
//   }, [currentPage, searchTerm, statusFilter, categoryFilter]);

//   const fetchListings = async () => {
//     setLoading(true);
//     try {
//       // TODO: Call API to fetch admin listings
//       // const response = await adminApi.getListings({ page: currentPage, search: searchTerm, status: statusFilter, category: categoryFilter });
//       // setListings(response.data.listings);
      
//       // Mock data for now
//       const mockListings: Listing[] = Array.from({ length: itemsPerPage }, (_, i) => ({
//         id: i + 1,
//         title: `Оголошення ${i + 1}`,
//         description: `Опис оголошення ${i + 1}`,
//         price: Math.floor(Math.random() * 10000) + 1000,
//         location: `Місто ${i + 1}`,
//         category: ['Пшениця', 'Кукурудза', 'Соя', 'Картопля'][Math.floor(Math.random() * 4)],
//         categoryId: Math.floor(Math.random() * 10) + 1,
//         userId: Math.floor(Math.random() * 100) + 1,
//         createdAt: new Date().toISOString(),
//         updatedAt: new Date().toISOString(),
//         active: Math.random() > 0.3,
//         images: ['https://via.placeholder.com/150'],
//         views: Math.floor(Math.random() * 1000),
//         user: {
//           id: i + 1,
//           name: `Користувач ${i + 1}`,
//           avatar: undefined,
//         },
//       }));
//       setListings(mockListings);
//     } catch (error) {
//       console.error('Failed to fetch listings:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const filteredListings = listings.filter(listing => 
//     listing.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     listing.description.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const statusOptions = [
//     { value: '', label: 'Всі статуси' },
//     { value: 'active', label: 'Активні' },
//     { value: 'inactive', label: 'Неактивні' },
//     { value: 'pending', label: 'На розгляді' },
//   ];

//   const categoryOptions = [
//     { value: '', label: 'Всі категорії' },
//     { value: 'wheat', label: 'Пшениця' },
//     { value: 'corn', label: 'Кукурудза' },
//     { value: 'soy', label: 'Соя' },
//     { value: 'potato', label: 'Картопля' },
//   ];

//   const getStatusBadge = (active: boolean) => {
//     return active ? (
//       <Badge variant="success">Активне</Badge>
//     ) : (
//       <Badge variant="warning">Неактивне</Badge>
//     );
//   };

//   return (
//     <div className="space-y-6">
//       {/* Filters */}
//       <div className="flex flex-wrap gap-4">
//         <div className="flex-1 min-w-[300px]">
//           <Input
//             placeholder="Пошук оголошень..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             icon={<MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />}
//           />
//         </div>
//         <div className="w-48">
//           <Dropdown
//             options={statusOptions}
//             value={statusFilter}
//             onChange={setStatusFilter}
//             placeholder="Фільтр за статусом"
//           />
//         </div>
//         <div className="w-48">
//           <Dropdown
//             options={categoryOptions}
//             value={categoryFilter}
//             onChange={setCategoryFilter}
//             placeholder="Фільтр за категорією"
//           />
//         </div>
//       </div>

//       {/* Listings Table */}
//       <Card>
//         <div className="overflow-x-auto">
//           <table className="min-w-full divide-y divide-gray-200">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Оголошення
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Категорія
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Ціна
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Користувач
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Статус
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Дата створення
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Дії
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {filteredListings.map((listing) => (
//                 <tr key={listing.id} className="hover:bg-gray-50">
//                   <td className="px-6 py-4">
//                     <div className="flex items-center">
//                       <div className="h-16 w-16 flex-shrink-0">
//                         <img
//                           className="h-16 w-16 rounded object-cover"
//                           src={listing.images[0] || 'https://via.placeholder.com/64'}
//                           alt=""
//                         />
//                       </div>
//                       <div className="ml-4">
//                         <div className="text-sm font-medium text-gray-900">{listing.title}</div>
//                         <div className="text-sm text-gray-500">ID: {listing.id}</div>
//                       </div>
//                     </div>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <Badge variant="secondary">{listing.category}</Badge>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <div className="text-sm text-gray-900">{formatCurrency(listing.price)}</div>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <div className="text-sm text-gray-900">{listing.user.name}</div>
//                     <div className="text-sm text-gray-500">ID: {listing.userId}</div>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     {getStatusBadge(listing.active)}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <div className="text-sm text-gray-900">{formatDate(listing.createdAt)}</div>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
//                     <div className="flex items-center gap-1">
//                       <Button
//                         variant="ghost"
//                         size="sm"
//                         onClick={() => onView?.(listing)}
//                         icon={<EyeIcon className="h-5 w-5" />}
//                       />
//                       <Button
//                         variant="ghost"
//                         size="sm"
//                         onClick={() => onEdit?.(listing)}
//                         icon={<PencilIcon className="h-5 w-5" />}
//                       />
//                       {listing.active ? (
//                         <Button
//                           variant="ghost"
//                           size="sm"
//                           onClick={() => onDeactivate?.(listing.id)}
//                           icon={<BanIcon className="h-5 w-5" />}
//                         />
//                       ) : (
//                         <Button
//                           variant="ghost"
//                           size="sm"
//                           onClick={() => onApprove?.(listing.id)}
//                           icon={<CheckCircleIcon className="h-5 w-5" />}
//                         />
//                       )}
//                       <Button
//                         variant="ghost"
//                         size="sm"
//                         onClick={() => window.open(`/listings/${listing.id}`, '_blank')}
//                         icon={<ArrowTopRightOnSquareIcon className="h-5 w-5" />}
//                       />
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </Card>

//       {/* Pagination */}
//       <Pagination
//         currentPage={currentPage}
//         totalPages={10} // TODO: Calculate based on total items
//         onPageChange={setCurrentPage}
//       />
//     </div>
//   );
// };

import React, { useState, useEffect, useMemo } from 'react';
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
  XCircleIcon,
  EyeIcon,
  PencilIcon,
  NoSymbolIcon,
  ArrowTopRightOnSquareIcon
} from '@heroicons/react/24/outline';
import { Spinner } from '@components/common/Spinner';

interface DropdownOption {
  value: string;
  label: string;
}

interface AdminListingsProps {
  onApprove?: (listingId: number) => void;
  onReject?: (listingId: number) => void;
  onView?: (listing: Listing) => void;
  onEdit?: (listing: Listing) => void;
  onDeactivate?: (listingId: number) => void;
  itemsPerPage?: number;
}

export const AdminListings: React.FC<AdminListingsProps> = ({
  onApprove,
  onReject,
  onView,
  onEdit,
  onDeactivate,
  itemsPerPage: initialItemsPerPage = 10
}) => {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [itemsPerPage] = useState(initialItemsPerPage);

  useEffect(() => {
    fetchListings();
  }, [currentPage, searchTerm, statusFilter, categoryFilter]);

  const fetchListings = async () => {
    setLoading(true);
    setError(null);
    try {
      // TODO: Replace with actual API call
      // const response = await adminApi.getListings({ 
      //   page: currentPage, 
      //   search: searchTerm, 
      //   status: statusFilter, 
      //   category: categoryFilter 
      // });
      // setListings(response.data.listings);
      
      // Mock data with status field
      const mockListings: Listing[] = Array.from({ length: 50 }, (_, i) => {
        const statuses = ['active', 'inactive', 'pending'] as const;
        const randomStatus = statuses[Math.floor(Math.random() * statuses.length)] as "active" | "inactive" | "pending";
        const categories = ['Пшениця', 'Кукурудза', 'Соя', 'Картопля'];
        const randomCategory = categories[Math.floor(Math.random() * categories.length)];
        
        return {
          id: i + 1,
          title: `Оголошення ${i + 1}`,
          description: `Опис оголошення ${i + 1}`,
          price: Math.floor(Math.random() * 10000) + 1000,
          location: `Місто ${i + 1}`,
          category: randomCategory,
          categoryId: Math.floor(Math.random() * 10) + 1,
          userId: Math.floor(Math.random() * 100) + 1,
          createdAt: new Date(Date.now() - Math.floor(Math.random() * 30) * 86400000).toISOString(),
          updatedAt: new Date().toISOString(),
          active: randomStatus === 'active',
          status: randomStatus,
          images: ['https://via.placeholder.com/150'],
          views: Math.floor(Math.random() * 1000),
          user: {
            id: i + 1,
            name: `Користувач ${i + 1}`,
            avatar: undefined,
          },
        };
      });
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      setListings(mockListings);
    } catch (err) {
      console.error('Failed to fetch listings:', err);
      setError('Не вдалося завантажити оголошення. Спробуйте ще раз.');
    } finally {
      setLoading(false);
    }
  };

  const filteredListings = useMemo(() => 
    listings.filter(listing => {
      const matchesSearch = listing.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        listing.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = !statusFilter || 
        (statusFilter === 'active' && listing.active) ||
        (statusFilter === 'inactive' && !listing.active) ||
        (statusFilter === 'pending' && listing.status === 'pending');
      
      const matchesCategory = !categoryFilter || 
        listing.category.toLowerCase() === categoryFilter.toLowerCase();
      
      return matchesSearch && matchesStatus && matchesCategory;
    }),
    [listings, searchTerm, statusFilter, categoryFilter]
  );

  const totalPages = Math.ceil(filteredListings.length / itemsPerPage);
  const paginatedListings = useMemo(() => 
    filteredListings.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    ),
    [filteredListings, currentPage, itemsPerPage]
  );

  const statusOptions: DropdownOption[] = [
    { value: '', label: 'Всі статуси' },
    { value: 'active', label: 'Активні' },
    { value: 'inactive', label: 'Неактивні' },
    { value: 'pending', label: 'На розгляді' },
  ];

  const categoryOptions: DropdownOption[] = [
    { value: '', label: 'Всі категорії' },
    { value: 'пшениця', label: 'Пшениця' },
    { value: 'кукурудза', label: 'Кукурудза' },
    { value: 'соя', label: 'Соя' },
    { value: 'картопля', label: 'Картопля' },
  ];

  const getStatusBadge = (listing: Listing) => {
    switch (listing.status) {
      case 'active':
        return <Badge variant="success">Активне</Badge>;
      case 'inactive':
        return <Badge variant="warning">Неактивне</Badge>;
      case 'pending':
        return <Badge variant="info">На розгляді</Badge>;
      default:
        return <Badge variant="secondary">Невідомо</Badge>;
    }
  };

  const handleAction = <T extends unknown[]>(callback: ((...args: T) => void) | undefined, ...args: T) => {
    if (callback) callback(...args);
  };

  if (loading && !listings.length) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <Card>
        <div className="text-center py-8 text-red-500">
          {error}
          <Button 
            variant="primary" 
            className="mt-4"
            onClick={fetchListings}
          >
            Спробувати знову
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex flex-wrap gap-4">
        <div className="flex-1 min-w-[300px]">
          <Input
            placeholder="Пошук оголошень..."
            value={searchTerm}
            onChange={(e) => {
              setCurrentPage(1);
              setSearchTerm(e.target.value);
            }}
            icon={<MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />}
            aria-label="Пошук оголошень"
          />
        </div>
        <div className="w-48">
          <Dropdown
            options={statusOptions}
            value={statusFilter}
            onChange={(value) => {
              setCurrentPage(1);
              setStatusFilter(value);
            }}
            placeholder="Фільтр за статусом"
            aria-label="Фільтр за статусом"
          />
        </div>
        <div className="w-48">
          <Dropdown
            options={categoryOptions}
            value={categoryFilter}
            onChange={(value) => {
              setCurrentPage(1);
              setCategoryFilter(value);
            }}
            placeholder="Фільтр за категорією"
            aria-label="Фільтр за категорією"
          />
        </div>
      </div>

      {/* Listings Table */}
      <Card>
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
              {paginatedListings.length > 0 ? (
                paginatedListings.map((listing) => (
                  <tr key={listing.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="h-16 w-16 flex-shrink-0">
                          <img
                            className="h-16 w-16 rounded object-cover"
                            src={listing.images[0] || 'https://via.placeholder.com/64'}
                            alt={`Зображення оголошення ${listing.title}`}
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
                      {getStatusBadge(listing)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{formatDate(listing.createdAt)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleAction(onView, listing)}
                          icon={<EyeIcon className="h-5 w-5" />}
                          aria-label="Переглянути"
                        />
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleAction(onEdit, listing)}
                          icon={<PencilIcon className="h-5 w-5" />}
                          aria-label="Редагувати"
                        />
                        {listing.status === 'pending' ? (
                          <>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleAction(onApprove, listing.id)}
                              icon={<CheckCircleIcon className="h-5 w-5 text-green-500" />}
                              aria-label="Затвердити"
                            />
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleAction(onReject, listing.id)}
                              icon={<XCircleIcon className="h-5 w-5 text-red-500" />}
                              aria-label="Відхилити"
                            />
                          </>
                        ) : listing.active ? (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleAction(onDeactivate, listing.id)}
                            icon={<NoSymbolIcon className="h-5 w-5 text-orange-500" />}
                            aria-label="Деактивувати"
                          />
                        ) : (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleAction(onApprove, listing.id)}
                            icon={<CheckCircleIcon className="h-5 w-5 text-green-500" />}
                            aria-label="Активувати"
                          />
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => window.open(`/listings/${listing.id}`, '_blank')}
                          icon={<ArrowTopRightOnSquareIcon className="h-5 w-5" />}
                          aria-label="Відкрити в новій вкладці"
                        />
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="px-6 py-4 text-center text-gray-500">
                    Оголошень не знайдено
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
};