"use client";

import React from 'react';
import EnhancedBrandSearch from '@/components/EnhancedBrandSearch';

export default function SearchDemoPage() {
  const handleBrandSelect = (brand: string) => {
    console.log('Selected brand:', brand);
    // You can add navigation logic here
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Enhanced Brand Search
          </h1>
          <p className="text-lg text-gray-600">
            Search through all brands with categorized results
          </p>
        </div>

        {/* Search Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Search Brands, Items or Categories
          </h2>
          <div className="max-w-2xl mx-auto">
            <EnhancedBrandSearch
              onSelect={handleBrandSelect}
              placeholder="Search brands, items or categories..."
            />
          </div>
        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Smart Search</h3>
            <p className="text-gray-600">
              Find brands across all categories with intelligent filtering and suggestions.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Promoted Offers</h3>
            <p className="text-gray-600">
              Discover featured and promoted brand offers at the top of search results.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Personalized</h3>
            <p className="text-gray-600">
              Get personalized recommendations based on your interests and preferences.
            </p>
          </div>
        </div>

        {/* Brand Categories Info */}
        <div className="mt-12 bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Available Brand Categories
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="flex items-center p-3 bg-gray-50 rounded-lg">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mr-3">
                <span className="text-white text-sm font-bold">1</span>
              </div>
              <span className="font-medium text-gray-900">Offers & Deals</span>
            </div>
            <div className="flex items-center p-3 bg-gray-50 rounded-lg">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-3">
                <span className="text-white text-sm font-bold">2</span>
              </div>
              <span className="font-medium text-gray-900">Fashion & Beauty</span>
            </div>
            <div className="flex items-center p-3 bg-gray-50 rounded-lg">
              <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center mr-3">
                <span className="text-white text-sm font-bold">3</span>
              </div>
              <span className="font-medium text-gray-900">Technology</span>
            </div>
            <div className="flex items-center p-3 bg-gray-50 rounded-lg">
              <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center mr-3">
                <span className="text-white text-sm font-bold">4</span>
              </div>
              <span className="font-medium text-gray-900">Gym & Fitness</span>
            </div>
            <div className="flex items-center p-3 bg-gray-50 rounded-lg">
              <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center mr-3">
                <span className="text-white text-sm font-bold">5</span>
              </div>
              <span className="font-medium text-gray-900">Travel & Lifestyle</span>
            </div>
            <div className="flex items-center p-3 bg-gray-50 rounded-lg">
              <div className="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center mr-3">
                <span className="text-white text-sm font-bold">6</span>
              </div>
              <span className="font-medium text-gray-900">Companies & Internships</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 