import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@components/common/Card';
import { Button } from '@components/common/Button';
import { Badge } from '@components/common/Badge';
import { Modal } from '@components/common/Modal';
import { Listing } from '../../types/listing.types';
import { formatCurrency, formatDate } from '@utils/formatters';
import { useAppSelector } from '@store/hooks';
import {
  MapPinIcon,
  ClockIcon,
  EyeIcon,
  TagIcon,
  PencilIcon,
  TrashIcon,
  ChatBubbleLeftRightIcon,
} from '@heroicons/react/24/outline';

interface ListingDetailsProps {
  listing: Listing;
  onEdit?: () => void;
  onDelete?: () => void;
}

export const ListingDetails: React.FC<ListingDetailsProps> = ({
  listing,
  onEdit,
  onDelete,
}) => {
  const navigate = useNavigate();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { user } = useAppSelector((state) => state.auth);
  
  const isOwner = user?.id === listing.userId;

  const handleContactSeller = () => {
    navigate(`/chat/${listing.user.id}`, { state: { listing } });
  };

  const handleDelete = () => {
    if (onDelete) {
      onDelete();
      setShowDeleteModal(false);
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Images */}
        <div className="lg:col-span-2">
          <Card padding="none">
            {listing.images && listing.images.length > 0 ? (
              <div>
                <div className="aspect-w-16 aspect-h-9">
                  <img
                    src={listing.images[currentImageIndex]}
                    alt={listing.title}
                    className="w-full h-96 object-cover rounded-lg"
                  />
                </div>
                {listing.images.length > 1 && (
                  <div className="grid grid-cols-5 gap-2 mt-4 p-4">
                    {listing.images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`aspect-w-16 aspect-h-9 border-2 rounded ${
                          currentImageIndex === index
                            ? 'border-primary-green'
                            : 'border-transparent'
                        }`}
                      >
                        <img
                          src={image}
                          alt={`Preview ${index + 1}`}
                          className="w-full h-20 object-cover rounded"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="h-96 flex items-center justify-center bg-gray-100 rounded-lg">
                <p className="text-gray-500">Немає зображень</p>
              </div>
            )}
          </Card>
        </div>

        {/* Details */}
        <div className="lg:col-span-1">
          <Card className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">{listing.title}</h1>
            
            <div className="flex items-center gap-2 mb-4">
              <TagIcon className="h-5 w-5 text-gray-400" />
              <Badge variant="secondary">{listing.category}</Badge>
            </div>

            <p className="text-3xl font-bold text-primary-green mb-6">
              {formatCurrency(listing.price)}
            </p>

            <div className="space-y-4 mb-6">
              <div className="flex items-center gap-2 text-gray-600">
                <MapPinIcon className="h-5 w-5" />
                <span>{listing.location}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <ClockIcon className="h-5 w-5" />
                <span>{formatDate(listing.createdAt)}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <EyeIcon className="h-5 w-5" />
                <span>{listing.views} переглядів</span>
              </div>
            </div>

            {isOwner ? (
              <div className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full"
                  icon={<PencilIcon className="h-5 w-5" />}
                  onClick={onEdit}
                >
                  Редагувати
                </Button>
                <Button
                  variant="outline"
                  className="w-full text-red-600 border-red-300 hover:bg-red-50"
                  icon={<TrashIcon className="h-5 w-5" />}
                  onClick={() => setShowDeleteModal(true)}
                >
                  Видалити
                </Button>
              </div>
            ) : (
              <Button
                variant="primary"
                className="w-full"
                icon={<ChatBubbleLeftRightIcon className="h-5 w-5" />}
                onClick={handleContactSeller}
              >
                Написати продавцю
              </Button>
            )}
          </Card>

          {/* Seller Info */}
          <Card>
            <h2 className="text-lg font-semibold mb-4">Продавець</h2>
            <div className="flex items-center gap-4">
              {listing.user.avatar ? (
                <img
                  src={listing.user.avatar}
                  alt={listing.user.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
              ) : (
                <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-500 text-lg">{listing.user.name[0]}</span>
                </div>
              )}
              <div>
                <h3 className="font-medium">{listing.user.name}</h3>
                <p className="text-sm text-gray-500">На платформі з {formatDate(listing.createdAt)}</p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Description */}
      <Card className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Опис</h2>
        <div className="prose max-w-none">
          <p className="whitespace-pre-wrap">{listing.description}</p>
        </div>
      </Card>

      {/* Delete Modal */}
      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Видалити оголошення"
      >
        <p className="text-gray-500 mb-6">
          Ви впевнені, що хочете видалити це оголошення? Цю дію не можна скасувати.
        </p>
        <div className="flex justify-end gap-4">
          <Button variant="outline" onClick={() => setShowDeleteModal(false)}>
            Скасувати
          </Button>
          <Button variant="primary" onClick={handleDelete}>
            Видалити
          </Button>
        </div>
      </Modal>
    </>
  );
};