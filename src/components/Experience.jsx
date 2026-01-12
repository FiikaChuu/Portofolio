import React from 'react';
import { motion } from 'framer-motion';

const ExperienceItem = ({ role, company, period, desc, index }) => (
    <motion.div
        initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className={`flex flex-col md:flex-row gap-4 justify-between items-start md:items-center p-6 border-l-2 border-white/10 ml-4 md:ml-0 md:border-none relative
    ${index % 2 === 0 ? 'md:flex-row-reverse md:text-right' : ''}`}
    >
        {/* Timeline Dot (Desktop) */}
        <div className="hidden md:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-primary rounded-full shadow-[0_0_10px_#00f2ea]"></div>

        <div className="w-full md:w-[45%]">
            <div className="bg-surface p-6 rounded-xl border border-white/5 hover:border-primary/30 transition-colors">
                <span className="text-primary text-sm font-bold tracking-wider mb-2 block">{period}</span>
                <h3 className="text-xl font-bold text-white mb-1">{role}</h3>
                <h4 className="text-gray-400 text-sm mb-4">{company}</h4>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
            </div>
        </div>

        <div className="w-full md:w-[45%]"></div>
    </motion.div>
);

const Experience = () => {
    const experiences = [
        {
            role: "Graphic Designer",
            company: "Freelance",
            period: "2020 - Present",
            desc: "Creating visual identity projects for gaming communities, local brands, and creative communities through social media assets, logos, and jersey or merchandise designs."
        },
        {
            role: "Esport Event Crew & Marketing",
            company: "Event Crew",
            period: "2023 - Present",
            desc: "Organized tournaments and marketing campaigns, while handling on-site technical operations as an operator, including scene management and graphic design, experienced in multiple national-level events at Royal Plaza Surabaya."
        },
        {
            role: "Graphic & Video Editor",
            company: "Movora & FotoRek!",
            period: "2025 - Present",
            desc: "Handling full editing processes for graphic and video content used in photo booth and sports events, including layout design, video editing, motion elements, and final asset preparation to ensure consistent branding and event-ready visuals."
        }
    ];

    return (
        <section id="experience" className="py-20 bg-surface relative">
            <div className="container mx-auto px-6">
                <div className="text-center mb-20">
                    <h2 className="text-4xl font-display font-bold mb-4">Journey</h2>
                    <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto"></div>
                </div>

                <div className="relative max-w-4xl mx-auto">
                    {/* Vertical Line */}
                    <div className="absolute left-[17px] md:left-1/2 top-0 bottom-0 w-0.5 bg-white/10 -translate-x-1/2"></div>

                    <div className="space-y-12">
                        {experiences.map((exp, index) => (
                            <ExperienceItem key={index} {...exp} index={index} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Experience;
