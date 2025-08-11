import React from 'react';

interface LoadingScreenProps {
  message?: string;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ 
  message = "Loading PostSwift..." 
}) => {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center z-50">
      <div className="text-center">
        {/* Logo */}
        <div className="mb-8">
          <img src="/logo.svg" alt="PostSwift Logo" className="w-24 h-24 mx-auto animate-pulse" />
        </div>
        
        {/* Loading Text */}
        <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent mb-4">
          PostSwift
        </h2>
        
        {/* Loading Message */}
        <p className="text-gray-600 dark:text-gray-400 text-lg font-medium">
          {message}
        </p>
        
        {/* Loading Spinner */}
        <div className="mt-8">
          <div className="w-8 h-8 border-4 border-blue-200 dark:border-gray-700 border-t-blue-600 dark:border-t-blue-400 rounded-full animate-spin mx-auto"></div>
        </div>
      </div>
    </div>
  );
}; 