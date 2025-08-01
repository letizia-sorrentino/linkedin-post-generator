import React from 'react';
import { Heart } from 'lucide-react';

interface FooterProps {
  darkMode: boolean;
}

export const Footer: React.FC<FooterProps> = ({ darkMode }) => {
  return (
    <footer className="mt-auto py-6 px-4 border-t border-gray-200 dark:border-gray-700">
      <div className="max-w-4xl mx-auto text-center">
        <div className="flex items-center justify-center gap-2 text-gray-600 dark:text-gray-400">
          <span>Developed with</span>
          <Heart className="w-4 h-4 text-red-500 fill-current" />
          <span>by</span>
          <span className="font-semibold text-blue-600 dark:text-blue-400">
            Letizia S.
          </span>
        </div>
      </div>
    </footer>
  );
}; 