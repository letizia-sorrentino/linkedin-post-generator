import React from 'react';
import { BarChart3, FileText, Star } from 'lucide-react';

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
    <div className="flex justify-center gap-8 mb-8">
      <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
        <BarChart3 className="w-5 h-5" />
        <span className="font-medium">{postsGeneratedToday}</span>
        <span className="text-sm">posts generated today</span>
      </div>
      <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
        <FileText className="w-5 h-5" />
        <span className="font-medium">{draftsCount}</span>
        <span className="text-sm">saved drafts</span>
      </div>
      <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
        <Star className="w-5 h-5" />
        <span className="font-medium">{favoritesCount}</span>
        <span className="text-sm">favorites</span>
      </div>
    </div>
  );
}; 