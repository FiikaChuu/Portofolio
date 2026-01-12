import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
    return (
        <section id="about" className="py-20 bg-surface text-white relative overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[100px]" />

            <div className="w-full max-w-[1920px] mx-auto px-6 md:px-16 lg:px-24">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="flex flex-col md:flex-row items-center gap-16"
                >
                    {/* Image */}
                    <div className="w-full md:w-1/2">
                        <div className="relative group">
                            <div className="absolute -inset-2 bg-gradient-to-r from-primary to-secondary rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                            <div className="relative rounded-2xl overflow-hidden bg-background aspect-[4/3]">
                                <img
                                    src="/images/foto.webp"
                                    alt="Working"
                                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Text */}
                    <div className="w-full md:w-1/2">
                        <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
                            Behind the <span className="text-gradient">Screen</span>
                        </h2>
                        <p className="text-gray-400 leading-relaxed mb-6">
                            I’m a creative professional working at the intersection of graphic design and esports broadcast operations. With hands-on experience in competitive gaming environments, I understand both the creative direction and the technical flow behind live esports productions.
                        </p>
                        <p className="text-gray-400 leading-relaxed mb-8">
                            From tournament overlays and broadcast layouts to live stream scene management and team branding, I combine creative design with dependable technical execution.
                        </p>

                        <div className="grid grid-cols-2 gap-8">
                            <div>
                                <h4 className="text-2xl font-bold text-white mb-1">4+</h4>
                                <p className="text-sm text-gray-500 uppercase tracking-widest">Years Exp</p>
                            </div>
                            <div>
                                <h4 className="text-2xl font-bold text-white mb-1">2+</h4>
                                <p className="text-sm text-gray-500 uppercase tracking-widest">Years Onsite Experience</p>
                            </div>
                            <div>
                                <h4 className="text-2xl font-bold text-white mb-1">500+</h4>
                                <p className="text-sm text-gray-500 uppercase tracking-widest">Projects</p>
                            </div>
                            <div>
                                <h4 className="text-2xl font-bold text-white mb-1">10+</h4>
                                <p className="text-sm text-gray-500 uppercase tracking-widest">Offline Event</p>
                            </div>
                            <div>
                                <h4 className="text-2xl font-bold text-white mb-1">∞</h4>
                                <p className="text-sm text-gray-500 uppercase tracking-widest">Adaptation</p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default About;
