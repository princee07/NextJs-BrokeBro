import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/app/lib/db/connect";
import User from "@/app/lib/db/models/user.model";

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const email = searchParams.get('email');

        if (!email) {
            return NextResponse.json(
                { error: "Email parameter is required" },
                { status: 400 }
            );
        }

        await dbConnect();
        const user = await User.findOne({ email });

        if (!user) {
            return NextResponse.json(
                { error: "User not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            user: {
                name: user.name,
                email: user.email,
                coins: user.coins || 0,
                referralCode: user.referralCode,
                image: user.image,
                hasResume: !!(user.resumeFileName && user.resumeFilePath),
                resumeFileName: user.resumeFileName,
                resumeUploadDate: user.resumeUploadDate,
            },
            coins: user.coins || 0, // Backward compatibility
        });
    } catch (error) {
        console.error("Error fetching user:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
