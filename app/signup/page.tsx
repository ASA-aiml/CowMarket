"use client";

import { useState } from "react";
import { signUpWithEmail } from "@/lib/firebase/auth";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Loader2, ArrowLeft } from "lucide-react";
import { getStoredLocation, updateUserLocation } from "@/lib/utils/location";

export default function SignupPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        if (password.length < 6) {
            setError("Password must be at least 6 characters");
            return;
        }

        setLoading(true);

        try {
            const user = await signUpWithEmail(email, password);
            const idToken = await user.getIdToken();
            document.cookie = `__session=${idToken}; path=/;`;

            // New users need phone verification
            router.push("/verify-phone");
        } catch (err: any) {
            console.error("Failed to sign up:", err);
            if (err.code === "auth/email-already-in-use") {
                setError("Email already in use");
            } else if (err.code === "auth/invalid-email") {
                setError("Invalid email address");
            } else if (err.code === "auth/weak-password") {
                setError("Password is too weak");
            } else {
                setError(err.message || "Failed to create account");
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

            <div className="relative z-10 w-full max-w-md">
                {/* Back button */}
                <Link
                    href="/login"
                    className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-4 font-medium"
                >
                    <ArrowLeft size={20} />
                    Back to login
                </Link>

                {/* Main card */}
                <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-blue-100 p-8">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl flex items-center justify-center mx-auto mb-4 transform rotate-12">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                            </svg>
                        </div>
                        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                            Create Account
                        </h2>
                        <p className="text-blue-600 mt-2 font-medium">Join OlexCows today</p>
                    </div>

                    {/* Signup Form */}
                    <form onSubmit={handleSignup} className="space-y-4">
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
                                minLength={6}
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
                                placeholder="••••••••"
                            />
                            <p className="text-xs text-gray-500 mt-1">At least 6 characters</p>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Confirm Password</label>
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                                minLength={6}
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
                                placeholder="••••••••"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold rounded-xl hover:shadow-lg transform hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                        >
                            {loading ? <Loader2 className="w-5 h-5 animate-spin mx-auto" /> : "Create Account"}
                        </button>
                    </form>

                    {/* Error message */}
                    {error && (
                        <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-xl">
                            <p className="text-red-600 text-sm text-center font-medium">{error}</p>
                        </div>
                    )}

                    {/* Login link */}
                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-600">
                            Already have an account?{" "}
                            <Link href="/login" className="text-blue-600 font-semibold hover:underline">
                                Sign in
                            </Link>
                        </p>
                    </div>
                </div>

                {/* Footer text */}
                <p className="text-center text-blue-500 text-sm mt-6 font-medium">
                    By signing up, you'll need to verify your phone number
                </p>
            </div>
        </div>
    );
}
