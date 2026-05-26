'use client';

import { motion } from 'framer-motion';

const skills = ['Spring Boot', 'Django', 'React', 'Vue'];

export default function Skills() {
    return (
        <section className="py-32 px-6 bg-black max-w-6xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col items-center text-center"
            >
                <h2 className="text-3xl md:text-5xl font-bold mb-16 tracking-tight text-white">Core Technologies</h2>
                <div className="flex flex-wrap justify-center gap-4 md:gap-6">
                    {skills.map((skill, index) => (
                        <div 
                            key={index} 
                            className="px-8 py-4 rounded-full border border-white/10 bg-white/[0.02] backdrop-blur-md text-xl md:text-2xl font-light text-gray-200"
                        >
                            {skill}
                        </div>
                    ))}
                </div>
            </motion.div>
        </section>
    );
}