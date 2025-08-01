import React, { useState, useCallback } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useTheme } from "./hooks/useTheme";
import { useNotifications } from "./hooks/useNotifications";
import { usePostsToday } from "./hooks/usePostsToday";
import { useDrafts } from "./hooks/useDrafts";
import { useFavorites } from "./hooks/useFavorites";

import { Sidebar } from "./components/layout/Sidebar";
import { Footer } from "./components/layout/Footer";
import { Notification } from "./components/ui/Notification";
import { GeneratorPage } from "./pages/GeneratorPage";
import { DraftsPage } from "./pages/DraftsPage";
import { FavoritesPage } from "./pages/FavoritesPage";
import { KnowledgeBasePage } from "./pages/KnowledgeBasePage";
import { HistoryPage } from "./pages/HistoryPage";
import { StatsPage } from "./pages/StatsPage";
import { TipsPage } from "./pages/TipsPage";

// Component to handle sidebar navigation based on current route
const SidebarWrapper: React.FC<{ darkMode: boolean; onToggleTheme: () => void }> = ({ 
  darkMode, 
  onToggleTheme 
}) => {
  const location = useLocation();
  const { postsGeneratedToday } = usePostsToday();
  const { drafts } = useDrafts();
  const { favorites } = useFavorites();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // Map route to active section
  const getActiveSection = () => {
    switch (location.pathname) {
      case '/':
        return 'home';
      case '/drafts':
        return 'drafts';
      case '/favorites':
        return 'favorites';
      case '/knowledge-base':
        return 'knowledge-base';
      case '/history':
        return 'history';
      case '/stats':
        return 'stats';
      case '/tips':
        return 'tips';
      default:
        return 'home';
    }
  };

  return (
    <Sidebar
      darkMode={darkMode}
      onToggleTheme={onToggleTheme}
      postsGeneratedToday={postsGeneratedToday}
      draftsCount={drafts.length}
      favoritesCount={favorites.length}

      activeSection={getActiveSection()}
      isCollapsed={isSidebarCollapsed}
      onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
    />
  );
};

function App() {
  // Custom hooks
  const { darkMode, toggleTheme } = useTheme();
  const { notifications, showNotification, dismissNotification } = useNotifications();

  return (
    <Router>
      <div
        className={`h-screen transition-colors duration-300 ${
          darkMode
            ? "dark bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"
            : "bg-gradient-to-br from-blue-50 via-white to-indigo-50"
        }`}
      >
        {/* Notifications */}
        {notifications.map((notification) => (
          <Notification
            key={notification.id}
            notification={notification}
            onDismiss={dismissNotification}
          />
        ))}

        <div className="flex h-screen">
          {/* Sidebar */}
          <SidebarWrapper darkMode={darkMode} onToggleTheme={toggleTheme} />

          {/* Main Content Area */}
          <div className="flex-1 overflow-auto flex flex-col">
            <div className="flex-1 container mx-auto px-4 py-8 pt-16 lg:pt-8 max-w-4xl lg:max-w-5xl">
              <Routes>
                <Route 
                  path="/" 
                  element={<GeneratorPage darkMode={darkMode} onToggleTheme={toggleTheme} />} 
                />
                <Route 
                  path="/drafts" 
                  element={<DraftsPage darkMode={darkMode} />} 
                />
                <Route 
                  path="/favorites" 
                  element={<FavoritesPage darkMode={darkMode} />} 
                />
                <Route 
                  path="/knowledge-base" 
                  element={<KnowledgeBasePage darkMode={darkMode} />} 
                />
                <Route 
                  path="/history" 
                  element={<HistoryPage darkMode={darkMode} />} 
                />
                <Route 
                  path="/stats" 
                  element={<StatsPage darkMode={darkMode} />} 
                />
                <Route 
                  path="/tips" 
                  element={<TipsPage darkMode={darkMode} />} 
                />
              </Routes>
            </div>
            <Footer darkMode={darkMode} />
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
