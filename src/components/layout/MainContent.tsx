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
    <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 dark:border-gray-700/20 p-8 mb-8">
      <UrlInput
        url={url}
        onUrlChange={onUrlChange}
        onGenerate={onGenerate}
        isLoading={isLoading}
        error={error}
      />

      {generatedPost && (
        <>
          <PostPreview 
            generatedPost={generatedPost} 
            showPreview={showPreview} 
          />
          
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

          <div className="grid lg:grid-cols-3 gap-6 mt-6">
            <div className="lg:col-span-2">
              {/* Post editor is already rendered above */}
            </div>
            <WordCloud generatedPost={generatedPost} />
          </div>
        </>
      )}
    </div>
  );
}; 