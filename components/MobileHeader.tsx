"use client";

import { Bell, Settings } from "lucide-react";
import Link from "next/link";
import LocationPicker from "./LocationPicker";

export default function MobileHeader() {
  return (
    <header className="glass-nav md:hidden transition-all duration-300">
      <div className="flex items-center justify-between px-4 h-16">
        {/* Left: Location */}
        <LocationPicker />

        {/* Right: Actions */}
        <div className="flex items-center gap-3">
          <Link
            href="/notifications"
            className="w-10 h-10 flex items-center justify-center rounded-full glass hover:bg-white text-emerald-500 hover:text-emerald-600 transition-all active:scale-95 shadow-sm border border-emerald-100/50"
          >
            <Bell size={20} className="fill-emerald-50" />
          </Link>
          <Link
            href="/settings"
            className="w-10 h-10 flex items-center justify-center rounded-full glass hover:bg-white text-emerald-600 hover:text-emerald-700 transition-all active:scale-95 shadow-sm border border-emerald-100/50"
          >
            <Settings size={20} className="animate-spin-slow" />
          </Link>
        </div>
      </div>
    </header>
  );
}
