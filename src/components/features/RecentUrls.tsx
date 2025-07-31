import React from 'react';
import { History } from 'lucide-react';
import { RecentUrl } from '../../types';

interface RecentUrlsProps {
  recentUrls: RecentUrl[];
  onUrlSelect: (url: string) => void;
}

export const RecentUrls: React.FC<RecentUrlsProps> = ({ 
  recentUrls, 
  onUrlSelect 
}) => {
  if (recentUrls.length === 0) return null;

  return (
    <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-200 dark:border-gray-700 p-6">
      <div className="flex items-center gap-2 mb-4">
        <History className="w-5 h-5 text-gray-600 dark:text-gray-300" />
        <h3 className="font-semibold text-gray-900 dark:text-white">
          Recent URLs
        </h3>
      </div>
      <div className="space-y-2">
        {recentUrls.map((item, index) => (
          <button
            key={index}
            onClick={() => onUrlSelect(item.url)}
            className="w-full text-left p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200 border border-gray-100 dark:border-gray-600"
          >
            <div className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 truncate">
              {item.url}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {item.timestamp.toLocaleString()}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}; 