import { useState, useEffect } from 'react';
import { storageService } from '../services/storage';

export const useTheme = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Load theme from localStorage on mount
    const savedTheme = storageService.getDarkMode();
    setDarkMode(savedTheme);
  }, []);

  useEffect(() => {
    // Save theme to localStorage and apply to document
    storageService.setDarkMode(darkMode);
    
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const toggleTheme = () => {
    setDarkMode(prev => !prev);
  };

  return {
    darkMode,
    toggleTheme,
  };
}; 