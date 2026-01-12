import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

const InternalProjectGrid = React.memo(({ items, isActive }) => {
    // PRE-CALCULATION:
    // Distribute items into columns only once when items change
    const { desktopCols, mobileCols } = useMemo(() => {
        if (!items || items.length === 0) return { desktopCols: [], mobileCols: [] };

        const getColumns = (colCount) => {
            const cols = Array.from({ length: colCount }, () => []);
            items.forEach((item, i) => {
                cols[i % colCount].push(item);
            });
            return cols;
        };

        return {
            desktopCols: getColumns(3),
            mobileCols: getColumns(2)
        };
    }, [items]);

    if (!items || items.length === 0) return null;

    // RENDER HELPER
    const renderColumn = (colItems, colIndex) => {
        // OPTIMIZATION: Reduced repetition from 4x to 3x.
        const repeatedItems = [...colItems, ...colItems, ...colItems];

        // PURE CSS ANIMATION for smoother CPU usage
        // We use inline styles to set strictly distinct speeds without re-renders
        const duration = 30 + (colIndex * 5) + 's';

        return (
            <div key={colIndex} className="flex-1 overflow-hidden relative h-[150%] -mt-[25%]">

                <div
                    className="flex flex-col gap-4 transform-gpu will-change-transform"
                    style={{
                        animation: `scrollUp ${duration} linear infinite`,
                        animationPlayState: isActive ? 'running' : 'paused',
                        backfaceVisibility: 'hidden',
                        WebkitBackfaceVisibility: 'hidden'
                    }}
                >
                    {repeatedItems.map((item, idx) => (
                        <div key={idx} className="w-full rounded-lg overflow-hidden relative shadow-sm bg-gray-800">
                            {item.type === 'video' ? (
                                <SmartVideo src={item.src} isActive={isActive} />
                            ) : (
                                <img loading="lazy"
                                    src={item.src}
                                    alt=""
                                    className="w-full h-auto block object-cover pointer-events-none"
                                    decoding="async"
                                />
                            )}
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    return (
        <div className="absolute inset-0 z-0 bg-gray-950 overflow-hidden flex items-center justify-center">
            {/* GLOBAL KEYFRAME DEFINITION FOR THIS COMPONENT */}
            <style>
                {`
                @keyframes scrollUp {
                    from { transform: translateY(0); }
                    to { transform: translateY(-33.333%); }
                }
                `}
            </style>
            <motion.div
                className="w-[150%] h-[150%] flex justify-center items-center"
                style={{
                    rotate: "15deg",
                    scale: 1.7
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
            >
                <div className="flex justify-center w-full h-full">
                    {/* Desktop View (3 Cols) */}
                    <div className="hidden md:flex gap-4 w-full px-4 h-full">
                        {desktopCols.map((colItems, i) => renderColumn(colItems, i))}
                    </div>

                    {/* Mobile View (2 Cols) */}
                    <div className="flex md:hidden gap-4 w-full px-4 h-full">
                        {mobileCols.map((colItems, i) => renderColumn(colItems, i))}
                    </div>
                </div>
            </motion.div>
        </div>
    );
});

// SMART VIDEO COMPONENT
// Handles IntersectionObserver to only play video when in viewport
const SmartVideo = React.memo(({ src, isActive }) => {
    const videoRef = React.useRef(null);
    const [isLoaded, setIsLoaded] = React.useState(false);

    React.useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        // If not active (not hovered), force pause immediately to save resources
        if (!isActive) {
            video.pause();
            return;
        }

        // If active, use IntersectionObserver to play only when in view (double optimization)
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && isActive) {
                        video.play().catch(() => { });
                    } else {
                        video.pause();
                    }
                });
            },
            { threshold: 0.1 }
        );

        observer.observe(video);

        return () => {
            if (video) observer.unobserve(video);
        };
    }, [isActive]);

    return (
        <video
            ref={videoRef}
            src={src}
            className={`w-full h-auto block object-cover pointer-events-none transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
            loop
            muted
            playsInline
            preload="metadata"
            onLoadedData={() => setIsLoaded(true)}
            style={{ backfaceVisibility: 'hidden' }}
        />
    );
});
SmartVideo.displayName = 'SmartVideo';

InternalProjectGrid.displayName = 'InternalProjectGrid';

export default InternalProjectGrid;
