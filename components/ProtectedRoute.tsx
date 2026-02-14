"use client";

import { useEffect } from "react";
import { useAuth } from "@/lib/contexts/AuthContext";
import { useRouter, usePathname } from "next/navigation";
import { Loader2 } from "lucide-react";

interface ProtectedRouteProps {
    children: React.ReactNode;
    requirePhoneVerification?: boolean;
}

export default function ProtectedRoute({ children, requirePhoneVerification = false }: ProtectedRouteProps) {
    const { user, loading, phoneVerified } = useAuth();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        if (!loading) {
            if (!user) {
                // Not authenticated, redirect to login
                router.push(`/login?redirect=${encodeURIComponent(pathname)}`);
            } else if (requirePhoneVerification && !phoneVerified) {
                // Authenticated but phone not verified
                router.push("/verify-phone");
            }
        }
    }, [user, loading, phoneVerified, requirePhoneVerification, router, pathname]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
                    <p className="text-gray-600 font-medium">Loading...</p>
                </div>
            </div>
        );
    }

    if (!user) {
        return null;
    }

    if (requirePhoneVerification && !phoneVerified) {
        return null;
    }

    return <>{children}</>;
}
