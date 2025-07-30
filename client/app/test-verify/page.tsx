"use client";
import { useState } from 'react';

interface VerificationResult {
  isVerified: boolean;
  user?: {
    name: string;
    studentId: string;
    email: string;
    university: string;
    verificationDate: string;
  };
  message?: string;
  error?: string;
}

export default function TestVerificationPage() {
  const [testId, setTestId] = useState('');
  const [result, setResult] = useState<VerificationResult | null>(null);
  const [loading, setLoading] = useState(false);

  const testUsers = [
    { id: 'user123456789', name: 'John Doe', status: '✅ Verified' },
    { id: 'user987654321', name: 'Jane Smith', status: '✅ Verified' },
    { id: 'demo-user-id', name: 'Demo Student', status: '✅ Verified' },
    { id: 'invaliduser', name: 'Invalid User', status: '❌ Not Verified' },
    { id: '999999999', name: 'Unknown ID', status: '❌ Not Verified' }
  ];

  const testVerification = async (id: string) => {
    setLoading(true);
    setResult(null);
    
    try {
      const response = await fetch(`/api/verify/${id}`);
      const data = await response.json();
      setResult(data);
    } catch (error) {
      setResult({ 
        error: error instanceof Error ? error.message : 'Unknown error', 
        isVerified: false 
      });
    } finally {
      setLoading(false);
    }
  };

  const openVerificationPage = (id: string) => {
    window.open(`/verify/${id}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8 text-center">
          🧪 Verification System Test Page
        </h1>

        {/* Quick Test Users */}
        <div className="bg-gray-800 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-white mb-4">Quick Test Users</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {testUsers.map((user) => (
              <div key={user.id} className="bg-gray-700 rounded-lg p-4">
                <div className="text-white font-semibold mb-2">{user.name}</div>
                <div className="text-gray-400 text-sm mb-2">ID: {user.id}</div>
                <div className="text-sm mb-3">{user.status}</div>
                <div className="flex gap-2">
                  <button
                    onClick={() => testVerification(user.id)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-xs"
                    disabled={loading}
                  >
                    Test API
                  </button>
                  <button
                    onClick={() => openVerificationPage(user.id)}
                    className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-xs"
                  >
                    Open Page
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Manual Test */}
        <div className="bg-gray-800 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-white mb-4">Manual Test</h2>
          <div className="flex gap-4 mb-4">
            <input
              type="text"
              value={testId}
              onChange={(e) => setTestId(e.target.value)}
              placeholder="Enter user ID to test..."
              className="flex-1 bg-gray-700 text-white px-4 py-2 rounded"
            />
            <button
              onClick={() => testVerification(testId)}
              disabled={loading || !testId}
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded disabled:opacity-50"
            >
              {loading ? 'Testing...' : 'Test API'}
            </button>
            <button
              onClick={() => openVerificationPage(testId)}
              disabled={!testId}
              className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-2 rounded disabled:opacity-50"
            >
              Open Page
            </button>
          </div>
        </div>

        {/* Results */}
        {result && (
          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-xl font-bold text-white mb-4">Test Results</h2>
            <div className={`p-4 rounded-lg ${result.isVerified ? 'bg-green-900 border border-green-600' : 'bg-red-900 border border-red-600'}`}>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">
                  {result.isVerified ? '✅' : '❌'}
                </span>
                <span className="text-white font-semibold">
                  {result.isVerified ? 'VERIFIED' : 'NOT VERIFIED'}
                </span>
              </div>
              
              {result.user && (
                <div className="text-white space-y-2">
                  <div><strong>Name:</strong> {result.user.name}</div>
                  <div><strong>Student ID:</strong> {result.user.studentId}</div>
                  <div><strong>Email:</strong> {result.user.email}</div>
                  <div><strong>University:</strong> {result.user.university}</div>
                  <div><strong>Verification Date:</strong> {result.user.verificationDate}</div>
                </div>
              )}
              
              <div className="text-gray-300 mt-3">
                <strong>Message:</strong> {result.message || result.error}
              </div>
              
              <details className="mt-4">
                <summary className="text-gray-400 cursor-pointer">Raw JSON Response</summary>
                <pre className="text-xs text-gray-300 mt-2 bg-gray-800 p-2 rounded overflow-auto">
                  {JSON.stringify(result, null, 2)}
                </pre>
              </details>
            </div>
          </div>
        )}

        {/* Instructions */}
        <div className="bg-gray-800 rounded-lg p-6 mt-8">
          <h2 className="text-xl font-bold text-white mb-4">📋 How to Test</h2>
          <div className="text-gray-300 space-y-2">
            <div><strong>1. Quick Test:</strong> Click "Test API" or "Open Page" for predefined users</div>
            <div><strong>2. Manual Test:</strong> Enter any user ID and test the verification</div>
            <div><strong>3. API Test:</strong> Tests the backend API response</div>
            <div><strong>4. Page Test:</strong> Opens the actual verification page users would see</div>
          </div>
          
          <div className="mt-4 p-3 bg-blue-900 border border-blue-600 rounded">
            <div className="text-blue-200 text-sm">
              <strong>🔗 QR Code Flow:</strong> QR codes in the profile page will redirect to these verification pages automatically.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
