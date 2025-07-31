import React from 'react';
import { BarChart3, FileText, Star, TrendingUp } from 'lucide-react';

interface StatsBarProps {
  postsGeneratedToday: number;
  draftsCount: number;
  favoritesCount: number;
}

export const StatsBar: React.FC<StatsBarProps> = ({ 
  postsGeneratedToday, 
  draftsCount, 
  favoritesCount 
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-md rounded-xl border border-white/20 dark:border-gray-700/20 p-4 text-center hover:shadow-lg transition-all duration-200">
        <div className="flex items-center justify-center gap-2 mb-2">
          <TrendingUp className="w-5 h-5 text-green-600 dark:text-green-400" />
          <span className="text-2xl font-bold text-gray-900 dark:text-white">
            {postsGeneratedToday}
          </span>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
          Posts Generated Today
        </p>
      </div>
      
      <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-md rounded-xl border border-white/20 dark:border-gray-700/20 p-4 text-center hover:shadow-lg transition-all duration-200">
        <div className="flex items-center justify-center gap-2 mb-2">
          <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <span className="text-2xl font-bold text-gray-900 dark:text-white">
            {draftsCount}
          </span>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
          Saved Drafts
        </p>
      </div>
      
      <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-md rounded-xl border border-white/20 dark:border-gray-700/20 p-4 text-center hover:shadow-lg transition-all duration-200">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Star className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
          <span className="text-2xl font-bold text-gray-900 dark:text-white">
            {favoritesCount}
          </span>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
          Favorites
        </p>
      </div>
    </div>
  );
}; 