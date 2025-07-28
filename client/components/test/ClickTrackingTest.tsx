"use client";
import React, { useState } from 'react';
import { useClickTracker } from '@/hooks/useClickTracker';
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";

const ClickTrackingTest: React.FC = () => {
  const { trackClick, isTracking, error } = useClickTracker();
  const { isAuthenticated, user } = useKindeBrowserClient();
  const [lastClick, setLastClick] = useState<string>('');

  const handleTestClick = async (testType: string) => {
    const timestamp = new Date().toISOString();
    setLastClick(`${testType} - ${timestamp}`);
    
    await trackClick('test', `test-${testType}-${Date.now()}`, {
      title: `Test ${testType}`,
      category: 'test',
      type: 'test-card',
      testTimestamp: timestamp
    });
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Please sign in to test click tracking</h2>
          <p className="text-gray-600">You need to be logged in to test the click tracking system.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Click Tracking System Test</h1>
          
          {/* User Info */}
          <div className="bg-blue-50 rounded-lg p-4 mb-6">
            <h2 className="text-lg font-semibold text-blue-800 mb-2">User Information</h2>
            <p><strong>Name:</strong> {user?.given_name} {user?.family_name}</p>
            <p><strong>Email:</strong> {user?.email}</p>
            <p><strong>Authenticated:</strong> {isAuthenticated ? '✅ Yes' : '❌ No'}</p>
          </div>

          {/* Test Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            <button
              onClick={() => handleTestClick('Hero Card')}
              disabled={isTracking}
              className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white p-4 rounded-lg transition-colors"
            >
              {isTracking ? 'Tracking...' : 'Test Hero Card Click'}
            </button>
            
            <button
              onClick={() => handleTestClick('Category')}
              disabled={isTracking}
              className="bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white p-4 rounded-lg transition-colors"
            >
              {isTracking ? 'Tracking...' : 'Test Category Click'}
            </button>
            
            <button
              onClick={() => handleTestClick('Product')}
              disabled={isTracking}
              className="bg-purple-500 hover:bg-purple-600 disabled:bg-gray-400 text-white p-4 rounded-lg transition-colors"
            >
              {isTracking ? 'Tracking...' : 'Test Product Click'}
            </button>
          </div>

          {/* Status */}
          <div className="space-y-4">
            {lastClick && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h3 className="text-green-800 font-semibold">Last Click Tracked:</h3>
                <p className="text-green-700">{lastClick}</p>
              </div>
            )}

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <h3 className="text-red-800 font-semibold">Error:</h3>
                <p className="text-red-700">{error}</p>
              </div>
            )}

            {isTracking && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h3 className="text-yellow-800 font-semibold">Tracking in progress...</h3>
                <p className="text-yellow-700">Please wait while we record your click.</p>
              </div>
            )}
          </div>

          {/* Links */}
          <div className="mt-8 flex flex-wrap gap-4">
            <a 
              href="/activity" 
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg transition-colors"
            >
              View Your Activity
            </a>
            <a 
              href="/api/click-tracking-status" 
              target="_blank"
              className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg transition-colors"
            >
              System Status
            </a>
            <a 
              href="/admin/click-analytics" 
              className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg transition-colors"
            >
              Admin Analytics
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClickTrackingTest;
