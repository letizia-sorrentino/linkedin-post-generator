import React from 'react';
import { ChevronRight, Home } from 'lucide-react';
import { useLocation } from 'react-router-dom';

interface BreadcrumbProps {
  darkMode: boolean;
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ darkMode }) => {
  const location = useLocation();

  // Map routes to display names
  const getBreadcrumbItems = () => {
    const pathMap: { [key: string]: string } = {
      '/': 'Generator',
      '/content': 'My Posts',
      '/knowledge-base': 'Knowledge Base',
      '/stats': 'Analytics',
      '/tips': 'Tips & Strategies'
    };

    const pathname = location.pathname;
    const currentPage = pathMap[pathname] || 'Generator';
    
    // For root path, just show Generator
    if (pathname === '/') {
      return [{ label: 'Generator', path: '/', isActive: true }];
    }

    // For other paths, show Home > Current Page
    return [
      { label: 'Generator', path: '/', isActive: false },
      { label: currentPage, path: pathname, isActive: true }
    ];
  };

  const breadcrumbItems = getBreadcrumbItems();

  return (
    <nav className="mb-6" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2 text-sm">
        {breadcrumbItems.map((item, index) => (
          <li key={item.path} className="flex items-center">
            {index > 0 && (
              <ChevronRight className="w-4 h-4 mx-2 text-gray-400 dark:text-gray-500" />
            )}
            <div className="flex items-center space-x-1">
              {index === 0 && item.path === '/' && (
                <Home className="w-4 h-4 text-gray-500 dark:text-gray-400" />
              )}
              <span
                className={`font-medium transition-colors duration-200 ${
                  item.isActive
                    ? 'text-blue-600 dark:text-blue-400'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                {item.label}
              </span>
            </div>
          </li>
        ))}
      </ol>
    </nav>
  );
}; 