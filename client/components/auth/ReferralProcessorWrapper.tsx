"use client";

import dynamic from 'next/dynamic';

// Dynamically import ReferralProcessor with no SSR to prevent hydration issues
const ReferralProcessor = dynamic(() => import('./ReferralProcessor'), {
  ssr: false,
});

export default function ReferralProcessorWrapper() {
  return <ReferralProcessor />;
}
