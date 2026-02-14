import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Routes that should only be accessible when NOT logged in
const authOnlyRoutes = ["/login", "/signup"];

// Routes that are always public (no restrictions)
const publicRoutes = ["/verify-phone"];

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Get session cookie
    const session = request.cookies.get("__session");

    // If accessing login/signup with an active session, redirect to home
    if (authOnlyRoutes.some(route => pathname.startsWith(route)) && session) {
        return NextResponse.redirect(new URL("/", request.url));
    }

    // Allow all other routes (site is publicly accessible)
    // Phone verification enforcement is handled by AuthContext on the client side
    return NextResponse.next();
}

// Configure which routes to run middleware on
export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - public files (images, etc.)
         */
        "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
    ],
};
