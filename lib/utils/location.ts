// Location utilities for requesting and storing user location

export interface LocationData {
    latitude: number;
    longitude: number;
    city?: string;
    country?: string;
    timestamp: number;
}

/**
 * Request location permission from the user
 * Returns location data if permission granted, null otherwise
 */
export async function requestLocationPermission(): Promise<LocationData | null> {
    return new Promise((resolve) => {
        if (!navigator.geolocation) {
            console.warn("Geolocation is not supported by this browser");
            resolve(null);
            return;
        }

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;

                // Try to get city and country from reverse geocoding
                const locationDetails = await reverseGeocode(latitude, longitude);

                resolve({
                    latitude,
                    longitude,
                    city: locationDetails?.city,
                    country: locationDetails?.country,
                    timestamp: Date.now(),
                });
            },
            (error) => {
                console.warn("Location permission denied or error:", error.message);
                resolve(null);
            },
            {
                enableHighAccuracy: false,
                timeout: 10000,
                maximumAge: 300000, // Cache for 5 minutes
            }
        );
    });
}

/**
 * Reverse geocode coordinates to get city and country
 * Uses OpenStreetMap Nominatim API (free, no API key required)
 */
async function reverseGeocode(
    latitude: number,
    longitude: number
): Promise<{ city?: string; country?: string } | null> {
    try {
        const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=10`,
            {
                headers: {
                    "User-Agent": "OlexCows-App", // Required by Nominatim
                },
            }
        );

        if (!response.ok) {
            throw new Error("Geocoding failed");
        }

        const data = await response.json();

        return {
            city: data.address?.city || data.address?.town || data.address?.village,
            country: data.address?.country,
        };
    } catch (error) {
        console.warn("Reverse geocoding failed:", error);
        return null;
    }
}

/**
 * Store location data in localStorage
 */
export function storeLocationLocally(location: LocationData): void {
    try {
        localStorage.setItem("userLocation", JSON.stringify(location));
    } catch (error) {
        console.warn("Failed to store location locally:", error);
    }
}

/**
 * Get stored location from localStorage
 */
export function getStoredLocation(): LocationData | null {
    try {
        const stored = localStorage.getItem("userLocation");
        if (!stored) return null;

        const location = JSON.parse(stored);

        // Check if location is older than 24 hours
        const isStale = Date.now() - location.timestamp > 24 * 60 * 60 * 1000;
        if (isStale) {
            localStorage.removeItem("userLocation");
            return null;
        }

        return location;
    } catch (error) {
        console.warn("Failed to get stored location:", error);
        return null;
    }
}

/**
 * Update user location in the database
 * Returns true if successful, false otherwise
 * Has a 5-second timeout to prevent hanging
 */
export async function updateUserLocation(
    uid: string,
    location: LocationData
): Promise<boolean> {
    try {
        // Create abort controller for timeout
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout

        const response = await fetch("/api/user/location", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                uid,
                latitude: location.latitude.toString(),
                longitude: location.longitude.toString(),
                city: location.city,
                country: location.country,
            }),
            signal: controller.signal,
        });

        clearTimeout(timeoutId);
        return response.ok;
    } catch (error) {
        if (error instanceof Error && error.name === 'AbortError') {
            console.warn("Location update timed out after 5 seconds");
        } else {
            console.error("Failed to update user location:", error);
        }
        return false;
    }
}
