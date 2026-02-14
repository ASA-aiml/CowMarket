import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { users } from "@/lib/schema";
import { eq } from "drizzle-orm";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { uid, latitude, longitude, city, country } = body;

        if (!uid) {
            return NextResponse.json({ error: "UID required" }, { status: 400 });
        }

        if (!latitude || !longitude) {
            return NextResponse.json(
                { error: "Latitude and longitude required" },
                { status: 400 }
            );
        }

        // Update user location in database
        await db
            .update(users)
            .set({
                latitude,
                longitude,
                city: city || null,
                country: country || null,
                locationUpdatedAt: new Date(),
                updatedAt: new Date(),
            })
            .where(eq(users.uid, uid));

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Location update error:", error);
        return NextResponse.json(
            { error: "Failed to update location" },
            { status: 500 }
        );
    }
}

export async function GET(request: NextRequest) {
    try {
        const uid = request.headers.get("x-user-id");

        if (!uid) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const userLocation = await db
            .select({
                latitude: users.latitude,
                longitude: users.longitude,
                city: users.city,
                country: users.country,
                locationUpdatedAt: users.locationUpdatedAt,
            })
            .from(users)
            .where(eq(users.uid, uid))
            .limit(1);

        if (userLocation.length === 0) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        return NextResponse.json(userLocation[0]);
    } catch (error) {
        console.error("Location fetch error:", error);
        return NextResponse.json(
            { error: "Failed to fetch location" },
            { status: 500 }
        );
    }
}
