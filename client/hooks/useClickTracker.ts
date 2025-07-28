import { useState, useCallback } from 'react';
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";

interface CardData {
  // Basic card information
  title?: string;
  subtitle?: string;
  image?: string;
  label?: string;
  type?: string;
  category?: string;
  
  // Product-specific information
  brand?: string;
  price?: string;
  offer?: string;
  originalPrice?: string;
  salePrice?: string;
  discount?: string;
  productId?: string;
  sku?: string;
  description?: string;
  rating?: number;
  reviewsCount?: number;
  availability?: string;
  
  // Product attributes
  size?: string;
  color?: string;
  material?: string;
  tags?: string[] | string;
  
  // Card styling/layout
  bg?: string;
  textColor?: string;
  icon?: boolean;
  position?: string;
  colSpan?: string;
  rowSpan?: string;
  alt?: string;
  
  // Additional metadata
  [key: string]: any;
}

interface ClickTrackerHook {
  trackClick: (cardType: string, cardIdentifier: string, cardData?: CardData) => Promise<void>;
  isTracking: boolean;
  error: string | null;
}

export function useClickTracker(): ClickTrackerHook {
  const [isTracking, setIsTracking] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { isAuthenticated, user } = useKindeBrowserClient();

  const trackClick = useCallback(async (
    cardType: string, 
    cardIdentifier: string, 
    cardData?: CardData
  ) => {
    // Only track if user is authenticated
    if (!isAuthenticated || !user) {
      console.log('User not authenticated, skipping click tracking');
      return;
    }

    setIsTracking(true);
    setError(null);

    try {
      // Generate a session ID if not exists
      let sessionId = sessionStorage.getItem('brokebro-session-id');
      if (!sessionId) {
        sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        sessionStorage.setItem('brokebro-session-id', sessionId);
      }

      const response = await fetch('/api/track-click', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-session-id': sessionId,
        },
        body: JSON.stringify({
          cardType,
          cardIdentifier,
          cardData: cardData || {},
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to track click');
      }

      const result = await response.json();
      console.log('Click tracked successfully:', result);

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to track click';
      setError(errorMessage);
      console.error('Error tracking click:', err);
    } finally {
      setIsTracking(false);
    }
  }, [isAuthenticated, user]);

  return {
    trackClick,
    isTracking,
    error,
  };
}
