"use client";

import { useEffect, useState } from "react";
import { MapPin, X } from "lucide-react";
import { requestLocationPermission, storeLocationLocally, getStoredLocation } from "@/lib/utils/location";

export default function LocationPermissionBanner() {
    const [showBanner, setShowBanner] = useState(false);
    const [requesting, setRequesting] = useState(false);

    useEffect(() => {
        // Check if we already have location or user dismissed the banner
        const hasLocation = getStoredLocation();
        const dismissed = localStorage.getItem("locationBannerDismissed");

        if (!hasLocation && !dismissed) {
            // Show banner after a short delay for better UX
            setTimeout(() => setShowBanner(true), 2000);
        }
    }, []);

    const handleRequestLocation = async () => {
        setRequesting(true);
        const location = await requestLocationPermission();

        if (location) {
            storeLocationLocally(location);
            setShowBanner(false);
        } else {
            // Permission denied, don't show again for this session
            localStorage.setItem("locationBannerDismissed", "true");
            setShowBanner(false);
        }
        setRequesting(false);
    };

    const handleDismiss = () => {
        localStorage.setItem("locationBannerDismissed", "true");
        setShowBanner(false);
    };

    if (!showBanner) return null;

    return (
        <div className="fixed bottom-20 md:bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-md z-50 animate-slide-up">
            <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 p-4">
                <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <MapPin className="w-5 h-5 text-blue-600" />
                    </div>

                    <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-1">
                            Enable Location Services
                        </h3>
                        <p className="text-sm text-gray-600 mb-3">
                            We'd like to show you relevant content based on your location. Your location will be stored securely.
                        </p>

                        <div className="flex gap-2">
                            <button
                                onClick={handleRequestLocation}
                                disabled={requesting}
                                className="flex-1 px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {requesting ? "Requesting..." : "Allow Location"}
                            </button>
                            <button
                                onClick={handleDismiss}
                                className="px-4 py-2 text-gray-600 text-sm font-medium hover:bg-gray-100 rounded-lg transition-colors"
                            >
                                Not Now
                            </button>
                        </div>
                    </div>

                    <button
                        onClick={handleDismiss}
                        className="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors"
                        aria-label="Close"
                    >
                        <X size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
}
