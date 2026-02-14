"use client";

import { Bell, MapPin } from "lucide-react";
import Link from "next/link";
import ProfileAvatar from "./ProfileAvatar";
import { useAuth } from "@/lib/contexts/AuthContext";

export default function MobileHeader() {
  const { user } = useAuth();
  return (
    <header className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur-md border-b border-gray-100 md:hidden">
      <div className="flex items-center justify-between px-4 h-14">
        {/* Left: Logo */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
            O
          </div>
          <span className="font-bold text-lg text-gray-900">OlexCows</span>
        </div>

        {/* Center: Location (Simplified) */}
        <button className="flex items-center gap-1 text-xs font-medium text-gray-600 bg-gray-100 px-3 py-1.5 rounded-full">
          <MapPin size={12} className="text-blue-500" />
          <span>Kerala, IN</span>
        </button>

        {/* Right: Actions */}
        <div className="flex items-center gap-3">
          <Link href="/notifications" className="text-gray-600 hover:text-gray-900">
            <Bell size={20} />
          </Link>
          {user && <ProfileAvatar />}
        </div>
      </div>
    </header>
  );
}
