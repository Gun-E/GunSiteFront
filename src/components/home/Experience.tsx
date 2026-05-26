'use client';

import { motion } from 'framer-motion';

const experiences = [
    { id: 1, title: '창업진흥원(KISED) PMS 고도화 프로젝트', date: '2025.05 ~ 2025.12' },
    { id: 2, title: 'LG전자 DX School 1기 수료', date: '2024.12' },
    { id: 3, title: '2024 뉴스 빅데이터 해커톤 대상 (최우수상)', date: '2024.11' },
    { id: 4, title: 'NHN 아카데미 백엔드 4기 수료', date: '2024.02' },
];

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
        <section className="py-32 px-6 bg-black max-w-5xl mx-auto">
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
                        <motion.div
                            key={exp.id}
                            variants={itemVariants}
                            className="group flex flex-col md:flex-row justify-between items-start md:items-center py-10 border-t border-white/10 first:border-t-0 hover:bg-white/[0.02] transition-colors duration-500 rounded-2xl px-6 -mx-6"
                        >
                            <h3 className="text-2xl md:text-3xl font-medium text-gray-400 group-hover:text-white transition-colors duration-500">
                                {exp.title}
                            </h3>
                            <span className="text-sm md:text-base text-gray-600 mt-4 md:mt-0 font-light tracking-widest uppercase">
                                {exp.date}
                            </span>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </section>
    );
}