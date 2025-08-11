import { useState, useEffect, useCallback } from 'react';
import { SavedDraft, GeneratedPost } from '../types';
import { storageService } from '../services/storage';
import { truncateText } from '../utils';

export const useDrafts = () => {
  const [drafts, setDrafts] = useState<SavedDraft[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Load drafts from localStorage on mount
    try {
      console.log('Loading drafts from localStorage...');
      const savedDrafts = storageService.getDrafts();
      console.log('Loaded drafts:', savedDrafts);
      setDrafts(savedDrafts);
      setIsLoaded(true);
    } catch (error) {
      console.error('Error loading drafts:', error);
      setDrafts([]);
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    // Only save drafts to localStorage after initial load
    if (isLoaded) {
      storageService.setDrafts(drafts);
    }
  }, [drafts, isLoaded]);

  const saveDraft = useCallback((post: GeneratedPost) => {
    const title = truncateText(post.content, 50);
    const draft: SavedDraft = {
      id: Date.now().toString(),
      content: post.content,
      timestamp: new Date(),
      url: post.url,
      title: title,
      includeAttribution: post.includeAttribution,
      attributionText: post.attributionText,
      isTruncated: post.isTruncated,
    };

    setDrafts(prev => [draft, ...prev]);
    return draft;
  }, []);

  const loadDraft = useCallback((draft: SavedDraft): GeneratedPost => {
    return {
      id: draft.id,
      content: draft.content,
      timestamp: draft.timestamp,
      url: draft.url,
      includeAttribution: draft.includeAttribution ?? true,
      attributionText: draft.attributionText,
      isTruncated: draft.isTruncated ?? false,
    };
  }, []);

  const deleteDraft = useCallback((id: string) => {
    setDrafts(prev => prev.filter(draft => draft.id !== id));
  }, []);

  return {
    drafts,
    saveDraft,
    loadDraft,
    deleteDraft,
  };
}; 
