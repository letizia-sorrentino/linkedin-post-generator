import { useState, useEffect, useCallback } from 'react';
import { FavoritePost, GeneratedPost } from '../types';
import { storageService } from '../services/storage';
import { truncateText } from '../utils';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<FavoritePost[]>([]);

  useEffect(() => {
    // Load favorites from localStorage on mount
    const savedFavorites = storageService.getFavorites();
    setFavorites(savedFavorites);
  }, []);

  useEffect(() => {
    // Save favorites to localStorage whenever they change
    storageService.setFavorites(favorites);
  }, [favorites]);

  const addToFavorites = useCallback((post: GeneratedPost) => {
    const title = truncateText(post.content, 50);
    const favorite: FavoritePost = {
      id: Date.now().toString(),
      content: post.content,
      timestamp: new Date(),
      url: post.url,
      title: title,
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
      includeAttribution: true, // Default to true for loaded favorites
      attributionText: favorite.url ? `Source: ${favorite.url}` : undefined,
      isTruncated: false,
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