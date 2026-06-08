"use client";

import { motion, useMotionTemplate, useScroll, useTransform } from "framer-motion";
import type { ReactNode } from "react";
import { useRef } from "react";

const ease = [0.16, 1, 0.3, 1] as const;

const itemVariants = {
    hidden: { opacity: 0.24, y: 36, scale: 0.985, filter: "blur(12px)" },
    show: { opacity: 1, y: 0, scale: 1, filter: "blur(0px)", transition: { duration: 0.9, ease } },
};

const revealViewport = { once: true, margin: "0px 0px -8% 0px", amount: 0.01 };

type StatementSectionProps = {
    description: ReactNode;
    title: ReactNode;
    titleLevel?: "h1" | "h2";
    trigger?: "load" | "view";
    parallax?: boolean;
    className?: string;
    contentClassName?: string;
};

export default function StatementSection({
    description,
    title,
    titleLevel = "h2",
    trigger = "view",
    parallax = false,
    className = "",
    contentClassName = "",
}: StatementSectionProps) {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"],
    });
    const y = useTransform(scrollYProgress, [0, 1], [0, 70]);
    const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.15]);
    const blur = useTransform(scrollYProgress, [0, 1], [0, 12]);
    const filter = useMotionTemplate`blur(${blur}px)`;

    const contentMotionProps = trigger === "load"
        ? { animate: itemVariants.show, initial: itemVariants.hidden }
        : { initial: itemVariants.hidden, whileInView: itemVariants.show, viewport: revealViewport };

    const sectionStyle = parallax ? { filter, opacity, y } : undefined;
    const titleClassName = "max-w-4xl break-keep text-4xl font-extrabold leading-[1.04] tracking-tight text-white md:text-6xl";

    return (
        <motion.section
            ref={ref}
            className={`relative mx-auto flex min-h-[100svh] max-w-[1120px] items-center overflow-hidden bg-black px-6 py-24 md:px-10 md:py-36 ${className}`}
            style={sectionStyle}
        >
            <div className="pointer-events-none absolute left-6 top-1/2 h-56 w-[min(72vw,680px)] -translate-y-1/2 rounded-full bg-blue-400/10 blur-3xl md:left-10" />
            <motion.div className={`relative w-full ${contentClassName}`} {...contentMotionProps}>
                {titleLevel === "h1" ? (
                    <h1 className={titleClassName}>{title}</h1>
                ) : (
                    <h2 className={titleClassName}>{title}</h2>
                )}
                <p className="mt-7 max-w-2xl break-keep text-lg font-light leading-relaxed text-gray-400 md:text-xl">
                    {description}
                </p>
            </motion.div>
        </motion.section>
    );
}
