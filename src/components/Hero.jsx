import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Instagram, Mail, Gamepad2 } from 'lucide-react';

const Hero = () => {
    return (
        <section id="hero" className="relative min-h-screen flex items-center bg-background overflow-hidden">

            {/* Aesthetic Background: Stars & Glowing Lines (Line-Glow-Star) */}
            {/* Z-Index 0: Lowest layer */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
                {/* Stars */}
                {[...Array(30)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute bg-white rounded-full"
                        style={{
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            width: `${Math.random() * 2 + 1}px`,
                            height: `${Math.random() * 2 + 1}px`,
                            opacity: Math.random() * 0.5 + 0.1,
                            boxShadow: `0 0 ${Math.random() * 10 + 5}px rgba(255, 255, 255, 0.5)`
                        }}
                        animate={{
                            opacity: [0.2, 0.8, 0.2],
                            scale: [1, 1.2, 1],
                        }}
                        transition={{
                            duration: Math.random() * 3 + 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: Math.random() * 5
                        }}
                    />
                ))}

                {/* Shooting Glow Lines - Restricted to Top/Bottom Dark Zones */}
                {[...Array(6)].map((_, i) => {
                    // Randomly decide if line is in Top zone (0-30%) or Bottom zone (70% - 100%)
                    const isTopZone = Math.random() < 0.5;
                    const topPos = isTopZone
                        ? Math.random() * 30
                        : Math.random() * 30 + 70;

                    return (
                        <motion.div
                            key={`line-${i}`}
                            className="absolute w-[200px] h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent"
                            style={{
                                top: `${topPos}%`,
                                left: '-20%',
                                boxShadow: '0 0 10px var(--color-primary)'
                            }}
                            animate={{
                                x: ['-20vw', '120vw'],
                                width: ['100px', '300px', '100px'],
                                opacity: [0, 0.8, 0]
                            }}
                            transition={{
                                duration: Math.random() * 7 + 5,
                                repeat: Infinity,
                                ease: "linear",
                                delay: Math.random() * 5
                            }}
                        />
                    );
                })}
            </div>

            {/* Right Side - Full Height Image with Slant */}
            {/* Z-Index 5: Above stars, but below text */}
            <div className="absolute top-0 right-0 w-full md:w-[60%] h-full z-10 md:z-5">
                <div
                    className="absolute inset-0 bg-gray-900"
                    style={{
                        clipPath: 'polygon(20% 0, 100% 0, 100% 100%, 0% 100%)'
                    }}
                >
                    {/* The Image (Static) */}
                    <img
                        src="images/PROFIL.png"
                        alt="Profile Background"
                        className="w-full h-full object-cover opacity-60"
                        style={{ objectPosition: 'center 20%' }}
                    />

                    {/* Elegant Transparent/Glass Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-transparent opacity-90" />
                    <div className="absolute inset-0 bg-primary/10 mix-blend-overlay" />
                </div>

                {/* SVG Overlay for DIAGONAL Line Only */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none z-20">
                    <defs>
                        {/* Gradient definition for smooth fade-in/out effect */}
                        <linearGradient id="runningGlow" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#00f2ea" stopOpacity="0" />
                            <stop offset="50%" stopColor="#00f2ea" stopOpacity="1" />
                            <stop offset="100%" stopColor="#00f2ea" stopOpacity="0" />
                        </linearGradient>
                    </defs>

                    {/* 1. Diagonal Running Glow Line */}
                    {/* Updated to connect seamlessly with bottom line */}
                    <motion.line
                        x1="20%" y1="0"
                        x2="0%" y2="99.8%" // Ends exactly slightly above absolute bottom to match line width
                        stroke="url(#runningGlow)" // Use gradient for smoother appearance
                        strokeWidth="3"
                        strokeLinecap="round"
                        initial={{ pathLength: 0.3, pathOffset: 0, opacity: 0 }}
                        animate={{
                            pathOffset: [0, 1], // Moves down
                            opacity: [0, 1, 1, 0.5], // Fades in smoothly, stays visible until merge
                        }}
                        transition={{
                            duration: 3.5,
                            repeat: Infinity,
                            ease: "easeInOut", // Smoother easing
                            repeatDelay: 0
                        }}
                        style={{
                            filter: "drop-shadow(0 0 5px rgba(0, 242, 234, 0.8))"
                        }}
                    />
                </svg>
            </div>

            {/* FULL WIDTH Bottom Static Glow Line */}
            {/* Placed at Section Level to span 100% width (Left Dark Side -> Right Image Side) */}
            <div className="absolute bottom-0 left-0 w-full h-[2px] z-20">
                <div className="w-full h-full bg-[#00f2ea] opacity-80 shadow-[0_0_8px_rgba(0,242,234,0.8)]" />
            </div>

            {/* Text Content */}
            {/* Z-Index 10: Highest priority for interactivity and readability */}
            <div className="w-full max-w-[1920px] mx-auto px-6 md:px-16 lg:px-24 pt-20 relative z-20 flex items-center h-full">
                <div className="w-full md:w-1/2">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <span className="inline-block py-1 px-3 rounded-full border border-white/10 bg-white/5 text-primary text-xs tracking-widest font-bold mb-3 uppercase">
                            Creative Professional
                        </span>
                        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                            Hi, I'm <span className="text-primary">Muhammad Afzal</span>
                        </h2>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-5xl md:text-7xl font-display font-bold leading-[1.1] mb-6"
                    >
                        Graphic Designer <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-white to-secondary">
                            & Esport Operator
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-gray-400 text-lg md:text-xl mb-8 max-w-lg"
                    >
                        Creating impactful graphic design and seamless broadcast experiences for the competitive esports world.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="flex flex-col sm:flex-row items-center gap-4 mb-12"
                    >
                        <a href="#portfolio" className="group px-8 py-4 bg-white text-black font-bold rounded-full flex items-center gap-2 hover:bg-gray-200 transition-colors">
                            View Work
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </a>
                        <a href="#contact" className="px-8 py-4 border border-white/20 rounded-full hover:bg-white/5 transition-colors text-white font-medium">
                            Contact Me
                        </a>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                        className="flex space-x-6 text-gray-500"
                    >
                        <a href="https://www.instagram.com/_.adulll38?igsh=cDhnbWRvbGRoaDZ4&utm_source=qr" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                            <Instagram className="w-6 h-6" strokeWidth={1.5} />
                        </a>
                        <a href="mailto:afdalmhd38@gmail.com" className="hover:text-primary transition-colors">
                            <Mail className="w-6 h-6" strokeWidth={1.5} />
                        </a>
                        <a href="https://discord.com/users/630712548098048006" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="w-6 h-6" viewBox="0 0 16 16">
                                <path d="M13.545 2.907a13.2 13.2 0 0 0-3.257-1.011.05.05 0 0 0-.052.025c-.141.25-.297.577-.406.833a12.2 12.2 0 0 0-3.658 0 8 8 0 0 0-.412-.833.05.05 0 0 0-.052-.025c-1.125.194-2.22.534-3.257 1.011a.04.04 0 0 0-.021.018C.356 6.024-.213 9.047.066 12.032q.003.022.021.037a13.3 13.3 0 0 0 3.995 2.02.05.05 0 0 0 .056-.019q.463-.63.818-1.329a.05.05 0 0 0-.01-.059l-.018-.011a9 9 0 0 1-1.248-.595.05.05 0 0 1-.02-.066l.015-.019q.127-.095.248-.195a.05.05 0 0 1 .051-.007c2.619 1.196 5.454 1.196 8.041 0a.05.05 0 0 1 .053.007q.121.1.248.195a.05.05 0 0 1-.004.085 8 8 0 0 1-1.249.594.05.05 0 0 0-.03.03.05.05 0 0 0 .003.041c.24.465.515.909.817 1.329a.05.05 0 0 0 .056.019 13.2 13.2 0 0 0 4.001-2.02.05.05 0 0 0 .021-.037c.334-3.451-.559-6.449-2.366-9.106a.03.03 0 0 0-.02-.019m-8.198 7.307c-.789 0-1.438-.724-1.438-1.612s.637-1.613 1.438-1.613c.807 0 1.45.73 1.438 1.613 0 .888-.637 1.612-1.438 1.612m5.316 0c-.788 0-1.438-.724-1.438-1.612s.637-1.613 1.438-1.613c.807 0 1.451.73 1.438 1.613 0 .888-.631 1.612-1.438 1.612" />
                            </svg>
                        </a>
                    </motion.div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/20"
            >
                <div className="w-[1px] h-12 bg-gradient-to-b from-transparent via-white/50 to-transparent"></div>
            </motion.div>
        </section>
    );
};

export default Hero;
