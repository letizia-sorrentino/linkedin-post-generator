import React, { useState, useEffect } from 'react';
import { Copy, ExternalLink, Loader2, CheckCircle, AlertCircle, History, BarChart3 } from 'lucide-react';

interface GeneratedPost {
  content: string;
  timestamp: Date;
}

interface RecentUrl {
  url: string;
  timestamp: Date;
}

interface PostTemplate {
  id: string;
  name: string;
  description: string;
  prompt: string;
}

const POST_TEMPLATES: PostTemplate[] = [
  {
    id: 'professional',
    name: 'Professional Insight',
    description: 'Formal, analytical tone with key takeaways',
    prompt: 'Create a professional LinkedIn post that provides analytical insights and key takeaways from this article. Use a formal, business-appropriate tone.'
  },
  {
    id: 'storytelling',
    name: 'Personal Story',
    description: 'Engaging narrative with personal connection',
    prompt: 'Create a LinkedIn post that tells a compelling story based on this article. Make it personal and relatable, connecting the content to real-world experiences.'
  },
  {
    id: 'thought-leadership',
    name: 'Thought Leadership',
    description: 'Industry expertise with forward-thinking perspective',
    prompt: 'Create a thought leadership LinkedIn post that demonstrates industry expertise and provides a forward-thinking perspective on this article. Include strategic insights.'
  },
  {
    id: 'discussion',
    name: 'Discussion Starter',
    description: 'Engaging questions to spark conversation',
    prompt: 'Create a LinkedIn post that sparks discussion and engagement. Include thought-provoking questions and encourage comments from your network about this article.'
  },
  {
    id: 'casual',
    name: 'Casual & Friendly',
    description: 'Conversational tone with approachable language',
    prompt: 'Create a casual, friendly LinkedIn post about this article. Use conversational language and an approachable tone that feels authentic and relatable.'
  }
];
function App() {
  const [url, setUrl] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState<PostTemplate>(POST_TEMPLATES[0]);
  const [generatedPost, setGeneratedPost] = useState<GeneratedPost | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [notification, setNotification] = useState('');
  const [recentUrls, setRecentUrls] = useState<RecentUrl[]>([]);
  const [postsGeneratedToday, setPostsGeneratedToday] = useState(0);

  const MAX_CHARS = 3000;

  const isValidUrl = (string: string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  const showNotification = (message: string, type: 'success' | 'error' = 'success') => {
    setNotification(message);
    setTimeout(() => setNotification(''), 3000);
  };

  const addToRecentUrls = (newUrl: string) => {
    const newRecentUrl: RecentUrl = { url: newUrl, timestamp: new Date() };
    setRecentUrls(prev => [newRecentUrl, ...prev.slice(0, 4)]);
  };

  const generatePost = async () => {
    if (!url.trim()) {
      setError('Please enter a valid URL');
      return;
    }

    if (!isValidUrl(url)) {
      setError('Please enter a valid URL format');
      return;
    }

    // Check if environment variables are configured
    if (!import.meta.env.VITE_LANGFLOW_URL || !import.meta.env.VITE_LANGFLOW_TOKEN) {
      setError('LangFlow API is not configured. Please check your environment variables.');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const templatePrompt = `${selectedTemplate.prompt}\n\nArticle URL: ${url}`;
      
      const payload = {
        "input_value": templatePrompt,
        "output_type": "chat",
        "input_type": "chat",
        "session_id": "user_1"
      };

      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_LANGFLOW_TOKEN}`,
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      };

      const response = await fetch('/api/langflow/lf/54425f0a-4d1c-4195-9f8a-fe76ce2c72cf/api/v1/run/b8366bbf-3b78-46a1-b603-c6c30863a697', options);
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`API request failed (${response.status}): ${errorText || response.statusText}`);
      }

      const data = await response.json();
      
      // Extract the generated content from LangFlow response
      let generatedContent = '';
      
      if (data.outputs && data.outputs.length > 0) {
        // Try different possible response structures
        const output = data.outputs[0];
        generatedContent = output.outputs?.[0]?.results?.message?.text ||
                          output.outputs?.[0]?.results?.text ||
                          output.outputs?.[0]?.message?.text ||
                          output.outputs?.[0]?.text ||
                          output.message?.text ||
                          output.text ||
                          '';
      } else if (data.message) {
        generatedContent = typeof data.message === 'string' ? data.message : data.message.text || '';
      } else if (data.text) {
        generatedContent = data.text;
      }
      
      if (!generatedContent) {
        console.error('Unexpected response structure:', data);
        throw new Error('No content generated. Please check the LangFlow response format.');
      }
      
      const newPost: GeneratedPost = {
        content: generatedContent,
        timestamp: new Date()
      };

      setGeneratedPost(newPost);
      addToRecentUrls(url);
      setPostsGeneratedToday(prev => prev + 1);
      showNotification('LinkedIn post generated successfully!');
      
    } catch (err) {
      console.error('API Error:', err);
      
      if (err instanceof TypeError && err.message.includes('Failed to fetch')) {
        setError('Connection failed: This may be due to CORS restrictions or network issues. Try using a CORS browser extension or check if the API endpoint is accessible.');
      } else if (err instanceof Error) {
        setError(`Failed to generate post: ${err.message}`);
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const generateVariation = async () => {
    if (!generatedPost) return;
    
    if (!import.meta.env.VITE_LANGFLOW_URL || !import.meta.env.VITE_LANGFLOW_TOKEN) {
      setError('LangFlow API is not configured. Please check your environment variables.');
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    try {
      const templatePrompt = `${selectedTemplate.prompt} (generate a different variation)\n\nArticle URL: ${url}`;
      
      const payload = {
        "input_value": templatePrompt,
        "output_type": "chat",
        "input_type": "chat",
        "session_id": "user_1"
      };

      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_LANGFLOW_TOKEN}`,
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      };

      const response = await fetch('/api/langflow/lf/54425f0a-4d1c-4195-9f8a-fe76ce2c72cf/api/v1/run/b8366bbf-3b78-46a1-b603-c6c30863a697', options);
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`API request failed (${response.status}): ${errorText || response.statusText}`);
      }

      const data = await response.json();
      
      // Extract the generated content from LangFlow response
      let generatedContent = '';
      
      if (data.outputs && data.outputs.length > 0) {
        const output = data.outputs[0];
        generatedContent = output.outputs?.[0]?.results?.message?.text ||
                          output.outputs?.[0]?.results?.text ||
                          output.outputs?.[0]?.message?.text ||
                          output.outputs?.[0]?.text ||
                          output.message?.text ||
                          output.text ||
                          '';
      } else if (data.message) {
        generatedContent = typeof data.message === 'string' ? data.message : data.message.text || '';
      } else if (data.text) {
        generatedContent = data.text;
      }
      
      if (!generatedContent) {
        console.error('Unexpected response structure:', data);
        throw new Error('No content generated. Please check the LangFlow response format.');
      }
      
      setGeneratedPost({
        content: generatedContent,
        timestamp: new Date()
      });
      showNotification('New variation generated!');
      
    } catch (err) {
      console.error('Variation API Error:', err);
      
      if (err instanceof TypeError && err.message.includes('Failed to fetch')) {
        setError('Connection failed: This may be due to CORS restrictions or network issues. Try using a CORS browser extension or check if the API endpoint is accessible.');
      } else if (err instanceof Error) {
        setError(`Failed to generate variation: ${err.message}`);
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = async () => {
    if (!generatedPost) return;
    
    try {
      await navigator.clipboard.writeText(generatedPost.content);
      showNotification('Copied to clipboard!');
    } catch (err) {
      showNotification('Failed to copy to clipboard', 'error');
    }
  };

  const handleUrlSelect = (selectedUrl: string) => {
    setUrl(selectedUrl);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Notification */}
      {notification && (
        <div className="fixed top-4 right-4 z-50 flex items-center gap-2 bg-white border border-green-200 text-green-800 px-4 py-3 rounded-lg shadow-lg animate-in slide-in-from-top-2">
          <CheckCircle className="w-5 h-5" />
          {notification}
        </div>
      )}

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Article to LinkedIn Post Generator
          </h1>
          <p className="text-xl text-gray-600 mb-4">
            Transform any article into engaging LinkedIn content
          </p>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Paste any article URL and we'll create a professional LinkedIn post that engages your network and drives meaningful conversations.
          </p>
        </div>

        {/* Stats */}
        <div className="flex justify-center gap-8 mb-8">
          <div className="flex items-center gap-2 text-gray-600">
            <BarChart3 className="w-5 h-5" />
            <span className="font-medium">{postsGeneratedToday}</span>
            <span className="text-sm">posts generated today</span>
          </div>
        </div>

        {/* Main Card */}
        <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 p-8 mb-8">
          {/* URL Input Section */}
          <div className="mb-8">
            {/* Template Selector */}
            <div className="mb-6">
              <label htmlFor="template" className="block text-sm font-semibold text-gray-700 mb-3">
                Post Style & Tone
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {POST_TEMPLATES.map((template) => (
                  <button
                    key={template.id}
                    onClick={() => setSelectedTemplate(template)}
                    className={`p-4 text-left border-2 rounded-lg transition-all duration-200 ${
                      selectedTemplate.id === template.id
                        ? 'border-blue-500 bg-blue-50 shadow-md'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <div className="font-medium text-gray-900 mb-1">{template.name}</div>
                    <div className="text-sm text-gray-600">{template.description}</div>
                  </button>
                ))}
              </div>
            </div>

            <label htmlFor="url" className="block text-sm font-semibold text-gray-700 mb-3">
              Article URL
            </label>
            <div className="flex gap-3">
              <div className="flex-1">
                <input
                  id="url"
                  type="url"
                  value={url}
                  onChange={(e) => {
                    setUrl(e.target.value);
                    setError('');
                  }}
                  placeholder="Paste article URL here (HBR, TechCrunch, industry blogs, etc.)"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500"
                  disabled={isLoading}
                />
                {error && (
                  <div className="flex items-center gap-2 mt-2 text-red-600 text-sm">
                    <AlertCircle className="w-4 h-4" />
                    {error}
                  </div>
                )}
              </div>
              <button
                onClick={generatePost}
                disabled={isLoading}
                className="px-8 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold rounded-lg transition-all duration-200 flex items-center gap-2 whitespace-nowrap shadow-lg hover:shadow-xl"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <ExternalLink className="w-5 h-5" />
                    Generate Post
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Generated Post Display */}
          {generatedPost && (
            <div className="border-t border-gray-200 pt-8">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Generated LinkedIn Post</h3>
                  <p className="text-sm text-gray-500 mt-1">Style: {selectedTemplate.name}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-500">
                    {generatedPost.content.length}/{MAX_CHARS} characters
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={generateVariation}
                      disabled={isLoading}
                      className="px-4 py-2 text-blue-600 border border-blue-200 hover:bg-blue-50 rounded-lg transition-all duration-200 text-sm font-medium"
                    >
                      Generate Another Version
                    </button>
                    <button
                      onClick={copyToClipboard}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-200 flex items-center gap-2 text-sm font-medium shadow-md hover:shadow-lg"
                    >
                      <Copy className="w-4 h-4" />
                      Copy
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <textarea
                  value={generatedPost.content}
                  onChange={(e) => setGeneratedPost({ ...generatedPost, content: e.target.value })}
                  className="w-full h-80 p-4 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 leading-relaxed"
                  placeholder="Your generated LinkedIn post will appear here..."
                />
                <div className={`absolute bottom-2 right-2 text-xs px-2 py-1 rounded ${
                  generatedPost.content.length > MAX_CHARS 
                    ? 'bg-red-100 text-red-600' 
                    : 'bg-gray-100 text-gray-500'
                }`}>
                  {generatedPost.content.length}/{MAX_CHARS}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Recent URLs */}
        {recentUrls.length > 0 && (
          <div className="bg-white/50 backdrop-blur-sm rounded-xl border border-gray-200 p-6">
            <div className="flex items-center gap-2 mb-4">
              <History className="w-5 h-5 text-gray-600" />
              <h3 className="font-semibold text-gray-900">Recent URLs</h3>
            </div>
            <div className="space-y-2">
              {recentUrls.map((item, index) => (
                <button
                  key={index}
                  onClick={() => handleUrlSelect(item.url)}
                  className="w-full text-left p-3 hover:bg-gray-50 rounded-lg transition-colors duration-200 border border-gray-100"
                >
                  <div className="text-sm text-blue-600 hover:text-blue-800 truncate">
                    {item.url}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {item.timestamp.toLocaleString()}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Tips Section */}
        <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
          <h3 className="font-semibold text-gray-900 mb-3">💡 Tips for Great LinkedIn Posts</h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-700">
            <div>
              <strong>Best Article Sources:</strong>
              <ul className="mt-1 space-y-1 text-gray-600">
                <li>• Harvard Business Review</li>
                <li>• TechCrunch & industry blogs</li>
                <li>• McKinsey Insights</li>
                <li>• MIT Technology Review</li>
              </ul>
            </div>
            <div>
              <strong>Engagement Tips:</strong>
              <ul className="mt-1 space-y-1 text-gray-600">
                <li>• Ask questions to spark discussion</li>
                <li>• Share personal insights</li>
                <li>• Use relevant hashtags</li>
                <li>• Tag relevant connections</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
