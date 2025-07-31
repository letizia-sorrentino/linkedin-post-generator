import { useState, useCallback } from 'react';
import { Notification, NotificationType } from '../types';

export const useNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const showNotification = useCallback((
    message: string,
    type: NotificationType = "success",
    duration: number = 3000
  ) => {
    const id = Date.now().toString();
    const notification: Notification = { message, type, id };
    
    setNotifications(prev => [...prev, notification]);

    // Auto-dismiss after duration
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, duration);
  }, []);

  const dismissNotification = useCallback((id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  }, []);

  return {
    notifications,
    showNotification,
    dismissNotification,
  };
}; 