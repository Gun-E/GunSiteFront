"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { useRef } from "react";
import { motion, useMotionTemplate, useScroll, useTransform } from "framer-motion";
import { experiences } from "@/data/experiences";

type ProjectExperience = (typeof experiences)[number];

const ease = [0.16, 1, 0.3, 1] as const;

const itemVariants = {
    hidden: { opacity: 0.24, y: 36, scale: 0.985, filter: "blur(12px)" },
    show: { opacity: 1, y: 0, scale: 1, filter: "blur(0px)", transition: { duration: 0.9, ease } },
};

const revealViewport = { once: true, margin: "0px 0px -8% 0px", amount: 0.01 };

export default function ProjectDetailView({ experience }: { experience: ProjectExperience }) {
    const heroRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: heroRef,
        offset: ["start start", "end start"],
    });
    const heroY = useTransform(scrollYProgress, [0, 1], [0, 80]);
    const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.18]);
    const heroBlur = useTransform(scrollYProgress, [0, 1], [0, 12]);
    const heroFilter = useMotionTemplate`blur(${heroBlur}px)`;

    return (
        <main className="min-h-screen bg-black pb-32 pt-36 text-white">
            <article className="mx-auto max-w-[1120px] px-6 md:px-10">
                <motion.div
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease }}
                >
                    <Link
                        href="/career"
                        className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-5 py-3 text-sm text-gray-400 backdrop-blur-md transition-colors hover:border-blue-300/40 hover:text-white"
                    >
                        <span aria-hidden="true">←</span>
                        프로젝트 목록
                    </Link>
                </motion.div>

                <motion.div
                    ref={heroRef}
                    className="mt-14 flex min-h-[58svh] items-center border-t border-white/10 py-16 md:min-h-[64svh] md:py-20"
                    style={{ y: heroY, opacity: heroOpacity, filter: heroFilter }}
                >
                    <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_320px]">
                        <motion.div
                            className="relative"
                            initial={itemVariants.hidden}
                            animate={itemVariants.show}
                        >
                            <div className="pointer-events-none absolute -left-8 top-10 h-72 w-[min(70vw,680px)] rounded-full bg-blue-400/[0.16] blur-3xl" />
                            <h1 className="relative max-w-4xl text-5xl font-extrabold leading-[0.98] tracking-tight text-white md:text-7xl">
                                {experience.title}
                            </h1>
                            <p className="relative mt-9 max-w-3xl break-keep text-lg font-light leading-relaxed text-gray-400 md:text-2xl">
                                {experience.summary}
                            </p>
                        </motion.div>

                        <motion.aside
                            className="space-y-8 border-t border-white/10 pt-8 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0"
                            initial={itemVariants.hidden}
                            animate={itemVariants.show}
                        >
                            <InfoBlock label="기간" value={experience.date} />
                            {"stack" in experience && experience.stack && (
                                <div>
                                    <p className="text-sm font-semibold text-gray-600">
                                        기술
                                    </p>
                                    <div className="mt-4 flex flex-wrap gap-2">
                                        {experience.stack.map((tech) => (
                                            <motion.span
                                                key={tech}
                                                className="rounded-full border border-white/10 bg-white/[0.02] px-3 py-1.5 text-sm text-gray-300"
                                                initial={itemVariants.hidden}
                                                animate={itemVariants.show}
                                            >
                                                {tech}
                                            </motion.span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </motion.aside>
                    </div>
                </motion.div>

                {"overview" in experience && experience.overview && (
                    <ProjectSection title="맥락">
                        <div className="space-y-6">
                            {experience.overview.map((paragraph) => (
                            <motion.p
                                key={paragraph}
                                className="break-keep text-lg font-light leading-8 text-gray-300"
                                initial={itemVariants.hidden}
                                whileInView={itemVariants.show}
                                viewport={revealViewport}
                            >
                                    {paragraph}
                                </motion.p>
                            ))}
                        </div>
                    </ProjectSection>
                )}

                <ProjectSection title="기여">
                    <ul className="grid gap-4 md:grid-cols-2">
                        {experience.details.map((detail) => (
                            <motion.li
                                key={detail}
                                className="min-h-32 rounded-[1.25rem] border border-white/10 bg-white/[0.025] p-6 leading-relaxed text-gray-300 backdrop-blur-md transition-colors duration-500 hover:border-blue-400/25"
                                initial={itemVariants.hidden}
                                whileInView={itemVariants.show}
                                viewport={revealViewport}
                            >
                                {detail}
                            </motion.li>
                        ))}
                    </ul>
                </ProjectSection>

                {"sections" in experience && experience.sections && (
                    <ProjectSection title="세부 기록">
                        <div className="space-y-10">
                            {experience.sections.map((section, index) => (
                                <motion.section
                                    key={section.title}
                                    className={index === 0 ? "" : "border-t border-white/10 pt-8"}
                                    initial={itemVariants.hidden}
                                    whileInView={itemVariants.show}
                                    viewport={revealViewport}
                                >
                                    <h3 className="text-2xl font-semibold text-white">
                                        {section.title}
                                    </h3>
                                    <ul className="mt-6 space-y-4">
                                        {section.items.map((item) => (
                                            <li key={item} className="flex gap-4 break-keep leading-7 text-gray-400">
                                                <span className="mt-3 h-1.5 w-1.5 flex-none rounded-full bg-blue-300/70" />
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </motion.section>
                            ))}
                        </div>
                    </ProjectSection>
                )}
            </article>
        </main>
    );
}

function InfoBlock({ label, value }: { label: string; value: string }) {
    return (
        <div>
            <p className="text-sm font-semibold text-gray-600">
                {label}
            </p>
            <p className="mt-3 break-keep text-base font-light leading-7 text-gray-300">
                {value}
            </p>
        </div>
    );
}

function ProjectSection({ title, children }: { title: string; children: ReactNode }) {
    return (
        <section
            className="mt-24 border-t border-white/10 pt-12 md:mt-28"
        >
            <div className="grid gap-8 lg:grid-cols-[180px_1fr]">
                <motion.h2
                    className="text-base font-semibold text-gray-500"
                    initial={itemVariants.hidden}
                    whileInView={itemVariants.show}
                    viewport={revealViewport}
                >
                    {title}
                </motion.h2>
                <div>{children}</div>
            </div>
        </section>
    );
}
