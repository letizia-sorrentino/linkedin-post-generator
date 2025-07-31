import { useState, useEffect, useCallback } from 'react';
import { storageService } from '../services/storage';

export const usePostsToday = () => {
  const [postsGeneratedToday, setPostsGeneratedToday] = useState(0);

  useEffect(() => {
    // Load posts today from localStorage on mount
    const { date, count } = storageService.getPostsToday();
    const today = new Date().toDateString();
    
    if (date === today) {
      setPostsGeneratedToday(count);
    } else {
      // Reset counter for new day
      storageService.setPostsToday(today, 0);
      setPostsGeneratedToday(0);
    }
  }, []);

  useEffect(() => {
    // Save posts today to localStorage whenever it changes
    const today = new Date().toDateString();
    storageService.setPostsToday(today, postsGeneratedToday);
  }, [postsGeneratedToday]);

  const incrementPostsToday = useCallback(() => {
    setPostsGeneratedToday(prev => prev + 1);
  }, []);

  return {
    postsGeneratedToday,
    incrementPostsToday,
  };
}; 