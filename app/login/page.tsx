"use client";

import { useState } from "react";
import { signInWithGoogle, signInWithEmail, sendPhoneOTP, verifyPhoneOTP, initializeRecaptcha } from "@/lib/firebase/auth";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Mail, Phone, Loader2 } from "lucide-react";
import { getStoredLocation, updateUserLocation } from "@/lib/utils/location";

type AuthTab = "google" | "email" | "phone";

export default function LoginPage() {
  const [activeTab, setActiveTab] = useState<AuthTab>("google");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Email/Password state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Phone state
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmationResult, setConfirmationResult] = useState<any>(null);
  const [otpSent, setOtpSent] = useState(false);

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError(null);
    try {
      console.log("Starting Google login...");
      const result = await signInWithGoogle();
      const user = result?.user;

      if (user) {
        console.log("Google login successful, user:", user.uid);
        const idToken = await user.getIdToken();
        document.cookie = `__session=${idToken}; path=/;`;

        // Store location if available (non-blocking)
        const location = getStoredLocation();
        if (location) {
          console.log("Updating user location in background...");
          // Don't await - let it happen in the background
          updateUserLocation(user.uid, location)
            .then((success) => {
              if (success) {
                console.log("Location updated successfully");
              } else {
                console.warn("Location update failed, but login succeeded");
              }
            })
            .catch((err) => {
              console.warn("Location update error (non-critical):", err);
            });
        }
      }

      // Check if user needs phone verification
      if (result?.needsPhoneVerification) {
        console.log("Redirecting to phone verification...");
        router.push("/verify-phone");
      } else if (result?.isAdmin) {
        console.log("Admin user, redirecting to admin panel...");
        router.push("/admin");
      } else {
        console.log("Regular user, redirecting to home...");
        router.push("/");
      }
    } catch (err) {
      console.error("Failed to log in with Google:", err);
      setError(err instanceof Error ? err.message : "Failed to log in with Google");
    } finally {
      setLoading(false);
    }
  };

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const user = await signInWithEmail(email, password);
      const idToken = await user.getIdToken();
      document.cookie = `__session=${idToken}; path=/;`;

      // Store location if available (non-blocking)
      const location = getStoredLocation();
      if (location) {
        updateUserLocation(user.uid, location).catch(err =>
          console.warn("Location update failed (non-critical):", err)
        );
      }

      router.push("/");
    } catch (err: any) {
      console.error("Failed to log in with email:", err);
      if (err.code === "auth/user-not-found" || err.code === "auth/wrong-password") {
        setError("Invalid email or password");
      } else if (err.code === "auth/invalid-email") {
        setError("Invalid email address");
      } else {
        setError(err.message || "Failed to log in");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const recaptchaVerifier = initializeRecaptcha("recaptcha-container");
      const confirmation = await sendPhoneOTP(phoneNumber, recaptchaVerifier);
      setConfirmationResult(confirmation);
      setOtpSent(true);
    } catch (err: any) {
      console.error("Failed to send OTP:", err);
      setError(err.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const result = await verifyPhoneOTP(confirmationResult, otp);
      const user = result.user;
      const idToken = await user.getIdToken();
      document.cookie = `__session=${idToken}; path=/;`;

      // Store location if available (non-blocking)
      const location = getStoredLocation();
      if (location) {
        updateUserLocation(user.uid, location).catch(err =>
          console.warn("Location update failed (non-critical):", err)
        );
      }

      router.push("/");
    } catch (err: any) {
      console.error("Failed to verify OTP:", err);
      if (err.code === "auth/invalid-verification-code") {
        setError("Invalid OTP code");
      } else {
        setError(err.message || "Failed to verify OTP");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-blue-200 rounded-full opacity-10 blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-blue-300 rounded-full opacity-15 blur-3xl"></div>
      <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-blue-400 rounded-full opacity-10 blur-2xl"></div>

      <div className="relative z-10 w-full max-w-md">
        {/* Main card */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-blue-100 p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl flex items-center justify-center mx-auto mb-4 transform rotate-12">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              Welcome Back
            </h2>
            <p className="text-blue-600 mt-2 font-medium">Sign in to continue</p>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mb-6 bg-gray-100 p-1 rounded-xl">
            <button
              onClick={() => setActiveTab("google")}
              className={`flex-1 py-2 px-4 rounded-lg text-sm font-semibold transition-all ${activeTab === "google" ? "bg-white text-blue-600 shadow-sm" : "text-gray-600"
                }`}
            >
              Google
            </button>
            <button
              onClick={() => setActiveTab("email")}
              className={`flex-1 py-2 px-4 rounded-lg text-sm font-semibold transition-all ${activeTab === "email" ? "bg-white text-blue-600 shadow-sm" : "text-gray-600"
                }`}
            >
              <Mail size={16} className="inline mr-1" />
              Email
            </button>
            <button
              onClick={() => setActiveTab("phone")}
              className={`flex-1 py-2 px-4 rounded-lg text-sm font-semibold transition-all ${activeTab === "phone" ? "bg-white text-blue-600 shadow-sm" : "text-gray-600"
                }`}
            >
              <Phone size={16} className="inline mr-1" />
              Phone
            </button>
          </div>

          {/* Google Sign-In */}
          {activeTab === "google" && (
            <button
              onClick={handleGoogleLogin}
              disabled={loading}
              className="group relative w-full p-3 bg-white border-2 border-blue-200 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              <div className="flex items-center justify-center space-x-3">
                {loading ? (
                  <>
                    <Loader2 className="w-6 h-6 text-blue-600 animate-spin" />
                    <span className="text-lg font-semibold text-blue-700">Signing in...</span>
                  </>
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 48 48">
                      <path fill="#fbc02d" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path>
                      <path fill="#e53935" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path>
                      <path fill="#4caf50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path>
                      <path fill="#1565c0" d="M43.611,20.083L43.595,20L42,20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
                    </svg>
                    <span className="text-lg font-semibold text-gray-700 group-hover:text-blue-700 transition-colors">
                      Continue with Google
                    </span>
                  </>
                )}
              </div>
            </button>
          )}

          {/* Email/Password Login */}
          {activeTab === "email" && (
            <form onSubmit={handleEmailLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
                  placeholder="••••••••"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold rounded-xl hover:shadow-lg transform hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin mx-auto" /> : "Sign In"}
              </button>
              <div className="text-center">
                <Link href="/reset-password" className="text-sm text-blue-600 hover:underline">
                  Forgot password?
                </Link>
              </div>
            </form>
          )}

          {/* Phone Login */}
          {activeTab === "phone" && (
            <div className="space-y-4">
              {!otpSent ? (
                <form onSubmit={handleSendOTP} className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
                    <input
                      type="tel"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
                      placeholder="+91 1234567890"
                    />
                    <p className="text-xs text-gray-500 mt-1">Include country code (e.g., +91)</p>
                  </div>
                  <div id="recaptcha-container"></div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold rounded-xl hover:shadow-lg transform hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {loading ? <Loader2 className="w-5 h-5 animate-spin mx-auto" /> : "Send OTP"}
                  </button>
                </form>
              ) : (
                <form onSubmit={handleVerifyOTP} className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Enter OTP</label>
                    <input
                      type="text"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      required
                      maxLength={6}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors text-center text-2xl tracking-widest"
                      placeholder="000000"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold rounded-xl hover:shadow-lg transform hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {loading ? <Loader2 className="w-5 h-5 animate-spin mx-auto" /> : "Verify OTP"}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setOtpSent(false);
                      setOtp("");
                    }}
                    className="w-full text-sm text-blue-600 hover:underline"
                  >
                    Change phone number
                  </button>
                </form>
              )}
            </div>
          )}

          {/* Error message */}
          {error && (
            <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-xl">
              <p className="text-red-600 text-sm text-center font-medium">{error}</p>
            </div>
          )}

          {/* Sign up link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <Link href="/signup" className="text-blue-600 font-semibold hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </div>

        {/* Footer text */}
        <p className="text-center text-blue-500 text-sm mt-6 font-medium">
          Secure authentication powered by Firebase
        </p>
      </div>
    </div>
  );
}
