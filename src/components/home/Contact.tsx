'use client';

import { motion } from 'framer-motion';

export default function Contact() {
    return (
        <section className="py-40 px-6 bg-black flex flex-col items-center text-center overflow-hidden">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="max-w-4xl w-full p-12 md:p-24 rounded-[3rem] border border-white/10 bg-white/[0.03] backdrop-blur-2xl relative"
            >
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/5 to-purple-500/5 rounded-[3rem] pointer-events-none" />
                
                <h2 className="text-4xl md:text-6xl font-bold mb-8 tracking-tight text-white relative z-10">
                    Let&apos;s build something.
                </h2>
                <p className="text-xl md:text-2xl text-gray-400 mb-14 font-light leading-relaxed relative z-10">
                    새로운 도전을 기다립니다.<br className="hidden md:block" /> 백엔드 시스템부터 모던 프론트엔드까지, 안정적이고 아름다운 웹을 만듭니다.
                </p>
                <a 
                    href="mailto:rkdrjs71@naver.com" 
                    className="relative z-10 inline-flex items-center justify-center px-10 py-5 rounded-full bg-white text-black font-semibold text-lg hover:scale-105 transition-transform duration-300"
                >
                    Contact Me
                </a>
            </motion.div>
        </section>
    );
}