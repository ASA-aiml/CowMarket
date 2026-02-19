"use server";

import { db } from "@/lib/db";
import { users } from "@/lib/schema";
import { eq } from "drizzle-orm";

/**
 * Check if a user exists in the database by Firebase UID.
 * Returns the user record if found, null otherwise.
 */
export async function checkUserExists(uid: string) {
    try {
        const result = await db
            .select()
            .from(users)
            .where(eq(users.uid, uid))
            .limit(1);

        return result.length > 0 ? result[0] : null;
    } catch (error) {
        console.error("Error checking user existence:", error);
        return null;
    }
}

/**
 * Create a new user in the database with their Firebase UID and phone number.
 */
export async function createUser(uid: string, phone: string) {
    try {
        const result = await db
            .insert(users)
            .values({
                uid,
                phone,
                userRole: "user",
            })
            .returning();

        return { success: true, user: result[0] };
    } catch (error) {
        console.error("Error creating user:", error);
        return { success: false, error: "Failed to create user" };
    }
}
