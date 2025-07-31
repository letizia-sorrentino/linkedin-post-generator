import React from 'react';
import { FileText, Star } from 'lucide-react';

interface ActionButtonsProps {
  draftsCount: number;
  favoritesCount: number;
  onToggleDrafts: () => void;
  onToggleFavorites: () => void;
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({
  draftsCount,
  favoritesCount,
  onToggleDrafts,
  onToggleFavorites,
}) => {
  return (
    <div className="flex justify-center gap-4 mb-8">
      <button
        onClick={onToggleDrafts}
        className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-white rounded-lg transition-colors duration-200"
      >
        <FileText className="w-4 h-4" />
        Drafts ({draftsCount})
      </button>
      <button
        onClick={onToggleFavorites}
        className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-white rounded-lg transition-colors duration-200"
      >
        <Star className="w-4 h-4" />
        Favorites ({favoritesCount})
      </button>
    </div>
  );
}; 