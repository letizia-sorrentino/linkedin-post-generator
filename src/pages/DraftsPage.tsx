import React from "react";
import { useDrafts } from "../hooks/useDrafts";
import { useNotifications } from "../hooks/useNotifications";
import { Notification } from "../components/ui/Notification";
import { FileText, Trash2, Copy, Download, Calendar } from "lucide-react";

interface DraftsPageProps {
  darkMode: boolean;
}

export const DraftsPage: React.FC<DraftsPageProps> = ({ darkMode }) => {
  const { drafts, deleteDraft, loadDraft } = useDrafts();
  const { notifications, showNotification, dismissNotification } = useNotifications();

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
          <FileText className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
            Drafts
          </h1>
        </div>
        <p className="text-xl text-gray-700 dark:text-gray-300">
          Your saved LinkedIn post drafts
        </p>
      </div>

      {/* Drafts List */}
      <div className="max-w-4xl mx-auto">
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
    </div>
  );
}; 