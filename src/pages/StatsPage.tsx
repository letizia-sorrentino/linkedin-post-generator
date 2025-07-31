import React from "react";
import { usePostsToday } from "../hooks/usePostsToday";
import { useDrafts } from "../hooks/useDrafts";
import { useFavorites } from "../hooks/useFavorites";
import { useRecentUrls } from "../hooks/useRecentUrls";
import { useNotifications } from "../hooks/useNotifications";
import { Notification } from "../components/ui/Notification";
import { BarChart3, TrendingUp, FileText, Heart, Link, Calendar, Target, Zap } from "lucide-react";

interface StatsPageProps {
  darkMode: boolean;
}

export const StatsPage: React.FC<StatsPageProps> = ({ darkMode }) => {
  const { postsGeneratedToday } = usePostsToday();
  const { drafts } = useDrafts();
  const { favorites } = useFavorites();
  const { recentUrls } = useRecentUrls();
  const { notifications, showNotification, dismissNotification } = useNotifications();

  // Calculate some stats
  const totalPosts = postsGeneratedToday;
  const totalDrafts = drafts.length;
  const totalFavorites = favorites.length;
  const totalUrls = recentUrls.length;
  const avgPostsPerDay = totalPosts > 0 ? Math.round((totalPosts / 1) * 10) / 10 : 0; // Simplified for demo

  const statsCards = [
    {
      title: "Posts Today",
      value: totalPosts,
      icon: TrendingUp,
      color: "blue",
      description: "Posts generated today"
    },
    {
      title: "Total Drafts",
      value: totalDrafts,
      icon: FileText,
      color: "green",
      description: "Saved drafts"
    },
    {
      title: "Favorites",
      value: totalFavorites,
      icon: Heart,
      color: "red",
      description: "Favorite posts"
    },
    {
      title: "Recent URLs",
      value: totalUrls,
      icon: Link,
      color: "purple",
      description: "Recently used articles"
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400",
      green: "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400",
      red: "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400",
      purple: "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400"
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
          <BarChart3 className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
            Statistics
          </h1>
        </div>
        <p className="text-xl text-gray-700 dark:text-gray-300">
          Your LinkedIn post generation analytics
        </p>
      </div>

      {/* Stats Cards */}
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statsCards.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-xl transition-shadow duration-200"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-lg ${getColorClasses(stat.color)}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1">
                    {stat.value}
                  </h3>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                    {stat.title}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-500">
                    {stat.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Detailed Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Activity Overview */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center gap-3 mb-6">
              <Target className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                Activity Overview
              </h3>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700">
                <span className="text-gray-600 dark:text-gray-400">Average posts per day</span>
                <span className="font-semibold text-gray-900 dark:text-gray-100">{avgPostsPerDay}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700">
                <span className="text-gray-600 dark:text-gray-400">Draft conversion rate</span>
                <span className="font-semibold text-gray-900 dark:text-gray-100">
                  {totalPosts > 0 ? Math.round((totalDrafts / totalPosts) * 100) : 0}%
                </span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700">
                <span className="text-gray-600 dark:text-gray-400">Favorite rate</span>
                <span className="font-semibold text-gray-900 dark:text-gray-100">
                  {totalPosts > 0 ? Math.round((totalFavorites / totalPosts) * 100) : 0}%
                </span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-600 dark:text-gray-400">Unique articles used</span>
                <span className="font-semibold text-gray-900 dark:text-gray-100">{totalUrls}</span>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center gap-3 mb-6">
              <Zap className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                Recent Activity
              </h3>
            </div>
            <div className="space-y-4">
              {totalPosts > 0 ? (
                <div className="text-center py-4">
                  <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
                    {totalPosts}
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Posts generated today
                  </p>
                </div>
              ) : (
                <div className="text-center py-4">
                  <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-500 dark:text-gray-500">
                    No posts generated today
                  </p>
                </div>
              )}
              
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {totalDrafts}
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-500">Drafts</p>
                </div>
                <div>
                  <div className="text-2xl font-bold text-red-600 dark:text-red-400">
                    {totalFavorites}
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-500">Favorites</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 