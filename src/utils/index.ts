import { STOP_WORDS, MAX_CHARS } from '../constants';
import { WordCloudItem } from '../types';

export const isValidUrl = (string: string): boolean => {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
};

export const generateWordCloud = (text: string): WordCloudItem[] => {
  if (!text) return [];

  const words = text
    .toLowerCase()
    .replace(/[^\w\s]/g, " ")
    .split(/\s+/)
    .filter(
      (word) =>
        word.length > 3 && !STOP_WORDS.includes(word)
    );

  const wordCount = words.reduce((acc, word) => {
    acc[word] = (acc[word] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return Object.entries(wordCount)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 20)
    .map(([word, count]) => ({ word, count }));
};

export const getCharacterCountColor = (length: number): string => {
  if (length < 1000) return "text-green-600";
  if (length < 2000) return "text-yellow-600";
  if (length < 2800) return "text-orange-600";
  return "text-red-600";
};

export const getCharacterCountBg = (length: number): string => {
  if (length < 1000) return "bg-green-100 dark:bg-green-900";
  if (length < 2000) return "bg-yellow-100 dark:bg-yellow-900";
  if (length < 2800) return "bg-orange-100 dark:bg-orange-900";
  return "bg-red-100 dark:bg-red-900";
};

export const truncateText = (text: string, maxLength: number = 50): string => {
  return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
};

export const generateId = (): string => {
  return Date.now().toString();
}; 