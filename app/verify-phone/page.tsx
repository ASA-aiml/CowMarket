"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

// Phone verification is currently disabled (requires Firebase Blaze plan).
// Redirect users to the home page.
export default function VerifyPhonePage() {
    const router = useRouter();

    useEffect(() => {
        router.replace("/");
    }, [router]);

    return (
        <div className="min-h-screen flex items-center justify-center">
            <p className="text-neutral-500 font-medium">Redirecting...</p>
        </div>
    );
}
