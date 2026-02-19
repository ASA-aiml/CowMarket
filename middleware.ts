import { NextRequest, NextResponse } from 'next/server';
import { SESSION_COOKIE_NAME, PUBLIC_ROUTES } from '@/lib/firebase/constants';

export function middleware(request: NextRequest) {
    const session = request.cookies.get(SESSION_COOKIE_NAME)?.value;
    const { pathname } = request.nextUrl;

    // If user has session and tries to access login/signup → redirect to home
    if (session && PUBLIC_ROUTES.some(route => pathname.startsWith(route))) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/login', '/signup'],
};
