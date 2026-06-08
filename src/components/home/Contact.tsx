'use client';

import { motion, useMotionTemplate, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function Contact() {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start end', 'end end']
    });
    const y = useTransform(scrollYProgress, [0, 1], [36, 0]);
    const scale = useTransform(scrollYProgress, [0, 1], [0.985, 1]);
    const blur = useTransform(scrollYProgress, [0, 1], [8, 0]);
    const filter = useMotionTemplate`blur(${blur}px)`;

    return (
        <section ref={ref} className="mx-auto flex min-h-[100svh] max-w-[1120px] flex-col items-center justify-center overflow-hidden bg-black px-6 py-24 text-center md:px-10 md:py-36">
            <motion.div
                initial={{ opacity: 0.72, scale: 0.985 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "0px 0px -8% 0px", amount: 0.01 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                style={{ y, scale, filter }}
                className="relative w-full overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-9 backdrop-blur-2xl md:p-16"
            >
                <div className="pointer-events-none absolute left-1/2 top-1/2 h-64 w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-400/10 blur-3xl" />
                <h2 className="relative z-10 mb-8 text-4xl font-extrabold tracking-tight text-white md:text-6xl">
                    경험이 기술이 되는 순간을<br />
                    함께 만들어요.
                </h2>
                <p className="relative z-10 mb-12 text-lg font-light leading-relaxed text-gray-400 md:text-xl">
                    지식과 노하우를 나누며 함께 성장하고, 변화하는 AI 시대를 극복해가고 싶습니다.
                </p>
                <a 
                    href="mailto:rkdrjs71@naver.com" 
                    className="relative z-10 inline-flex items-center justify-center rounded-full bg-white px-10 py-5 text-lg font-semibold text-black transition-transform duration-300 hover:scale-105 hover:bg-blue-100"
                >
                    Contact Me
                </a>
            </motion.div>
        </section>
    );
}
