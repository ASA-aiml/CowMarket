import { db, pool } from "./db";
import { listings, users } from "./schema";
import { hash } from "crypto"; // just for ID gen if needed, or random

async function seed() {
    console.log("🌱 Seeding database...");

    try {
        // 1. Create a Seed User (Raju Farms)
        const sellerUid = "seed-user-raju";
        await db.insert(users).values({
            uid: sellerUid,
            userRole: "seller",
            phone: "+91 98765 43210",
            whatsappNumber: "+91 98765 43210",
            address: "Kochi, Kerala",
            farmingExperience: 15,
            profilePhoto: "https://api.dicebear.com/7.x/avataaars/svg?seed=Raju",
        }).onConflictDoNothing();

        // 2. Clear existing listings? Maybe not, just append.
        // await db.delete(listings); 

        // 3. Insert Mock Listings
        const mockListings = [
            {
                sellerUid,
                type: "Cow",
                breed: "Jersey",
                price: "45000",
                district: "Kochi",
                state: "Kerala",
                images: ["https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?q=80&w=800"],
                milkProduction: "15",
                age: 3,
                ageUnit: "years",
                lactationStage: "Second",
                pregnancyStatus: "Yes",
                gender: "Female",
                status: "active",
                viewCount: 120,
                // video: true in user data, adding placeholder if true
                video: "https://www.w3schools.com/html/mov_bbb.mp4",
            },
            {
                sellerUid,
                type: "Cow",
                breed: "Holstein Friesian",
                price: "62000",
                district: "Thrissur",
                state: "Kerala",
                images: ["https://images.unsplash.com/photo-1541625602330-2277a4c46182?q=80&w=800"],
                milkProduction: "22",
                age: 4,
                ageUnit: "years",
                lactationStage: "Third",
                pregnancyStatus: "No",
                gender: "Female",
                status: "active",
                viewCount: 85,
                video: "https://www.w3schools.com/html/mov_bbb.mp4",
            },
            {
                sellerUid,
                type: "Buffalo",
                breed: "Murrah",
                price: "85000",
                district: "Palakkad",
                state: "Kerala",
                images: ["https://images.unsplash.com/photo-1589332560447-7389e47264a7?q=80&w=800"],
                milkProduction: "12",
                age: 5,
                ageUnit: "years",
                lactationStage: "Second",
                pregnancyStatus: "Yes",
                gender: "Female",
                status: "active",
                viewCount: 200,
                video: null,
            },
            {
                sellerUid,
                type: "Cow",
                breed: "Vechur",
                price: "35000",
                district: "Kottayam",
                state: "Kerala",
                images: ["https://images.unsplash.com/photo-1546445317-29f4545e9d53?q=80&w=800"],
                milkProduction: "4",
                age: 4,
                ageUnit: "years",
                lactationStage: "First",
                pregnancyStatus: "No",
                gender: "Female",
                status: "active",
                viewCount: 50,
                video: "https://www.w3schools.com/html/mov_bbb.mp4",
            },
        ];

        console.log("📝 Inserting listings...");
        for (const listing of mockListings) {
            await db.insert(listings).values({
                ...listing,
                locationLat: "10.8505", // Mock lat
                locationLng: "76.2711", // Mock lng
            });
        }

        console.log("✅ Seeding complete!");
    } catch (error) {
        console.error("❌ Seeding failed:", error);
    } finally {
        pool.end();
    }
}

seed();
