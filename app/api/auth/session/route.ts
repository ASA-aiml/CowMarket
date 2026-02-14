import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(request: NextRequest) {
    try {
        const { idToken } = await request.json();

        if (!idToken) {
            return NextResponse.json({ error: "ID token required" }, { status: 400 });
        }

        // Set session cookie (1 hour expiration)
        const cookieStore = await cookies();
        cookieStore.set("__session", idToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 3600, // 1 hour
            path: "/",
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Session creation error:", error);
        return NextResponse.json({ error: "Failed to create session" }, { status: 500 });
    }
}

export async function DELETE() {
    try {
        // Clear session cookie
        const cookieStore = await cookies();
        cookieStore.delete("__session");

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Session deletion error:", error);
        return NextResponse.json({ error: "Failed to delete session" }, { status: 500 });
    }
}
