import React from "react";
import { useFavorites } from "../hooks/useFavorites";
import { useNotifications } from "../hooks/useNotifications";
import { Notification } from "../components/ui/Notification";
import { Heart, Trash2, Copy, Download, Calendar, Star } from "lucide-react";

interface FavoritesPageProps {
  darkMode: boolean;
}

export const FavoritesPage: React.FC<FavoritesPageProps> = ({ darkMode }) => {
  const { favorites, deleteFavorite, loadFavorite } = useFavorites();
  const { notifications, showNotification, dismissNotification } = useNotifications();

  const handleLoadFavorite = (favorite: any) => {
    loadFavorite(favorite);
    showNotification("Favorite loaded successfully!");
  };

  const handleDeleteFavorite = (favorite: any) => {
    deleteFavorite(favorite);
    showNotification("Favorite removed successfully!");
  };

  const handleCopyFavorite = async (content: string) => {
    try {
      await navigator.clipboard.writeText(content);
      showNotification("Favorite copied to clipboard!");
    } catch (err) {
      showNotification("Failed to copy favorite", "error");
    }
  };

  const handleExportFavorite = (favorite: any) => {
    const content = `LinkedIn Favorite - ${favorite.timestamp.toLocaleString()}\n\n${favorite.content}\n\n${favorite.url ? `Source: ${favorite.url}` : ""}`;
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `linkedin-favorite-${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showNotification("Favorite exported successfully!");
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
          <Heart className="w-8 h-8 text-red-600 dark:text-red-400" />
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-red-600 to-pink-600 dark:from-red-400 dark:to-pink-400 bg-clip-text text-transparent">
            Favorites
          </h1>
        </div>
        <p className="text-xl text-gray-700 dark:text-gray-300">
          Your favorite LinkedIn posts
        </p>
      </div>

      {/* Favorites List */}
      <div className="max-w-4xl mx-auto">
        {favorites.length === 0 ? (
          <div className="text-center py-12">
            <Heart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">
              No favorites yet
            </h3>
            <p className="text-gray-500 dark:text-gray-500">
              Generate some posts and add them to favorites to see them here.
            </p>
          </div>
        ) : (
          <div className="grid gap-6">
            {favorites.map((favorite, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-xl transition-shadow duration-200 relative"
              >
                <div className="absolute top-4 right-4">
                  <Star className="w-5 h-5 text-yellow-500 fill-current" />
                </div>

                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Heart className="w-5 h-5 text-red-600 dark:text-red-400" />
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                        Favorite #{index + 1}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                        <Calendar className="w-4 h-4" />
                        <span>{favorite.timestamp.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleCopyFavorite(favorite.content)}
                      className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
                      title="Copy to clipboard"
                    >
                      <Copy className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                    </button>
                    <button
                      onClick={() => handleExportFavorite(favorite)}
                      className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
                      title="Export favorite"
                    >
                      <Download className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                    </button>
                    <button
                      onClick={() => handleDeleteFavorite(favorite)}
                      className="p-2 rounded-lg bg-red-100 dark:bg-red-900/30 hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors duration-200"
                      title="Remove from favorites"
                    >
                      <Trash2 className="w-4 h-4 text-red-600 dark:text-red-400" />
                    </button>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                    {favorite.content}
                  </p>
                </div>

                {favorite.url && (
                  <div className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                    <span className="font-medium">Source:</span> {favorite.url}
                  </div>
                )}

                <div className="flex justify-end">
                  <button
                    onClick={() => handleLoadFavorite(favorite)}
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors duration-200"
                  >
                    Load Favorite
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}; 