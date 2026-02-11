"use client";

import Link from "next/link";
import { Heart, Phone, PlayCircle, Filter, ChevronDown, SlidersHorizontal, MessageCircle } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import FilterModal from "@/components/FilterModal";

// Mock Data for Livestock
// Mock Data for Livestock
const livestock = [
  {
    id: 1,
    name: "Jersey Cow #402",
    breed: "Jersey",
    milk: "15 L/day",
    price: "₹45,000",
    location: "Kochi, Kerala",
    image: "https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?q=80&w=800",
    video: true,
    pregnant: "Yes",
  },
  {
    id: 2,
    name: "HF Cross #11",
    breed: "Holstein Friesian",
    milk: "22 L/day",
    price: "₹62,000",
    location: "Thrissur, Kerala",
    image: "https://images.unsplash.com/photo-1541625602330-2277a4c46182?q=80&w=800",
    video: true,
    pregnant: "No",
  },
  {
    id: 3,
    name: "Murrah Buffalo",
    breed: "Murrah",
    milk: "12 L/day",
    price: "₹85,000",
    location: "Palakkad, Kerala",
    image: "https://images.unsplash.com/photo-1589332560447-7389e47264a7?q=80&w=800",
    video: false,
    pregnant: "Yes",
  },
  {
    id: 4,
    name: "Vechur Cow",
    breed: "Vechur",
    milk: "4 L/day",
    price: "₹35,000",
    location: "Kottayam, Kerala",
    image: "https://images.unsplash.com/photo-1546445317-29f4545e9d53?q=80&w=800",
    video: true,
    pregnant: "No",
  },
];

const filters = ["All", "Cows", "Buffalos", "Bulls", "Goats", "High Yield", "Jersey", "Holstein"];

export default function Marketplace() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <FilterModal 
        isOpen={isFilterOpen} 
        onClose={() => setIsFilterOpen(false)} 
        onApply={(f) => console.log(f)} 
      />

      {/* Sticky Filters */}
      <div className="sticky top-14 md:top-0 z-30 bg-white shadow-sm border-b border-gray-100">
        <div className="flex items-center gap-3 px-4 py-3 overflow-x-auto no-scrollbar">
          <button 
            onClick={() => setIsFilterOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 border border-gray-200 rounded-lg shadow-sm hover:bg-gray-200 transition-colors flex-shrink-0"
          >
            <SlidersHorizontal size={16} className="text-gray-700" />
            <span className="text-sm font-semibold text-gray-700">Filters</span>
          </button>
          
          <div className="h-6 w-px bg-gray-300 mx-1 flex-shrink-0" />

          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap flex-shrink-0 ${
                activeFilter === filter
                  ? "bg-black text-white shadow-md ring-2 ring-black ring-offset-1"
                  : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Quick Actions (Mobile Only) */}
      <div className="md:hidden grid grid-cols-5 gap-2 p-4 bg-white border-b border-gray-100">
        {[
          { name: "Home", icon: Heart /* Using Heart as placeholder for Home if specific icon not avail in this file, but logic suggests Home icon */, color: "bg-blue-50 text-blue-600" },
          { name: "Sell", icon: Phone /* Placeholder */, color: "bg-green-50 text-green-600" },
          { name: "Scan", icon: PlayCircle /* Placeholder */, color: "bg-purple-50 text-purple-600" },
          { name: "Vendor", icon: Filter /* Placeholder */, color: "bg-orange-50 text-orange-600" },
          { name: "Rules", icon: ChevronDown /* Placeholder */, color: "bg-gray-50 text-gray-600" },
        ].map((action, idx) => (
           // This section is just a visual mimic as requested, actual nav is bottom bar. 
           // Better to use Link/Routers if functional. 
           // I will use proper links and icons from the imported list or Lucide.
           null
        ))}
         {/* Re-implementing with proper data */}
         <div className="contents">
            <Link href="/" className="flex flex-col items-center gap-1">
                <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                      <polyline points="9 22 9 12 15 12 15 22"/>
                    </svg>
                </div>
                <span className="text-[10px] font-medium text-gray-700">Home</span>
            </Link>
            <Link href="/sell" className="flex flex-col items-center gap-1">
                <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center text-green-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="12" r="10"/>
                      <line x1="12" y1="8" x2="12" y2="16"/>
                      <line x1="8" y1="12" x2="16" y2="12"/>
                    </svg>
                </div>
                <span className="text-[10px] font-medium text-gray-700">Sell</span>
            </Link>
            <Link href="/scan" className="flex flex-col items-center gap-1">
                <div className="w-12 h-12 rounded-full bg-purple-50 flex items-center justify-center text-purple-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                       <path d="M3 7V5a2 2 0 0 1 2-2h2" />
                       <path d="M17 3h2a2 2 0 0 1 2 2v2" />
                       <path d="M21 17v2a2 2 0 0 1-2 2h-2" />
                       <path d="M7 21H5a2 2 0 0 1-2-2v-2" />
                    </svg>
                </div>
                <span className="text-[10px] font-medium text-gray-700">Scan</span>
            </Link>
            <Link href="/vendor" className="flex flex-col items-center gap-1">
                <div className="w-12 h-12 rounded-full bg-orange-50 flex items-center justify-center text-orange-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7"/>
                      <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/>
                      <path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4"/>
                      <path d="M2 7h20"/>
                      <path d="M22 7v3a2 2 0 0 1-2 2v0a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 16 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 12 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 8 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 4 12v0a2 2 0 0 1-2-2V7"/>
                    </svg>
                </div>
                <span className="text-[10px] font-medium text-gray-700">Vendor</span>
            </Link>
             <Link href="/encyclopedia" className="flex flex-col items-center gap-1">
                <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
                      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
                    </svg>
                </div>
                <span className="text-[10px] font-medium text-gray-700">Learn</span>
            </Link>
         </div>
      </div>

      {/* Grid */}
      <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 pb-24">
        {livestock.map((item) => (
          <div key={item.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow group cursor-pointer">
            {/* Image/Video Container */}
            <div className="relative aspect-[4/3] bg-gray-100">
               <Image 
                 src={item.image} 
                 alt={item.name}
                 fill
                 className="object-cover transition-transform duration-500 group-hover:scale-105"
               />
               
              {item.video && (
                <div className="absolute top-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1 backdrop-blur-md z-10">
                  <PlayCircle size={12} fill="white" />
                  <span>Video</span>
                </div>
              )}
              
              <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 via-black/40 to-transparent text-white pt-10 z-10">
                 <h3 className="font-bold text-lg shadow-black drop-shadow-md">{item.price}</h3>
              </div>
            </div>

            {/* Details */}
            <div className="p-3">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-semibold text-gray-900 line-clamp-1">{item.name}</h4>
                  <p className="text-xs text-gray-500">{item.location}</p>
                </div>
                <button className="text-gray-400 hover:text-red-500 transition-colors">
                  <Heart size={20} />
                </button>
              </div>

              <div className="flex flex-wrap gap-2 text-xs text-gray-600 mb-3">
                <span className="bg-gray-100 px-2 py-1 rounded-md">{item.breed}</span>
                <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded-md">{item.milk}</span>
                {item.pregnant === "Yes" && (
                   <span className="bg-green-50 text-green-700 px-2 py-1 rounded-md">Pregnant</span>
                )}
              </div>

              <div className="flex gap-2">
                <button className="flex-1 flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white py-2.5 rounded-xl font-medium transition-colors text-sm">
                  <MessageCircle size={16} />
                  <span>WhatsApp</span>
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 bg-gray-900 hover:bg-gray-800 text-white py-2.5 rounded-xl font-medium transition-colors text-sm">
                  <Phone size={16} />
                  <span>Call</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
