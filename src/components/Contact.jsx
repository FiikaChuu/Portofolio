import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Mail, Instagram, ArrowRight } from 'lucide-react';

// Automatically import all images from src/assets/portfolio
const portfolioModules = import.meta.glob('/src/assets/PORTOFOLIO/*.{png,jpg,jpeg,svg,webp}', { eager: true, as: 'url' });
const portfolioImages = Object.values(portfolioModules);

const MARQUEE_DURATION = 60;

// Component for each column
const MarqueeColumn = ({ images = [], duration = 60, reverse = false }) => {
    // Safety check
    if (!images || images.length === 0) return <div className="w-[10%]"></div>;

    return (
        <motion.div
            initial={{ y: reverse ? "-50%" : "0%" }}
            animate={{
                y: reverse ? "0%" : "-50%"
            }}
            transition={{
                duration: duration,
                repeat: Infinity,
                ease: "linear"
            }}
            className="flex flex-col w-[10%] gap-4"
        >
            {/* Duplicating images for smooth loop/density */}
            {[...images, ...images].map((src, i) => (
                <img loading="lazy" key={i} src={src} className="w-full h-auto rounded-xl object-cover shadow-lg" alt="Portfolio" />
            ))}
        </motion.div>
    );
};

const Contact = () => {
    // Logic: Distribute Real Images uniquely. If not enough, repeat the LAST image to fill gaps.
    const chunks = useMemo(() => {
        let realImages = [...portfolioImages];

        // 1. Shuffle ONLY the real images first
        // This ensures the order is random, but we don't mix in the padding yet.
        const shuffledReal = realImages.map(value => ({ value, sort: Math.random() }))
            .sort((a, b) => a.sort - b.sort)
            .map(({ value }) => value);

        // Target: 8 columns with reasonable height (e.g., 4 images per column = 32 images minimum)
        const minImages = 32;
        let finalImages = [...shuffledReal];

        if (finalImages.length < minImages && finalImages.length > 0) {
            // Use the last image from the real set as the filler
            const lastImage = finalImages[finalImages.length - 1];
            const missingCount = minImages - finalImages.length;
            const padding = new Array(missingCount).fill(lastImage);

            // Append padding to the END. Do NOT shuffle again.
            // This clusters all duplicates at the end of the list.
            finalImages = [...finalImages, ...padding];
        } else if (finalImages.length === 0) {
            return Array.from({ length: 8 }, () => []);
        }

        // Split into 8 chunks
        const cols = 8;
        const result = [];
        const itemsPerCol = Math.ceil(finalImages.length / cols);

        for (let i = 0; i < cols; i++) {
            result.push(finalImages.slice(i * itemsPerCol, (i + 1) * itemsPerCol));
        }
        return result;
    }, []);

    return (
        <section id="contact" className="relative min-h-screen bg-surface flex items-center overflow-hidden">
            {/* Right Side - Diagonal Scrolling Images */}
            <div className="absolute top-0 right-0 w-full md:w-[60%] h-full z-0 overflow-hidden">
                <div className="absolute inset-0 bg-background/20 z-10" />
                <div className="absolute inset-0 bg-gradient-to-r from-surface via-surface/80 to-transparent z-20" />

                {/* Rotated Container */}
                <div className="w-[150%] h-[150%] -translate-y-[25%] -translate-x-[25%] rotate-[-15deg] md:rotate-[15deg] opacity-50 flex gap-4 justify-center">
                    {chunks.map((chunk, i) => (
                        <MarqueeColumn
                            key={i}
                            images={chunk}
                            duration={MARQUEE_DURATION}
                            reverse={i % 2 !== 0} // Alternate reverse
                        />
                    ))}
                </div>
            </div>

            <div className="w-full px-6 md:px-12 lg:px-20 relative z-30 pt-32 pb-10 min-h-screen flex flex-col justify-between">
                <div className="md:w-1/2 my-auto">
                    <h2 className="text-5xl md:text-7xl font-display font-bold mb-8 leading-tight">
                        Let's Create & <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-primary">Compete.</span>
                    </h2>
                    <p className="text-gray-400 text-xl max-w-md mb-12">
                        Open for freelance projects, tournament operations, and creative collaborations. Ready to elevate your game?
                    </p>

                    <a
                        href="mailto:afdalmhd38@gmail.com"
                        className="group inline-flex items-center gap-3 px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-primary hover:scale-105 transition-all w-fit"
                    >
                        <Mail size={20} />
                        Start a Project
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </a>

                    <div className="flex gap-6 mt-8">
                        <a href="https://www.instagram.com/_.adulll38?igsh=cDhnbWRvbGRoaDZ4&utm_source=qr" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary transition-colors">
                            <Instagram size={32} strokeWidth={1.5} />
                        </a>
                        <a href="https://discord.com/users/630712548098048006" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 16 16">
                                <path d="M13.545 2.907a13.2 13.2 0 0 0-3.257-1.011.05.05 0 0 0-.052.025c-.141.25-.297.577-.406.833a12.2 12.2 0 0 0-3.658 0 8 8 0 0 0-.412-.833.05.05 0 0 0-.052-.025c-1.125.194-2.22.534-3.257 1.011a.04.04 0 0 0-.021.018C.356 6.024-.213 9.047.066 12.032q.003.022.021.037a13.3 13.3 0 0 0 3.995 2.02.05.05 0 0 0 .056-.019q.463-.63.818-1.329a.05.05 0 0 0-.01-.059l-.018-.011a9 9 0 0 1-1.248-.595.05.05 0 0 1-.02-.066l.015-.019q.127-.095.248-.195a.05.05 0 0 1 .051-.007c2.619 1.196 5.454 1.196 8.041 0a.05.05 0 0 1 .053.007q.121.1.248.195a.05.05 0 0 1-.004.085 8 8 0 0 1-1.249.594.05.05 0 0 0-.03.03.05.05 0 0 0 .003.041c.24.465.515.909.817 1.329a.05.05 0 0 0 .056.019 13.2 13.2 0 0 0 4.001-2.02.05.05 0 0 0 .021-.037c.334-3.451-.559-6.449-2.366-9.106a.03.03 0 0 0-.02-.019m-8.198 7.307c-.789 0-1.438-.724-1.438-1.612s.637-1.613 1.438-1.613c.807 0 1.45.73 1.438 1.613 0 .888-.637 1.612-1.438 1.612m5.316 0c-.788 0-1.438-.724-1.438-1.612s.637-1.613 1.438-1.613c.807 0 1.451.73 1.438 1.613 0 .888-.631 1.612-1.438 1.612" />
                            </svg>
                        </a>
                    </div>
                </div>

                <div className="w-full border-t border-white/10 pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                        {/* Social Icons - Bottom Left */}
                        <p className="text-xl font-display font-medium text-white">Lets Start With FiikaChuuu</p>

                        <div className="text-gray-500 text-sm">
                            <p>© 2025 FiikaChuuu Portofolio. All Rights Reserved.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
