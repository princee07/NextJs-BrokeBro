"use client";
import React, { useState, useRef, useEffect } from 'react';
import { X, MessageCircle, Bug, Lightbulb, ThumbsUp, ThumbsDown, Send, Star } from 'lucide-react';

interface FeedbackData {
  type: 'bug' | 'suggestion' | 'general' | 'rating';
  message: string;
  rating?: number;
  email?: string;
  page: string;
  timestamp: Date;
  userAgent: string;
}

const FeedbackWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [feedbackType, setFeedbackType] = useState<'bug' | 'suggestion' | 'general' | 'rating'>('general');
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');
  const [rating, setRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [quickReaction, setQuickReaction] = useState<'positive' | 'negative' | null>(null);
  
  const widgetRef = useRef<HTMLDivElement>(null);

  // Close widget when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (widgetRef.current && !widgetRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const feedbackData: FeedbackData = {
      type: feedbackType,
      message,
      rating: feedbackType === 'rating' ? rating : undefined,
      email: email || undefined,
      page: window.location.pathname,
      timestamp: new Date(),
      userAgent: navigator.userAgent
    };

    console.log('🚀 Submitting feedback:', feedbackData);

    try {
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(feedbackData),
      });

      console.log('📡 Response status:', response.status);
      console.log('📡 Response ok:', response.ok);

      if (!response.ok) {
        const errorData = await response.json();
        console.error('❌ Error response:', errorData);
        throw new Error(`Failed to submit feedback: ${response.status}`);
      }

      const result = await response.json();
      console.log('✅ Feedback submitted successfully:', result);
      
      setIsSubmitted(true);
      setTimeout(() => {
        setIsOpen(false);
        setIsSubmitted(false);
        setMessage('');
        setEmail('');
        setRating(0);
        setQuickReaction(null);
      }, 2000);
    } catch (error) {
      console.error('❌ Error submitting feedback:', error);
      // You could show an error message to the user here
      alert(`Error submitting feedback: ${error}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleQuickReaction = async (reaction: 'positive' | 'negative') => {
    setQuickReaction(reaction);
    
    const feedbackData: FeedbackData = {
      type: 'general',
      message: `Quick reaction: ${reaction}`,
      page: window.location.pathname,
      timestamp: new Date(),
      userAgent: navigator.userAgent
    };

    console.log('⚡ Submitting quick reaction:', feedbackData);

    try {
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(feedbackData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit quick reaction');
      }

      const result = await response.json();
      console.log('✅ Quick reaction submitted successfully:', result);
    } catch (error) {
      console.error('❌ Error submitting quick reaction:', error);
    }
  };

  const feedbackTypes = [
    { type: 'general' as const, icon: MessageCircle, label: 'General Feedback', color: 'bg-blue-500' },
    { type: 'bug' as const, icon: Bug, label: 'Report Bug', color: 'bg-red-500' },
    { type: 'suggestion' as const, icon: Lightbulb, label: 'Suggestion', color: 'bg-green-500' },
    { type: 'rating' as const, icon: Star, label: 'Rate Experience', color: 'bg-yellow-500' }
  ];

  return (
    <div ref={widgetRef} className="fixed bottom-6 right-6 z-50">
      {/* Main Widget Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 group"
          title="Share Feedback"
        >
          <MessageCircle className="w-6 h-6 group-hover:animate-pulse" />
        </button>
      )}

      {/* Quick Reaction Buttons */}
      {!isOpen && !quickReaction && (
        <div className="absolute bottom-16 right-0 flex flex-col gap-2">
          <button
            onClick={() => handleQuickReaction('positive')}
            className="bg-green-500 hover:bg-green-600 text-white rounded-full p-2 shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-110"
            title="Good experience"
          >
            <ThumbsUp className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleQuickReaction('negative')}
            className="bg-red-500 hover:bg-red-600 text-white rounded-full p-2 shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-110"
            title="Poor experience"
          >
            <ThumbsDown className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Quick Reaction Confirmation */}
      {quickReaction && !isOpen && (
        <div className="absolute bottom-16 right-0 bg-white rounded-lg shadow-lg p-3 border border-gray-200">
          <p className="text-sm text-gray-700">
            Thanks for your {quickReaction} feedback!
          </p>
        </div>
      )}

      {/* Feedback Form Modal */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-64 bg-white rounded-lg shadow-xl border border-gray-200">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-2 flex justify-between items-center">
            <h3 className="font-medium text-sm">Share Feedback</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-gray-200 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Content */}
          <div className="p-2">
            {isSubmitted ? (
              <div className="text-center py-4">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <ThumbsUp className="w-4 h-4 text-green-600" />
                </div>
                <h4 className="text-sm font-semibold text-gray-900 mb-1">Thank You!</h4>
                <p className="text-xs text-gray-600">Feedback submitted successfully.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-2">
                {/* Feedback Type Selection */}
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Type
                  </label>
                  <div className="grid grid-cols-2 gap-1">
                    {feedbackTypes.map(({ type, icon: Icon, label, color }) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setFeedbackType(type)}
                        className={`p-1.5 rounded border transition-all duration-200 ${
                          feedbackType === type
                            ? `${color} text-white border-transparent`
                            : 'bg-gray-50 text-gray-700 border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <Icon className="w-3 h-3 mx-auto mb-0.5" />
                        <span className="text-xs font-medium">{label.split(' ')[0]}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Rating (only for rating type) */}
                {feedbackType === 'rating' && (
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Rate Experience
                    </label>
                    <div className="flex gap-0.5 justify-center">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setRating(star)}
                          className="transition-colors"
                        >
                          <Star
                            className={`w-5 h-5 ${
                              star <= rating
                                ? 'text-yellow-400 fill-current'
                                : 'text-gray-300'
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Message */}
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    {feedbackType === 'bug' ? 'Issue' :
                     feedbackType === 'suggestion' ? 'Idea' : 'Message'}
                  </label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={
                      feedbackType === 'bug' 
                        ? 'Describe the issue...'
                        : feedbackType === 'suggestion'
                        ? 'Share your idea...'
                        : 'Tell us what you think...'
                    }
                    className="w-full p-1.5 text-xs border border-gray-300 rounded resize-none focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                    rows={2}
                    required
                  />
                </div>

                {/* Email (optional) */}
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Email (optional)
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="w-full p-1.5 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting || !message.trim()}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-400 text-white font-medium py-1.5 px-2 text-xs rounded transition-all duration-200 flex items-center justify-center gap-1"
                >
                  {isSubmitting ? (
                    <div className="w-3 h-3 border border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <Send className="w-3 h-3" />
                      Send
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Footer */}
          <div className="bg-gray-50 px-2 py-1 border-t border-gray-200">
            <p className="text-xs text-gray-500 text-center">
              Help us improve BrokeBro
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default FeedbackWidget;
