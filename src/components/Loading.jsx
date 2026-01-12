import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import RippleGrid from './RippleGrid';

// --- KONFIGURASI WARNA (UBAH DISINI) ---
// Ganti kode hex di bawah ini untuk mengubah tema warna
const THEME = {
    background: '#051005',  // Latar Belakang (Contoh: Hitam Hijau)
    grid: '#266368',        // Warna Garis Gelombang Matrix
    text: '#58fff7',        // Warna Teks Utama & Angka (Neon Green)
    barPrimary: '#004244',  // Warna Tengah Loading Bar
    barSecondary: '#007474' // Warna Ujung Loading Bar (Lebih Gelap)
};

// Actual images to preload to simulate real "content loading"
const IMAGE_ASSETS = [
    '/images/profile-hero.webp',
    '/images/foto.webp',
    '/images/PROFIL.webp',
];

const Loading = ({ onComplete }) => {
    const [progress, setProgress] = useState(0);
    const [statusText, setStatusText] = useState('INITIALIZING...');
    const totalAssets = IMAGE_ASSETS.length;
    const loadedCount = useRef(0);

    useEffect(() => {
        let isMounted = true;

        const loadAsset = (src) => {
            return new Promise((resolve) => {
                const img = new Image();
                img.src = src;
                img.onload = () => resolve(src);
                img.onerror = () => {
                    console.warn(`Failed to track load: ${src}`);
                    resolve(src);
                };
            });
        };

        const runPreloader = async () => {
            if (totalAssets === 0) {
                if (isMounted) setProgress(100);
                return;
            }

            // Map assets to promises
            const promises = IMAGE_ASSETS.map(async (src) => {
                await loadAsset(src);
                if (!isMounted) return;

                loadedCount.current += 1;
                const currentProgress = Math.floor((loadedCount.current / totalAssets) * 100);

                // Update state heavily based on real progress
                setProgress(curr => Math.max(curr, currentProgress));
                setStatusText(`LOADING ${src.split('/').pop().toUpperCase()}...`);
            });

            await Promise.all(promises);

            if (isMounted) {
                setProgress(100);
                setStatusText('READY.');

                // Add a small buffer so the user sees "100%" before exit
                setTimeout(() => {
                    if (onComplete) onComplete();
                }, 800);
            }
        };

        runPreloader();

        return () => {
            isMounted = false;
        };
    }, [onComplete, totalAssets]);

    return (
        <motion.div
            className="fixed inset-0 z-[70] flex flex-col items-center justify-center overflow-hidden"
            style={{ backgroundColor: THEME.background }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
        >
            {/* Background: RippleGrid (Green Theme, Scaled Down) */}
            <div className="absolute inset-0 z-0">
                <RippleGrid
                    gridColor={THEME.grid} // Menggunakan warna dari konfigurasi THEME
                    rippleIntensity={1.0}
                    gridSize={25} // Scale 50%
                    gridThickness={0.5}
                    mouseInteractionRadius={0.6}
                    opacity={0.4}
                    enableRainbow={false}
                />
            </div>

            {/* Content Overlay */}
            <div className="relative z-10 w-80 md:w-[40rem] text-center flex flex-col items-center justify-center h-full">

                {/* Status Text */}
                <div className="mb-6">
                    <p
                        className="text-3xl md:text-5xl font-bold mb-2 tracking-tight font-display uppercase animate-pulse drop-shadow-lg"
                        style={{ color: THEME.text }}
                    >
                        {statusText}
                    </p>
                </div>

                {/* Progress Bar Container */}
                <div
                    className="w-full h-2 rounded-full overflow-hidden backdrop-blur-md border max-w-lg"
                    style={{
                        backgroundColor: `${THEME.text}10`, // ~6% opacity of theme color (Ganti White/5)
                        borderColor: `${THEME.text}20`,     // ~12% opacity of theme color (Ganti White/5)
                        boxShadow: `0 0 20px ${THEME.text}20` // Subtle glow matching theme
                    }}
                >
                    {/* Moving Bar */}
                    <motion.div
                        className="h-full"
                        style={{
                            background: `linear-gradient(90deg, ${THEME.barSecondary}, ${THEME.barPrimary}, ${THEME.barSecondary})`
                        }}
                        animate={{ width: `${progress}%` }}
                        transition={{ ease: "linear", duration: 0.2 }}
                    />
                </div>

                {/* Percentage */}
                <div className="mt-4 text-center">
                    <span
                        className="text-lg font-bold font-display tracking-widest"
                        style={{ color: THEME.text, opacity: 0.8 }}
                    >
                        {progress}%
                    </span>
                </div>
            </div>
        </motion.div>
    );
};

export default Loading;
