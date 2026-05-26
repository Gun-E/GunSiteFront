'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function Hero() {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start start', 'end start']
    });
    
    // Parallax effect
    const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
    const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

    const ease = [0.16, 1, 0.3, 1] as const;

    return (
        <section ref={ref} className="relative h-screen flex flex-col justify-center items-center overflow-hidden bg-black px-6">
            <motion.div style={{ y, opacity }} className="text-center z-10 flex flex-col items-center">
                <div className="overflow-hidden mb-6">
                    <motion.h1
                        initial={{ y: '100%' }}
                        animate={{ y: '0%' }}
                        transition={{ duration: 0.8, ease }}
                        className="text-5xl sm:text-7xl md:text-9xl font-extrabold tracking-tighter text-white"
                    >
                        KANG GEON
                    </motion.h1>
                </div>
                <div className="overflow-hidden mb-10">
                    <motion.p
                        initial={{ y: '100%' }}
                        animate={{ y: '0%' }}
                        transition={{ duration: 0.8, ease, delay: 0.1 }}
                        className="text-xl sm:text-2xl md:text-3xl text-gray-400 font-light tracking-wide"
                    >
                        Full-Stack Web Developer
                    </motion.p>
                </div>
            </motion.div>
            
            {/* Subtle Gradient Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-900/10 rounded-full blur-[120px] pointer-events-none" />
        </section>
    );
}