import {
  signInWithPopup,
  GoogleAuthProvider,
  User,
  UserCredential,
  signInWithPhoneNumber,
  RecaptchaVerifier,
  ConfirmationResult,
  linkWithPhoneNumber,
  PhoneAuthProvider,
} from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, firestore } from './config';

// ─── Auth State ───
export function onAuthStateChanged(callback: (authUser: User | null) => void) {
  return auth.onAuthStateChanged(callback);
}



// ─── Google ───
export async function signInWithGoogle(): Promise<{ user: User; isAdmin: boolean }> {
  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({ display: 'popup' });

  try {
    const result: UserCredential = await signInWithPopup(auth, provider);
    const user: User = result.user;

    if (!user || !user.email) {
      throw new Error('Google sign-in failed');
    }

    // Check admin role — default to false if Firestore is unreachable
    let isAdmin = false;
    try {
      const userDocRef = doc(firestore, 'adminemail', user.email);
      const userDoc = await getDoc(userDocRef);
      isAdmin = userDoc.exists() && userDoc.data()?.role === 'admin';
    } catch (firestoreError) {
      console.warn('Could not check admin status (offline?), defaulting to regular user:', firestoreError);
    }

    return { user, isAdmin };
  } catch (error) {
    console.error('Error signing in with Google:', error);
    throw error;
  }
}

// ─── Phone OTP ───
export function initializeRecaptcha(containerId: string): RecaptchaVerifier {
  return new RecaptchaVerifier(auth, containerId, {
    size: 'invisible',
    callback: () => {
      // reCAPTCHA solved
    },
  });
}

export async function sendPhoneOTP(
  phoneNumber: string,
  recaptchaVerifier: RecaptchaVerifier
): Promise<ConfirmationResult> {
  return signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifier);
}

export async function verifyPhoneOTP(
  confirmationResult: ConfirmationResult,
  code: string
): Promise<UserCredential> {
  return confirmationResult.confirm(code);
}

/**
 * Link a phone number to the currently signed-in user.
 * Used after email/Google login when we need to add phone verification.
 */
export async function linkPhoneToAccount(
  phoneNumber: string,
  recaptchaVerifier: RecaptchaVerifier
): Promise<ConfirmationResult> {
  const currentUser = auth.currentUser;
  if (!currentUser) {
    throw new Error('No user is currently signed in');
  }
  return linkWithPhoneNumber(currentUser, phoneNumber, recaptchaVerifier);
}

/**
 * Check if the current user has a verified phone number.
 */
export function checkPhoneVerificationStatus(user: User | null): boolean {
  if (!user) return false;
  return !!user.phoneNumber;
}

// ─── Sign Out ───
export async function signOutUser(): Promise<void> {
  try {
    await auth.signOut();
    // Clear cookie client-side as fallback
    document.cookie = '__session=; path=/; max-age=0';
    // Also call server to clear httpOnly cookie
    try {
      await fetch('/api/auth/session', { method: 'DELETE' });
    } catch {
      // Server might be unavailable
    }
  } catch (error) {
    console.error('Error signing out:', error);
    throw error;
  }
}
