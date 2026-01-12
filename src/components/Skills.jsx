import React from 'react';
import { motion } from 'framer-motion';
import { PenTool, Monitor, Video, Layout, Camera, Film } from 'lucide-react';

const SkillCard = ({ icon: Icon, title, desc, delay }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay, duration: 0.5 }}
        className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-primary/50 hover:bg-white/10 transition-all group"
    >
        <div className="w-12 h-12 rounded-lg bg-background flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Icon className="text-primary" size={24} />
        </div>
        <h3 className="text-xl font-bold font-display mb-2">{title}</h3>
        <p className="text-gray-400 text-sm">{desc}</p>
    </motion.div>
);

const Skills = () => {
    const skills = [
        { icon: PenTool, title: "Expert Graphic Designer", desc: "Figma, Affinity by Canva, Adobe Photoshop" },
        // { icon: Layout, title: "UI/UX Design", desc: "Figma, Web Layouts, Stream Overlays, Interaction Design" },
        { icon: Film, title: "Junior Video Editor", desc: "Capcut" },
        { icon: Monitor, title: "Broadcast Operator", desc: "OBS, vMix, Scene Management, Transition Logic" },
        { icon: Video, title: "Match Display", desc: "In-Game Directing, Live Scoreboard Management" },
        { icon: Camera, title: "Photographer", desc: "Event Photography, Portrait, Editing" },
    ];

    return (
        <section id="skills" className="py-20 bg-background relative">
            <div className="w-full max-w-[1920px] mx-auto px-6 md:px-16 lg:px-24">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-4xl font-display font-bold mb-4"
                    >
                        My <span className="text-gradient">Arsenal</span>
                    </motion.h2>
                    <p className="text-gray-400 max-w-xl mx-auto">
                        Tools and technologies I use to craft impactful visual designs and seamless esports broadcast.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {skills.map((skill, index) => (
                        <SkillCard key={index} {...skill} delay={index * 0.1} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skills;
