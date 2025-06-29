"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import CustomSignupForm from "./CustomSignupForm";

export default function SignupPage() {
    const searchParams = useSearchParams();
    useEffect(() => {
        const ref = searchParams.get("ref");
        if (ref) {
            localStorage.setItem("referral_code", ref);
        }
    }, [searchParams]);
    return <CustomSignupForm />;
}
