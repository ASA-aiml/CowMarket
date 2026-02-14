import { auth } from './config';
import {
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  User,
  UserCredential,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  ConfirmationResult,
  PhoneAuthProvider,
  linkWithCredential,
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { firestore } from './config';

// Track authentication state changes
export function onAuthStateChanged(callback: (authUser: User | null) => void) {
  return auth.onAuthStateChanged(callback);
}

// ==================== Google Sign-In ====================
export async function signInWithGoogle(): Promise<{ user: User; isAdmin: boolean; needsPhoneVerification: boolean }> {
  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({ display: 'popup' });

  try {
    const result: UserCredential = await signInWithPopup(auth, provider);
    const user: User = result.user;

    if (!user || !user.email) {
      throw new Error('Google sign-in failed');
    }

    // Check admin status (with timeout and error handling)
    let isAdmin = false;
    try {
      // Create a promise that times out after 3 seconds
      const adminCheckPromise = (async () => {
        const userDocRef = doc(firestore, 'adminemail', user.email!); // email is guaranteed to exist from check above
        const userDoc = await getDoc(userDocRef);
        return userDoc.exists() && userDoc.data()?.role === 'admin';
      })();

      const timeoutPromise = new Promise<boolean>((_, reject) =>
        setTimeout(() => reject(new Error('Admin check timeout')), 3000)
      );

      isAdmin = await Promise.race([adminCheckPromise, timeoutPromise]);
    } catch (adminCheckError) {
      // If admin check fails (blocked by ad blocker, timeout, or offline), default to false
      console.warn('Admin check failed (non-critical):', adminCheckError);
      isAdmin = false;
    }

    // Check if user needs phone verification (new user without phone)
    const needsPhoneVerification = !user.phoneNumber;

    return { user, isAdmin, needsPhoneVerification };
  } catch (error) {
    console.error('Error signing in with Google:', error);
    throw error;
  }
}

// ==================== Email/Password Authentication ====================
export async function signUpWithEmail(email: string, password: string): Promise<User> {
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    return result.user;
  } catch (error) {
    console.error('Error signing up with email:', error);
    throw error;
  }
}

export async function signInWithEmail(email: string, password: string): Promise<User> {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    return result.user;
  } catch (error) {
    console.error('Error signing in with email:', error);
    throw error;
  }
}

export async function resetPassword(email: string): Promise<void> {
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (error) {
    console.error('Error sending password reset email:', error);
    throw error;
  }
}

// ==================== Phone Authentication ====================
let recaptchaVerifier: RecaptchaVerifier | null = null;

export function initializeRecaptcha(containerId: string): RecaptchaVerifier {
  if (recaptchaVerifier) {
    recaptchaVerifier.clear();
  }

  recaptchaVerifier = new RecaptchaVerifier(auth, containerId, {
    size: 'invisible',
    callback: () => {
      // reCAPTCHA solved
    },
    'expired-callback': () => {
      // Response expired
      console.warn('reCAPTCHA expired');
    },
  });

  return recaptchaVerifier;
}

export async function sendPhoneOTP(phoneNumber: string, recaptchaVerifier: RecaptchaVerifier): Promise<ConfirmationResult> {
  try {
    const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifier);
    return confirmationResult;
  } catch (error) {
    console.error('Error sending phone OTP:', error);
    throw error;
  }
}

export async function verifyPhoneOTP(confirmationResult: ConfirmationResult, code: string): Promise<UserCredential> {
  try {
    const result = await confirmationResult.confirm(code);
    return result;
  } catch (error) {
    console.error('Error verifying phone OTP:', error);
    throw error;
  }
}

// Link phone number to existing account
export async function linkPhoneToAccount(phoneNumber: string, verificationCode: string, verificationId: string): Promise<void> {
  try {
    const credential = PhoneAuthProvider.credential(verificationId, verificationCode);
    const currentUser = auth.currentUser;

    if (!currentUser) {
      throw new Error('No user is currently signed in');
    }

    await linkWithCredential(currentUser, credential);
  } catch (error) {
    console.error('Error linking phone to account:', error);
    throw error;
  }
}

// ==================== Sign Out ====================
export async function signOut(): Promise<void> {
  try {
    await auth.signOut();
    // Clear session cookie
    document.cookie = '__session=; path=/; max-age=0';
  } catch (error) {
    console.error('Error signing out:', error);
    throw error;
  }
}

// ==================== Helper Functions ====================
export function getCurrentUser(): User | null {
  return auth.currentUser;
}

export async function checkPhoneVerificationStatus(user: User): Promise<boolean> {
  if (user.phoneNumber) {
    return true;
  }

  // Check custom claims
  const idTokenResult = await user.getIdTokenResult();
  return idTokenResult.claims.phoneVerified === true;
}
