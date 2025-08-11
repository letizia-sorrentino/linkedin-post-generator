import { useState, useEffect, useCallback } from 'react';
import { FavoritePost, GeneratedPost } from '../types';
import { storageService } from '../services/storage';
import { truncateText } from '../utils';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<FavoritePost[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Load favorites from localStorage on mount
    try {
      console.log('Loading favorites from localStorage...');
      const savedFavorites = storageService.getFavorites();
      console.log('Loaded favorites:', savedFavorites);
      setFavorites(savedFavorites);
      setIsLoaded(true);
    } catch (error) {
      console.error('Error loading favorites:', error);
      setFavorites([]);
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    // Only save favorites to localStorage after initial load
    if (isLoaded) {
      storageService.setFavorites(favorites);
    }
  }, [favorites, isLoaded]);

  const addToFavorites = useCallback((post: GeneratedPost) => {
    const title = truncateText(post.content, 50);
    const favorite: FavoritePost = {
      id: Date.now().toString(),
      content: post.content,
      timestamp: new Date(),
      url: post.url,
      title: title,
      includeAttribution: post.includeAttribution,
      attributionText: post.attributionText,
      isTruncated: post.isTruncated,
    };

    setFavorites(prev => [favorite, ...prev]);
    return favorite;
  }, []);

  const loadFavorite = useCallback((favorite: FavoritePost): GeneratedPost => {
    return {
      id: favorite.id,
      content: favorite.content,
      timestamp: favorite.timestamp,
      url: favorite.url,
      includeAttribution: favorite.includeAttribution ?? true,
      attributionText: favorite.attributionText,
      isTruncated: favorite.isTruncated ?? false,
    };
  }, []);

  const deleteFavorite = useCallback((id: string) => {
    setFavorites(prev => prev.filter(favorite => favorite.id !== id));
  }, []);

  return {
    favorites,
    addToFavorites,
    loadFavorite,
    deleteFavorite,
  };
}; 
