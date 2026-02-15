"use client";

import { motion } from "framer-motion";

export default function ListingSkeleton() {
    return (
        <div className="glass-card overflow-hidden rounded-2xl relative">
            {/* Image Placeholder */}
            <div className="relative h-48 w-full bg-gray-200/50 animate-pulse" />

            {/* Content Placeholder */}
            <div className="p-4 space-y-3">
                {/* Title & Price */}
                <div className="flex justify-between items-start">
                    <div className="space-y-2 w-2/3">
                        <div className="h-5 bg-gray-200/50 rounded-md w-3/4 animate-pulse" />
                        <div className="h-4 bg-gray-200/30 rounded-md w-1/2 animate-pulse" />
                    </div>
                    <div className="h-6 bg-gray-200/50 rounded-md w-1/4 animate-pulse" />
                </div>

                {/* Tags */}
                <div className="flex gap-2 pt-2">
                    <div className="h-6 w-16 bg-gray-100/50 rounded-full animate-pulse" />
                    <div className="h-6 w-16 bg-gray-100/50 rounded-full animate-pulse" />
                </div>

                {/* Footer Actions */}
                <div className="grid grid-cols-2 gap-2 pt-2">
                    <div className="h-10 bg-gray-200/50 rounded-xl animate-pulse" />
                    <div className="h-10 bg-gray-200/50 rounded-xl animate-pulse" />
                </div>
            </div>
        </div>
    );
}
