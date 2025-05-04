import React from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
} from '@heroicons/react/24/solid';

export type AlertVariant = 'success' | 'error' | 'warning' | 'info';

interface AlertProps {
  variant: AlertVariant;
  title?: string;
  children: React.ReactNode;
  onClose?: () => void;
  closable?: boolean;
}

const alertStyles = {
  success: {
    container: 'bg-green-50 border-green-200 text-green-900',
    icon: 'text-green-400',
    title: 'text-green-800',
  },
  error: {
    container: 'bg-red-50 border-red-200 text-red-900',
    icon: 'text-red-400',
    title: 'text-red-800',
  },
  warning: {
    container: 'bg-yellow-50 border-yellow-200 text-yellow-900',
    icon: 'text-yellow-400',
    title: 'text-yellow-800',
  },
  info: {
    container: 'bg-blue-50 border-blue-200 text-blue-900',
    icon: 'text-blue-400',
    title: 'text-blue-800',
  },
};

const AlertIcons = {
  success: CheckCircleIcon,
  error: ExclamationCircleIcon,
  warning: ExclamationTriangleIcon,
  info: InformationCircleIcon,
};

export const Alert: React.FC<AlertProps> = ({
  variant = 'info',
  title,
  children,
  onClose,
  closable = false,
}) => {
  const styles = alertStyles[variant];
  const Icon = AlertIcons[variant];

  return (
    <div className={`rounded-lg border p-4 ${styles.container}`}>
      <div className="flex">
        <div className="flex-shrink-0">
          <Icon className={`h-5 w-5 ${styles.icon}`} />
        </div>
        <div className="ml-3 flex-1">
          {title && (
            <h3 className={`text-sm font-medium ${styles.title}`}>{title}</h3>
          )}
          <div className="mt-2 text-sm">{children}</div>
        </div>
        {closable && onClose && (
          <div className="ml-auto pl-3">
            <div className="-mx-1.5 -my-1.5">
              <button
                type="button"
                className={`inline-flex rounded-md p-1.5 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                  variant === 'info' ? 'focus:ring-blue-600' : `focus:ring-${variant}-600`
                }`}
                onClick={onClose}
              >
                <span className="sr-only">Dismiss</span>
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};