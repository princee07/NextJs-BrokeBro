"use client";

import { useEffect } from "react";
import { processReferral } from "@/app/lib/actions/referral.actions";

// Helper function to get a cookie by name from the browser
function getCookie(name: string): string | undefined {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift();
}

// Helper function to delete a cookie by name from the browser
function deleteCookie(name: string) {
  document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
}

export default function ReferralProcessor() {
  useEffect(() => {
    const referralCode = getCookie("brokebro_ref");

    if (referralCode) {
      console.log('Processing referral with code:', referralCode);

      // We found a referral code, so we call the server action.
      processReferral(referralCode).then((result) => {
        console.log('Referral processing result:', result);

        // After the action is processed, we delete the cookie to prevent reuse.
        deleteCookie("brokebro_ref");

        if (result.success) {
          console.log('Referral processed successfully!');
          console.log('Message:', result.message);
          console.log('Coins awarded to new user:', result.coinsAwarded);
          console.log('Referrer total coins:', result.referrerCoins);

          // Add a small delay to ensure database operations are complete
          setTimeout(() => {
            // Emit custom event to notify other components that referral was processed
            const event = new CustomEvent('referralProcessed', {
              detail: {
                referralCode,
                timestamp: Date.now(),
                coinsAwarded: result.coinsAwarded,
                referrerCoins: result.referrerCoins
              }
            });
            window.dispatchEvent(event);
            console.log('Referral processed event dispatched with delay');

            // Also emit a second event after another delay for extra reliability
            setTimeout(() => {
              const secondEvent = new CustomEvent('referralProcessed', {
                detail: {
                  referralCode,
                  timestamp: Date.now(),
                  retry: true,
                  coinsAwarded: result.coinsAwarded,
                  referrerCoins: result.referrerCoins
                }
              });
              window.dispatchEvent(secondEvent);
              console.log('Secondary referral processed event dispatched');
            }, 2000);

          }, 1000); // 1 second delay
        } else {
          console.error('Referral processing failed:', result.message);
        }
      }).catch((error) => {
        console.error('Error processing referral:', error);
      });
    }
  }, []); // The empty dependency array ensures this runs only once on mount.

  return null; // This component renders nothing to the screen.
} 