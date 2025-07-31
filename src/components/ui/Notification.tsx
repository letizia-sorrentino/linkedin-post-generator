import React from 'react';
import { CheckCircle, AlertCircle, X } from 'lucide-react';
import { Notification as NotificationType } from '../../types';

interface NotificationProps {
  notification: NotificationType;
  onDismiss: (id: string) => void;
}

export const Notification: React.FC<NotificationProps> = ({ notification, onDismiss }) => {
  const isSuccess = notification.type === 'success';
  
  return (
    <div className="fixed top-4 right-4 z-50 flex items-center gap-2 bg-white dark:bg-gray-800 border border-green-200 dark:border-green-700 text-green-800 dark:text-green-200 px-4 py-3 rounded-lg shadow-lg animate-in slide-in-from-top-2">
      {isSuccess ? (
        <CheckCircle className="w-5 h-5" />
      ) : (
        <AlertCircle className="w-5 h-5 text-red-500" />
      )}
      <span className="flex-1">{notification.message}</span>
      <button
        onClick={() => onDismiss(notification.id)}
        className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}; 