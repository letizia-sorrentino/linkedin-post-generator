import React from "react";
import { useRecentUrls } from "../hooks/useRecentUrls";
import { useNotifications } from "../hooks/useNotifications";
import { Notification } from "../components/ui/Notification";
import { History, Link, Copy, Trash2, ExternalLink, Clock } from "lucide-react";

interface HistoryPageProps {
  darkMode: boolean;
}

export const HistoryPage: React.FC<HistoryPageProps> = ({ darkMode }) => {
  const { recentUrls, addToRecentUrls, clearRecentUrls } = useRecentUrls();
  const { notifications, showNotification, dismissNotification } = useNotifications();

  const handleCopyUrl = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url);
      showNotification("URL copied to clipboard!");
    } catch (err) {
      showNotification("Failed to copy URL", "error");
    }
  };

  const handleOpenUrl = (url: string) => {
    window.open(url, '_blank');
  };

  const handleClearHistory = () => {
    clearRecentUrls();
    showNotification("History cleared successfully!");
  };

  return (
    <div className="space-y-8">
      {/* Notifications */}
      {notifications.map((notification) => (
        <Notification
          key={notification.id}
          notification={notification}
          onDismiss={dismissNotification}
        />
      ))}

      {/* Header */}
      <div className="text-center">
        <div className="flex items-center justify-center gap-3 mb-6">
          <History className="w-8 h-8 text-green-600 dark:text-green-400" />
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-400 dark:to-emerald-400 bg-clip-text text-transparent">
            Recent URLs
          </h1>
        </div>
        <p className="text-xl text-gray-700 dark:text-gray-300">
          Your recently used article URLs
        </p>
      </div>

      {/* History List */}
      <div className="max-w-4xl mx-auto">
        {recentUrls.length === 0 ? (
          <div className="text-center py-12">
            <History className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">
              No recent URLs
            </h3>
            <p className="text-gray-500 dark:text-gray-500">
              Generate some posts to see your URL history here.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Recent Articles ({recentUrls.length})
              </h3>
              <button
                onClick={handleClearHistory}
                className="px-3 py-1 text-sm bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors duration-200"
              >
                Clear History
              </button>
            </div>

            <div className="grid gap-4">
              {recentUrls.map((url, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-xl transition-shadow duration-200"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <Link className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0" />
                        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                          <Clock className="w-4 h-4" />
                          <span>Used {index + 1} time{index === 0 ? '' : 's'}</span>
                        </div>
                      </div>
                      <p className="text-gray-700 dark:text-gray-300 break-all">
                        {url}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 ml-4 flex-shrink-0">
                      <button
                        onClick={() => handleCopyUrl(url)}
                        className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
                        title="Copy URL"
                      >
                        <Copy className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                      </button>
                      <button
                        onClick={() => handleOpenUrl(url)}
                        className="p-2 rounded-lg bg-green-100 dark:bg-green-900/30 hover:bg-green-200 dark:hover:bg-green-900/50 transition-colors duration-200"
                        title="Open URL"
                      >
                        <ExternalLink className="w-4 h-4 text-green-600 dark:text-green-400" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}; 