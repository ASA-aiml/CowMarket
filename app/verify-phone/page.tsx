"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/lib/contexts/AuthContext";
import { sendPhoneOTP, verifyPhoneOTP, initializeRecaptcha, linkPhoneToAccount } from "@/lib/firebase/auth";
import { useRouter } from "next/navigation";
import { Loader2, Phone, CheckCircle } from "lucide-react";
import { getStoredLocation, updateUserLocation } from "@/lib/utils/location";

export default function VerifyPhonePage() {
    const { user, setPhoneVerified } = useAuth();
    const [phoneNumber, setPhoneNumber] = useState("");
    const [otp, setOtp] = useState("");
    const [confirmationResult, setConfirmationResult] = useState<any>(null);
    const [verificationId, setVerificationId] = useState<string>("");
    const [otpSent, setOtpSent] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        if (!user) {
            router.push("/login");
        }
    }, [user, router]);

    const handleSendOTP = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const recaptchaVerifier = initializeRecaptcha("recaptcha-container");
            const confirmation = await sendPhoneOTP(phoneNumber, recaptchaVerifier);
            setConfirmationResult(confirmation);
            setVerificationId(confirmation.verificationId);
            setOtpSent(true);
        } catch (err: any) {
            console.error("Failed to send OTP:", err);
            setError(err.message || "Failed to send OTP. Please check your phone number.");
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyOTP = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            if (user && user.phoneNumber) {
                // User already signed in, just verify
                await verifyPhoneOTP(confirmationResult, otp);
            } else {
                // Link phone to existing account
                await linkPhoneToAccount(phoneNumber, otp, verificationId);
            }

            setPhoneVerified(true);

            // Store location if available
            if (user) {
                const location = getStoredLocation();
                if (location) {
                    await updateUserLocation(user.uid, location);
                }
            }

            // Success! Redirect to home
            setTimeout(() => {
                router.push("/");
            }, 1500);
        } catch (err: any) {
            console.error("Failed to verify OTP:", err);
            if (err.code === "auth/invalid-verification-code") {
                setError("Invalid OTP code. Please try again.");
            } else if (err.code === "auth/code-expired") {
                setError("OTP expired. Please request a new one.");
            } else {
                setError(err.message || "Failed to verify OTP");
            }
        } finally {
            setLoading(false);
        }
    };

    if (!user) {
        return null;
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex items-center justify-center p-4 relative overflow-hidden">
            {/* Background decorations */}
            <div className="absolute top-20 left-10 w-32 h-32 bg-blue-200 rounded-full opacity-10 blur-3xl"></div>
            <div className="absolute bottom-20 right-10 w-40 h-40 bg-blue-300 rounded-full opacity-15 blur-3xl"></div>

            <div className="relative z-10 w-full max-w-md">
                {/* Main card */}
                <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-blue-100 p-8">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <Phone className="w-8 h-8 text-white" />
                        </div>
                        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                            Verify Phone Number
                        </h2>
                        <p className="text-blue-600 mt-2 font-medium">
                            {user.displayName ? `Hi ${user.displayName}!` : "Welcome!"}
                        </p>
                        <p className="text-gray-600 text-sm mt-1">
                            For security, we need to verify your phone number
                        </p>
                    </div>

                    {/* User Info */}
                    <div className="bg-blue-50 rounded-xl p-4 mb-6">
                        <p className="text-sm text-gray-600">Logged in as:</p>
                        <p className="font-semibold text-gray-900">{user.email}</p>
                    </div>

                    {!otpSent ? (
                        <form onSubmit={handleSendOTP} className="space-y-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Phone Number
                                </label>
                                <input
                                    type="tel"
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                    required
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
                                    placeholder="+91 1234567890"
                                />
                                <p className="text-xs text-gray-500 mt-1">
                                    Include country code (e.g., +91 for India)
                                </p>
                            </div>
                            <div id="recaptcha-container"></div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-3 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold rounded-xl hover:shadow-lg transform hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                            >
                                {loading ? (
                                    <Loader2 className="w-5 h-5 animate-spin mx-auto" />
                                ) : (
                                    "Send OTP"
                                )}
                            </button>
                        </form>
                    ) : (
                        <form onSubmit={handleVerifyOTP} className="space-y-4">
                            <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-4">
                                <p className="text-sm text-green-700 text-center">
                                    OTP sent to {phoneNumber}
                                </p>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Enter 6-digit OTP
                                </label>
                                <input
                                    type="text"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                                    required
                                    maxLength={6}
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors text-center text-2xl tracking-widest font-semibold"
                                    placeholder="000000"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading || otp.length !== 6}
                                className="w-full py-3 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold rounded-xl hover:shadow-lg transform hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                            >
                                {loading ? (
                                    <Loader2 className="w-5 h-5 animate-spin mx-auto" />
                                ) : (
                                    <>
                                        <CheckCircle className="w-5 h-5 inline mr-2" />
                                        Verify & Continue
                                    </>
                                )}
                            </button>

                            <button
                                type="button"
                                onClick={() => {
                                    setOtpSent(false);
                                    setOtp("");
                                    setError(null);
                                }}
                                className="w-full text-sm text-blue-600 hover:underline"
                            >
                                Change phone number
                            </button>
                        </form>
                    )}

                    {/* Error message */}
                    {error && (
                        <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-xl">
                            <p className="text-red-600 text-sm text-center font-medium">{error}</p>
                        </div>
                    )}
                </div>

                {/* Footer text */}
                <p className="text-center text-gray-500 text-xs mt-6">
                    This is a one-time verification. Your phone number will be securely stored.
                </p>
            </div>
        </div>
    );
}
