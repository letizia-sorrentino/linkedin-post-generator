import React from 'react';
import { Trash2, Star } from 'lucide-react';
import { FavoritePost } from '../../types';

interface FavoritesPanelProps {
  favorites: FavoritePost[];
  showFavorites: boolean;
  onToggleFavorites: () => void;
  onLoadFavorite: (favorite: FavoritePost) => void;
  onDeleteFavorite: (id: string) => void;
}

export const FavoritesPanel: React.FC<FavoritesPanelProps> = ({
  favorites,
  showFavorites,
  onToggleFavorites,
  onLoadFavorite,
  onDeleteFavorite,
}) => {
  if (!showFavorites) return null;

  return (
    <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 dark:border-gray-700/20 p-6 mb-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Favorite Posts
        </h3>
        <button
          onClick={onToggleFavorites}
          className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
        >
          ✕
        </button>
      </div>
      {favorites.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400 text-center py-8">
          No favorite posts yet
        </p>
      ) : (
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {favorites.map((favorite) => (
            <div
              key={favorite.id}
              className="flex items-start justify-between p-4 bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 transition-colors"
            >
              <div
                className="flex-1 cursor-pointer"
                onClick={() => onLoadFavorite(favorite)}
              >
                <div className="flex items-center gap-2 mb-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <h4 className="font-medium text-gray-900 dark:text-white">
                    {favorite.title}
                  </h4>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-2 line-clamp-2">
                  {favorite.content.substring(0, 100)}...
                </p>
                <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                  <span>{favorite.timestamp.toLocaleString()}</span>
                  {favorite.url && (
                    <span className="truncate max-w-xs">
                      {favorite.url}
                    </span>
                  )}
                </div>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteFavorite(favorite.id);
                }}
                className="ml-4 p-2 text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900 rounded-lg transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}; 