"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";

interface UserClickData {
  clicks: Array<{
    _id: string;
    cardType: string;
    cardIdentifier: string;
    cardData: any;
    clickedAt: string;
  }>;
  totalClicks: number;
  clicksByType: Array<{ _id: string; count: number }>;
  pagination: {
    limit: number;
    offset: number;
    hasMore: boolean;
  };
}

const UserClickDashboard: React.FC = () => {
  const [clickData, setClickData] = useState<UserClickData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCardType, setSelectedCardType] = useState('');
  const { isAuthenticated, user } = useKindeBrowserClient();

  const fetchUserClicks = async () => {
    if (!isAuthenticated) return;

    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (selectedCardType) params.append('cardType', selectedCardType);
      params.append('limit', '50');

      const response = await fetch(`/api/track-click?${params.toString()}`, {
        method: 'GET',
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Failed to fetch click data');
      }

      const data = await response.json();
      setClickData(data.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch click data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchUserClicks();
    }
  }, [isAuthenticated, selectedCardType]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Please sign in to view your activity</h2>
          <p className="text-gray-600">You need to be logged in to see your click statistics.</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your activity...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-xl mb-4">⚠️ Error</div>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={fetchUserClicks}
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Your Activity Dashboard</h1>
          <p className="text-gray-600">Track your interactions and discover your preferences</p>
        </motion.div>

        {/* User Info and Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-lg shadow-md p-6 mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              {user?.picture && (
                <img
                  src={user.picture}
                  alt={user.given_name || 'User'}
                  className="w-12 h-12 rounded-full mr-4"
                />
              )}
              <div>
                <h2 className="text-xl font-semibold text-gray-800">
                  {user?.given_name} {user?.family_name}
                </h2>
                <p className="text-gray-600">{user?.email}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold text-orange-500">{clickData?.totalClicks || 0}</p>
              <p className="text-gray-600">Total Clicks</p>
            </div>
          </div>

          {/* Filter */}
          <div className="mb-4">
            <label className="block text-sm text-gray-600 mb-2">Filter by Card Type</label>
            <select
              value={selectedCardType}
              onChange={(e) => setSelectedCardType(e.target.value)}
              className="w-full md:w-64 bg-white border border-gray-300 rounded-lg p-2 focus:border-orange-500 focus:outline-none"
            >
              <option value="">All Types</option>
              {clickData?.clicksByType.map((type) => (
                <option key={type._id} value={type._id}>
                  {type._id} ({type.count})
                </option>
              ))}
            </select>
          </div>
        </motion.div>

        {/* Click Activity by Type */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-lg shadow-md p-6 mb-8"
        >
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Your Interaction Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {clickData?.clicksByType.map((type) => (
              <div key={type._id} className="bg-gray-50 rounded-lg p-4 text-center">
                <p className="text-2xl font-bold text-orange-500">{type.count}</p>
                <p className="text-gray-600 capitalize">{type._id} clicks</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-lg shadow-md p-6"
        >
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Recent Activity</h3>
          {clickData?.clicks.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">No activity yet</p>
              <p className="text-sm text-gray-400">Start exploring to see your activity here!</p>
            </div>
          ) : (
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {clickData?.clicks.map((click) => (
                <div
                  key={click._id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex-1">
                    <div className="flex items-center space-x-3">
                      <span className="px-2 py-1 bg-orange-100 text-orange-800 text-xs rounded-full capitalize">
                        {click.cardType}
                      </span>
                      <span className="font-medium text-gray-800">
                        {click.cardData?.title || click.cardData?.label || click.cardIdentifier}
                      </span>
                    </div>
                    {click.cardData?.subtitle && (
                      <p className="text-sm text-gray-600 mt-1">{click.cardData.subtitle}</p>
                    )}
                    {click.cardData?.brand && (
                      <p className="text-sm text-gray-500 mt-1">Brand: {click.cardData.brand}</p>
                    )}
                  </div>
                  <div className="text-right text-sm text-gray-500">
                    {new Date(click.clickedAt).toLocaleDateString()}{' '}
                    {new Date(click.clickedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Refresh Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8 text-center"
        >
          <button
            onClick={fetchUserClicks}
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg transition-colors font-semibold"
          >
            🔄 Refresh Activity
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default UserClickDashboard;
