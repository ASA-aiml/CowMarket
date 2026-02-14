"use client";

import { Search, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { encyclopediaData } from "@/data/encyclopediaData";

type SectionType = "success" | "danger" | "warning" | "info";

const colorClasses = {
  blue: {
    bg: "bg-blue-50",
    border: "border-blue-200",
    text: "text-blue-700",
    icon: "bg-blue-100 text-blue-600"
  },
  red: {
    bg: "bg-red-50",
    border: "border-red-200",
    text: "text-red-700",
    icon: "bg-red-100 text-red-600"
  },
  green: {
    bg: "bg-green-50",
    border: "border-green-200",
    text: "text-green-700",
    icon: "bg-green-100 text-green-600"
  },
  orange: {
    bg: "bg-orange-50",
    border: "border-orange-200",
    text: "text-orange-700",
    icon: "bg-orange-100 text-orange-600"
  }
};

const sectionTypeClasses = {
  success: "bg-green-50 border-green-200",
  danger: "bg-red-50 border-red-200",
  warning: "bg-yellow-50 border-yellow-200",
  info: "bg-blue-50 border-blue-200"
};

export default function EncyclopediaPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [expandedSections, setExpandedSections] = useState<{ [key: string]: boolean }>({});

  const toggleCategory = (categoryId: string) => {
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
  };

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  const categories = [
    { id: "milkProduction", data: encyclopediaData.milkProduction, color: "blue" as const },
    { id: "diseases", data: encyclopediaData.diseases, color: "red" as const },
    { id: "nutrition", data: encyclopediaData.nutrition, color: "green" as const },
    { id: "schemes", data: encyclopediaData.schemes, color: "orange" as const }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-24 md:pb-8">
      <div className="max-w-4xl mx-auto p-4 md:p-8">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            📚 Knowledge for Farmers
          </h1>
          <p className="text-gray-600 text-lg">किसानों के लिए सरल जानकारी</p>
          <p className="text-gray-500 mt-2">Simple guides to help you care for your cows</p>
        </div>

        {/* Search */}
        <div className="relative mb-10 group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
          </div>
          <input
            type="text"
            className="block w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl leading-5 bg-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50 transition-all shadow-sm text-lg"
            placeholder="Search... (खोजें)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Categories */}
        <div className="space-y-4">
          {categories.map((category) => {
            const isExpanded = expandedCategory === category.id;
            const colors = colorClasses[category.color];

            return (
              <div
                key={category.id}
                className={`bg-white rounded-2xl border-2 ${colors.border} overflow-hidden transition-all ${isExpanded ? "shadow-lg" : "shadow-sm hover:shadow-md"
                  }`}
              >
                {/* Category Header */}
                <button
                  onClick={() => toggleCategory(category.id)}
                  className={`w-full p-6 flex items-center justify-between ${colors.bg} hover:opacity-90 transition-opacity`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`text-5xl`}>
                      {category.data.icon}
                    </div>
                    <div className="text-left">
                      <h2 className={`text-2xl font-bold ${colors.text}`}>
                        {category.data.title}
                      </h2>
                      <p className="text-gray-600 font-medium mt-1">
                        {category.data.subtitle}
                      </p>
                    </div>
                  </div>
                  <div className={`${colors.text}`}>
                    {isExpanded ? <ChevronUp size={28} /> : <ChevronDown size={28} />}
                  </div>
                </button>

                {/* Category Content */}
                {isExpanded && (
                  <div className="p-6 space-y-6">
                    {category.data.sections.map((section: any, idx: number) => {
                      const sectionId = `${category.id}-${idx}`;
                      const isSectionExpanded = expandedSections[sectionId];
                      const sectionClass = sectionTypeClasses[section.type as SectionType];

                      return (
                        <div
                          key={idx}
                          className={`border-2 rounded-xl overflow-hidden ${sectionClass}`}
                        >
                          {/* Section Header */}
                          <button
                            onClick={() => toggleSection(sectionId)}
                            className="w-full p-4 flex items-center justify-between hover:opacity-80 transition-opacity"
                          >
                            <div className="flex items-center gap-3">
                              <span className="text-3xl">{section.emoji}</span>
                              <h3 className="text-xl font-bold text-gray-800">
                                {section.title}
                              </h3>
                            </div>
                            {isSectionExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                          </button>

                          {/* Section Content */}
                          {isSectionExpanded && (
                            <div className="px-4 pb-4 space-y-4">

                              {/* Steps */}
                              {section.steps && (
                                <ol className="space-y-3">
                                  {section.steps.map((step: string, i: number) => (
                                    <li key={i} className="flex gap-3">
                                      <span className="flex-shrink-0 w-8 h-8 bg-white rounded-full flex items-center justify-center font-bold text-gray-700 shadow-sm">
                                        {i + 1}
                                      </span>
                                      <span className="text-gray-700 text-lg pt-1">{step}</span>
                                    </li>
                                  ))}
                                </ol>
                              )}

                              {/* Tips */}
                              {section.tips && (
                                <ul className="space-y-2">
                                  {section.tips.map((tip: string, i: number) => (
                                    <li key={i} className="flex gap-3 items-start">
                                      <span className="text-xl">💡</span>
                                      <span className="text-gray-700 text-lg pt-0.5">{tip}</span>
                                    </li>
                                  ))}
                                </ul>
                              )}

                              {/* Signs */}
                              {section.signs && (
                                <ul className="space-y-2">
                                  {section.signs.map((sign: string, i: number) => (
                                    <li key={i} className="flex gap-3 items-start">
                                      <span className="text-xl">⚠️</span>
                                      <span className="text-gray-700 text-lg pt-0.5">{sign}</span>
                                    </li>
                                  ))}
                                </ul>
                              )}

                              {/* Vaccines */}
                              {section.vaccines && (
                                <div className="space-y-3">
                                  {section.vaccines.map((vaccine: any, i: number) => (
                                    <div key={i} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                                      <h4 className="font-bold text-gray-800 text-lg mb-2">
                                        💉 {vaccine.name}
                                      </h4>
                                      <p className="text-gray-600">
                                        <strong>When:</strong> {vaccine.schedule}
                                      </p>
                                      <p className="text-green-600 font-bold mt-1">
                                        {vaccine.cost}
                                      </p>
                                    </div>
                                  ))}
                                  {section.where && (
                                    <p className="text-gray-600 italic mt-2">
                                      📍 {section.where}
                                    </p>
                                  )}
                                </div>
                              )}

                              {/* Diseases */}
                              {section.diseases && (
                                <div className="space-y-3">
                                  {section.diseases.map((disease: any, i: number) => (
                                    <div key={i} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                                      <h4 className="font-bold text-gray-800 text-lg mb-2">
                                        {disease.name}
                                      </h4>
                                      <p className="text-gray-600 mb-1">
                                        <strong>Signs:</strong> {disease.signs}
                                      </p>
                                      <p className="text-green-600">
                                        <strong>Prevention:</strong> {disease.prevention}
                                      </p>
                                    </div>
                                  ))}
                                </div>
                              )}

                              {/* Feeds */}
                              {section.feeds && (
                                <div className="space-y-3">
                                  {section.feeds.map((feed: any, i: number) => (
                                    <div key={i} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                                      <h4 className="font-bold text-gray-800 text-lg mb-2">
                                        {feed.type}
                                      </h4>
                                      <p className="text-gray-600">
                                        <strong>Amount:</strong> {feed.amount}
                                      </p>
                                      <p className="text-green-600">
                                        <strong>Benefit:</strong> {feed.benefit}
                                      </p>
                                    </div>
                                  ))}
                                </div>
                              )}

                              {/* Options */}
                              {section.options && (
                                <div className="space-y-3">
                                  {section.options.map((option: any, i: number) => (
                                    <div key={i} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                                      <h4 className="font-bold text-gray-800 text-lg mb-2">
                                        {option.name}
                                      </h4>
                                      <p className="text-gray-600 mb-1">
                                        <strong>How:</strong> {option.howTo}
                                      </p>
                                      <p className="text-green-600 mb-1">
                                        <strong>Benefit:</strong> {option.benefit}
                                      </p>
                                      <p className="text-blue-600 font-bold">
                                        💰 {option.cost}
                                      </p>
                                    </div>
                                  ))}
                                </div>
                              )}

                              {/* Avoid */}
                              {section.avoid && (
                                <ul className="space-y-2">
                                  {section.avoid.map((item: string, i: number) => (
                                    <li key={i} className="flex gap-3 items-start">
                                      <span className="text-xl">❌</span>
                                      <span className="text-gray-700 text-lg pt-0.5">{item}</span>
                                    </li>
                                  ))}
                                </ul>
                              )}

                              {/* Services */}
                              {section.services && (
                                <div>
                                  <ul className="space-y-2 mb-3">
                                    {section.services.map((service: string, i: number) => (
                                      <li key={i} className="flex gap-3 items-start">
                                        <span className="text-xl">✅</span>
                                        <span className="text-gray-700 text-lg pt-0.5">{service}</span>
                                      </li>
                                    ))}
                                  </ul>
                                  {section.note && (
                                    <p className="text-green-700 font-bold bg-green-100 p-3 rounded-lg">
                                      {section.note}
                                    </p>
                                  )}
                                </div>
                              )}

                              {/* Schemes */}
                              {section.schemes && (
                                <div className="space-y-3">
                                  {section.schemes.map((scheme: any, i: number) => (
                                    <div key={i} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                                      <h4 className="font-bold text-gray-800 text-lg mb-2">
                                        {scheme.name}
                                      </h4>
                                      <p className="text-gray-600 mb-1">
                                        <strong>Benefit:</strong> {scheme.benefit}
                                      </p>
                                      {scheme.eligibility && (
                                        <p className="text-blue-600">
                                          <strong>Who can apply:</strong> {scheme.eligibility}
                                        </p>
                                      )}
                                      {scheme.coverage && (
                                        <p className="text-green-600 font-bold">
                                          {scheme.coverage}
                                        </p>
                                      )}
                                      {scheme.amount && (
                                        <p className="text-green-600 font-bold">
                                          {scheme.amount}
                                        </p>
                                      )}
                                    </div>
                                  ))}
                                </div>
                              )}

                              {/* Contacts */}
                              {section.contacts && (
                                <div className="space-y-3">
                                  {section.contacts.map((contact: any, i: number) => (
                                    <div key={i} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                                      <h4 className="font-bold text-gray-800 text-lg mb-2">
                                        📞 {contact.service}
                                      </h4>
                                      {contact.number && (
                                        <p className="text-blue-600 font-bold text-2xl mb-1">
                                          {contact.number}
                                        </p>
                                      )}
                                      {contact.timing && (
                                        <p className="text-gray-600">{contact.timing}</p>
                                      )}
                                      {contact.note && (
                                        <p className="text-gray-600">{contact.note}</p>
                                      )}
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Help Footer */}
        <div className="mt-10 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-6 text-white text-center">
          <h3 className="text-2xl font-bold mb-2">Need Help?</h3>
          <p className="mb-4 text-blue-100">Call Kisan Call Center for free advice</p>
          <p className="text-4xl font-bold">📞 1962</p>
          <p className="text-sm text-blue-100 mt-2">Available 24/7 - Toll Free</p>
        </div>
      </div>
    </div>
  );
}
