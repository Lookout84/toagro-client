import React, { useRef } from 'react';
import { Button } from '@components/common/Button';
import { PhotoIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { listingsApi } from '@api/listingsApi';

interface ImageUploaderProps {
  images: string[];
  onChange: (images: string[]) => void;
  maxImages?: number;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  images,
  onChange,
  maxImages = 5,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = React.useState(false);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    setIsUploading(true);
    try {
      const fileArray = Array.from(files);
      const remainingSlots = maxImages - images.length;
      const filesToUpload = fileArray.slice(0, remainingSlots);

      const response = await listingsApi.uploadImages(filesToUpload);
      const newImageUrls = response.data.imageUrls || [];
      onChange([...images, ...newImageUrls]);
    } catch (error) {
      console.error('Failed to upload images:', error);
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleRemoveImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    onChange(newImages);
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Фотографії (до {maxImages})
      </label>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mb-4">
        {images.map((image, index) => (
          <div key={index} className="relative group">
            <img
              src={image}
              alt={`Preview ${index + 1}`}
              className="w-full h-32 object-cover rounded-lg"
            />
            <button
              type="button"
              onClick={() => handleRemoveImage(index)}
              className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <XMarkIcon className="h-4 w-4" />
            </button>
          </div>
        ))}
        
        {images.length < maxImages && (
          <div className="border-2 border-dashed border-gray-300 rounded-lg h-32 flex items-center justify-center">
            <Button
              type="button"
              variant="ghost"
              onClick={() => fileInputRef.current?.click()}
              isLoading={isUploading}
              icon={<PhotoIcon className="h-6 w-6" />}
            >
              Додати фото
            </Button>
          </div>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={handleFileSelect}
      />
      
      <p className="text-sm text-gray-500">
        Рекомендований розмір: 1200x800 пікселів. Максимальний розмір файлу: 5MB
      </p>
    </div>
  );
};