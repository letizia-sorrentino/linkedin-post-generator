import React from 'react';
import { GeneratedPost } from '../../types';
import { generateWordCloud } from '../../utils';

interface WordCloudProps {
  generatedPost: GeneratedPost | null;
}

export const WordCloud: React.FC<WordCloudProps> = ({ generatedPost }) => {
  if (!generatedPost) return null;

  const wordCloudData = generateWordCloud(generatedPost.content);

  return (
    <div className="lg:col-span-1">
      <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
        Key Terms
      </h4>
      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 h-80 overflow-y-auto">
        <div className="flex flex-wrap gap-2">
          {wordCloudData.map(({ word, count }) => (
            <span
              key={word}
              className="inline-block px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded text-xs font-medium"
              style={{
                fontSize: `${Math.min(14 + count * 2, 18)}px`,
              }}
            >
              {word} ({count})
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}; 