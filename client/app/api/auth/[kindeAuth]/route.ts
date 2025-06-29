import { handleAuth } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export const GET = handleAuth({
    async afterLogin(req: NextRequest, res: NextResponse, session: any) {
        try {
            // Kinde passes user info as the 3rd argument (session)
            const user = session?.user;
            if (user) {
                await fetch(`${process.env.KINDE_SITE_URL}/api/user`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        name: user.given_name || user.name || "",
                        email: user.email,
                        image: user.picture || "",
                        referralCode: "", // Enhance to use referral from cookie/localStorage if needed
                    }),
                });
            }
        } catch (err) {
            console.error("Error creating user after Kinde login:", err);
        }
        return res;
    },
});