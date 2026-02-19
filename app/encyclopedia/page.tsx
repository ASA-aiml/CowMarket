"use client";

import { Search, Milk, Activity, Wheat, Landmark, ChevronRight, BookOpen, Sparkles } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

const categories = [
  {
    id: "milk",
    name: "Milk Production",
    icon: Milk,
    color: "from-emerald-500 to-teal-600",
    bgLight: "bg-emerald-100/60",
    textColor: "text-emerald-700",
    articles: ["Feed planning for high yield", "Lactation cycle optimization", "Breed-specific nutrition"]
  },
  {
    id: "diseases",
    name: "Common Diseases",
    icon: Activity,
    color: "from-rose-500 to-red-600",
    bgLight: "bg-rose-100/60",
    textColor: "text-rose-700",
    articles: ["Mastitis Prevention", "Foot and Mouth Disease (FMD)", "Lumpy Skin Disease Guide"]
  },
  {
    id: "feeds",
    name: "Feeds & Nutrition",
    icon: Wheat,
    color: "from-amber-500 to-orange-600",
    bgLight: "bg-amber-100/60",
    textColor: "text-amber-700",
    articles: ["Types of cattle feed", "Homemade feed formulas", "Seasonal feeding"]
  },
  {
    id: "schemes",
    name: "Govt Schemes",
    icon: Landmark,
    color: "from-violet-500 to-purple-600",
    bgLight: "bg-violet-100/60",
    textColor: "text-violet-700",
    articles: ["Subsidies for small farmers", "Livestock Insurance", "Loan Programs 2024"]
  },
];

export default function EncyclopediaPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCategories = categories.filter(c =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.articles.some(a => a.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen pb-24 md:pb-8">
      <div className="max-w-5xl mx-auto p-4 md:p-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-2">Knowledge Base</h1>
          <p className="text-neutral-500 font-medium">Expert guides on cattle farming, health, and government support.</p>
        </motion.div>

        {/* Search — Glass Input */}
        <div className="relative mb-10 group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-neutral-400 group-focus-within:text-emerald-500 transition-colors" />
          </div>
          <input
            type="text"
            className="glass-input block w-full pl-12 pr-4 py-4 text-base"
            placeholder="Search for diseases, breeds, or tips..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Featured Card — Emerald Gradient */}
        {!searchQuery && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, type: "spring", stiffness: 300, damping: 20 }}
            className="bg-gradient-to-br from-emerald-600 to-teal-700 rounded-3xl p-8 mb-10 text-white relative overflow-hidden shadow-lg shadow-emerald-900/20"
          >
            <div className="relative z-10 max-w-lg">
              <span className="bg-white/20 backdrop-blur-sm text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider mb-4 inline-flex items-center gap-1.5">
                <Sparkles size={12} />
                Featured Guide
              </span>
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-glow">Summer Management Tips</h2>
              <p className="text-emerald-100 mb-6 leading-relaxed">
                Learn how to protect your livestock from heat stress and maintain milk production during peak summer months.
              </p>
              <button className="bg-white text-emerald-700 px-6 py-3 rounded-xl font-bold hover:bg-emerald-50 transition-all shadow-md active:scale-95 hover:-translate-y-0.5">
                Read Article
              </button>
            </div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
            <div className="absolute bottom-0 right-10 w-32 h-32 bg-teal-500/30 rounded-full blur-2xl"></div>
          </motion.div>
        )}

        {/* Categories Grid — Glass Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {filteredCategories.map((category, i) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              whileHover={{ y: -6, scale: 1.01 }}
              transition={{ type: "spring", stiffness: 300, damping: 20, delay: i * 0.05 }}
              className="glass-card p-6 cursor-pointer group"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center bg-gradient-to-br ${category.color} text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <category.icon size={28} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-neutral-900 group-hover:text-emerald-700 transition-colors">{category.name}</h3>
                  <span className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider">{category.articles.length} Guides</span>
                </div>
              </div>

              <ul className="space-y-2">
                {category.articles.map((article, idx) => (
                  <li key={idx} className="flex items-center justify-between text-neutral-600 hover:text-emerald-700 transition-colors p-2.5 hover:bg-white/50 rounded-xl -mx-2 group/item cursor-pointer">
                    <div className="flex items-center gap-3">
                      <BookOpen size={16} className="text-neutral-300 group-hover/item:text-emerald-500 transition-colors" />
                      <span className="text-sm font-medium">{article}</span>
                    </div>
                    <ChevronRight size={16} className="text-neutral-300 group-hover/item:text-emerald-500 transition-colors" />
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
