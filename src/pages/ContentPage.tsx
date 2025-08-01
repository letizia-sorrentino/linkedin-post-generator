import React, { useState } from "react";
import { useDrafts } from "../hooks/useDrafts";
import { useFavorites } from "../hooks/useFavorites";
import { useNotifications } from "../hooks/useNotifications";
import { Notification } from "../components/ui/Notification";
import { PageHeader } from "../components/layout/PageHeader";
import { 
  FileText, 
  Heart, 
  Trash2, 
  Copy, 
  Download, 
  Calendar, 
  Star,
  FolderOpen
} from "lucide-react";

interface ContentPageProps {
  darkMode: boolean;
}

export const ContentPage: React.FC<ContentPageProps> = ({ darkMode }) => {
  const { drafts, deleteDraft, loadDraft } = useDrafts();
  const { favorites, deleteFavorite, loadFavorite } = useFavorites();
  const { notifications, showNotification, dismissNotification } = useNotifications();

  const [activeTab, setActiveTab] = useState<'drafts' | 'favorites'>('drafts');

  const handleLoadDraft = (draft: any) => {
    loadDraft(draft);
    showNotification("Draft loaded successfully!");
  };

  const handleDeleteDraft = (draft: any) => {
    deleteDraft(draft);
    showNotification("Draft deleted successfully!");
  };

  const handleCopyDraft = async (content: string) => {
    try {
      await navigator.clipboard.writeText(content);
      showNotification("Draft copied to clipboard!");
    } catch (err) {
      showNotification("Failed to copy draft", "error");
    }
  };

  const handleExportDraft = (draft: any) => {
    const content = `LinkedIn Draft - ${draft.timestamp.toLocaleString()}\n\n${draft.content}\n\n${draft.url ? `Source: ${draft.url}` : ""}`;
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `linkedin-draft-${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showNotification("Draft exported successfully!");
  };

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

      <PageHeader
        title="My Posts"
        subtitle="Manage your drafts and favorite posts"
        icon={FolderOpen}
        darkMode={darkMode}
      />

      {/* Tab Navigation */}
      <div className="max-w-4xl mx-auto">
        <div className="flex border-b border-gray-200 dark:border-gray-700 mb-6">
          <button
            onClick={() => setActiveTab('drafts')}
            className={`px-6 py-3 font-medium transition-colors duration-200 ${
              activeTab === 'drafts'
                ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
          >
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Drafts ({drafts.length})
            </div>
          </button>
          <button
            onClick={() => setActiveTab('favorites')}
            className={`px-6 py-3 font-medium transition-colors duration-200 ${
              activeTab === 'favorites'
                ? 'text-red-600 dark:text-red-400 border-b-2 border-red-600 dark:border-red-400'
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
          >
            <div className="flex items-center gap-2">
              <Heart className="w-4 h-4" />
              Favorites ({favorites.length})
            </div>
          </button>
        </div>

        {/* Drafts Tab */}
        {activeTab === 'drafts' && (
          <div className="space-y-6">
            {drafts.length === 0 ? (
              <div className="text-center py-12">
                <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">
                  No drafts yet
                </h3>
                <p className="text-gray-500 dark:text-gray-500">
                  Generate some posts and save them as drafts to see them here.
                </p>
              </div>
            ) : (
              <div className="grid gap-6">
                {drafts.map((draft, index) => (
                  <div
                    key={index}
                    className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-xl transition-shadow duration-200"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                        <div>
                          <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                            Draft #{index + 1}
                          </h3>
                          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                            <Calendar className="w-4 h-4" />
                            <span>{draft.timestamp.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleCopyDraft(draft.content)}
                          className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
                          title="Copy to clipboard"
                        >
                          <Copy className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                        </button>
                        <button
                          onClick={() => handleExportDraft(draft)}
                          className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
                          title="Export draft"
                        >
                          <Download className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                        </button>
                        <button
                          onClick={() => handleDeleteDraft(draft)}
                          className="p-2 rounded-lg bg-red-100 dark:bg-red-900/30 hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors duration-200"
                          title="Delete draft"
                        >
                          <Trash2 className="w-4 h-4 text-red-600 dark:text-red-400" />
                        </button>
                      </div>
                    </div>

                    <div className="mb-4">
                      <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                        {draft.content}
                      </p>
                    </div>

                    {draft.url && (
                      <div className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                        <span className="font-medium">Source:</span> {draft.url}
                      </div>
                    )}

                    <div className="flex justify-end">
                      <button
                        onClick={() => handleLoadDraft(draft)}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors duration-200"
                      >
                        Load Draft
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Favorites Tab */}
        {activeTab === 'favorites' && (
          <div className="space-y-6">
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
        )}
      </div>
    </div>
  );
}; 