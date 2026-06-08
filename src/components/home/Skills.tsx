'use client';

import { motion } from 'framer-motion';

const skills = ['Spring Boot', 'Django', 'React', 'Vue'];

export default function Skills() {
    return (
        <section className="mx-auto max-w-6xl bg-black px-6 py-32">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col items-center text-center"
            >
                <p className="mb-5 text-xs font-bold uppercase tracking-[0.32em] text-gray-500">Stack</p>
                <h2 className="mb-16 text-4xl font-extrabold tracking-tight text-white md:text-6xl">Core Technologies</h2>
                <div className="flex flex-wrap justify-center gap-3 md:gap-4">
                    {skills.map((skill, index) => (
                        <div 
                            key={index} 
                            className="rounded-full border border-white/10 bg-white/[0.03] px-7 py-4 text-lg font-light text-gray-200 backdrop-blur-md md:text-xl"
                        >
                            {skill}
                        </div>
                    ))}
                </div>
            </motion.div>
        </section>
    );
}
