import React from 'react';
import { GeneratedPost } from '../../types';

interface PostPreviewProps {
  generatedPost: GeneratedPost | null;
  showPreview: boolean;
}

export const PostPreview: React.FC<PostPreviewProps> = ({ 
  generatedPost, 
  showPreview 
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
      <div className="text-gray-900 dark:text-white whitespace-pre-wrap leading-relaxed">
        {generatedPost.content}
      </div>
      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 flex items-center gap-6 text-sm text-gray-500 dark:text-gray-400">
        <span>👍 Like</span>
        <span>💬 Comment</span>
        <span>🔄 Repost</span>
        <span>📤 Send</span>
      </div>
    </div>
  );
}; 