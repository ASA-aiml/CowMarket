"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, onAuthStateChanged as firebaseOnAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/firebase/config';
import { useRouter, usePathname } from 'next/navigation';

interface AuthContextType {
    user: User | null;
    loading: boolean;
    phoneVerified: boolean;
    setPhoneVerified: (verified: boolean) => void;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    loading: true,
    phoneVerified: false,
    setPhoneVerified: () => { },
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [phoneVerified, setPhoneVerified] = useState(false);
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        const unsubscribe = firebaseOnAuthStateChanged(auth, async (firebaseUser) => {
            setUser(firebaseUser);

            if (firebaseUser) {
                // Check if user has verified phone number
                const hasPhone = !!firebaseUser.phoneNumber;
                setPhoneVerified(hasPhone);

                // Store session cookie
                const idToken = await firebaseUser.getIdToken();
                document.cookie = `__session=${idToken}; path=/; max-age=3600; SameSite=Lax`;

                // CRITICAL: Force phone verification for users without phone
                // This prevents bypassing the OTP step by refreshing or navigating
                if (!hasPhone && pathname !== '/verify-phone' && pathname !== '/login' && pathname !== '/signup') {
                    console.log('User not phone verified, redirecting to /verify-phone');
                    router.push('/verify-phone');
                }
            } else {
                // Clear session cookie
                document.cookie = '__session=; path=/; max-age=0';
                setPhoneVerified(false);
            }

            setLoading(false);
        });

        return () => unsubscribe();
    }, [router, pathname]);

    return (
        <AuthContext.Provider value={{ user, loading, phoneVerified, setPhoneVerified }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
