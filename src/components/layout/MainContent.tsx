import React from 'react';
import { GeneratedPost } from '../../types';
import { UrlInput } from '../features/UrlInput';
import { PostEditor } from '../features/PostEditor';
import { PostPreview } from '../features/PostPreview';
import { WordCloud } from '../features/WordCloud';

interface MainContentProps {
  url: string;
  onUrlChange: (url: string) => void;
  onGenerate: () => void;
  isLoading: boolean;
  error: string;
  generatedPost: GeneratedPost | null;
  onContentChange: (content: string) => void;
  onCopy: () => void;
  onSaveDraft: () => void;
  onAddToFavorites: () => void;
  onExport: () => void;
  onGenerateVariation: () => void;
  onTogglePreview: () => void;
  showPreview: boolean;
  darkMode: boolean;
}

export const MainContent: React.FC<MainContentProps> = ({
  url,
  onUrlChange,
  onGenerate,
  isLoading,
  error,
  generatedPost,
  onContentChange,
  onCopy,
  onSaveDraft,
  onAddToFavorites,
  onExport,
  onGenerateVariation,
  onTogglePreview,
  showPreview,
}) => {
  return (
    <div className="space-y-6">
      {/* URL Input Section - Full width with enhanced styling */}
      <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 dark:border-gray-700/20 p-6">
        <UrlInput
          url={url}
          onUrlChange={onUrlChange}
          onGenerate={onGenerate}
          isLoading={isLoading}
          error={error}
        />
      </div>

      {generatedPost && (
        <>
          {/* Post Preview - Full width when shown */}
          {showPreview && (
            <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 dark:border-gray-700/20 p-6">
              <PostPreview 
                generatedPost={generatedPost} 
                showPreview={showPreview} 
              />
            </div>
          )}
          
          {/* Post Editor and Word Cloud - Responsive grid layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Post Editor - Takes 2/3 of space on large screens */}
            <div className="lg:col-span-2">
              <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 dark:border-gray-700/20 p-6">
                <PostEditor
                  generatedPost={generatedPost}
                  onContentChange={onContentChange}
                  onCopy={onCopy}
                  onSaveDraft={onSaveDraft}
                  onAddToFavorites={onAddToFavorites}
                  onExport={onExport}
                  onGenerateVariation={onGenerateVariation}
                  onTogglePreview={onTogglePreview}
                  showPreview={showPreview}
                />
              </div>
            </div>
            
            {/* Word Cloud - Takes 1/3 of space on large screens */}
            <div className="lg:col-span-1">
              <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 dark:border-gray-700/20 p-6 h-fit">
                <WordCloud generatedPost={generatedPost} />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}; 