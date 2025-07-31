import { useState, useEffect, useCallback } from 'react';
import { SavedDraft, GeneratedPost } from '../types';
import { storageService } from '../services/storage';
import { truncateText, generateId } from '../utils';

export const useDrafts = () => {
  const [drafts, setDrafts] = useState<SavedDraft[]>([]);

  useEffect(() => {
    // Load drafts from localStorage on mount
    const savedDrafts = storageService.getDrafts();
    setDrafts(savedDrafts);
  }, []);

  useEffect(() => {
    // Save drafts to localStorage whenever they change
    storageService.setDrafts(drafts);
  }, [drafts]);

  const saveDraft = useCallback((post: GeneratedPost) => {
    const title = truncateText(post.content, 50);
    const draft: SavedDraft = {
      id: generateId(),
      content: post.content,
      timestamp: new Date(),
      url: post.url,
      title: title,
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