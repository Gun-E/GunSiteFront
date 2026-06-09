"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import StatementSection from "@/components/common/StatementSection";
import { experiences } from "@/data/experiences";
import styles from "./page.module.css";

const ease = [0.16, 1, 0.3, 1] as const;

const itemVariants = {
    hidden: { opacity: 0.64, y: 36, scale: 0.985 },
    show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.9, ease } },
};

const revealViewport = { once: true, margin: "0px 0px -8% 0px", amount: 0.01 };

export default function CareerPage() {
    return (
        <main className={styles.historyPage}>
            <StatementSection
                title="프로젝트와 커리어의 기록."
                description="문제를 마주한 방식, 구조를 잡아간 과정, 그리고 실제 서비스로 이어진 결과들."
                titleLevel="h1"
                trigger="load"
                parallax
                className="min-h-[calc(100svh-96px)] py-20"
            />

            <CareerSection>
                <motion.div
                    className={styles.sectionHeader}
                    initial={itemVariants.hidden}
                    whileInView={itemVariants.show}
                    viewport={revealViewport}
                >
                    <h2>Projects</h2>
                </motion.div>

                <div className={styles.projectList}>
                    {experiences.map((experience) => (
                        <motion.div
                            key={experience.id}
                            initial={itemVariants.hidden}
                            whileInView={itemVariants.show}
                            viewport={revealViewport}
                        >
                            <Link href={`/projects/${experience.slug}`} className={styles.projectItem}>
                                <div>
                                    <h2>{experience.title}</h2>
                                    <p>{experience.summary}</p>
                                </div>
                                <time>{experience.date}</time>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </CareerSection>
        </main>
    );
}

function CareerSection({
    children,
}: {
    children: React.ReactNode;
}) {
    return <section className={styles.section}>{children}</section>;
}
