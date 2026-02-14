"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

interface PullToRefreshProps {
    children: React.ReactNode;
}

export default function PullToRefresh({ children }: PullToRefreshProps) {
    const router = useRouter();
    const [startY, setStartY] = useState(0);
    const [pullDistance, setPullDistance] = useState(0);
    const [refreshing, setRefreshing] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const threshold = 150; // Distance to pull to trigger refresh

    useEffect(() => {
        const handleTouchStart = (e: TouchEvent) => {
            if (window.scrollY === 0) {
                setStartY(e.touches[0].clientY);
            }
        };

        const handleTouchMove = (e: TouchEvent) => {
            if (window.scrollY === 0 && startY > 0) {
                const currentY = e.touches[0].clientY;
                const distance = currentY - startY;
                if (distance > 0) {
                    // Resistance effect
                    setPullDistance(Math.min(distance * 0.5, 200));
                    // Prevent default pull-to-refresh from browser if plausible
                    if (e.cancelable && distance < 200) e.preventDefault();
                }
            }
        };

        const handleTouchEnd = () => {
            if (pullDistance > threshold) {
                setRefreshing(true);
                setPullDistance(threshold); // Snap to threshold

                // Play video if not playing
                if (videoRef.current) {
                    videoRef.current.play().catch(() => { });
                    videoRef.current.currentTime = 0;
                }

                // Simulate refresh action
                setTimeout(() => {
                    router.refresh();
                    setTimeout(() => {
                        setRefreshing(false);
                        setPullDistance(0);
                    }, 1500); // 1.5s refresh duration
                }, 1000);
            } else {
                setPullDistance(0);
            }
            setStartY(0);
        };

        const element = containerRef.current;
        if (!element) return;

        element.addEventListener('touchstart', handleTouchStart, { passive: false });
        element.addEventListener('touchmove', handleTouchMove, { passive: false });
        element.addEventListener('touchend', handleTouchEnd);

        return () => {
            element.removeEventListener('touchstart', handleTouchStart);
            element.removeEventListener('touchmove', handleTouchMove);
            element.removeEventListener('touchend', handleTouchEnd);
        };
    }, [startY, pullDistance, router]);

    return (
        <div ref={containerRef} className="min-h-screen relative">
            {/* Refresh Indicator Container */}
            <div
                className="fixed top-0 left-0 right-0 z-40 flex justify-center items-start overflow-hidden pointer-events-none"
                style={{
                    height: `${pullDistance}px`,
                    opacity: pullDistance > 0 ? 1 : 0,
                    transition: refreshing ? 'height 0.3s ease-out' : 'none'
                }}
            >
                <div className="relative w-full h-[150px] bg-neutral-900 overflow-hidden shadow-xl">
                    <video
                        ref={videoRef}
                        src="/cow-refresh.mp4"
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover object-bottom opacity-90"
                    />
                    <div className="absolute inset-0 bg-black/20" />
                    <div className="absolute bottom-2 w-full text-center text-white/90 text-xs font-bold uppercase tracking-widest drop-shadow-md">
                        {refreshing ? "Refreshing..." : "Pull to Refresh"}
                    </div>
                </div>
            </div>

            {/* Content with transform */}
            <div
                style={{
                    transform: `translateY(${pullDistance}px)`,
                    transition: refreshing ? 'transform 0.3s ease-out' : 'transform 0.1s ease-out'
                }}
            >
                {children}
            </div>
        </div>
    );
}
