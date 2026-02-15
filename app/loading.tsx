import { Loader2 } from "lucide-react";

export default function Loading() {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/60 backdrop-blur-md">
            <div className="flex flex-col items-center gap-4">
                <div className="relative">
                    <div className="w-12 h-12 rounded-xl bg-emerald-100 animate-ping opacity-75 absolute inset-0" />
                    <div className="relative w-12 h-12 bg-white rounded-xl shadow-xl flex items-center justify-center border border-emerald-100">
                        <Loader2 className="w-6 h-6 text-emerald-600 animate-spin" />
                    </div>
                </div>
                <p className="text-emerald-800 font-bold text-sm tracking-wide animate-pulse">Loading...</p>
            </div>
        </div>
    );
}
