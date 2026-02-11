"use client";

import { X, ChevronDown, Check } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (filters: any) => void;
}

export default function FilterModal({ isOpen, onClose, onApply }: FilterModalProps) {
  const [filters, setFilters] = useState({
    type: [] as string[],
    lactation: [] as string[],
    breed: [] as string[],
    milkRange: [0, 50],
    pregnancy: "All",
    withCalf: "All",
    rateRange: [10000, 200000],
    origin: "All",
    locationRadius: 50,
    sortBy: "Latest",
  });

  const [activeSection, setActiveSection] = useState<string | null>("type");

  const toggleSelection = (category: keyof typeof filters, value: string) => {
    setFilters((prev) => {
      const current = prev[category] as string[];
      const includes = current.includes(value);
      if (includes) {
        return { ...prev, [category]: current.filter((i) => i !== value) };
      } else {
        return { ...prev, [category]: [...current, value] };
      }
    });
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 z-50 backdrop-blur-sm"
          />
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl z-50 h-[85vh] flex flex-col md:max-w-md md:left-1/2 md:-translate-x-1/2 md:h-[600px] md:rounded-xl md:bottom-auto md:top-1/2 md:-translate-y-1/2"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
              <h2 className="text-lg font-bold text-gray-900">Filters</h2>
              <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
                <X size={20} className="text-gray-500" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-4 space-y-6 pb-24">
              
              {/* Sort By */}
              <section>
                <h3 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wider">Sort By</h3>
                <div className="flex flex-wrap gap-2">
                  {["Latest", "Price: Low to High", "Price: High to Low", "Milk: High to Low"].map((sort) => (
                    <button
                      key={sort}
                      onClick={() => setFilters({ ...filters, sortBy: sort })}
                      className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${
                        filters.sortBy === sort
                          ? "bg-blue-600 text-white border-blue-600"
                          : "bg-white text-gray-600 border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      {sort}
                    </button>
                  ))}
                </div>
              </section>

              {/* Type */}
              <section>
                <h3 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wider">Type</h3>
                <div className="space-y-2">
                  {["Cow", "Buffalo", "Bull", "Male Buffalo", "Other"].map((type) => (
                    <label key={type} className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 bg-gray-50/50 cursor-pointer active:scale-[0.99] transition-transform">
                      <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${filters.type.includes(type) ? "bg-blue-600 border-blue-600" : "border-gray-300 bg-white"}`}>
                        {filters.type.includes(type) && <Check size={12} className="text-white" />}
                      </div>
                      <input
                        type="checkbox"
                        className="hidden"
                        checked={filters.type.includes(type)}
                        onChange={() => toggleSelection("type", type)}
                      />
                      <span className="text-gray-700 font-medium">{type}</span>
                    </label>
                  ))}
                </div>
              </section>

              {/* Lactation */}
              <section>
                <h3 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wider">Lactation</h3>
                <div className="flex flex-wrap gap-2">
                  {["Not Delivered", "First", "Second", "Third+"].map((lac) => (
                    <button
                      key={lac}
                      onClick={() => toggleSelection("lactation", lac)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all ${
                        filters.lactation.includes(lac)
                          ? "bg-blue-50 text-blue-700 border-blue-200"
                          : "bg-white text-gray-600 border-gray-200"
                      }`}
                    >
                      {lac}
                    </button>
                  ))}
                </div>
              </section>

              {/* Milk Range Slider (Mock) */}
              <section>
                 <div className="flex justify-between items-center mb-2">
                    <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Milk Capacity</h3>
                    <span className="text-blue-600 font-bold text-sm">{filters.milkRange[0]} - {filters.milkRange[1]} L</span>
                 </div>
                 <input 
                    type="range" 
                    min="0" 
                    max="50" 
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                 />
              </section>

               {/* Rate Range Slider (Mock) */}
              <section>
                 <div className="flex justify-between items-center mb-2">
                    <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Price Range</h3>
                    <span className="text-blue-600 font-bold text-sm">₹{filters.rateRange[0] / 1000}k - ₹{filters.rateRange[1] / 1000}k</span>
                 </div>
                 <input 
                    type="range" 
                    min="10000" 
                    max="200000" 
                    step="5000"
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                 />
              </section>

              {/* Pregnancy */}
              <section>
                <h3 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wider">Pregnancy Status</h3>
                <div className="flex rounded-xl bg-gray-100 p-1">
                   {["All", "Yes", "No"].map((status) => (
                      <button
                        key={status}
                        onClick={() => setFilters({ ...filters, pregnancy: status })}
                        className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
                            filters.pregnancy === status 
                            ? "bg-white text-gray-900 shadow-sm" 
                            : "text-gray-500 hover:text-gray-700"
                        }`}
                      >
                        {status}
                      </button>
                   ))}
                </div>
              </section>
              
               {/* Origin */}
              <section>
                <h3 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wider">Source</h3>
                <div className="flex gap-3">
                   {["All", "Home-raised", "Market"].map((origin) => (
                      <label key={origin} className="flex-1 flex items-center justify-center gap-2 p-3 rounded-xl border cursor-pointer transition-all border-gray-200 text-gray-600 has-[:checked]:border-blue-500 has-[:checked]:bg-blue-50 has-[:checked]:text-blue-700">
                          <input 
                            type="radio" 
                            name="origin" 
                            className="hidden"
                            checked={filters.origin === origin}
                            onChange={() => setFilters({ ...filters, origin })}
                          />
                          <span className="font-medium text-sm">{origin}</span>
                      </label>
                   ))}
                </div>
              </section>

               {/* Location Radius */}
               <section>
                 <div className="flex justify-between items-center mb-2">
                    <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Distance</h3>
                    <span className="text-blue-600 font-bold text-sm">{filters.locationRadius} km</span>
                 </div>
                 <input 
                    type="range" 
                    min="5" 
                    max="500" 
                    value={filters.locationRadius}
                    onChange={(e) => setFilters({...filters, locationRadius: parseInt(e.target.value)})}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                 />
                 <div className="flex justify-between text-xs text-gray-400 mt-1">
                    <span>5km</span>
                    <span>100km</span>
                    <span>500km</span>
                 </div>
              </section>

            </div>

            {/* Footer */}
            <div className="p-4 border-t border-gray-100 bg-white">
              <div className="flex gap-3">
                <button 
                    onClick={() => setFilters({
                        type: [], lactation: [], breed: [], milkRange: [0, 50], pregnancy: "All", withCalf: "All", rateRange: [10000, 200000], origin: "All", locationRadius: 50, sortBy: "Latest"
                    })}
                    className="px-6 py-3 rounded-xl text-gray-600 font-bold border border-gray-200 hover:bg-gray-50"
                >
                    Reset
                </button>
                <button 
                    onClick={() => { onApply(filters); onClose(); }}
                    className="flex-1 px-6 py-3 rounded-xl bg-black text-white font-bold hover:bg-gray-900 shadow-lg shadow-gray-200"
                >
                    Show 142 Results
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
