"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

const ease = [0.16, 1, 0.3, 1] as const;

const itemVariants = {
    hidden: { opacity: 0.64, y: 36, scale: 0.985 },
    show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.9, ease } },
};

const revealViewport = { once: true, margin: "0px 0px -8% 0px", amount: 0.01 };

type StatementSectionProps = {
    description: ReactNode;
    title: ReactNode;
    titleLevel?: "h1" | "h2";
    trigger?: "load" | "view";
    className?: string;
    contentClassName?: string;
};

export default function StatementSection({
    description,
    title,
    titleLevel = "h2",
    trigger = "view",
    className = "",
    contentClassName = "",
}: StatementSectionProps) {
    const contentMotionProps = trigger === "load"
        ? { animate: itemVariants.show, initial: itemVariants.hidden }
        : { initial: itemVariants.hidden, whileInView: itemVariants.show, viewport: revealViewport };

    const titleClassName = "max-w-4xl break-keep text-4xl font-extrabold leading-[1.04] tracking-tight text-white md:text-6xl";

    return (
        <motion.section
            className={`relative mx-auto flex min-h-[100svh] max-w-[1120px] items-center bg-black px-6 py-24 md:px-10 md:py-36 ${className}`}
        >
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-[560px] w-[120vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(96,165,250,0.18)_0%,rgba(96,165,250,0.085)_34%,rgba(96,165,250,0.032)_58%,rgba(96,165,250,0)_82%)] mix-blend-screen md:left-0 md:w-[980px] md:-translate-x-40" />
            <motion.div className={`relative z-10 w-full ${contentClassName}`} {...contentMotionProps}>
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
