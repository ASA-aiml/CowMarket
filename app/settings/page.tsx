import Link from "next/link";
import { Bell, Globe, HelpCircle, LogOut, Shield, User, Store, ChevronRight } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-gray-50 pb-24 md:pl-64">
      <div className="max-w-3xl mx-auto p-4 md:p-8">
        <h1 className="text-3xl font-bold mb-8 text-gray-900">Settings</h1>

        <div className="space-y-6">
          {/* Profile Section */}
          <section className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 flex items-center gap-4 border-b border-gray-50">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-2xl">
                JD
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900">John Doe</h2>
                <p className="text-sm text-gray-500">+91 98765 43210</p>
              </div>
              <button className="ml-auto text-blue-600 font-medium text-sm hover:underline">
                Edit
              </button>
            </div>
            
             {/* My Livestock Stats */}
             <div className="grid grid-cols-3 divide-x divide-gray-50 bg-gray-50/50">
                <div className="p-4 text-center">
                    <span className="block text-2xl font-bold text-gray-900">12</span>
                    <span className="text-xs text-gray-500 uppercase tracking-wider">Listed</span>
                </div>
                <div className="p-4 text-center">
                    <span className="block text-2xl font-bold text-gray-900">5</span>
                    <span className="text-xs text-gray-500 uppercase tracking-wider">Sold</span>
                </div>
                <div className="p-4 text-center">
                    <span className="block text-2xl font-bold text-gray-900">142</span>
                    <span className="text-xs text-gray-500 uppercase tracking-wider">Views</span>
                </div>
             </div>
          </section>

          {/* Settings Groups */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden divide-y divide-gray-50">
            <Link href="/settings/partner" className="w-full flex items-center gap-4 p-4 hover:bg-orange-50 transition-colors text-left group bg-orange-50/30">
                <div className="p-2 bg-orange-100 rounded-lg text-orange-600 group-hover:bg-orange-200 transition-colors">
                  <Store size={20} />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900">Become a Partner</h3>
                  <p className="text-xs text-gray-500">Sell products, offer services & grow</p>
                </div>
                <ChevronRight size={20} className="text-gray-400" />
            </Link>

            {[
              { icon: User, label: "Account Information", desc: "Change name, address, etc.", href: "/settings/account" },
              { icon: Bell, label: "Notifications", desc: "Manage alerts & messages", href: "/settings/notifications" },
              { icon: Globe, label: "Language", desc: "English (US)", href: "/settings/language" },
              { icon: Shield, label: "Privacy & Security", desc: "Change password", href: "/settings/privacy" },
              { icon: HelpCircle, label: "Help & Support", desc: "FAQs and contact support", href: "/settings/help" },
            ].map((item, idx) => (
              <Link key={idx} href={item.href} className="w-full flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors text-left group">
                <div className="p-2 bg-gray-50 rounded-lg text-gray-600 group-hover:bg-white group-hover:text-blue-600 transition-colors">
                  <item.icon size={20} />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">{item.label}</h3>
                  <p className="text-xs text-gray-500">{item.desc}</p>
                </div>
                <ChevronRight size={20} className="text-gray-400 group-hover:text-blue-500 transition-colors" />
              </Link>
            ))}
          </div>

          <button className="w-full bg-red-50 text-red-600 py-3 rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-red-100 transition-colors">
            <LogOut size={20} />
            <span>Log Out</span>
          </button>
        </div>
      </div>
    </div>
  );
}
