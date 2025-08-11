import React, { useState, useCallback } from "react";
import { useNotifications } from "../hooks/useNotifications";
import { usePostGeneration } from "../hooks/usePostGeneration";
import { useDrafts } from "../hooks/useDrafts";
import { useFavorites } from "../hooks/useFavorites";
import { useRecentUrls } from "../hooks/useRecentUrls";
import { usePostsToday } from "../hooks/usePostsToday";

import { Header } from "../components/layout/Header";
import { MainContent } from "../components/layout/MainContent";
import { RecentUrls } from "../components/features/RecentUrls";
import { Notification } from "../components/ui/Notification";

interface GeneratorPageProps {
  darkMode: boolean;
  onToggleTheme: () => void;
}

export const GeneratorPage: React.FC<GeneratorPageProps> = ({ darkMode, onToggleTheme }) => {
  // Custom hooks
  const { notifications, showNotification, dismissNotification } = useNotifications();
  const {
    url,
    setUrl,
    currentPost,
    isLoading,
    error,
    includeAttribution,
    generatePost,
    generateVariation,
    generateDummyPost,
    updatePostContent,
    toggleAttribution,
    clearError,
  } = usePostGeneration();
  const { saveDraft } = useDrafts();
  const { addToFavorites } = useFavorites();
  const { recentUrls, addToRecentUrls } = useRecentUrls();
  const { incrementPostsToday } = usePostsToday();

  // UI state
  const [showPreview, setShowPreview] = useState(false);

  // Event handlers
  const handleGeneratePost = useCallback(async () => {
    const result = await generatePost();
    if (result) {
      addToRecentUrls(url);
      incrementPostsToday();
      showNotification("LinkedIn post generated successfully!");
    }
  }, [generatePost, url, addToRecentUrls, incrementPostsToday, showNotification]);

  const handleGenerateVariation = useCallback(async () => {
    const result = await generateVariation();
    if (result) {
      showNotification("New variation generated!");
    }
  }, [generateVariation, showNotification]);

  const handleCopyToClipboard = useCallback(async () => {
    if (!currentPost) return;

    try {
      let contentToCopy = currentPost.content;
      
      if (includeAttribution && currentPost.attributionText) {
        contentToCopy += "\n\n" + currentPost.attributionText;
      }
      
      await navigator.clipboard.writeText(contentToCopy);
      showNotification("Copied to clipboard!");
    } catch {
      showNotification("Failed to copy to clipboard", "error");
    }
  }, [currentPost, includeAttribution, showNotification]);

  const handleSaveDraft = useCallback(() => {
    if (!currentPost) return;
    saveDraft(currentPost);
    showNotification("Draft saved successfully!");
  }, [currentPost, saveDraft, showNotification]);

  const handleAddToFavorites = useCallback(() => {
    if (!currentPost) return;
    addToFavorites(currentPost);
    showNotification("Added to favorites!");
  }, [currentPost, addToFavorites, showNotification]);

  const handleExportPost = useCallback(() => {
    if (!currentPost) return;

    let content = `LinkedIn Post - Generated ${currentPost.timestamp.toLocaleString()}\n\n${
      currentPost.content
    }`;
    
    if (includeAttribution && currentPost.attributionText) {
      content += `\n\n${currentPost.attributionText}`;
    }
    
    content += `\n\n${currentPost.url ? `Source: ${currentPost.url}` : ""}`;
    
    const blob = new Blob([content], { type: "text/plain" });
    const downloadUrl = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = downloadUrl;
    a.download = `linkedin-post-${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(downloadUrl);
    showNotification("Post exported successfully!");
  }, [currentPost, includeAttribution, showNotification]);

  const handleUrlSelect = useCallback((selectedUrl: string) => {
    setUrl(selectedUrl);
    clearError();
  }, [setUrl, clearError]);

  const handleGenerateDummy = useCallback(async () => {
    const post = generateDummyPost();
    if (post) {
      addToRecentUrls(post.url || "");
      incrementPostsToday();
      showNotification("Dummy post generated successfully!");
    }
  }, [generateDummyPost, addToRecentUrls, incrementPostsToday, showNotification]);

  return (
    <div className="space-y-8">
      {notifications.map((notification) => (
        <Notification
          key={notification.id}
          notification={notification}
          onDismiss={dismissNotification}
        />
      ))}

      <Header darkMode={darkMode} onToggleTheme={onToggleTheme} />

      {/* Test Button */}
      <div className="flex justify-center">
        <button
          onClick={handleGenerateDummy}
          disabled={isLoading}
          className="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Generate Test Post
        </button>
      </div>

      <MainContent
        url={url}
        onUrlChange={setUrl}
        onGenerate={handleGeneratePost}
        isLoading={isLoading}
        error={error}
        generatedPost={currentPost}
        onContentChange={updatePostContent}
        onCopy={handleCopyToClipboard}
        onSaveDraft={handleSaveDraft}
        onAddToFavorites={handleAddToFavorites}
        onExport={handleExportPost}
        onGenerateVariation={handleGenerateVariation}
        onTogglePreview={() => setShowPreview(!showPreview)}
        showPreview={showPreview}
        includeAttribution={includeAttribution}
        onToggleAttribution={toggleAttribution}
        darkMode={darkMode}
      />

      <RecentUrls
        recentUrls={recentUrls}
        onUrlSelect={handleUrlSelect}
      />
    </div>
  );
}; 
