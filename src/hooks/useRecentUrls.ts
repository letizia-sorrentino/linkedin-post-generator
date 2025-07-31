import { useState, useEffect, useCallback } from 'react';
import { RecentUrl } from '../types';
import { storageService } from '../services/storage';

export const useRecentUrls = () => {
  const [recentUrls, setRecentUrls] = useState<RecentUrl[]>([]);

  useEffect(() => {
    // Load recent URLs from localStorage on mount
    const savedUrls = storageService.getRecentUrls();
    setRecentUrls(savedUrls);
  }, []);

  useEffect(() => {
    // Save recent URLs to localStorage whenever they change
    storageService.setRecentUrls(recentUrls);
  }, [recentUrls]);

  const addToRecentUrls = useCallback((newUrl: string) => {
    const newRecentUrl: RecentUrl = { 
      url: newUrl, 
      timestamp: new Date() 
    };
    setRecentUrls(prev => [newRecentUrl, ...prev.slice(0, 4)]);
  }, []);

  return {
    recentUrls,
    addToRecentUrls,
  };
}; 