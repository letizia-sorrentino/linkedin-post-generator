import React from 'react';
import { Moon, Sun } from 'lucide-react';

interface HeaderProps {
  darkMode: boolean;
  onToggleTheme: () => void;
}

export const Header: React.FC<HeaderProps> = ({ darkMode, onToggleTheme }) => {
  return (
    <div className="text-center mb-12 relative">
      <button
        onClick={onToggleTheme}
        className="absolute top-0 right-0 p-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
      >
        {darkMode ? (
          <Sun className="w-5 h-5 text-yellow-500" />
        ) : (
          <Moon className="w-5 h-5 text-gray-600" />
        )}
      </button>
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
        Article to LinkedIn Post Generator
      </h1>
      <p className="text-xl text-gray-600 dark:text-gray-300 mb-4">
        Transform any article into engaging LinkedIn content
      </p>
      <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
        Paste any article URL and we'll create a professional LinkedIn post
        that engages your network and drives meaningful conversations.
      </p>
    </div>
  );
}; 