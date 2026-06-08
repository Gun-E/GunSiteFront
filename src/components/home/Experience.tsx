'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { experiences } from '@/data/experiences';

const MotionLink = motion(Link);

const containerVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.15 }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const } }
};

export default function Experience() {
    return (
        <section id="projects" className="py-32 px-6 bg-black max-w-5xl mx-auto">
            <motion.div
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-100px" }}
                variants={containerVariants}
            >
                <motion.h2 variants={itemVariants} className="text-3xl md:text-5xl font-bold mb-20 tracking-tight text-white">
                    Selected Projects & History
                </motion.h2>

                <div className="flex flex-col">
                    {experiences.map((exp) => (
                        <MotionLink
                            key={exp.id}
                            href={`/projects/${exp.slug}`}
                            variants={itemVariants}
                            className="group flex flex-col md:flex-row justify-between items-start md:items-center py-10 border-t border-white/10 first:border-t-0 hover:bg-white/[0.02] transition-colors duration-500 rounded-2xl px-6 -mx-6 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
                        >
                            <div>
                                <span className="text-xs text-gray-600 tracking-[0.3em] uppercase">
                                    {exp.category}
                                </span>
                                <h3 className="mt-3 text-2xl md:text-3xl font-medium text-gray-400 group-hover:text-white transition-colors duration-500">
                                    {exp.title}
                                </h3>
                            </div>
                            <div className="flex items-center gap-5 mt-4 md:mt-0">
                                <span className="text-sm md:text-base text-gray-600 font-light tracking-widest uppercase">
                                    {exp.date}
                                </span>
                                <span className="text-gray-600 group-hover:text-white group-hover:translate-x-1 transition-all duration-500" aria-hidden="true">
                                    →
                                </span>
                            </div>
                        </MotionLink>
                    ))}
                </div>
            </motion.div>
        </section>
    );
}
