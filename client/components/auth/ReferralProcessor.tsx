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
      // We found a referral code, so we call the server action.
      processReferral(referralCode).then(() => {
        // After the action is processed, we delete the cookie to prevent reuse.
        deleteCookie("brokebro_ref");
      });
    }
  }, []); // The empty dependency array ensures this runs only once on mount.

  return null; // This component renders nothing to the screen.
} 