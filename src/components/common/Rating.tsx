import React from 'react';
import { StarIcon } from '@heroicons/react/24/solid';
import { StarIcon as StarOutlineIcon } from '@heroicons/react/24/outline';

interface RatingProps {
  value: number;
  onChange?: (value: number) => void;
  readonly?: boolean;
  size?: 'sm' | 'md' | 'lg';
  showValue?: boolean;
  className?: string;
}

const sizeClasses = {
  sm: 'h-4 w-4',
  md: 'h-5 w-5',
  lg: 'h-6 w-6',
};

export const Rating: React.FC<RatingProps> = ({
  value,
  onChange,
  readonly = false,
  size = 'md',
  showValue = false,
  className = '',
}) => {
  const [hoverValue, setHoverValue] = React.useState<number | null>(null);

  const getStarValue = (starIndex: number) => {
    const currentValue = hoverValue !== null && !readonly ? hoverValue : value;
    return currentValue > starIndex;
  };

  const handleMouseEnter = (starIndex: number) => {
    if (!readonly) {
      setHoverValue(starIndex + 1);
    }
  };

  const handleMouseLeave = () => {
    if (!readonly) {
      setHoverValue(null);
    }
  };

  const handleClick = (starIndex: number) => {
    if (!readonly && onChange) {
      onChange(starIndex + 1);
    }
  };

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      {[...Array(5)].map((_, index) => {
        const isFilled = getStarValue(index);
        const Icon = isFilled ? StarIcon : StarOutlineIcon;
        
        return (
          <button
            key={index}
            type="button"
            onClick={() => handleClick(index)}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
            className={`${!readonly ? 'cursor-pointer hover:scale-110' : 'cursor-default'} transition-transform`}
            disabled={readonly}
          >
            <Icon className={`${sizeClasses[size]} ${isFilled ? 'text-yellow-400' : 'text-gray-300'}`} />
          </button>
        );
      })}
      {showValue && (
        <span className="ml-2 text-sm font-medium text-gray-600">
          {value.toFixed(1)}
        </span>
      )}
    </div>
  );
};