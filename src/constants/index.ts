export const MAX_CHARS = 3000;

export const EMOJI_CATEGORIES = {
  Popular: ["💡", "🚀", "💪", "🎯", "✨", "🔥", "👏", "💯", "🌟", "⚡"],
  Business: ["📈", "💼", "🤝", "💰", "📊", "🏆", "🎖️", "📋", "💻", "🔧"],
  Emotions: ["😊", "😍", "🤔", "😎", "🥳", "😤", "🤗", "😮", "🙌", "👍"],
  Objects: ["📱", "💡", "🔍", "📚", "🎨", "🏠", "🌍", "⏰", "📝", "🎪"],
  Nature: ["🌱", "🌳", "🌊", "⛰️", "🌈", "☀️", "🌙", "⭐", "🔆", "🌸"],
} as const;

export const PUBLICATION_MAPPING: Record<string, string> = {
  "hbr.org": "Harvard Business Review",
  "techcrunch.com": "TechCrunch",
  "medium.com": "Medium",
  "forbes.com": "Forbes",
  "bloomberg.com": "Bloomberg",
  "reuters.com": "Reuters",
  "wsj.com": "The Wall Street Journal",
  "nytimes.com": "The New York Times",
  "washingtonpost.com": "The Washington Post",
  "theguardian.com": "The Guardian",
  "cnn.com": "CNN",
  "bbc.com": "BBC",
  "npr.org": "NPR",
  "economist.com": "The Economist",
  "ft.com": "Financial Times",
  "linkedin.com": "LinkedIn",
  "github.com": "GitHub",
  "stackoverflow.com": "Stack Overflow",
  "dev.to": "Dev.to",
  "hashnode.dev": "Hashnode",
  "substack.com": "Substack",
} as const;

export const STOP_WORDS = [
  "this", "that", "with", "have", "will", "from", "they", "been", "were", "said",
  "each", "which", "their", "time", "more", "very", "what", "know", "just", "first",
  "into", "over", "think", "also", "your", "work", "life", "only", "new", "years",
  "way", "may", "say", "come", "its", "now", "find", "long", "down", "day",
  "did", "get", "has", "him", "his", "how", "man", "old", "see", "two",
  "who", "boy", "let", "put", "she", "too", "use",
];

export const LOCAL_STORAGE_KEYS = {
  DRAFTS: "linkedin-drafts",
  FAVORITES: "linkedin-favorites",
  RECENT_URLS: "linkedin-recent-urls",
  POSTS_TODAY: "linkedin-posts-today",
  DARK_MODE: "linkedin-dark-mode",
  KNOWLEDGE_BASE: "linkedin-knowledge-base",
} as const;

export const API_ENDPOINTS = {
  LANGFLOW: "/api/langflow/lf/54425f0a-4d1c-4195-9f8a-fe76ce2c72cf/api/v1/run/b8366bbf-3b78-46a1-b603-c6c30863a697",
} as const; 