import React from 'react';
import { Breadcrumb } from './Breadcrumb';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  icon: React.ComponentType<any>;
  darkMode: boolean;
}

export const PageHeader: React.FC<PageHeaderProps> = ({ 
  title, 
  subtitle, 
  icon: Icon, 
  darkMode 
}) => {
  return (
    <div className="space-y-6">
      {/* Breadcrumb Navigation */}
      <Breadcrumb darkMode={darkMode} />
      
      {/* Page Header */}
      <div className="text-center">
        <div className="flex items-center justify-center gap-3 mb-6">
          <Icon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
            {title}
          </h1>
        </div>
        {subtitle && (
          <p className="text-xl text-gray-700 dark:text-gray-300">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}; 