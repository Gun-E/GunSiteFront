'use client';

import { motion, useMotionTemplate, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function Hero() {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start start', 'end start']
    });
    
    const y = useTransform(scrollYProgress, [0, 1], ['0%', '35%']);
    const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
    const scale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);
    const blur = useTransform(scrollYProgress, [0, 1], [0, 10]);
    const filter = useMotionTemplate`blur(${blur}px)`;

    const ease = [0.16, 1, 0.3, 1] as const;

    return (
        <section ref={ref} className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden bg-black px-6 py-28 md:px-10">
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-[520px] w-[min(72vw,760px)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(96,165,250,0.16)_0%,rgba(96,165,250,0.06)_38%,rgba(0,0,0,0)_72%)] blur-3xl" />
            <motion.div style={{ y, opacity }} className="z-10 flex w-full max-w-[1120px] flex-col items-center text-center">
                <div className="overflow-hidden">
                    <motion.h1
                        style={{ scale, filter }}
                        className="text-[clamp(4rem,13vw,9.5rem)] font-extrabold leading-[0.9] tracking-tight text-white"
                    >
                        KANG GEON
                    </motion.h1>
                </div>
                <div className="mt-8 overflow-hidden">
                    <motion.p
                        initial={{ y: '100%' }}
                        animate={{ y: '0%' }}
                        transition={{ duration: 0.8, ease, delay: 0.14 }}
                        className="text-xl font-light tracking-wide text-gray-400 sm:text-2xl md:text-3xl"
                    >
                        Full-Stack Web Developer
                    </motion.p>
                </div>
            </motion.div>
        </section>
    );
}
