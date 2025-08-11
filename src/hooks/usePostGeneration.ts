import { useState, useCallback } from 'react';
import { GeneratedPost } from '../types';
import { apiService } from '../services/api';
import { isValidUrl, generateAttributionText, smartTruncatePost } from '../utils';
import { usePost } from "../contexts/PostContext";

export const usePostGeneration = () => {
  const { currentPost, setCurrentPost } = usePost();
  
  // Use currentPost instead of local generatedPost state
  // Update setCurrentPost instead of setGeneratedPost
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [includeAttribution, setIncludeAttribution] = useState(true);

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

      // Generate attribution text
      const attributionText = generateAttributionText(url);
      
      // Apply smart truncation if attribution is enabled
      let finalContent = generatedContent;
      let isTruncated = false;
      
      if (includeAttribution) {
        const truncationResult = smartTruncatePost(generatedContent, attributionText);
        finalContent = truncationResult.truncatedContent;
        isTruncated = truncationResult.isTruncated;
      }

      const newPost: GeneratedPost = {
        content: finalContent,
        timestamp: new Date(),
        id: Date.now().toString(),
        url: url,
        includeAttribution,
        attributionText,
        isTruncated,
      };

      setCurrentPost(newPost);
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
  }, [url, includeAttribution, setCurrentPost]);

  const generateVariation = useCallback(async () => {
    if (!currentPost) return null;

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
      const generatedContent = await apiService.generateVariation(currentPost.content);

      // Generate attribution text
      const attributionText = generateAttributionText(url);
      
      // Apply smart truncation if attribution is enabled
      let finalContent = generatedContent;
      let isTruncated = false;
      
      if (includeAttribution) {
        const truncationResult = smartTruncatePost(generatedContent, attributionText);
        finalContent = truncationResult.truncatedContent;
        isTruncated = truncationResult.isTruncated;
      }

      const newPost: GeneratedPost = {
        content: finalContent,
        timestamp: new Date(),
        id: Date.now().toString(),
        url: url,
        includeAttribution,
        attributionText,
        isTruncated,
      };

      setCurrentPost(newPost);
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
  }, [currentPost, url, includeAttribution, setCurrentPost]);

  const updatePostContent = useCallback((content: string) => {
    if (currentPost) {
      setCurrentPost({ ...currentPost, content });
    }
  }, [currentPost]);

  const toggleAttribution = useCallback(() => {
    setIncludeAttribution(prev => !prev);
  }, []);

  const clearError = useCallback(() => {
    setError("");
  }, []);

  const generateDummyPost = useCallback(() => {
    const dummyUrl = "https://techcrunch.com/2024/01/15/ai-revolution-workplace";
    const dummyContent = `🚀 The AI revolution is transforming how we work, and the results are fascinating!

Key insights from recent research:
• 73% of professionals report increased productivity with AI tools
• Creative tasks are being enhanced, not replaced
• The human-AI collaboration model is emerging as the gold standard

What excites me most? AI is freeing us from repetitive tasks so we can focus on strategic thinking and innovation.

The future of work isn't about humans vs. AI—it's about humans WITH AI. 

What's your experience with AI in your daily work? I'd love to hear your thoughts! 💭

#AI #FutureOfWork #Innovation #Productivity #Technology`;

    const attributionText = generateAttributionText(dummyUrl);
    
    let finalContent = dummyContent;
    let isTruncated = false;
    
    if (includeAttribution) {
      const truncationResult = smartTruncatePost(dummyContent, attributionText);
      finalContent = truncationResult.truncatedContent;
      isTruncated = truncationResult.isTruncated;
    }

    const newPost: GeneratedPost = {
      content: finalContent,
      timestamp: new Date(),
      id: Date.now().toString(),
      url: dummyUrl,
      includeAttribution,
      attributionText,
      isTruncated,
    };

    setCurrentPost(newPost);
    return newPost;
  }, [includeAttribution]);

  return {
    url,
    setUrl,
    currentPost,
    isLoading,
    error,
    includeAttribution,
    generatePost,
    generateVariation,
    generateDummyPost,
    updatePostContent,
    toggleAttribution,
    clearError,
  };
}; 
