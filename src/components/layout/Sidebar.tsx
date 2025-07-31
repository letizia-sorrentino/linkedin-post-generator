import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Home, 
  FileText, 
  Heart, 
  History, 
  Settings, 
  Menu, 
  X,
  Sparkles,
  BarChart3,
  Lightbulb,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

interface SidebarProps {
  darkMode: boolean;
  onToggleTheme: () => void;
  postsGeneratedToday: number;
  draftsCount: number;
  favoritesCount: number;
  activeSection: string;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  darkMode,
  onToggleTheme,
  postsGeneratedToday,
  draftsCount,
  favoritesCount,
  activeSection,
  isCollapsed,
  onToggleCollapse
}) => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigationItems = [
    {
      id: 'home',
      label: 'Generator',
      icon: Home,
      badge: null
    },
    {
      id: 'drafts',
      label: 'Drafts',
      icon: FileText,
      badge: draftsCount
    },
    {
      id: 'favorites',
      label: 'Favorites',
      icon: Heart,
      badge: favoritesCount
    },
    {
      id: 'history',
      label: 'Recent URLs',
      icon: History,
      badge: null
    },
    {
      id: 'stats',
      label: 'Statistics',
      icon: BarChart3,
      badge: postsGeneratedToday
    },
    {
      id: 'tips',
      label: 'Tips',
      icon: Lightbulb,
      badge: null
    }
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleNavigation = (section: string) => {
    // Map section to route
    const routeMap: { [key: string]: string } = {
      'home': '/',
      'drafts': '/drafts',
      'favorites': '/favorites',
      'history': '/history',
      'stats': '/stats',
      'tips': '/tips'
    };
    
    const route = routeMap[section];
    if (route) {
      navigate(route);
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={toggleMobileMenu}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 hover:bg-white dark:hover:bg-gray-800 transition-all duration-200"
      >
        {isMobileMenuOpen ? (
          <X className="w-6 h-6 text-gray-600 dark:text-gray-300" />
        ) : (
          <Menu className="w-6 h-6 text-gray-600 dark:text-gray-300" />
        )}
      </button>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={toggleMobileMenu}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed left-0 top-0 h-full z-40 transform transition-transform duration-300 ease-in-out lg:relative lg:z-auto lg:transform-none ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0`}
      >
        <div className={`h-full bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-r border-gray-200 dark:border-gray-700 shadow-xl transition-all duration-300 ${
          isCollapsed ? 'w-16' : 'w-64'
        } ${isCollapsed ? 'bg-gray-50/95 dark:bg-gray-800/95' : ''}`}>
          {/* Header */}
          <div className={`border-b border-gray-200 dark:border-gray-700 ${isCollapsed ? 'p-2' : 'p-6'}`}>
            {isCollapsed ? (
              <div className="flex flex-col items-center gap-4">
                <Sparkles className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                <button
                  onClick={onToggleCollapse}
                  className="p-2 rounded-lg bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                  title="Expand sidebar"
                >
                  <ChevronRight className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                </button>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Sparkles className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                    <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                      LinkedIn Generator
                    </h1>
                  </div>
                  <button
                    onClick={onToggleCollapse}
                    className="p-2 rounded-lg bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                    title="Collapse sidebar"
                  >
                    <ChevronLeft className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                  </button>
                </div>
                
                {/* Theme Toggle */}
                <button
                  onClick={onToggleTheme}
                  className="w-full flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                >
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Theme
                  </span>
                  {darkMode ? (
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-500">Light</span>
                      <div className="w-8 h-4 bg-blue-600 rounded-full relative">
                        <div className="absolute right-1 top-0.5 w-3 h-3 bg-white rounded-full"></div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-4 bg-gray-300 rounded-full relative">
                        <div className="absolute left-1 top-0.5 w-3 h-3 bg-white rounded-full"></div>
                      </div>
                      <span className="text-xs text-gray-500">Dark</span>
                    </div>
                  )}
                </button>
              </>
            )}
          </div>

          {/* Navigation */}
          <nav className={isCollapsed ? 'p-2' : 'p-4'}>
            <ul className="space-y-2">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.id;
                
                return (
                  <li key={item.id}>
                    <button
                      onClick={() => handleNavigation(item.id)}
                      className={`w-full flex items-center justify-between p-3 rounded-lg transition-all duration-200 ${
                        isActive
                          ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-700'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                      }`}
                      title={isCollapsed ? item.label : undefined}
                    >
                      {isCollapsed ? (
                        <div className="flex flex-col items-center gap-1">
                          <Icon className="w-5 h-5" />
                          {item.badge !== null && item.badge > 0 && (
                            <span className="px-1 py-0.5 text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full min-w-[16px] h-4 flex items-center justify-center">
                              {item.badge}
                            </span>
                          )}
                        </div>
                      ) : (
                        <>
                          <div className="flex items-center gap-3">
                            <Icon className="w-5 h-5" />
                            <span className="font-medium">{item.label}</span>
                          </div>
                          {item.badge !== null && item.badge > 0 && (
                            <span className="px-2 py-1 text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full">
                              {item.badge}
                            </span>
                          )}
                        </>
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Footer */}
          <div className={`absolute bottom-0 left-0 right-0 border-t border-gray-200 dark:border-gray-700 ${isCollapsed ? 'p-2' : 'p-4'}`}>
            <div className="text-center">
              {isCollapsed ? (
                <div className="flex flex-col items-center gap-1">
                  <BarChart3 className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                  <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                    {postsGeneratedToday}
                  </span>
                </div>
              ) : (
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Posts Today: {postsGeneratedToday}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}; 