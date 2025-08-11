import React from 'react';
import { GeneratedPost } from '../../types';
import { Link } from 'lucide-react';

interface PostPreviewProps {
  generatedPost: GeneratedPost | null;
  showPreview: boolean;
  includeAttribution: boolean;
}

export const PostPreview: React.FC<PostPreviewProps> = ({ 
  generatedPost, 
  showPreview,
  includeAttribution
}) => {
  if (!showPreview || !generatedPost) return null;

  return (
    <div className="mb-6 p-6 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
      <div className="flex items-start gap-3 mb-4">
        <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
          YN
        </div>
        <div>
          <h4 className="font-semibold text-gray-900 dark:text-white">
            Your Name
          </h4>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Your Title • Now
          </p>
        </div>
      </div>
      
      {/* Post Content */}
      <div className="text-gray-900 dark:text-white whitespace-pre-wrap leading-relaxed">
        {generatedPost.content}
      </div>
      
      {/* Source Attribution */}
      {includeAttribution && generatedPost.attributionText && (
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2 mb-2">
            <Link className="w-4 h-4 text-gray-500 dark:text-gray-400" />
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Source Attribution
            </span>
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400 whitespace-pre-line">
            {generatedPost.attributionText}
          </div>
          {generatedPost.isTruncated && (
            <div className="mt-2 text-xs text-orange-600 dark:text-orange-400 flex items-center gap-1">
              ⚠️ Post was truncated to fit with attribution
            </div>
          )}
        </div>
      )}
      
      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 flex items-center gap-6 text-sm text-gray-500 dark:text-gray-400">
        <span>👍 Like</span>
        <span>💬 Comment</span>
        <span>🔄 Repost</span>
        <span>📤 Send</span>
      </div>
    </div>
  );
}; 