import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import LiquidEther from './LiquidEther';
import StarBorder from './StarBorder';

const Welcome = ({ onEnter, isPreloading }) => {
    return (
        <motion.div
            className="fixed inset-0 z-[60] bg-background flex flex-col items-center justify-center overflow-hidden"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
        >
            {/* Background Ambience - Liquid Fluid Simulation */}
            <div className="absolute inset-0 z-0">
                <LiquidEther
                    colors={['#5227FF', '#FF00CC', '#BD00FF']}
                    mouseForce={20}
                    cursorSize={100}
                    isViscous={false}
                    viscous={30}
                    iterationsViscous={32}
                    iterationsPoisson={32}
                    resolution={0.5}
                    isBounce={false}
                    autoDemo={true}
                    autoSpeed={0.5}
                    autoIntensity={2.2}
                    takeoverDuration={0.25}
                    autoResumeDelay={3000}
                    autoRampDuration={0.6}
                />
            </div>

            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1 }}
                className="relative z-10 text-center px-6"
            >
                {/* Profile Image with Rotating Glow & Pop Effect */}
                <motion.div
                    className="mb-8 relative inline-block cursor-pointer"
                    whileHover="hover"
                    initial="rest"
                    whileTap={{ scale: 0.95 }}
                >
                    {/* Moving/Rotating Glow */}
                    <motion.div
                        className="absolute -inset-1 rounded-full bg-gradient-to-r from-primary via-secondary to-primary blur-md opacity-70"
                        variants={{
                            rest: { rotate: 0, scale: 1 },
                            hover: {
                                rotate: 360,
                                scale: 1.4,
                                transition: {
                                    rotate: { duration: 2, repeat: Infinity, ease: "linear" },
                                    scale: { duration: 0.3 }
                                }
                            }
                        }}
                    />

                    <motion.img
                        src="/images/profile-hero.webp"
                        alt="Profile"
                        className="relative w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-2 border-white/20 shadow-2xl z-10"
                        variants={{
                            rest: { scale: 1 },
                            hover: { scale: 1.3, transition: { type: "spring", stiffness: 300 } }
                        }}
                    />
                </motion.div>

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

                <div onClick={onEnter} className="cursor-pointer inline-block">
                    <StarBorder
                        as="button"
                        className="custom-class"
                        color="#00f2ea"
                        speed="4s"
                    >
                        <span className="relative flex items-center gap-2 px-8 py-3 z-10 font-bold tracking-wider group">
                            ENTER PORTFOLIO
                            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </span>
                    </StarBorder>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default Welcome;
