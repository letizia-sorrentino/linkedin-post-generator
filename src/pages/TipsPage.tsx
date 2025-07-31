import React from "react";
import { useNotifications } from "../hooks/useNotifications";
import { Notification } from "../components/ui/Notification";
import { Lightbulb, CheckCircle, AlertCircle, TrendingUp, Users, MessageCircle, Hash, Eye } from "lucide-react";

interface TipsPageProps {
  darkMode: boolean;
}

export const TipsPage: React.FC<TipsPageProps> = ({ darkMode }) => {
  const { notifications, showNotification, dismissNotification } = useNotifications();

  const tips = [
    {
      category: "Content Structure",
      icon: MessageCircle,
      color: "blue",
      tips: [
        "Start with a compelling hook in the first line",
        "Use bullet points or numbered lists for readability",
        "Keep paragraphs short (2-3 sentences max)",
        "End with a call-to-action or question"
      ]
    },
    {
      category: "Engagement",
      icon: Users,
      color: "green",
      tips: [
        "Ask questions to encourage comments",
        "Use 'you' and 'your' to make it personal",
        "Share personal experiences when relevant",
        "Tag relevant people or companies"
      ]
    },
    {
      category: "Hashtags",
      icon: Hash,
      color: "purple",
      tips: [
        "Use 3-5 relevant hashtags",
        "Mix popular and niche hashtags",
        "Research trending hashtags in your industry",
        "Create your own branded hashtag"
      ]
    },
    {
      category: "Best Practices",
      icon: TrendingUp,
      color: "orange",
      tips: [
        "Post consistently (2-3 times per week)",
        "Engage with comments within 24 hours",
        "Use high-quality images when possible",
        "Monitor your post performance"
      ]
    },
    {
      category: "What to Avoid",
      icon: AlertCircle,
      color: "red",
      tips: [
        "Don't use too many hashtags (max 5)",
        "Avoid overly promotional language",
        "Don't ignore negative comments",
        "Avoid posting the same content repeatedly"
      ]
    },
    {
      category: "Optimization",
      icon: Eye,
      color: "indigo",
      tips: [
        "Post during peak hours (8-10 AM, 12-2 PM)",
        "Use LinkedIn's native video when possible",
        "Include relevant keywords naturally",
        "Test different content formats"
      ]
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400",
      green: "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400",
      purple: "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400",
      orange: "bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400",
      red: "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400",
      indigo: "bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400"
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <div className="space-y-8">
      {/* Notifications */}
      {notifications.map((notification) => (
        <Notification
          key={notification.id}
          notification={notification}
          onDismiss={dismissNotification}
        />
      ))}

      {/* Header */}
      <div className="text-center">
        <div className="flex items-center justify-center gap-3 mb-6">
          <Lightbulb className="w-8 h-8 text-yellow-600 dark:text-yellow-400" />
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 dark:from-yellow-400 dark:to-orange-400 bg-clip-text text-transparent">
            Tips & Best Practices
          </h1>
        </div>
        <p className="text-xl text-gray-700 dark:text-gray-300">
          Expert advice for creating engaging LinkedIn posts
        </p>
      </div>

      {/* Tips Grid */}
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tips.map((category, index) => {
            const Icon = category.icon;
            return (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-xl transition-shadow duration-200"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className={`p-3 rounded-lg ${getColorClasses(category.color)}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    {category.category}
                  </h3>
                </div>
                <ul className="space-y-3">
                  {category.tips.map((tip, tipIndex) => (
                    <li key={tipIndex} className="flex items-start gap-3">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        {tip}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* Additional Resources */}
        <div className="mt-12 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Ready to Create Amazing Posts?
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
              Use these tips to create engaging LinkedIn content that resonates with your audience. 
              Remember, consistency and authenticity are key to building your professional presence.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="bg-white dark:bg-gray-800 rounded-lg px-4 py-2 shadow-sm">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  💡 Start with a hook
                </span>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg px-4 py-2 shadow-sm">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  📝 Keep it concise
                </span>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg px-4 py-2 shadow-sm">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  🤝 Engage with your audience
                </span>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg px-4 py-2 shadow-sm">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  📊 Track your performance
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 