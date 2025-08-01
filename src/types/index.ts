export interface GeneratedPost {
  content: string;
  timestamp: Date;
  id: string;
  url?: string;
}

export interface SavedDraft {
  id: string;
  content: string;
  timestamp: Date;
  url?: string;
  title: string;
}

export interface FavoritePost {
  id: string;
  content: string;
  timestamp: Date;
  url?: string;
  title: string;
}

export interface RecentUrl {
  url: string;
  timestamp: Date;
}

export interface KnowledgeBaseItem {
  id: string;
  url: string;
  title: string;
  description?: string;
  category?: string;
  timestamp: Date;
  tags?: string[];
}

export interface EmojiCategory {
  [key: string]: string[];
}

export interface WordCloudItem {
  word: string;
  count: number;
}

export type NotificationType = "success" | "error";

export interface Notification {
  message: string;
  type: NotificationType;
  id: string;
} 