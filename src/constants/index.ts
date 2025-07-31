export const MAX_CHARS = 3000;

export const EMOJI_CATEGORIES = {
  Popular: ["💡", "🚀", "💪", "🎯", "✨", "🔥", "👏", "💯", "🌟", "⚡"],
  Business: ["📈", "💼", "🤝", "💰", "📊", "🏆", "🎖️", "📋", "💻", "🔧"],
  Emotions: ["😊", "😍", "🤔", "😎", "🥳", "😤", "🤗", "😮", "🙌", "👍"],
  Objects: ["📱", "💡", "🔍", "📚", "🎨", "🏠", "🌍", "⏰", "📝", "🎪"],
  Nature: ["🌱", "🌳", "🌊", "⛰️", "🌈", "☀️", "🌙", "⭐", "🔆", "🌸"],
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
} as const;

export const API_ENDPOINTS = {
  LANGFLOW: "/api/langflow/lf/54425f0a-4d1c-4195-9f8a-fe76ce2c72cf/api/v1/run/b8366bbf-3b78-46a1-b603-c6c30863a697",
} as const; 