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
        <section id="projects" className="mx-auto max-w-[1120px] bg-black px-6 py-24 md:px-10 md:py-36">
            <motion.div
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-100px" }}
                variants={containerVariants}
            >
                <motion.div variants={itemVariants} className="mb-16">
                    <h2 className="text-4xl font-extrabold leading-tight tracking-tight text-white md:text-6xl">
                        Projects
                    </h2>
                </motion.div>

                <div className="flex flex-col">
                    {experiences.map((exp) => (
                        <MotionLink
                            key={exp.id}
                            href={`/projects/${exp.slug}`}
                            variants={itemVariants}
                            className="group grid cursor-pointer gap-5 border-t border-white/10 py-9 transition-colors duration-500 hover:bg-white/[0.025] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-300/40 md:grid-cols-[minmax(0,1fr)_180px] md:items-center md:px-5"
                        >
                            <div>
                                <h3 className="text-2xl font-light text-gray-400 transition-colors duration-500 group-hover:text-white md:text-3xl">
                                    {exp.title}
                                </h3>
                            </div>
                            <div className="flex items-center gap-5 md:justify-end">
                                <span className="text-sm font-light uppercase tracking-widest text-gray-600 md:text-base">
                                    {exp.date}
                                </span>
                                <span className="text-gray-600 transition-all duration-500 group-hover:translate-x-1 group-hover:text-blue-300" aria-hidden="true">
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
