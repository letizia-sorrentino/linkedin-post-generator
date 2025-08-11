import { STOP_WORDS, MAX_CHARS, PUBLICATION_MAPPING } from '../constants';
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

export const extractPublicationName = (url: string): string => {
  try {
    const domain = new URL(url).hostname.toLowerCase();
    const cleanDomain = domain.replace(/^www\./, '');
    
    // Check if we have a mapping for this domain
    if (PUBLICATION_MAPPING[cleanDomain]) {
      return PUBLICATION_MAPPING[cleanDomain];
    }
    
    // For unmapped domains, extract a clean name from the domain
    const domainParts = cleanDomain.split('.');
    if (domainParts.length >= 2) {
      const mainDomain = domainParts[domainParts.length - 2];
      return mainDomain.charAt(0).toUpperCase() + mainDomain.slice(1);
    }
    
    return cleanDomain;
  } catch {
    return "Unknown Source";
  }
};

export const generateAttributionText = (url: string): string => {
  const publicationName = extractPublicationName(url);
  return `Source: ${publicationName}\n${url}`;
};

export const smartTruncatePost = (postContent: string, attributionText: string, maxChars: number = MAX_CHARS): {
  truncatedContent: string;
  isTruncated: boolean;
  totalLength: number;
} => {
  const attributionLength = attributionText.length;
  const maxPostLength = maxChars - attributionLength - 4; // -4 for "\n\n" separator
  
  if (postContent.length <= maxPostLength) {
    return {
      truncatedContent: postContent,
      isTruncated: false,
      totalLength: postContent.length + attributionLength + 4
    };
  }
  
  // Try to truncate at sentence boundaries
  const sentences = postContent.match(/[^.!?]+[.!?]+/g) || [];
  let truncatedContent = "";
  let currentLength = 0;
  
  for (const sentence of sentences) {
    if (currentLength + sentence.length <= maxPostLength) {
      truncatedContent += sentence;
      currentLength += sentence.length;
    } else {
      break;
    }
  }
  
  // If we couldn't truncate at sentence boundaries, truncate at word boundaries
  if (truncatedContent.length === 0) {
    const words = postContent.split(' ');
    for (const word of words) {
      if (currentLength + word.length + 1 <= maxPostLength) {
        truncatedContent += (truncatedContent ? ' ' : '') + word;
        currentLength += word.length + (truncatedContent ? 1 : 0);
      } else {
        break;
      }
    }
  }
  
  // Add ellipsis if truncated
  if (truncatedContent.length < postContent.length) {
    truncatedContent += '...';
  }
  
  return {
    truncatedContent,
    isTruncated: true,
    totalLength: truncatedContent.length + attributionLength + 4
  };
};

export const getAttributionStatus = (includeAttribution: boolean, isTruncated: boolean): string => {
  if (!includeAttribution) return "no source";
  if (isTruncated) return "with source (truncated)";
  return "with source";
}; 