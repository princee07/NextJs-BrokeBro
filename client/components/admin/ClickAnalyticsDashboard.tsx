"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface AnalyticsData {
  summary: {
    totalClicks: number;
    uniqueUsers: number;
    averageClicksPerUser: number;
  };
  clicksByType: Array<{ _id: string; count: number }>;
  clicksByUser: Array<{
    _id: { userId: string; userEmail: string; userName: string };
    totalClicks: number;
    cardTypes: string[];
    lastClick: string;
  }>;
  clicksOverTime: Array<{ _id: string; count: number }>;
  mostClickedCards: Array<{
    _id: { cardType: string; cardIdentifier: string };
    count: number;
    cardData: any;
    lastClicked: string;
  }>;
}

const ClickAnalyticsDashboard: React.FC = () => {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectedCardType, setSelectedCardType] = useState('');
  const [exporting, setExporting] = useState(false);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      console.log('Fetching analytics data...');
      
      const response = await fetch('/api/admin/click-analytics', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('Analytics response status:', response.status);
      
      if (!response.ok) {
        if (response.status === 403) {
          throw new Error('Access denied. Admin authentication required.');
        } else if (response.status === 404) {
          throw new Error('Analytics API endpoint not found. Please check deployment.');
        } else {
          const errorText = await response.text();
          throw new Error(`Failed to fetch analytics (${response.status}): ${errorText}`);
        }
      }

      const data = await response.json();
      console.log('Analytics data received:', data);
      setAnalytics(data.analytics);
    } catch (err) {
      console.error('Analytics fetch error:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch analytics');
    } finally {
      setLoading(false);
    }
  };

  const exportToExcel = async () => {
    try {
      setExporting(true);
      const params = new URLSearchParams();
      
      if (startDate) params.append('startDate', startDate);
      if (endDate) params.append('endDate', endDate);
      if (selectedCardType) params.append('cardType', selectedCardType);

      console.log('Exporting to Excel with params:', params.toString());

      const response = await fetch(`/api/admin/click-analytics?${params.toString()}`, {
        method: 'GET',
        credentials: 'include',
      });

      console.log('Export response status:', response.status);

      if (!response.ok) {
        if (response.status === 403) {
          throw new Error('Access denied. Admin authentication required.');
        } else if (response.status === 404) {
          throw new Error('Export API endpoint not found. Please check deployment.');
        } else {
          const errorText = await response.text();
          throw new Error(`Failed to export data (${response.status}): ${errorText}`);
        }
      }

      // Download the file
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `click-analytics-${new Date().toISOString().split('T')[0]}.xlsx`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
      
      console.log('Excel export completed successfully');
    } catch (err) {
      console.error('Export error:', err);
      setError(err instanceof Error ? err.message : 'Failed to export data');
    } finally {
      setExporting(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-300">Loading analytics...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center max-w-2xl mx-auto p-6">
          <div className="text-red-500 text-xl mb-4">⚠️ Error</div>
          <p className="text-gray-300 mb-4">{error}</p>
          
          {/* Debug information */}
          <div className="bg-gray-800 rounded-lg p-4 mb-4 text-left">
            <h3 className="text-lg font-semibold mb-2">Troubleshooting Tips:</h3>
            <ul className="text-sm text-gray-400 space-y-1">
              <li>• Ensure you're logged in as an admin</li>
              <li>• Check that your email is in the admin list</li>
              <li>• Try logging out and logging back in</li>
              <li>• Verify the API endpoint is deployed correctly</li>
            </ul>
          </div>

          <div className="space-x-3">
            <button
              onClick={fetchAnalytics}
              className="bg-orange-500 hover:bg-orange-600 px-6 py-2 rounded-lg transition-colors"
            >
              Retry
            </button>
            <button
              onClick={() => window.open('/api/click-tracking-status', '_blank')}
              className="bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded-lg transition-colors"
            >
              System Status
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-orange-500 mb-2">Click Analytics Dashboard</h1>
          <p className="text-gray-300">Monitor user interactions and card clicks</p>
        </motion.div>

        {/* Export Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gray-800 rounded-lg p-6 mb-8"
        >
          <h2 className="text-xl font-semibold mb-4">Export Controls</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            <div>
              <label className="block text-sm text-gray-300 mb-2">Start Date</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full bg-gray-700 text-white p-2 rounded border border-gray-600 focus:border-orange-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-300 mb-2">End Date</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full bg-gray-700 text-white p-2 rounded border border-gray-600 focus:border-orange-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-300 mb-2">Card Type</label>
              <select
                value={selectedCardType}
                onChange={(e) => setSelectedCardType(e.target.value)}
                className="w-full bg-gray-700 text-white p-2 rounded border border-gray-600 focus:border-orange-500 focus:outline-none"
              >
                <option value="">All Types</option>
                {analytics?.clicksByType.map((type) => (
                  <option key={type._id} value={type._id}>
                    {type._id} ({type.count})
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-end">
              <button
                onClick={exportToExcel}
                disabled={exporting}
                className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-600 px-4 py-2 rounded transition-colors flex items-center justify-center"
              >
                {exporting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Exporting...
                  </>
                ) : (
                  '📊 Export to Excel'
                )}
              </button>
            </div>
          </div>
        </motion.div>

        {/* Summary Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-2">Total Clicks</h3>
            <p className="text-3xl font-bold">{analytics?.summary.totalClicks.toLocaleString()}</p>
          </div>
          <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-2">Unique Users</h3>
            <p className="text-3xl font-bold">{analytics?.summary.uniqueUsers.toLocaleString()}</p>
          </div>
          <div className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-2">Avg Clicks/User</h3>
            <p className="text-3xl font-bold">{analytics?.summary.averageClicksPerUser.toFixed(1)}</p>
          </div>
        </motion.div>

        {/* Charts and Tables */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Clicks by Type */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gray-800 rounded-lg p-6"
          >
            <h3 className="text-xl font-semibold mb-4">Clicks by Card Type</h3>
            <div className="space-y-3">
              {analytics?.clicksByType.map((type, index) => (
                <div key={type._id} className="flex items-center justify-between">
                  <span className="capitalize text-gray-300">{type._id}</span>
                  <div className="flex items-center">
                    <div className="w-32 bg-gray-700 rounded-full h-2 mr-3">
                      <div
                        className="bg-gradient-to-r from-orange-500 to-red-500 h-2 rounded-full"
                        style={{
                          width: `${(type.count / (analytics.clicksByType[0]?.count || 1)) * 100}%`
                        }}
                      ></div>
                    </div>
                    <span className="font-semibold w-12 text-right">{type.count}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Top Users */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-gray-800 rounded-lg p-6"
          >
            <h3 className="text-xl font-semibold mb-4">Top Active Users</h3>
            <div className="space-y-3 max-h-80 overflow-y-auto">
              {analytics?.clicksByUser.slice(0, 10).map((user, index) => (
                <div key={user._id.userId} className="flex items-center justify-between p-3 bg-gray-700 rounded">
                  <div className="flex-1">
                    <p className="font-medium text-sm">{user._id.userName || 'Unknown'}</p>
                    <p className="text-xs text-gray-400">{user._id.userEmail}</p>
                    <p className="text-xs text-gray-400">{user.cardTypes.length} card types</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-orange-400">{user.totalClicks}</p>
                    <p className="text-xs text-gray-400">clicks</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Most Clicked Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-gray-800 rounded-lg p-6 lg:col-span-2"
          >
            <h3 className="text-xl font-semibold mb-4">Most Clicked Cards</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-600">
                    <th className="text-left p-3">Card Type</th>
                    <th className="text-left p-3">Identifier</th>
                    <th className="text-left p-3">Title</th>
                    <th className="text-right p-3">Clicks</th>
                    <th className="text-right p-3">Last Clicked</th>
                  </tr>
                </thead>
                <tbody>
                  {analytics?.mostClickedCards.map((card, index) => (
                    <tr key={`${card._id.cardType}-${card._id.cardIdentifier}`} className="border-b border-gray-700 hover:bg-gray-700">
                      <td className="p-3 capitalize">{card._id.cardType}</td>
                      <td className="p-3 text-gray-300">{card._id.cardIdentifier}</td>
                      <td className="p-3 text-gray-300">{card.cardData?.title || card.cardData?.label || 'N/A'}</td>
                      <td className="p-3 text-right font-semibold text-orange-400">{card.count}</td>
                      <td className="p-3 text-right text-gray-400">
                        {new Date(card.lastClicked).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>

        {/* Refresh Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-8 text-center"
        >
          <button
            onClick={fetchAnalytics}
            className="bg-orange-500 hover:bg-orange-600 px-6 py-3 rounded-lg transition-colors font-semibold"
          >
            🔄 Refresh Data
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default ClickAnalyticsDashboard;
