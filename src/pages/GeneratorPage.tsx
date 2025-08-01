import React, { useState, useCallback } from "react";
import { useTheme } from "../hooks/useTheme";
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
    generatedPost,
    isLoading,
    error,
    generatePost,
    generateVariation,
    updatePostContent,
    clearError,
  } = usePostGeneration();
  const { drafts, saveDraft, loadDraft, deleteDraft } = useDrafts();
  const { favorites, addToFavorites, loadFavorite, deleteFavorite } = useFavorites();
  const { recentUrls, addToRecentUrls } = useRecentUrls();
  const { postsGeneratedToday, incrementPostsToday } = usePostsToday();

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
    if (!generatedPost) return;

    try {
      await navigator.clipboard.writeText(generatedPost.content);
      showNotification("Copied to clipboard!");
    } catch (err) {
      showNotification("Failed to copy to clipboard", "error");
    }
  }, [generatedPost, showNotification]);

  const handleSaveDraft = useCallback(() => {
    if (!generatedPost) return;
    saveDraft(generatedPost);
    showNotification("Draft saved successfully!");
  }, [generatedPost, saveDraft, showNotification]);

  const handleAddToFavorites = useCallback(() => {
    if (!generatedPost) return;
    addToFavorites(generatedPost);
    showNotification("Added to favorites!");
  }, [generatedPost, addToFavorites, showNotification]);

  const handleExportPost = useCallback(() => {
    if (!generatedPost) return;

    const content = `LinkedIn Post - Generated ${generatedPost.timestamp.toLocaleString()}\n\n${
      generatedPost.content
    }\n\n${generatedPost.url ? `Source: ${generatedPost.url}` : ""}`;
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `linkedin-post-${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showNotification("Post exported successfully!");
  }, [generatedPost, showNotification]);



  const handleUrlSelect = useCallback((selectedUrl: string) => {
    setUrl(selectedUrl);
    clearError();
  }, [setUrl, clearError]);

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

      <Header darkMode={darkMode} onToggleTheme={onToggleTheme} />

      <MainContent
        url={url}
        onUrlChange={setUrl}
        onGenerate={handleGeneratePost}
        isLoading={isLoading}
        error={error}
        generatedPost={generatedPost}
        onContentChange={updatePostContent}
        onCopy={handleCopyToClipboard}
        onSaveDraft={handleSaveDraft}
        onAddToFavorites={handleAddToFavorites}
        onExport={handleExportPost}
        onGenerateVariation={handleGenerateVariation}
        onTogglePreview={() => setShowPreview(!showPreview)}
        showPreview={showPreview}
        darkMode={darkMode}
      />

      <RecentUrls
        recentUrls={recentUrls}
        onUrlSelect={handleUrlSelect}
      />
    </div>
  );
}; 