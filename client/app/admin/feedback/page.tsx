"use client";
import React, { useState, useEffect } from 'react';
import { MessageCircle, Bug, Lightbulb, Star, User, Calendar, Globe, RefreshCw, AlertCircle } from 'lucide-react';

interface FeedbackItem {
  _id: string;
  type: 'bug' | 'suggestion' | 'general' | 'rating';
  message: string;
  rating?: number;
  email?: string;
  page: string;
  timestamp: string;
  createdAt: string;
  userAgent: string;
  ipAddress?: string;
  isResolved?: boolean;
  priority?: 'low' | 'medium' | 'high' | 'urgent';
}

interface FeedbackStats {
  _id: string;
  count: number;
  avgRating?: number;
  unresolved: number;
}

const FeedbackDashboard: React.FC = () => {
  const [feedback, setFeedback] = useState<FeedbackItem[]>([]);
  const [stats, setStats] = useState<FeedbackStats[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>('all');
  const [refreshing, setRefreshing] = useState(false);

  const fetchFeedback = async () => {
    try {
      setError(null);
      const response = await fetch('/api/feedback');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.success) {
        setFeedback(data.feedback || []);
        setStats(data.stats || []);
        console.log('✅ Feedback loaded from database:', data.feedback.length, 'items');
      } else {
        throw new Error('Failed to fetch feedback');
      }
    } catch (error) {
      console.error('❌ Error fetching feedback:', error);
      setError(error instanceof Error ? error.message : 'Failed to load feedback');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchFeedback();
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchFeedback();
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'bug': return <Bug className="w-4 h-4 text-red-500" />;
      case 'suggestion': return <Lightbulb className="w-4 h-4 text-green-500" />;
      case 'rating': return <Star className="w-4 h-4 text-yellow-500" />;
      default: return <MessageCircle className="w-4 h-4 text-blue-500" />;
    }
  };

  const getPriorityColor = (priority?: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-500 text-white';
      case 'high': return 'bg-orange-500 text-white';
      case 'medium': return 'bg-yellow-500 text-white';
      case 'low': return 'bg-green-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'bug': return 'bg-red-100 text-red-800';
      case 'suggestion': return 'bg-green-100 text-green-800';
      case 'rating': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-blue-100 text-blue-800';
    }
  };

  const filteredFeedback = filter === 'all' 
    ? feedback 
    : feedback.filter(item => item.type === filter);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading feedback from database...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Error Loading Feedback</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={handleRefresh}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 mx-auto"
          >
            <RefreshCw className="w-4 h-4" />
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Feedback Dashboard</h1>
            <p className="text-gray-600">Monitor user feedback from database in real-time</p>
          </div>
          <button
            onClick={handleRefresh}
            disabled={refreshing}
            className="bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white px-4 py-2 rounded-lg flex items-center gap-2"
          >
            <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Feedback</p>
                <p className="text-2xl font-bold text-gray-900">{feedback.length}</p>
              </div>
              <MessageCircle className="w-8 h-8 text-blue-500" />
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Bug Reports</p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.find(s => s._id === 'bug')?.count || 0}
                </p>
              </div>
              <Bug className="w-8 h-8 text-red-500" />
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Suggestions</p>
                <p className="text-2xl font-bold text-gray-900">
                  {feedback.filter(f => f.type === 'suggestion').length}
                </p>
              </div>
              <Lightbulb className="w-8 h-8 text-green-500" />
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg Rating</p>
                <p className="text-2xl font-bold text-gray-900">
                  {feedback.filter(f => f.rating).length > 0 
                    ? (feedback.filter(f => f.rating).reduce((acc, f) => acc + (f.rating || 0), 0) / feedback.filter(f => f.rating).length).toFixed(1)
                    : 'N/A'
                  }
                </p>
              </div>
              <Star className="w-8 h-8 text-yellow-500" />
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 mb-6">
          <div className="flex flex-wrap gap-2">
            {['all', 'general', 'bug', 'suggestion', 'rating'].map((type) => (
              <button
                key={type}
                onClick={() => setFilter(type)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filter === type
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Feedback List */}
        <div className="space-y-4">
          {filteredFeedback.length === 0 ? (
            <div className="bg-white rounded-lg p-12 shadow-sm border border-gray-200 text-center">
              <MessageCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No feedback found</h3>
              <p className="text-gray-600">
                {filter === 'all' ? 
                  'No feedback has been submitted yet. Encourage users to share their thoughts!' : 
                  `No ${filter} feedback found. Try selecting a different filter.`
                }
              </p>
            </div>
          ) : (
            filteredFeedback.map((item) => (
              <div key={item._id} className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3 flex-wrap">
                    {getTypeIcon(item.type)}
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(item.type)}`}>
                      {item.type}
                    </span>
                    {item.priority && (
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(item.priority)}`}>
                        {item.priority} priority
                      </span>
                    )}
                    {item.rating && (
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < item.rating! ? 'text-yellow-400 fill-current' : 'text-gray-300'
                            }`}
                          />
                        ))}
                        <span className="text-sm text-gray-600 ml-1">({item.rating}/5)</span>
                      </div>
                    )}
                    {item.isResolved && (
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Resolved
                      </span>
                    )}
                  </div>
                  <div className="text-right">
                    <span className="text-sm text-gray-500 block">
                      {new Date(item.createdAt || item.timestamp).toLocaleString()}
                    </span>
                    <span className="text-xs text-gray-400">
                      ID: {item._id.slice(-6)}
                    </span>
                  </div>
                </div>
                
                <p className="text-gray-900 mb-4">{item.message}</p>
                
                <div className="flex items-center gap-6 text-sm text-gray-500 flex-wrap">
                  {item.email && (
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      <span>{item.email}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4" />
                    <span>{item.page}</span>
                  </div>
                  {item.ipAddress && (
                    <div className="flex items-center gap-2">
                      <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                        IP: {item.ipAddress}
                      </span>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(item.createdAt || item.timestamp).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default FeedbackDashboard;
