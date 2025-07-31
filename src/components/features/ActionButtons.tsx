import React from 'react';
import { FileText, Star, ChevronDown } from 'lucide-react';

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
        className="flex items-center gap-3 px-6 py-3 bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 text-gray-900 dark:text-white rounded-xl transition-all duration-200 shadow-md hover:shadow-lg group"
      >
        <div className="flex items-center gap-2">
          <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <span className="font-medium">Drafts</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs font-bold px-2 py-1 rounded-full">
            {draftsCount}
          </span>
          <ChevronDown className="w-4 h-4 text-gray-500 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
        </div>
      </button>
      
      <button
        onClick={onToggleFavorites}
        className="flex items-center gap-3 px-6 py-3 bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 hover:border-yellow-500 dark:hover:border-yellow-400 hover:bg-yellow-50 dark:hover:bg-yellow-900/20 text-gray-900 dark:text-white rounded-xl transition-all duration-200 shadow-md hover:shadow-lg group"
      >
        <div className="flex items-center gap-2">
          <Star className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
          <span className="font-medium">Favorites</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 text-xs font-bold px-2 py-1 rounded-full">
            {favoritesCount}
          </span>
          <ChevronDown className="w-4 h-4 text-gray-500 group-hover:text-yellow-600 dark:group-hover:text-yellow-400 transition-colors" />
        </div>
      </button>
    </div>
  );
}; 