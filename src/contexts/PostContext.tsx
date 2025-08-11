import React, { createContext, useContext, useState, ReactNode } from 'react';
import { GeneratedPost } from '../types';

interface PostContextType {
  currentPost: GeneratedPost | null;
  setCurrentPost: (post: GeneratedPost | null) => void;
  loadPost: (post: GeneratedPost) => void;
}

const PostContext = createContext<PostContextType | undefined>(undefined);

export const PostProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentPost, setCurrentPost] = useState<GeneratedPost | null>(null);

  const loadPost = (post: GeneratedPost) => {
    setCurrentPost(post);
  };

  return (
    <PostContext.Provider value={{ currentPost, setCurrentPost, loadPost }}>
      {children}
    </PostContext.Provider>
  );
};

export const usePost = () => {
  const context = useContext(PostContext);
  if (!context) {
    throw new Error('usePost must be used within a PostProvider');
  }
  return context;
};