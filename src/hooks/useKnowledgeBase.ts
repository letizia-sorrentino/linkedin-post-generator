import { useState, useEffect, useCallback } from 'react';
import { storageService } from '../services/storage';
import { KnowledgeBaseItem } from '../types';

export const useKnowledgeBase = () => {
  const [items, setItems] = useState<KnowledgeBaseItem[]>([]);

  // Load items from storage
  useEffect(() => {
    const storedItems = storageService.getKnowledgeBase();
    setItems(storedItems);
  }, []);

  // Save items to storage
  const saveItems = useCallback((newItems: KnowledgeBaseItem[]) => {
    storageService.setKnowledgeBase(newItems);
    setItems(newItems);
  }, []);

  // Add new item
  const addItem = useCallback((item: Omit<KnowledgeBaseItem, 'id' | 'timestamp'>) => {
    const newItem: KnowledgeBaseItem = {
      ...item,
      id: Date.now().toString(),
      timestamp: new Date(),
    };
    const updatedItems = [...items, newItem];
    saveItems(updatedItems);
    return newItem;
  }, [items, saveItems]);

  // Update item
  const updateItem = useCallback((id: string, updates: Partial<KnowledgeBaseItem>) => {
    const updatedItems = items.map(item =>
      item.id === id ? { ...item, ...updates } : item
    );
    saveItems(updatedItems);
  }, [items, saveItems]);

  // Delete item
  const deleteItem = useCallback((id: string) => {
    const updatedItems = items.filter(item => item.id !== id);
    saveItems(updatedItems);
  }, [items, saveItems]);

  // Get item by ID
  const getItemById = useCallback((id: string) => {
    return items.find(item => item.id === id);
  }, [items]);

  // Search items
  const searchItems = useCallback((query: string) => {
    const lowercaseQuery = query.toLowerCase();
    return items.filter(item =>
      item.title.toLowerCase().includes(lowercaseQuery) ||
      item.description?.toLowerCase().includes(lowercaseQuery) ||
      item.url.toLowerCase().includes(lowercaseQuery) ||
      item.tags?.some(tag => tag.toLowerCase().includes(lowercaseQuery))
    );
  }, [items]);

  // Get items by category
  const getItemsByCategory = useCallback((category: string) => {
    return items.filter(item => item.category === category);
  }, [items]);

  // Get all categories
  const getCategories = useCallback(() => {
    const categories = items
      .map(item => item.category)
      .filter((category): category is string => !!category);
    return [...new Set(categories)];
  }, [items]);

  return {
    items,
    addItem,
    updateItem,
    deleteItem,
    getItemById,
    searchItems,
    getItemsByCategory,
    getCategories,
  };
}; 