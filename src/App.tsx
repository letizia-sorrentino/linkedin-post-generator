import React, { useState, useCallback } from "react";
import { useTheme } from "./hooks/useTheme";
import { useNotifications } from "./hooks/useNotifications";
import { usePostGeneration } from "./hooks/usePostGeneration";
import { useDrafts } from "./hooks/useDrafts";
import { useFavorites } from "./hooks/useFavorites";
import { useRecentUrls } from "./hooks/useRecentUrls";
import { usePostsToday } from "./hooks/usePostsToday";

import { Header } from "./components/layout/Header";
import { StatsBar } from "./components/layout/StatsBar";
import { MainContent } from "./components/layout/MainContent";
import { Sidebar } from "./components/layout/Sidebar";
import { ActionButtons } from "./components/features/ActionButtons";
import { DraftsPanel } from "./components/features/DraftsPanel";
import { FavoritesPanel } from "./components/features/FavoritesPanel";
import { RecentUrls } from "./components/features/RecentUrls";
import { TipsSection } from "./components/features/TipsSection";
import { Notification } from "./components/ui/Notification";

function App() {
  // Custom hooks
  const { darkMode, toggleTheme } = useTheme();
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
  const [showDrafts, setShowDrafts] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

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

  const handleLoadDraft = useCallback((draft: any) => {
    const loadedPost = loadDraft(draft);
    // Update the post generation state
    // This would need to be handled differently in a more sophisticated state management setup
    showNotification("Draft loaded!");
    setShowDrafts(false);
  }, [loadDraft, showNotification]);

  const handleLoadFavorite = useCallback((favorite: any) => {
    const loadedPost = loadFavorite(favorite);
    // Update the post generation state
    // This would need to be handled differently in a more sophisticated state management setup
    showNotification("Favorite loaded!");
    setShowFavorites(false);
  }, [loadFavorite, showNotification]);

  const handleUrlSelect = useCallback((selectedUrl: string) => {
    setUrl(selectedUrl);
    clearError();
  }, [setUrl, clearError]);

  const handleNavigation = useCallback((section: string) => {
    setActiveSection(section);
    
    // Handle specific section actions
    switch (section) {
      case 'drafts':
        setShowDrafts(true);
        setShowFavorites(false);
        break;
      case 'favorites':
        setShowFavorites(true);
        setShowDrafts(false);
        break;
      case 'home':
      default:
        setShowDrafts(false);
        setShowFavorites(false);
        break;
    }
  }, []);

  return (
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
        <Sidebar
          darkMode={darkMode}
          onToggleTheme={toggleTheme}
          postsGeneratedToday={postsGeneratedToday}
          draftsCount={drafts.length}
          favoritesCount={favorites.length}
          onNavigate={handleNavigation}
          activeSection={activeSection}
          isCollapsed={isSidebarCollapsed}
          onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        />

        {/* Main Content Area */}
        <div className="flex-1 overflow-auto">
          <div className="container mx-auto px-4 py-8 pt-16 lg:pt-8 max-w-4xl lg:max-w-5xl">
            <Header darkMode={darkMode} onToggleTheme={() => {}} />
            
            <StatsBar
              postsGeneratedToday={postsGeneratedToday}
              draftsCount={drafts.length}
              favoritesCount={favorites.length}
            />

            <ActionButtons
              draftsCount={drafts.length}
              favoritesCount={favorites.length}
              onToggleDrafts={() => setShowDrafts(!showDrafts)}
              onToggleFavorites={() => setShowFavorites(!showFavorites)}
            />

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
            />

            <DraftsPanel
              drafts={drafts}
              showDrafts={showDrafts}
              onToggleDrafts={() => setShowDrafts(false)}
              onLoadDraft={handleLoadDraft}
              onDeleteDraft={deleteDraft}
            />

            <FavoritesPanel
              favorites={favorites}
              showFavorites={showFavorites}
              onToggleFavorites={() => setShowFavorites(false)}
              onLoadFavorite={handleLoadFavorite}
              onDeleteFavorite={deleteFavorite}
            />

            <RecentUrls
              recentUrls={recentUrls}
              onUrlSelect={handleUrlSelect}
            />

            <TipsSection />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
