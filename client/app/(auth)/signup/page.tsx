"use client";

import { LoginLink, RegisterLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { useSearchParams } from "next/navigation";
import { handleUserCreation } from "@/app/lib/actions/auth.actions";
import { KindeUser } from "@kinde-oss/kinde-auth-nextjs/types";
import { useEffect } from "react";

export default function SignupPage() {
  const searchParams = useSearchParams();
  const referralCode = searchParams.get("ref");

  const onAuthCallback = (user: KindeUser) => {
    handleUserCreation({ user, referralCode });
  };
  
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
        </div>
        <RegisterLink
          className="block w-full text-center py-3 rounded-lg bg-gradient-to-r from-orange-500 to-pink-600 text-white font-semibold text-sm hover:shadow-lg hover:shadow-orange-600/20 transition-all duration-300"
        >
          Sign up with email or SSO
        </RegisterLink>

        {referralCode && (
          <div className="text-center text-sm text-green-400">
            You were referred! You'll get 10 bonus coins after signing up.
          </div>
        )}
      </div>
    </div>
  );
}
