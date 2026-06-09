'use client';

import { motion } from 'framer-motion';

export default function Contact() {
    return (
        <section className="relative mx-auto flex min-h-[100svh] max-w-[1120px] flex-col items-center justify-center bg-black px-6 py-24 text-center md:px-10 md:py-36">
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-96 w-[min(92vw,840px)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(96,165,250,0.42)_0%,rgba(96,165,250,0.24)_32%,rgba(96,165,250,0.10)_58%,rgba(96,165,250,0)_78%)] mix-blend-screen" />
            <motion.div
                initial={{ opacity: 0.72, scale: 0.985 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "0px 0px -8% 0px", amount: 0.01 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-10 w-full max-w-4xl"
            >
                <h2 className="relative z-10 mb-8 break-keep text-[clamp(2rem,9vw,2.65rem)] font-extrabold leading-[1.08] tracking-tight text-white md:text-6xl md:leading-[1.05]">
                    <span className="hidden md:inline">
                        경험이 기술이 되는 순간을<br />
                        함께 만들어요.
                    </span>
                    <span className="md:hidden">
                        경험이 기술이<br />
                        되는 순간을 함께<br />
                        만들어요.
                    </span>
                </h2>
                <p className="relative z-10 mx-auto mb-12 max-w-2xl break-keep text-lg font-light leading-relaxed text-gray-400 md:text-xl">
                    지식과 노하우를 나누며 함께 성장하고, 변화하는 AI 시대를 극복해가고 싶습니다.
                </p>
                <a 
                    href="mailto:rkdrjs71@naver.com" 
                    className="relative z-10 inline-flex items-center justify-center rounded-full bg-white px-10 py-5 text-lg font-semibold text-black no-underline transition-transform duration-300 hover:scale-105 hover:bg-blue-100"
                >
                    Contact Me
                </a>
            </motion.div>
        </section>
    );
}
