import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { users } from "@/lib/schema";
import { eq } from "drizzle-orm";

export async function GET(request: NextRequest) {
    try {
        const uid = request.headers.get("x-user-id");

        if (!uid) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const userProfile = await db.select().from(users).where(eq(users.uid, uid)).limit(1);

        if (userProfile.length === 0) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        return NextResponse.json(userProfile[0]);
    } catch (error) {
        console.error("Profile fetch error:", error);
        return NextResponse.json({ error: "Failed to fetch profile" }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { uid, email, phoneNumber, displayName, photoURL, authProvider, phoneVerified } = body;

        if (!uid) {
            return NextResponse.json({ error: "UID required" }, { status: 400 });
        }

        // Check if user exists
        const existingUser = await db.select().from(users).where(eq(users.uid, uid)).limit(1);

        if (existingUser.length > 0) {
            // Update existing user
            await db
                .update(users)
                .set({
                    email,
                    phoneNumber,
                    displayName,
                    photoURL,
                    phoneVerified,
                    updatedAt: new Date(),
                })
                .where(eq(users.uid, uid));

            return NextResponse.json({ success: true, action: "updated" });
        } else {
            // Create new user
            await db.insert(users).values({
                uid,
                email,
                phoneNumber,
                displayName,
                photoURL,
                authProvider,
                phoneVerified: phoneVerified || false,
                userRole: "user", // default role
                createdAt: new Date(),
                updatedAt: new Date(),
            });

            return NextResponse.json({ success: true, action: "created" });
        }
    } catch (error) {
        console.error("Profile update error:", error);
        return NextResponse.json({ error: "Failed to update profile" }, { status: 500 });
    }
}
