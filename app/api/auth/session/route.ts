import { NextRequest, NextResponse } from 'next/server';
import { adminAuth } from '@/lib/firebase/firebaseadmin';
import { cookies } from 'next/headers';
import { SESSION_COOKIE_NAME } from '@/lib/firebase/constants';

/**
 * POST /api/auth/session
 * Sets a secure httpOnly session cookie after verifying the Firebase ID token.
 */
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { idToken } = body;

        if (!idToken) {
            return NextResponse.json({ error: 'Missing idToken' }, { status: 400 });
        }

        if (!adminAuth) {
            return NextResponse.json({ error: 'Firebase Admin not initialized' }, { status: 500 });
        }

        // Verify the ID token with Firebase Admin
        const decodedToken = await adminAuth.verifyIdToken(idToken);

        if (!decodedToken) {
            return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
        }

        // Set httpOnly cookie
        const cookieStore = await cookies();
        const isProduction = process.env.NODE_ENV === 'production';

        cookieStore.set(SESSION_COOKIE_NAME, idToken, {
            httpOnly: true,
            secure: isProduction,
            sameSite: 'lax',
            maxAge: 3600, // 1 hour
            path: '/',
        });

        return NextResponse.json({ success: true, uid: decodedToken.uid });
    } catch (error) {
        console.error('Error setting session cookie:', error);
        return NextResponse.json({ error: 'Failed to set session' }, { status: 500 });
    }
}

/**
 * DELETE /api/auth/session
 * Clears the session cookie (sign out server-side).
 */
export async function DELETE() {
    try {
        const cookieStore = await cookies();
        cookieStore.set(SESSION_COOKIE_NAME, '', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 0,
            path: '/',
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error clearing session cookie:', error);
        return NextResponse.json({ error: 'Failed to clear session' }, { status: 500 });
    }
}
