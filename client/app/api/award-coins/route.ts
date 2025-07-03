import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/app/lib/db/connect";
import User from "@/app/lib/db/models/user.model";

export async function POST(request: NextRequest) {
    try {
        const { referrerEmail, amount = 10 } = await request.json();

        if (!referrerEmail) {
            return NextResponse.json(
                { error: "Referrer email is required" },
                { status: 400 }
            );
        }

        await dbConnect();

        // Find the referrer by email
        const referrer = await User.findOne({ email: referrerEmail });

        if (!referrer) {
            return NextResponse.json(
                { error: "Referrer not found" },
                { status: 404 }
            );
        }

        // Update the referrer's coins
        const previousCoins = referrer.coins || 0;
        referrer.coins = previousCoins + amount;
        await referrer.save();

        console.log(`Manually awarded ${amount} coins to ${referrerEmail}. Previous: ${previousCoins}, New: ${referrer.coins}`);

        return NextResponse.json({
            success: true,
            message: `Successfully awarded ${amount} coins to ${referrerEmail}`,
            previousCoins,
            newCoins: referrer.coins,
            referrer: {
                email: referrer.email,
                name: referrer.name,
                coins: referrer.coins
            }
        });

    } catch (error) {
        console.error("Error awarding coins:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
