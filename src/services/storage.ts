import { LOCAL_STORAGE_KEYS } from '../constants';
import { SavedDraft, FavoritePost, RecentUrl } from '../types';

class StorageService {
  private serialize<T>(data: T): string {
    return JSON.stringify(data);
  }

  private deserialize<T>(data: string): T {
    return JSON.parse(data);
  }

  // Drafts
  getDrafts(): SavedDraft[] {
    const data = localStorage.getItem(LOCAL_STORAGE_KEYS.DRAFTS);
    if (!data) return [];
    
    return this.deserialize<SavedDraft[]>(data).map(draft => ({
      ...draft,
      timestamp: new Date(draft.timestamp),
    }));
  }

  setDrafts(drafts: SavedDraft[]): void {
    localStorage.setItem(LOCAL_STORAGE_KEYS.DRAFTS, this.serialize(drafts));
  }

  // Favorites
  getFavorites(): FavoritePost[] {
    const data = localStorage.getItem(LOCAL_STORAGE_KEYS.FAVORITES);
    if (!data) return [];
    
    return this.deserialize<FavoritePost[]>(data).map(favorite => ({
      ...favorite,
      timestamp: new Date(favorite.timestamp),
    }));
  }

  setFavorites(favorites: FavoritePost[]): void {
    localStorage.setItem(LOCAL_STORAGE_KEYS.FAVORITES, this.serialize(favorites));
  }

  // Recent URLs
  getRecentUrls(): RecentUrl[] {
    const data = localStorage.getItem(LOCAL_STORAGE_KEYS.RECENT_URLS);
    if (!data) return [];
    
    return this.deserialize<RecentUrl[]>(data).map(item => ({
      ...item,
      timestamp: new Date(item.timestamp),
    }));
  }

  setRecentUrls(urls: RecentUrl[]): void {
    localStorage.setItem(LOCAL_STORAGE_KEYS.RECENT_URLS, this.serialize(urls));
  }

  // Posts today
  getPostsToday(): { date: string; count: number } {
    const data = localStorage.getItem(LOCAL_STORAGE_KEYS.POSTS_TODAY);
    if (!data) return { date: new Date().toDateString(), count: 0 };
    
    return this.deserialize<{ date: string; count: number }>(data);
  }

  setPostsToday(date: string, count: number): void {
    localStorage.setItem(LOCAL_STORAGE_KEYS.POSTS_TODAY, this.serialize({ date, count }));
  }

  // Dark mode
  getDarkMode(): boolean {
    const data = localStorage.getItem(LOCAL_STORAGE_KEYS.DARK_MODE);
    if (!data) return false;
    
    return this.deserialize<boolean>(data);
  }

  setDarkMode(enabled: boolean): void {
    localStorage.setItem(LOCAL_STORAGE_KEYS.DARK_MODE, this.serialize(enabled));
  }
}

export const storageService = new StorageService(); 