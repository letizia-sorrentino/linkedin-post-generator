import React, { useState, useEffect, useRef } from 'react';
import { Copy, Save, Star, Download, Eye, Smile, MoreHorizontal } from 'lucide-react';
import { GeneratedPost } from '../../types';
import { MAX_CHARS, EMOJI_CATEGORIES } from '../../constants';
import { getCharacterCountColor, getCharacterCountBg } from '../../utils';

interface PostEditorProps {
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

export const PostEditor: React.FC<PostEditorProps> = ({
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
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showMoreActions, setShowMoreActions] = useState(false);
  const emojiPickerRef = useRef<HTMLDivElement>(null);
  const moreActionsRef = useRef<HTMLDivElement>(null);

  // Click outside handlers
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target as Node)) {
        setShowEmojiPicker(false);
      }
      if (moreActionsRef.current && !moreActionsRef.current.contains(event.target as Node)) {
        setShowMoreActions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  if (!generatedPost) return null;

  const insertEmoji = (emoji: string) => {
    const textarea = document.querySelector("textarea") as HTMLTextAreaElement;
    if (textarea) {
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const newContent =
        generatedPost.content.substring(0, start) +
        emoji +
        generatedPost.content.substring(end);

      onContentChange(newContent);

      // Restore cursor position after emoji
      setTimeout(() => {
        textarea.focus();
        textarea.setSelectionRange(start + emoji.length, start + emoji.length);
      }, 0);
    }

    setShowEmojiPicker(false);
  };

  return (
    <div className="space-y-6">
      {/* Header with title and character count */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Generated LinkedIn Post
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Edit and customize your post content
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span
            className={`text-sm px-3 py-1 rounded-full font-medium ${getCharacterCountBg(
              generatedPost.content.length
            )} ${getCharacterCountColor(generatedPost.content.length)}`}
          >
            {generatedPost.content.length}/{MAX_CHARS}
          </span>
        </div>
      </div>

      {/* Action Buttons - Responsive design */}
      <div className="flex flex-wrap gap-2">
        {/* Primary Actions */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={onCopy}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 text-white rounded-lg transition-all duration-200 flex items-center gap-2 text-sm font-medium shadow-md hover:shadow-lg"
          >
            <Copy className="w-4 h-4" />
            Copy
          </button>
          <button
            onClick={onExport}
            className="px-4 py-2 text-purple-600 dark:text-purple-400 border border-purple-200 dark:border-purple-700 hover:bg-purple-50 dark:hover:bg-purple-900 rounded-lg transition-all duration-200 flex items-center gap-2 text-sm font-medium"
          >
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>

        {/* Secondary Actions */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={onTogglePreview}
            className="px-4 py-2 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-700 hover:bg-indigo-50 dark:hover:bg-indigo-900 rounded-lg transition-all duration-200 flex items-center gap-2 text-sm font-medium"
          >
            <Eye className="w-4 h-4" />
            {showPreview ? "Hide Preview" : "Preview"}
          </button>
          <button
            onClick={onGenerateVariation}
            className="px-4 py-2 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-700 hover:bg-blue-50 dark:hover:bg-blue-900 rounded-lg transition-all duration-200 text-sm font-medium"
          >
            Generate Variation
          </button>
        </div>

        {/* More Actions Dropdown */}
        <div className="relative" ref={moreActionsRef}>
          <button
            onClick={() => setShowMoreActions(!showMoreActions)}
            className="px-4 py-2 text-gray-600 dark:text-gray-400 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-all duration-200 flex items-center gap-2 text-sm font-medium"
          >
            <MoreHorizontal className="w-4 h-4" />
            More
          </button>
          {showMoreActions && (
            <div className="absolute top-full right-0 mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg z-10">
              <div className="py-2">
                <button
                  onClick={() => {
                    onSaveDraft();
                    setShowMoreActions(false);
                  }}
                  className="w-full px-4 py-2 text-left text-sm text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900 flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  Save Draft
                </button>
                <button
                  onClick={() => {
                    onAddToFavorites();
                    setShowMoreActions(false);
                  }}
                  className="w-full px-4 py-2 text-left text-sm text-yellow-600 dark:text-yellow-400 hover:bg-yellow-50 dark:hover:bg-yellow-900 flex items-center gap-2"
                >
                  <Star className="w-4 h-4" />
                  Add to Favorites
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Text Editor */}
      <div className="relative">
        {/* Emoji Picker */}
        <div className="flex items-center gap-2 mb-3" ref={emojiPickerRef}>
          <button
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            className="flex items-center gap-1 px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg transition-colors"
          >
            <Smile className="w-4 h-4" />
            Emojis
          </button>
          {showEmojiPicker && (
            <div className="absolute top-8 left-0 z-20 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg p-4 w-80 max-h-64 overflow-y-auto">
              <div className="space-y-3">
                {Object.entries(EMOJI_CATEGORIES).map(
                  ([category, emojis]) => (
                    <div key={category}>
                      <h4 className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-2">
                        {category}
                      </h4>
                      <div className="flex flex-wrap gap-1">
                        {emojis.map((emoji) => (
                          <button
                            key={emoji}
                            onClick={() => insertEmoji(emoji)}
                            className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors text-lg"
                            title={emoji}
                          >
                            {emoji}
                          </button>
                        ))}
                      </div>
                    </div>
                  )
                )}
              </div>
              <button
                onClick={() => setShowEmojiPicker(false)}
                className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
              >
                ✕
              </button>
            </div>
          )}
        </div>

        {/* Textarea */}
        <textarea
          value={generatedPost.content}
          onChange={(e) => onContentChange(e.target.value)}
          className="w-full h-80 p-4 border border-gray-300 dark:border-gray-600 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 dark:text-white leading-relaxed bg-white dark:bg-gray-700"
          placeholder="Your generated LinkedIn post will appear here..."
        />
        
        {/* Character count indicator */}
        <div
          className={`absolute bottom-3 right-3 text-xs px-2 py-1 rounded-full ${getCharacterCountBg(
            generatedPost.content.length
          )} ${getCharacterCountColor(
            generatedPost.content.length
          )}`}
        >
          {generatedPost.content.length}/{MAX_CHARS}
        </div>
      </div>
    </div>
  );
}; 