"use client";

import { Search, MapPin, Store, Stethoscope, Briefcase, Filter, Star, Phone, MessageCircle, Share2, Truck, ShieldCheck, Pill, Wheat, Droplet } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";

// Vendor Data
const vendors = [
    {
        id: 1,
        name: "Dr. Ramesh Kumar",
        type: "Veterinary Doctor",
        subtype: "Surgeon & Consultant",
        service: "General Checkup, AI, Vaccination, Surgery",
        location: "Kochi, Kerala",
        distance: "2 km",
        rating: 4.9,
        reviews: 124,
        image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=800",
        verified: true,
        badges: ["Top Rated", "24/7 Available", "Emergency"],
        description: "Senior Veterinarian with 15+ years of experience in dairy cattle management, surgery, and artificial insemination.",
        available: true,
    },
    {
        id: 2,
        name: "Kerala Feeds & Nutrition",
        type: "Feed Supplier",
        subtype: "Wholesale & Retail",
        service: "Cattle Feed, Mineral Mix, Supplements, Fodder",
        location: "Thrissur, Kerala",
        distance: "5 km",
        rating: 4.5,
        reviews: 89,
        image: "https://images.unsplash.com/photo-1595856942973-10bc8518f841?q=80&w=800",
        verified: true,
        badges: ["Best Price", "Bulk Delivery"],
        description: "Authorized dealer of premium cattle feeds. Bulk orders with free doorstep delivery and custom formulations.",
        available: true,
    },
    {
        id: 3,
        name: "Green Fields Equipment",
        type: "Equipment",
        subtype: "Machinery & Tools",
        service: "Milking Machines, Chaff Cutters, Mats, Feeders",
        location: "Palakkad, Kerala",
        distance: "12 km",
        rating: 4.2,
        reviews: 45,
        image: "https://images.unsplash.com/photo-1550989460-0adf9ea622e2?q=80&w=800",
        verified: false,
        badges: ["Warranty Available", "Installation"],
        description: "Complete dairy farm automation solutions. Installation, training, and service support provided.",
        available: false,
    },
    {
        id: 4,
        name: "Suresh Livestock Transport",
        type: "Transport",
        subtype: "Licensed Carrier",
        service: "Safe Transport, Documentation, Insurance",
        location: "Kottayam, Kerala",
        distance: "8 km",
        rating: 4.7,
        reviews: 210,
        image: "https://images.unsplash.com/photo-1557862921-37829c790f19?q=80&w=800",
        verified: true,
        badges: ["Trusted Partner", "Govt Approved"],
        description: "Government approved livestock transporter. Hassle-free documentation, safe delivery, and insurance.",
        available: true,
    },
    {
        id: 5,
        name: "City Veterinary Clinic",
        type: "Veterinary Doctor",
        subtype: "Clinic & Lab",
        service: "Lab Tests, Surgery, X-Ray, Ultrasound",
        location: "Ernakulam, Kerala",
        distance: "3.5 km",
        rating: 4.6,
        reviews: 56,
        image: "https://images.unsplash.com/photo-1599443015574-be5dd8c743ac?q=80&w=800",
        verified: true,
        badges: ["Lab Facility", "Advanced Equipment"],
        description: "Modern veterinary clinic with advanced diagnostic lab, surgical facilities, and experienced veterinarians.",
        available: true,
    },
];

const categories = [
    { name: "All", icon: Store },
    { name: "Doctors", icon: Stethoscope },
    { name: "Feed", icon: Wheat },
    { name: "Equipment", icon: Briefcase },
    { name: "Transport", icon: Truck },
    { name: "Medicine", icon: Pill },
    { name: "Dairy", icon: Droplet },
    { name: "Insurance", icon: ShieldCheck },
];

export default function VendorMarketplacePage() {
    const [activeCategory, setActiveCategory] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");

    const filteredVendors = vendors.filter(vendor => {
        const matchesCategory = activeCategory === "All" ||
            (activeCategory === "Doctors" && vendor.type === "Veterinary Doctor") ||
            (activeCategory === "Feed" && vendor.type === "Feed Supplier") ||
            (activeCategory === "Equipment" && vendor.type === "Equipment") ||
            (activeCategory === "Transport" && vendor.type === "Transport") ||
            (activeCategory === "Medicine" && vendor.type === "Medicine") ||
            (activeCategory === "Dairy" && vendor.type === "Dairy Products") ||
            (activeCategory === "Insurance" && vendor.type === "Insurance");
        const matchesSearch = vendor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            vendor.service.toLowerCase().includes(searchQuery.toLowerCase()) ||
            vendor.location.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="min-h-screen pb-24 md:pb-8">
            {/* Header Section — Glassmorphism Nav */}
            <div className="glass-nav sticky top-14 md:top-0 z-20">
                <div className="p-4 md:p-6 max-w-7xl mx-auto pb-3">
                    <div className="flex justify-between items-center mb-4">
                        <div>
                            <h1 className="text-2xl md:text-3xl font-bold text-neutral-900">
                                Services & Products
                            </h1>
                            <p className="text-sm text-neutral-500 font-medium">
                                Find trusted experts and suppliers near you
                            </p>
                        </div>
                        <div className="flex gap-2">
                            <button className="glass-button p-2.5 rounded-full">
                                <MapPin size={20} className="text-emerald-700" />
                            </button>
                            <button className="glass-button p-2.5 rounded-full relative">
                                <Filter size={20} className="text-emerald-700" />
                                <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-white"></span>
                            </button>
                        </div>
                    </div>

                    {/* Search — Glass Input */}
                    <div className="relative mb-4">
                        <input
                            type="text"
                            placeholder="Search for doctors, feed, medicines..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="glass-input w-full pl-12 pr-4 py-3 md:py-3.5 text-sm md:text-base"
                        />
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 w-5 h-5" />
                    </div>

                    {/* Scrollable Categories — Filter Pills */}
                    <div className="flex gap-2 md:gap-3 overflow-x-auto no-scrollbar pb-1">
                        {categories.map((cat) => (
                            <button
                                key={cat.name}
                                onClick={() => setActiveCategory(cat.name)}
                                className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all whitespace-nowrap text-sm font-semibold shadow-sm ${activeCategory === cat.name
                                    ? "bg-emerald-600 text-white border-emerald-600 shadow-md shadow-emerald-600/20 active:scale-95"
                                    : "bg-white/40 backdrop-blur-md border-white/60 text-emerald-900 hover:bg-emerald-50 hover:border-emerald-200"
                                    }`}
                            >
                                <cat.icon size={16} />
                                <span>{cat.name}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="p-4 md:p-6 max-w-7xl mx-auto space-y-8">

                {/* Sponsored Partners — Emerald Gradient Cards */}
                {activeCategory === "All" && (
                    <section>
                        <div className="flex justify-between items-center mb-4 px-1">
                            <h2 className="text-lg md:text-xl font-bold text-neutral-900">Sponsored Partners</h2>
                            <span className="glass-chip text-[10px]">AD</span>
                        </div>
                        <div className="flex gap-4 overflow-x-auto no-scrollbar pb-4 -mx-4 px-4">
                            {vendors.slice(0, 3).map((vendor, i) => (
                                <motion.div
                                    key={vendor.id}
                                    initial={{ opacity: 0, x: 30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1, type: "spring", stiffness: 300, damping: 20 }}
                                    className="min-w-[280px] md:min-w-[320px] bg-gradient-to-br from-emerald-600 to-teal-700 rounded-3xl p-5 text-white shadow-lg shadow-emerald-900/20 relative overflow-hidden"
                                >
                                    <div className="absolute top-0 right-0 p-3 opacity-10">
                                        <Store size={100} />
                                    </div>
                                    <div className="flex items-start gap-3 mb-3 relative z-10">
                                        <div className="w-14 h-14 bg-white/20 rounded-xl border-2 border-white/30 overflow-hidden flex-shrink-0">
                                            <Image
                                                src={vendor.image}
                                                alt={vendor.name}
                                                width={56}
                                                height={56}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-bold text-white line-clamp-1 text-lg text-glow">{vendor.name}</h3>
                                            <p className="text-xs text-emerald-100 font-medium">{vendor.type}</p>
                                        </div>
                                    </div>
                                    <p className="text-sm text-emerald-50 mb-4 line-clamp-2 relative z-10 opacity-90">{vendor.description}</p>
                                    <button className="w-full py-2.5 bg-white/15 backdrop-blur-md border border-white/25 rounded-xl text-sm font-bold hover:bg-white/25 transition-all active:scale-95">
                                        View Profile
                                    </button>
                                </motion.div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Vendor List */}
                <section>
                    <div className="flex justify-between items-center mb-4 px-1">
                        <h2 className="text-lg md:text-xl font-bold text-neutral-900">
                            {activeCategory === "All" ? "All Services Near You" : `${activeCategory} Near You`}
                        </h2>
                        <span className="text-sm text-neutral-500 font-medium">{filteredVendors.length} results</span>
                    </div>

                    {filteredVendors.length === 0 ? (
                        <div className="glass-panel text-center py-16 px-6">
                            <Store className="mx-auto text-neutral-300 mb-4" size={64} />
                            <h3 className="text-xl font-bold text-neutral-900 mb-2">No vendors found</h3>
                            <p className="text-neutral-500 font-medium">Try adjusting your search or filters</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                            {filteredVendors.map((vendor, i) => (
                                <motion.div
                                    key={vendor.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-50px" }}
                                    whileHover={{ y: -6, scale: 1.01 }}
                                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                    className="glass-card overflow-hidden flex flex-col cursor-pointer"
                                >
                                    {/* Card Header */}
                                    <div className="p-4 md:p-5 flex items-start gap-4">
                                        <div className="relative flex-shrink-0">
                                            <div className="w-16 h-16 md:w-20 md:h-20 bg-neutral-100/50 rounded-2xl overflow-hidden">
                                                <Image
                                                    src={vendor.image}
                                                    alt={vendor.name}
                                                    width={80}
                                                    height={80}
                                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                                />
                                            </div>
                                            {vendor.verified && (
                                                <div className="absolute -bottom-1 -right-1 bg-emerald-600 rounded-full p-1 border-2 border-white shadow-sm">
                                                    <CheckIcon size={10} className="text-white" />
                                                </div>
                                            )}
                                        </div>

                                        <div className="flex-1 min-w-0">
                                            <div className="flex justify-between items-start gap-2">
                                                <h3 className="font-bold text-neutral-900 line-clamp-1 text-base md:text-lg group-hover:text-emerald-700 transition-colors">
                                                    {vendor.name}
                                                </h3>
                                                {vendor.available ? (
                                                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100/60 text-emerald-800 border border-emerald-200/50 flex-shrink-0">
                                                        Open
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-neutral-100 text-neutral-500 flex-shrink-0">
                                                        Closed
                                                    </span>
                                                )}
                                            </div>
                                            <p className="text-xs text-emerald-600 font-bold mb-1">{vendor.type} • {vendor.subtype}</p>
                                            <div className="flex items-center gap-1 text-xs text-neutral-500">
                                                <Star size={12} className="text-amber-400 fill-amber-400" />
                                                <span className="font-bold text-neutral-900">{vendor.rating}</span>
                                                <span>({vendor.reviews})</span>
                                                <span className="text-neutral-300 mx-1">•</span>
                                                <MapPin size={12} className="text-neutral-400" />
                                                <span>{vendor.distance}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Badges */}
                                    <div className="px-4 md:px-5 flex flex-wrap gap-1.5 mb-3">
                                        {vendor.badges.map((badge) => (
                                            <span key={badge} className="glass-chip">
                                                {badge}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Description */}
                                    <div className="px-4 md:px-5">
                                        <p className="text-xs text-neutral-500 mb-4 line-clamp-2 leading-relaxed font-medium">
                                            {vendor.description}
                                        </p>
                                    </div>

                                    {/* Actions */}
                                    <div className="p-4 md:p-5 pt-0 flex gap-2 mt-auto">
                                        <button className="flex-1 flex items-center justify-center gap-2 bg-emerald-600 backdrop-blur-md text-white py-2.5 rounded-xl font-bold text-sm hover:bg-emerald-700 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 shadow-emerald-900/20 active:scale-95">
                                            <Phone size={14} />
                                            <span>Call</span>
                                        </button>
                                        <button className="flex-1 flex items-center justify-center gap-2 glass-button py-2.5 rounded-xl font-bold text-sm text-emerald-800 hover:text-emerald-700 hover:border-emerald-200 hover:bg-emerald-50/50 transition-all">
                                            <MessageCircle size={14} className="text-emerald-600" />
                                            <span>Chat</span>
                                        </button>
                                        <button className="glass-button p-2.5 rounded-xl text-neutral-400 hover:text-emerald-600 transition-colors">
                                            <Share2 size={16} />
                                        </button>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </section>
            </div>
        </div>
    );
}

function CheckIcon({ className, size }: { className?: string, size?: number }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size || 24}
            height={size || 24}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <polyline points="20 6 9 17 4 12" />
        </svg>
    );
}
