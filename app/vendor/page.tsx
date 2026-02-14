"use client";

import { Search, MapPin, Store, Stethoscope, Briefcase, ChevronRight, Filter, Star, Phone, MessageCircle, Share2, Truck, ShieldCheck, Pill, Wheat, Droplet, Scissors } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";

// Realistic Livestock Marketplace Vendors
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
        image: "/product/doctor/rajith.png",
        verified: true,
        badges: ["Top Rated", "24/7 Available", "Emergency Service"],
        description: "Senior Veterinarian with 15+ years of experience in dairy cattle management, surgery, and artificial insemination.",
        available: true,
        phone: "+91 98765 43210"
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
        image: "/product/feed/feed1.png",
        verified: true,
        badges: ["Best Price", "Bulk Delivery", "Quality Assured"],
        description: "Authorized dealer of premium cattle feeds. Bulk orders available with free doorstep delivery. Customized feed formulations.",
        available: true,
        phone: "+91 98765 43211"
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
        image: "/product/equipment/green.png",
        verified: true,
        badges: ["Warranty Available", "Installation Service"],
        description: "Complete dairy farm automation solutions. Installation, training, and after-sales service support provided.",
        available: true,
        phone: "+91 98765 43212"
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
        image: "/product/transport/truck.png",
        verified: true,
        badges: ["Trusted Partner", "Govt Approved", "Insured"],
        description: "Government approved livestock transporter. Hassle-free documentation, safe delivery, and insurance coverage.",
        available: true,
        phone: "+91 98765 43213"
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
        image: "/product/veterinaryClinic/clinec.png",
        verified: true,
        badges: ["Lab Facility", "Advanced Equipment"],
        description: "Modern veterinary clinic with advanced diagnostic lab, surgical facilities, and experienced veterinarians.",
        available: true,
        phone: "+91 98765 43214"
    },
    {
        id: 6,
        name: "Amul Dairy Products",
        type: "Dairy Products",
        subtype: "Milk Collection Center",
        service: "Milk Collection, Testing, Payment",
        location: "Kollam, Kerala",
        distance: "6 km",
        rating: 4.8,
        reviews: 340,
        image: "/product/dairy/amul.png",
        verified: true,
        badges: ["Fair Price", "Daily Payment", "Quality Bonus"],
        description: "Authorized milk collection center. Fair pricing, daily payments, and quality-based bonuses for farmers.",
        available: true,
        phone: "+91 98765 43215"
    },
    {
        id: 7,
        name: "Agri Vet Pharmacy",
        type: "Medicine",
        subtype: "Veterinary Pharmacy",
        service: "Medicines, Vaccines, Supplements, First Aid",
        location: "Kannur, Kerala",
        distance: "4 km",
        rating: 4.4,
        reviews: 78,
        image: "/product/pharmacy/med.png",
        verified: true,
        badges: ["Licensed Pharmacy", "Home Delivery"],
        description: "Complete range of veterinary medicines, vaccines, and supplements. Expert consultation and home delivery available.",
        available: true,
        phone: "+91 98765 43216"
    },
    {
        id: 8,
        name: "Fodder Farm Supplies",
        type: "Feed Supplier",
        subtype: "Green Fodder & Hay",
        service: "Green Fodder, Hay, Silage, Azolla",
        location: "Wayanad, Kerala",
        distance: "15 km",
        rating: 4.3,
        reviews: 62,
        image: "/product/feed/feed2.png",
        verified: false,
        badges: ["Organic", "Farm Fresh"],
        description: "Fresh green fodder, quality hay, and silage. Seasonal availability. Bulk orders for dairy farms.",
        available: true,
        phone: "+91 98765 43217"
    },
    {
        id: 9,
        name: "Dr. Priya Menon",
        type: "Veterinary Doctor",
        subtype: "Reproduction Specialist",
        service: "AI Services, Pregnancy Check, Infertility Treatment",
        location: "Alappuzha, Kerala",
        distance: "7 km",
        rating: 4.9,
        reviews: 156,
        image: "/product/doctor/doc2.png",
        verified: true,
        badges: ["AI Expert", "Top Rated", "Female Doctor"],
        description: "Specialist in cattle reproduction, artificial insemination, and infertility treatment. High success rate.",
        available: true,
        phone: "+91 98765 43218"
    },
    {
        id: 10,
        name: "Farm Tools & Equipment",
        type: "Equipment",
        subtype: "Tools & Accessories",
        service: "Brushes, Buckets, Ropes, Feeders, Water Tanks",
        location: "Kasaragod, Kerala",
        distance: "10 km",
        rating: 4.1,
        reviews: 34,
        image: "/product/equipment/tool2.png",
        verified: false,
        badges: ["Affordable", "Wide Range"],
        description: "Complete range of farm tools and accessories. Quality products at affordable prices.",
        available: true,
        phone: "+91 98765 43219"
    },
    {
        id: 11,
        name: "Livestock Insurance Services",
        type: "Insurance",
        subtype: "Cattle Insurance",
        service: "Insurance, Claims, Documentation",
        location: "Thiruvananthapuram, Kerala",
        distance: "20 km",
        rating: 4.6,
        reviews: 92,
        image: "/product/insurance/ins1.png",
        verified: true,
        badges: ["Govt Approved", "Quick Claims"],
        description: "Comprehensive livestock insurance coverage. Quick claim processing and expert documentation support.",
        available: true,
        phone: "+91 98765 43220"
    },
    {
        id: 12,
        name: "Mobile Vet Service",
        type: "Veterinary Doctor",
        subtype: "Mobile Clinic",
        service: "Farm Visits, Emergency Care, Vaccination Camps",
        location: "Pathanamthitta, Kerala",
        distance: "9 km",
        rating: 4.7,
        reviews: 118,
        image: "/product/veterinaryClinic/vet2.png",
        verified: true,
        badges: ["Mobile Service", "Emergency Available"],
        description: "Mobile veterinary service for farm visits. Emergency care, vaccination camps, and health checkups at your doorstep.",
        available: true,
        phone: "+91 98765 43221"
    }
];

const categories = [
    { name: "All", icon: Store, color: "bg-gray-100 text-gray-700" },
    { name: "Doctors", icon: Stethoscope, color: "bg-blue-100 text-blue-600" },
    { name: "Feed", icon: Wheat, color: "bg-green-100 text-green-600" },
    { name: "Equipment", icon: Briefcase, color: "bg-orange-100 text-orange-600" },
    { name: "Transport", icon: Truck, color: "bg-purple-100 text-purple-600" },
    { name: "Medicine", icon: Pill, color: "bg-red-100 text-red-600" },
    { name: "Dairy", icon: Droplet, color: "bg-cyan-100 text-cyan-600" },
    { name: "Insurance", icon: ShieldCheck, color: "bg-indigo-100 text-indigo-600" },
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
        <div className="min-h-screen bg-gray-50 pb-24 md:pb-8">
            {/* Header Section */}
            <div className="bg-white sticky top-0 z-20 border-b border-gray-100">
                <div className="p-4 md:p-8 max-w-7xl mx-auto pb-4">
                    <div className="flex justify-between items-center mb-4">
                        <div>
                            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Services & Products</h1>
                            <p className="text-sm text-gray-500">Find trusted experts and suppliers near you</p>
                        </div>
                        <div className="flex gap-2">
                            <button className="p-2 bg-gray-100 rounded-full text-gray-600 hover:bg-gray-200 transition-colors">
                                <MapPin size={20} />
                            </button>
                            <button className="p-2 bg-gray-100 rounded-full text-gray-600 hover:bg-gray-200 relative transition-colors">
                                <Filter size={20} />
                                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
                            </button>
                        </div>
                    </div>

                    {/* Search */}
                    <div className="relative mb-6">
                        <input
                            type="text"
                            placeholder="Search for doctors, feed, medicines..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 md:py-4 rounded-xl bg-gray-50 border border-gray-200 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all outline-none text-sm md:text-base"
                        />
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    </div>

                    {/* Scrollable Categories */}
                    <div className="flex gap-2 md:gap-3 overflow-x-auto no-scrollbar pb-2">
                        {categories.map((cat) => (
                            <button
                                key={cat.name}
                                onClick={() => setActiveCategory(cat.name)}
                                className={`flex items-center gap-2 px-3 md:px-4 py-2 rounded-full border transition-all whitespace-nowrap text-sm md:text-base ${activeCategory === cat.name
                                    ? "bg-gray-900 text-white border-gray-900 shadow-md"
                                    : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
                                    }`}
                            >
                                <cat.icon size={16} />
                                <span className="font-medium">{cat.name}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-8">

                {/* Featured / Sponsored (Horizontal Scroll) */}
                {activeCategory === "All" && (
                    <section>
                        <div className="flex justify-between items-center mb-4 px-1">
                            <h2 className="text-lg md:text-xl font-bold text-gray-900">Sponsored Partners</h2>
                            <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Ad</span>
                        </div>
                        <div className="flex gap-4 overflow-x-auto no-scrollbar pb-4 -mx-4 px-4">
                            {vendors.slice(0, 3).map((vendor) => (
                                <div key={vendor.id} className="min-w-[280px] md:min-w-[320px] bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-5 text-white shadow-lg relative overflow-hidden">
                                    <div className="absolute top-0 right-0 p-3 opacity-10">
                                        <Store size={100} />
                                    </div>
                                    <div className="flex items-start gap-3 mb-3 relative z-10">
                                        <div className="w-14 h-14 bg-white/20 rounded-xl border-2 border-white/30 overflow-hidden">
                                            <Image
                                                src={vendor.image}
                                                alt={vendor.name}
                                                width={56}
                                                height={56}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-bold text-white line-clamp-1 text-lg">{vendor.name}</h3>
                                            <p className="text-xs text-blue-100">{vendor.type}</p>
                                        </div>
                                    </div>
                                    <p className="text-sm text-blue-50 mb-4 line-clamp-2 relative z-10">{vendor.description}</p>
                                    <button className="w-full py-2.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg text-sm font-bold hover:bg-white/20 transition-colors">
                                        View Profile
                                    </button>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Vendor List */}
                <section>
                    <div className="flex justify-between items-center mb-4 px-1">
                        <h2 className="text-lg md:text-xl font-bold text-gray-900">
                            {activeCategory === "All" ? "All Services Near You" : `${activeCategory} Near You`}
                        </h2>
                        <span className="text-sm text-gray-500">{filteredVendors.length} results</span>
                    </div>

                    {filteredVendors.length === 0 ? (
                        <div className="text-center py-16">
                            <Store className="mx-auto text-gray-300 mb-4" size={64} />
                            <h3 className="text-xl font-bold text-gray-900 mb-2">No vendors found</h3>
                            <p className="text-gray-500">Try adjusting your search or filters</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {filteredVendors.map((vendor) => (
                                <motion.div
                                    key={vendor.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    className="bg-white p-4 md:p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all group"
                                >
                                    {/* Card Header */}
                                    <div className="flex items-start gap-4 mb-4">
                                        <div className="relative flex-shrink-0">
                                            <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl overflow-hidden">
                                                <Image
                                                    src={vendor.image}
                                                    alt={vendor.name}
                                                    width={80}
                                                    height={80}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            {vendor.verified && (
                                                <div className="absolute -bottom-1 -right-1 bg-blue-600 rounded-full p-1 border-2 border-white shadow-sm">
                                                    <CheckIcon size={12} className="text-white" />
                                                </div>
                                            )}
                                        </div>

                                        <div className="flex-1 min-w-0">
                                            <div className="flex justify-between items-start gap-2">
                                                <h3 className="font-bold text-gray-900 line-clamp-1 text-base md:text-lg">{vendor.name}</h3>
                                                {vendor.available ? (
                                                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-green-100 text-green-800 flex-shrink-0">
                                                        Open
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-gray-100 text-gray-600 flex-shrink-0">
                                                        Closed
                                                    </span>
                                                )}
                                            </div>
                                            <p className="text-xs text-blue-600 font-medium mb-1">{vendor.type} • {vendor.subtype}</p>
                                            <div className="flex items-center gap-1 text-xs text-gray-500">
                                                <Star size={12} className="text-amber-400 fill-amber-400" />
                                                <span className="font-bold text-gray-900">{vendor.rating}</span>
                                                <span>({vendor.reviews})</span>
                                                <span className="text-gray-300 mx-1">•</span>
                                                <MapPin size={12} />
                                                <span>{vendor.distance}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Badges */}
                                    <div className="flex flex-wrap gap-1.5 mb-3">
                                        {vendor.badges.slice(0, 3).map((badge) => (
                                            <span key={badge} className="px-2 py-1 bg-gray-50 border border-gray-100 rounded-md text-[10px] font-medium text-gray-600">
                                                {badge}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Description */}
                                    <p className="text-xs text-gray-500 mb-3 line-clamp-2 leading-relaxed">
                                        {vendor.description}
                                    </p>

                                    <div className="h-px bg-gray-100 mb-3" />

                                    {/* Actions */}
                                    <div className="flex gap-2">
                                        <button className="flex-1 py-2.5 bg-gray-900 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors">
                                            <Phone size={14} />
                                            Call
                                        </button>
                                        <button className="flex-1 py-2.5 bg-green-50 text-green-700 rounded-xl text-xs font-bold flex items-center justify-center gap-2 hover:bg-green-100 transition-colors">
                                            <MessageCircle size={14} />
                                            Chat
                                        </button>
                                        <button className="p-2.5 bg-gray-50 text-gray-400 rounded-xl hover:text-gray-600 hover:bg-gray-100 transition-colors">
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
