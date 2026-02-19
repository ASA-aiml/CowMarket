// constants.ts

export const ROOT_ROUTE = '/';
export const HOME_ROUTE = '/';
export const ADMIN_ROUTE = '/admin';
export const LOGIN_ROUTE = '/login';
export const SIGNUP_ROUTE = '/signup';
export const VERIFY_PHONE_ROUTE = '/verify-phone';
export const SESSION_COOKIE_NAME = '__session';

// Routes that don't require authentication
export const PUBLIC_ROUTES = [LOGIN_ROUTE, SIGNUP_ROUTE];

// Routes that don't require phone verification
export const PHONE_EXEMPT_ROUTES = [LOGIN_ROUTE, SIGNUP_ROUTE, VERIFY_PHONE_ROUTE];