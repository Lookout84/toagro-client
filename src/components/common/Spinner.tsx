import React from 'react';

export type SpinnerSize = 'sm' | 'md' | 'lg' | 'xl';

interface SpinnerProps {
  size?: SpinnerSize;
  color?: string;
  className?: string;
}

const sizeClasses = {
  sm: 'h-4 w-4',
  md: 'h-8 w-8',
  lg: 'h-12 w-12',
  xl: 'h-16 w-16',
};

export const Spinner: React.FC<SpinnerProps> = ({
  size = 'md',
  color = 'text-primary-green',
  className = '',
}) => {
  return (
    <div
      className={`animate-spin rounded-full border-2 border-solid border-current border-r-transparent ${sizeClasses[size]} ${color} ${className}`}
      role="status"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
};