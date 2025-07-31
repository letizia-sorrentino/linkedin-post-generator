import React from 'react';

export const TipsSection: React.FC = () => {
  return (
    <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-6 border border-blue-100 dark:border-blue-800">
      <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
        💡 Tips for Great LinkedIn Posts
      </h3>
      <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-700 dark:text-gray-300">
        <div>
          <strong>Best Article Sources:</strong>
          <ul className="mt-1 space-y-1 text-gray-600 dark:text-gray-400">
            <li>• Harvard Business Review</li>
            <li>• TechCrunch & industry blogs</li>
            <li>• McKinsey Insights</li>
            <li>• MIT Technology Review</li>
          </ul>
        </div>
        <div>
          <strong>Engagement Tips:</strong>
          <ul className="mt-1 space-y-1 text-gray-600 dark:text-gray-400">
            <li>• Ask questions to spark discussion</li>
            <li>• Share personal insights</li>
            <li>• Use relevant hashtags</li>
            <li>• Tag relevant connections</li>
          </ul>
        </div>
      </div>
    </div>
  );
}; 