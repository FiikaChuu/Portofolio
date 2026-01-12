import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

const Welcome = ({ onEnter }) => {
    return (
        <motion.div
            className="fixed inset-0 z-[60] bg-background flex flex-col items-center justify-center overflow-hidden"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
        >
            {/* Background Ambience */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[100px] animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />

            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1 }}
                className="relative z-10 text-center px-6"
            >
                {/* Profile Image with Glow */}
                <div className="mb-8 relative inline-block">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-full blur-md opacity-50 animate-pulse"></div>
                    <img
                        src="/images/profile-hero.png"
                        alt="Profile"
                        className="relative w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-2 border-white/20"
                    />
                </div>

                <motion.h1
                    className="text-4xl md:text-6xl font-display font-bold text-white mb-2 tracking-tight"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                >
                    Muhammad Afzal
                </motion.h1>

                <motion.h2
                    className="text-xl md:text-2xl text-white/80 mb-4 font-medium"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                >
                    FiikaChuuu.
                </motion.h2>

                <motion.p
                    className="text-lg md:text-xl text-gray-400 mb-12 tracking-wide font-light"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                >
                    Creative Designer <span className="text-primary mx-2">&bull;</span> Esports Operator
                </motion.p>

                <motion.button
                    onClick={onEnter}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="group relative px-8 py-4 bg-transparent border border-white/20 rounded-full text-white font-medium overflow-hidden transition-all hover:border-primary/50 hover:shadow-[0_0_20px_rgba(0,242,234,0.3)]"
                >
                    <div className="absolute inset-0 w-full h-full bg-surface/50 group-hover:bg-primary/10 transition-colors"></div>
                    <span className="relative flex items-center gap-2">
                        ENTER PORTFOLIO
                        <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                </motion.button>
            </motion.div>

            {/* Loading Bar Effect */}
            <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 2, ease: "circOut" }}
                className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-primary to-secondary"
            />
        </motion.div>
    );
};

export default Welcome;
