import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@components/common/Card';
import { Button } from '@components/common/Button';
import { Badge } from '@components/common/Badge';
import { Modal } from '@components/common/Modal';
import { Listing } from '@types/listing.types';
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
                          alt={`Preview ${index + 1}`name}</span>
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