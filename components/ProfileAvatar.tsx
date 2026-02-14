"use client";

import { useState, useRef, useEffect } from "react";
import { useAuth } from "@/lib/contexts/AuthContext";
import { signOut } from "@/lib/firebase/auth";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { User, Settings, LogOut, ChevronDown } from "lucide-react";

export default function ProfileAvatar() {
    const { user, loading } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleLogout = async () => {
        try {
            await signOut();
            router.push("/login");
        } catch (error) {
            console.error("Failed to log out:", error);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
            </div>
        );
    }

    if (!user) {
        return null;
    }

    // Get user initials for fallback
    const getInitials = () => {
        if (user.displayName) {
            return user.displayName
                .split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase()
                .slice(0, 2);
        }
        if (user.email) {
            return user.email[0].toUpperCase();
        }
        return "U";
    };

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                aria-label="User menu"
            >
                {user.photoURL ? (
                    <img
                        src={user.photoURL}
                        alt={user.displayName || "User"}
                        className="w-8 h-8 rounded-full object-cover border-2 border-blue-100"
                    />
                ) : (
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white text-sm font-semibold border-2 border-blue-100">
                        {getInitials()}
                    </div>
                )}
                <div className="hidden md:block text-left">
                    <p className="text-sm font-semibold text-gray-900 leading-tight">
                        {user.displayName || "User"}
                    </p>
                    <p className="text-xs text-gray-500 leading-tight truncate max-w-[120px]">
                        {user.email}
                    </p>
                </div>
                <ChevronDown
                    size={16}
                    className={`hidden md:block text-gray-400 transition-transform ${isOpen ? "rotate-180" : ""
                        }`}
                />
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50">
                    {/* User Info (Mobile) */}
                    <div className="md:hidden px-4 py-3 border-b border-gray-100">
                        <p className="text-sm font-semibold text-gray-900">
                            {user.displayName || "User"}
                        </p>
                        <p className="text-xs text-gray-500 truncate">{user.email}</p>
                    </div>

                    {/* Menu Items */}
                    <Link
                        href="/profile"
                        onClick={() => setIsOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                        <User size={18} />
                        <span className="text-sm font-medium">Profile</span>
                    </Link>

                    <Link
                        href="/settings"
                        onClick={() => setIsOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                        <Settings size={18} />
                        <span className="text-sm font-medium">Settings</span>
                    </Link>

                    <div className="border-t border-gray-100 my-1"></div>

                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-4 py-2.5 text-red-600 hover:bg-red-50 transition-colors w-full"
                    >
                        <LogOut size={18} />
                        <span className="text-sm font-medium">Log Out</span>
                    </button>
                </div>
            )}
        </div>
    );
}
