import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@components/common/Input';
import { Button } from '@components/common/Button';
import { Card } from '@components/common/Card';
import { Dropdown } from '@components/common/Dropdown';
import { ImageUploader } from './ImageUploader';
import { Category } from '../../types/category.types';
import { Listing, CreateListingData, UpdateListingData } from '../../types/listing.types';
import { useAppDispatch } from '@store/hooks';
import { createListing, updateListing } from '@store/slices/listingsSlice';

interface ListingFormProps {
  listing?: Listing;
  categories: Category[];
  onCancel?: () => void;
}

export const ListingForm: React.FC<ListingFormProps> = ({ listing, categories, onCancel }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: listing?.title || '',
    description: listing?.description || '',
    price: listing?.price || '',
    location: listing?.location || '',
    category: listing?.category || '',
    categoryId: listing?.categoryId || '',
    images: listing?.images || [],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCategoryChange = (value: string) => {
    const categoryId = value ? parseInt(value) : undefined;
    const category = categories.find((cat) => cat.id === categoryId);
    setFormData((prev) => ({
      ...prev,
      categoryId: categoryId?.toString() || '',
      category: category?.name || '',
    }));
  };

  const handleImagesChange = (images: string[]) => {
    setFormData((prev) => ({ ...prev, images }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const data: CreateListingData | UpdateListingData = {
        title: formData.title,
        description: formData.description,
        price: Number(formData.price),
        location: formData.location,
        category: formData.category,
        categoryId: formData.categoryId ? Number(formData.categoryId) : undefined,
        images: formData.images,
      };

      if (listing) {
        await dispatch(updateListing({ id: listing.id, data })).unwrap();
        navigate(`/listings/${listing.id}`);
      } else {
        const result = await dispatch(createListing(data as CreateListingData)).unwrap();
        navigate(`/listings/${result.listing.id}`);
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || 'Помилка при збереженні оголошення');
      } else {
        setError('Помилка при збереженні оголошення');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          label="Назва оголошення"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          placeholder="Наприклад: Продам пшеницю озиму"
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Опис</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows={5}
            className="w-full rounded-md border border-gray-300 p-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-green/50 focus:border-primary-green"
            placeholder="Детальний опис вашого товару"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Ціна (грн)"
            name="price"
            type="number"
            value={formData.price}
            onChange={handleChange}
            required
            min="0"
            step="0.01"
          />

          <Input
            label="Локація"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
            placeholder="Місто, область"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Категорія</label>
          <Dropdown
            options={categories.map((cat) => ({ value: cat.id.toString(), label: cat.name }))}
            value={formData.categoryId?.toString() || ''}
            onChange={handleCategoryChange}
            placeholder="Оберіть категорію"
          />
        </div>

        <ImageUploader images={formData.images} onChange={handleImagesChange} maxImages={5} />

        {error && <div className="text-red-500 text-sm">{error}</div>}

        <div className="flex justify-end gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => (onCancel ? onCancel() : navigate(-1))}
          >
            Скасувати
          </Button>
          <Button type="submit" isLoading={isSubmitting} disabled={isSubmitting}>
            {listing ? 'Оновити оголошення' : 'Створити оголошення'}
          </Button>
        </div>
      </form>
    </Card>
  );
};
