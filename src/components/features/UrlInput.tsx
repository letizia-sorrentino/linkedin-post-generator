import React from 'react';
import { ExternalLink, Loader2, AlertCircle } from 'lucide-react';

interface UrlInputProps {
  url: string;
  onUrlChange: (url: string) => void;
  onGenerate: () => void;
  isLoading: boolean;
  error: string;
}

export const UrlInput: React.FC<UrlInputProps> = ({
  url,
  onUrlChange,
  onGenerate,
  isLoading,
  error,
}) => {
  return (
    <div className="mb-8">
      <label
        htmlFor="url"
        className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3"
      >
        Article URL
      </label>
      <div className="flex gap-3">
        <div className="flex-1">
          <input
            id="url"
            type="url"
            value={url}
            onChange={(e) => onUrlChange(e.target.value)}
            placeholder="Paste article URL here (HBR, TechCrunch, industry blogs, etc.)"
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 bg-white dark:bg-gray-700"
            disabled={isLoading}
          />
          {error && (
            <div className="flex items-center gap-2 mt-2 text-red-600 dark:text-red-400 text-sm">
              <AlertCircle className="w-4 h-4" />
              {error}
            </div>
          )}
        </div>
        <button
          onClick={onGenerate}
          disabled={isLoading}
          className="px-8 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold rounded-lg transition-all duration-200 flex items-center gap-2 whitespace-nowrap shadow-lg hover:shadow-xl"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <ExternalLink className="w-5 h-5" />
              Generate Post
            </>
          )}
        </button>
      </div>
    </div>
  );
}; 