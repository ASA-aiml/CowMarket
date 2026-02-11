"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft, Upload, CheckCircle, MapPin, Camera, Video } from "lucide-react";

export default function SellPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    type: "",
    breed: "",
    lactation: "",
    currentMilk: "",
    maxMilk: "",
    pregnancy: "No",
    calf: "None",
    origin: "Home-raised",
    price: "",
    negotiable: false,
    location: "Kochi, Kerala", // Default mocked
  });

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 5));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleToggle = (name: string) => {
    setFormData((prev) => ({ ...prev, [name]: !prev[name as keyof typeof prev] }));
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24 md:pl-64">
      <div className="max-w-2xl mx-auto p-4 md:p-8">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center text-sm font-medium text-gray-500 mb-2">
            <span>Step {step} of 5</span>
            <span>{Math.round((step / 5) * 100)}%</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-blue-600 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${(step / 5) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            {step === 1 && (
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-6">
                <h2 className="text-xl font-bold text-gray-900">Basic Information</h2>
                
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Type of Animal</label>
                        <select 
                            name="type" 
                            value={formData.type} 
                            onChange={handleChange}
                            className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all"
                        >
                            <option value="">Select Type</option>
                            <option value="Cow">Cow</option>
                            <option value="Buffalo">Buffalo</option>
                            <option value="Bull">Bull</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Breed</label>
                        <input 
                            type="text" 
                            name="breed" 
                            value={formData.breed} 
                            onChange={handleChange}
                            placeholder="e.g., Jersey, Murrah"
                            className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Current Milk (L/day)</label>
                            <input 
                                type="number" 
                                name="currentMilk" 
                                value={formData.currentMilk} 
                                onChange={handleChange}
                                placeholder="0"
                                className="w-full p-3 rounded-xl border border-gray-200 outline-none"
                            />
                        </div>
                        <div>
                             <label className="block text-sm font-medium text-gray-700 mb-1">Max Milk (L/day)</label>
                            <input 
                                type="number" 
                                name="maxMilk" 
                                value={formData.maxMilk} 
                                onChange={handleChange}
                                placeholder="0"
                                className="w-full p-3 rounded-xl border border-gray-200 outline-none"
                            />
                        </div>
                    </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-6">
                <h2 className="text-xl font-bold text-gray-900">Health & Status</h2>
                
                 <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Pregnancy Status</label>
                        <select 
                            name="pregnancy" 
                            value={formData.pregnancy} 
                            onChange={handleChange}
                            className="w-full p-3 rounded-xl border border-gray-200 outline-none"
                        >
                            <option value="No">No</option>
                            <option value="Yes">Yes</option>
                            <option value="Unsure">Unsure</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Calf Details</label>
                        <select 
                            name="calf" 
                            value={formData.calf} 
                            onChange={handleChange}
                            className="w-full p-3 rounded-xl border border-gray-200 outline-none"
                        >
                            <option value="None">None</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                    </div>

                     <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Origin</label>
                        <div className="flex gap-3">
                            {['Home-raised', 'Market'].map((opt) => (
                                <button
                                    key={opt}
                                    type="button"
                                    onClick={() => setFormData({...formData, origin: opt})}
                                    className={`flex-1 py-3 px-4 rounded-xl border transition-all ${
                                        formData.origin === opt 
                                        ? 'bg-blue-50 border-blue-200 text-blue-700 font-medium' 
                                        : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'
                                    }`}
                                >
                                    {opt}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
              </div>
            )}

            {step === 3 && (
               <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-6">
                <h2 className="text-xl font-bold text-gray-900">Media Upload</h2>
                
                <div className="space-y-4">
                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-gray-50 transition-colors">
                        <Video className="w-10 h-10 text-blue-500 mb-2" />
                        <span className="font-medium text-gray-700">Upload Video (Required)</span>
                        <span className="text-xs text-gray-400 mt-1">Show walking and milking</span>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                         <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-gray-50 transition-colors">
                            <Camera className="w-8 h-8 text-green-500 mb-2" />
                            <span className="text-sm font-medium text-gray-700">Udder Photo</span>
                        </div>
                        <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-gray-50 transition-colors">
                            <Upload className="w-8 h-8 text-gray-400 mb-2" />
                            <span className="text-sm font-medium text-gray-700">More Photos</span>
                        </div>
                    </div>
                </div>
              </div>
            )}

            {step === 4 && (
               <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-6">
                <h2 className="text-xl font-bold text-gray-900">Price & Location</h2>
                
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Expected Price (₹)</label>
                         <input 
                            type="number" 
                            name="price" 
                            value={formData.price} 
                            onChange={handleChange}
                            placeholder="₹ 50,000"
                            className="w-full p-3 rounded-xl border border-gray-200 outline-none text-lg font-semibold"
                        />
                    </div>

                     <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                        <span className="font-medium text-gray-700">Negotiable?</span>
                        <div 
                            onClick={() => handleToggle('negotiable')}
                            className={`w-12 h-6 rounded-full p-1 cursor-pointer transition-colors ${formData.negotiable ? 'bg-green-500' : 'bg-gray-300'}`}
                        >
                            <div className={`w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${formData.negotiable ? 'translate-x-6' : ''}`} />
                        </div>
                    </div>

                     <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                         <div className="flex gap-2">
                             <input 
                                type="text" 
                                name="location" 
                                value={formData.location} 
                                onChange={handleChange}
                                className="flex-1 p-3 rounded-xl border border-gray-200 outline-none"
                            />
                            <button className="p-3 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-100 transition-colors">
                                <MapPin size={20} />
                            </button>
                         </div>
                    </div>
                </div>
              </div>
            )}

            {step === 5 && (
               <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-center py-12">
                   <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                       <CheckCircle className="w-10 h-10 text-green-600" />
                   </div>
                   <h2 className="text-2xl font-bold text-gray-900 mb-2">Listing Ready!</h2>
                   <p className="text-gray-500 mb-8 max-w-sm mx-auto">
                       Your livestock has been successfully prepared for listing. It will be live after a quick review.
                   </p>
                   <button className="w-full py-4 bg-green-600 text-white rounded-xl font-bold text-lg hover:bg-green-700 transition-colors shadow-lg shadow-green-200">
                       Publish Listing
                   </button>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation Buttons */}
        {step < 5 && (
            <div className="flex gap-4 mt-8">
                {step > 1 && (
                    <button 
                        onClick={prevStep}
                        className="flex-1 py-3 px-6 rounded-xl border border-gray-200 text-gray-600 font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                    >
                        <ChevronLeft size={20} />
                        Back
                    </button>
                )}
                <button 
                    onClick={nextStep}
                    className="flex-1 py-3 px-6 rounded-xl bg-black text-white font-medium hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
                >
                    {step === 4 ? 'Preview' : 'Next'}
                    <ChevronRight size={20} />
                </button>
            </div>
        )}
      </div>
    </div>
  );
}
