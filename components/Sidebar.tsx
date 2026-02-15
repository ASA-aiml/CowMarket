"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { bottomTabs } from "@/data/nav";
import { Settings, LogOut, Bell } from "lucide-react";

import { useLanguage } from "@/context/LanguageContext";

export default function Sidebar() {
  const pathname = usePathname();
  const { t } = useLanguage();

  // Map labels to translation keys (Reuse logic from BottomNavBar essentially)
  const getLabel = (label: string) => {
    const lower = label.toLowerCase();
    if (lower === 'home') return t('home');
    if (lower === 'sell') return t('sell');
    if (lower === 'scan') return t('scan');
    if (lower === 'product') return t('product');
    if (lower === 'learn') return t('learn');
    // Account items if labels were passed, but they are hardcoded below
    return label;
  };

  return (
    <aside className="hidden md:flex flex-col w-64 h-screen fixed inset-y-0 left-0 glass-panel border-r border-white/40 z-50 rounded-none shadow-none">
      <div className="p-6 border-b border-white/20 flex items-center gap-3">
        <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-emerald-200">
          O
        </div>
        <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-teal-600 text-glow">
          OlexCows
        </span>
      </div>

      <div className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
        <div className="text-xs font-semibold text-neutral-400 px-4 mb-2 uppercase tracking-wider">
          Menu
        </div>
        {bottomTabs.map(({ name, icon: Icon, href, label }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={name}
              href={href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${isActive
                ? "bg-emerald-50/80 text-emerald-700 shadow-sm border border-emerald-100"
                : "text-neutral-500 hover:bg-white/40 hover:text-emerald-800"
                }`}
            >
              <Icon
                size={22}
                strokeWidth={isActive ? 2.5 : 2}
                className={`transition-transform duration-200 ${isActive ? "scale-110" : "group-hover:scale-110"
                  }`}
              />
              <span className={`font-medium ${isActive ? "font-semibold" : ""}`}>
                {getLabel(label)}
              </span>
              {isActive && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-emerald-200 shadow-md" />
              )}
            </Link>
          );
        })}

        <div className="mt-8 text-xs font-semibold text-neutral-400 px-4 mb-2 uppercase tracking-wider">
          Account
        </div>
        <Link
          href="/settings"
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-neutral-500 hover:bg-white/40 hover:text-emerald-800 transition-all font-medium"
        >
          <Settings size={22} />
          <span>Settings</span>
        </Link>
        <Link
          href="/notifications"
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-neutral-500 hover:bg-white/40 hover:text-emerald-800 transition-all font-medium"
        >
          <Bell size={22} />
          <span>Notifications</span>
        </Link>
      </div>

      <div className="p-4 border-t border-white/20">
        <button className="flex items-center gap-3 w-full px-4 py-3 text-red-500 hover:bg-red-50/50 rounded-xl transition-colors font-medium hover:shadow-sm">
          <LogOut size={22} />
          <span>Log Out</span>
        </button>
      </div>
    </aside>
  );
}
