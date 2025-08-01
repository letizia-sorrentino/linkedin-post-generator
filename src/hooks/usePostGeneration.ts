import { useState, useCallback } from 'react';
import { GeneratedPost } from '../types';
import { apiService } from '../services/api';
import { isValidUrl } from '../utils';

export const usePostGeneration = () => {
  const [url, setUrl] = useState("");
  const [generatedPost, setGeneratedPost] = useState<GeneratedPost | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const generatePost = useCallback(async () => {
    if (!url.trim()) {
      setError("Please enter a valid URL");
      return;
    }

    if (!isValidUrl(url)) {
      setError("Please enter a valid URL format");
      return;
    }

    // Check if environment variables are configured
    if (
      !import.meta.env.VITE_LANGFLOW_URL ||
      !import.meta.env.VITE_LANGFLOW_TOKEN
    ) {
      setError(
        "LangFlow API is not configured. Please check your environment variables."
      );
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const generatedContent = await apiService.generatePost(url);

      const newPost: GeneratedPost = {
        content: generatedContent,
        timestamp: new Date(),
        id: Date.now().toString(),
        url: url,
      };

      setGeneratedPost(newPost);
      return newPost;
    } catch (err) {
      console.error("API Error:", err);

      if (err instanceof TypeError && err.message.includes("Failed to fetch")) {
        setError(
          "Connection failed: This may be due to CORS restrictions or network issues. Try using a CORS browser extension or check if the API endpoint is accessible."
        );
      } else if (err instanceof Error) {
        setError(`Failed to generate post: ${err.message}`);
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [url]);

  const generateVariation = useCallback(async () => {
    if (!generatedPost) return null;

    if (
      !import.meta.env.VITE_LANGFLOW_URL ||
      !import.meta.env.VITE_LANGFLOW_TOKEN
    ) {
      setError(
        "LangFlow API is not configured. Please check your environment variables."
      );
      return null;
    }

    setIsLoading(true);
    setError("");

    try {
      const generatedContent = await apiService.generateVariation(generatedPost.content);

      const newPost: GeneratedPost = {
        content: generatedContent,
        timestamp: new Date(),
        id: Date.now().toString(),
        url: url,
      };

      setGeneratedPost(newPost);
      return newPost;
    } catch (err) {
      console.error("Variation API Error:", err);

      if (err instanceof TypeError && err.message.includes("Failed to fetch")) {
        setError(
          "Connection failed: This may be due to CORS restrictions or network issues. Try using a CORS browser extension or check if the API endpoint is accessible."
        );
      } else if (err instanceof Error) {
        setError(`Failed to generate variation: ${err.message}`);
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [generatedPost, url]);

  const updatePostContent = useCallback((content: string) => {
    if (generatedPost) {
      setGeneratedPost({ ...generatedPost, content });
    }
  }, [generatedPost]);

  const clearError = useCallback(() => {
    setError("");
  }, []);

  return {
    url,
    setUrl,
    generatedPost,
    isLoading,
    error,
    generatePost,
    generateVariation,
    updatePostContent,
    clearError,
  };
}; 