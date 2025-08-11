import React from 'react';

interface HeaderProps {
  darkMode: boolean;
  onToggleTheme: () => void;
}

export const Header: React.FC<HeaderProps> = ({ darkMode, onToggleTheme }) => {
  return (
    <div className="text-center mb-12">
      {/* Main Header Content */}
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-center gap-4 mb-6">
          <img src="/logo.svg" alt="PostSwift Logo" className="w-12 h-12" />
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
            PostSwift
          </h1>
        </div>
        
        <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-4 font-medium">
          Transform any article into engaging LinkedIn content
        </p>
        
        <p className="text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
          Paste any article URL and we'll create a professional LinkedIn post
          that engages your network and drives meaningful conversations.
        </p>
      </div>
    </div>
  );
}; 