"use client";

import { LoginLink, RegisterLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function SignupPage() {
  const searchParams = useSearchParams();
  const referralCode = searchParams.get("ref");

  useEffect(() => {
    // If there's a referral code in the URL, store it in a cookie for later use
    if (referralCode) {
      const expirationDate = new Date();
      expirationDate.setDate(expirationDate.getDate() + 30);
      document.cookie = `brokebro_ref=${referralCode}; expires=${expirationDate.toUTCString()}; path=/; SameSite=Lax`;
    }
  }, [referralCode]);



  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-4">
      <div className="w-full max-w-md p-8 space-y-6 bg-gray-900/50 rounded-lg border border-orange-500/30 shadow-xl shadow-orange-500/10">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-pink-500">
            Join BrokeBro
          </h1>
          <p className="mt-2 text-gray-400">
            Sign up to unlock exclusive student discounts.
          </p>
          {referralCode && (
            <div className="mt-4 p-3 bg-green-900/30 border border-green-500/50 rounded-lg">
              <p className="text-green-400 text-sm font-medium">🎉 You were invited by a friend!</p>
              <p className="text-green-300 text-xs mt-1">
                You'll both get 10 coins after you sign up!
              </p>
            </div>
          )}
        </div>

        <RegisterLink
          className="block w-full text-center py-3 rounded-lg bg-gradient-to-r from-orange-500 to-pink-600 text-white font-semibold text-sm hover:shadow-lg hover:shadow-orange-600/20 transition-all duration-300"
        >
          Sign up with email or SSO
        </RegisterLink>

        {/* Google Sign-In Button using Kinde RegisterLink with connection */}
        <RegisterLink
          className="block w-full text-center py-3 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold text-sm hover:shadow-lg hover:shadow-blue-600/20 transition-all duration-300"
          authUrlParams={{ connection_id: "conn_019797c30eecdd2694bde53419dda788" }}
        >
          Sign in with Google
        </RegisterLink>

        <div className="text-center">
          <p className="text-gray-400 text-sm">
            Already have an account?{" "}
            <LoginLink className="text-orange-400 hover:text-orange-300 font-medium">
              Sign in
            </LoginLink>
          </p>
        </div>

        {/* Benefits */}
        <div className="pt-4 border-t border-gray-800">
          <h3 className="text-center text-gray-300 font-medium mb-3">Why join BrokeBro?</h3>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-gray-400 text-sm">
              <svg className="w-4 h-4 text-orange-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Exclusive student discounts
            </div>
            <div className="flex items-center gap-2 text-gray-400 text-sm">
              <svg className="w-4 h-4 text-orange-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Internship opportunities
            </div>
            <div className="flex items-center gap-2 text-gray-400 text-sm">
              <svg className="w-4 h-4 text-orange-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Refer friends and earn coins
            </div>
            <div className="flex items-center gap-2 text-gray-400 text-sm">
              <svg className="w-4 h-4 text-orange-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Access to premium features
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
