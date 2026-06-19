"use client";

import { motion } from "framer-motion";
import StatementSection from "@/components/common/StatementSection";

const career = [
    { date: "2025.04 ~ 2026.06", title: "(주)미르이즈 부설 연구소 재직" },
    { date: "2025.05 ~ 2025.12", title: "창업진흥원(KISED) PMS 고도화 프로젝트" },
    { date: "2024.12", title: "LG전자 DX School 1기 우수 수료생" },
    { date: "2024.12", title: "LG전자 DX School 데이터 비지니스 DX 프로젝트 우수상" },
    { date: "2024.11", title: "한국언론진흥재단 주최 2024 뉴스 빅데이터 해커톤 최우수상" },
    { date: "2024.09", title: "LG전자 DX School 고객경험향상 CX 프로젝트 최우수상" },
    { date: "2024.03 ~ ㅋ2024.06", title: "Y-Mart 순천점 온라인 마켓 플랫폼 구축" },
];

const skills = [
    { name: "JAVA", level: 95 },
    { name: "JavaScript / HTML", level: 85 },
    { name: "Python", level: 80 },
    { name: "SQL / DB", level: 80 },
    { name: "Infra / Cloud", level: 65 },
    { name: "AI", level: 40 },
];

const education = [
    { date: "2024.12", title: "LG전자 DX School 1기 수료" },
    { date: "2024.02", title: "NHN Academy Java Back-End 과정 4기 수료" },
    { date: "2024.02", title: "조선대학교 컴퓨터 공학과 학사 졸업" },
];

const licences = [
    { date: "2024.09.20", title: "SQL Developer" },
    { date: "2023.06.09", title: "정보처리기사" },
];

const ease = [0.16, 1, 0.3, 1] as const;

const itemVariants = {
    hidden: { opacity: 0.64, y: 36, scale: 0.985 },
    show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.9, ease } },
};

const revealViewport = { once: true, margin: "0px 0px -8% 0px", amount: 0.01 };

export default function Profile() {
    return (
        <>
            <StatementSection
                title="경험을 읽고 기술로 연결하는 개발자."
                description="작은 불편과 반복되는 흐름을 관찰하고, IT 기술로 더 나은 경험을 만들어갑니다."
            />

            <div className="mx-auto max-w-[1120px] bg-black px-6 md:px-10">
                <ProfileBlock title="Career">
                    <div className="flex flex-col">
                        {career.map((item) => (
                            <motion.article
                                key={`${item.date}-${item.title}`}
                                initial={itemVariants.hidden}
                                whileInView={itemVariants.show}
                                viewport={revealViewport}
                                whileHover={{ x: 8 }}
                                transition={{ duration: 0.45, ease }}
                                className="grid gap-3 border-t border-white/10 py-7 md:grid-cols-[150px_minmax(0,1fr)] md:gap-8"
                            >
                                <time className="text-sm font-light tracking-widest text-gray-600">{item.date}</time>
                                <p className="break-keep text-xl font-light leading-relaxed text-gray-300">{item.title}</p>
                            </motion.article>
                        ))}
                    </div>
                </ProfileBlock>

                <ProfileBlock title="Skills">
                    <div className="grid gap-3 md:grid-cols-2">
                        {skills.map((skill) => (
                            <motion.article
                                key={skill.name}
                                initial={itemVariants.hidden}
                                whileInView={itemVariants.show}
                                viewport={revealViewport}
                                className="rounded-[1.5rem] border border-white/10 bg-white/[0.025] p-6 backdrop-blur-md transition-colors duration-500 hover:border-white/20"
                            >
                                <div className="flex items-center justify-between gap-4">
                                    <strong className="text-xl font-medium text-white">{skill.name}</strong>
                                    <span className="text-sm tracking-widest text-gray-600">{skill.level}%</span>
                                </div>
                                <div className="mt-7 h-1.5 overflow-hidden rounded-full bg-white/10">
                                    <motion.div
                                        className="h-full rounded-full bg-gradient-to-r from-blue-300/80 to-white"
                                        initial={{ width: 0 }}
                                        whileInView={{ width: `${skill.level}%` }}
                                        viewport={{ once: true, margin: "0px 0px -8% 0px", amount: 0.05 }}
                                        transition={{ duration: 1.1, ease }}
                                    />
                                </div>
                            </motion.article>
                        ))}
                    </div>
                </ProfileBlock>

                <motion.section
                    className="flex min-h-[100svh] items-center py-24 md:py-36"
                >
                    <div className="grid w-full gap-16 lg:grid-cols-2">
                        <InfoList title="Education" items={education} />
                        <InfoList title="Licence" items={licences} />
                    </div>
                </motion.section>
            </div>
        </>
    );
}

function ProfileBlock({
    title,
    children,
}: {
    title: string;
    children: React.ReactNode;
}) {
    return (
        <motion.section
            className="flex min-h-[100svh] flex-col justify-center py-24 md:py-36"
        >
            <div>
                <motion.div
                    initial={itemVariants.hidden}
                    whileInView={itemVariants.show}
                    viewport={revealViewport}
                    className="mb-10"
                >
                    <h3 className="text-3xl font-extrabold leading-tight tracking-tight text-white md:text-5xl">{title}</h3>
                </motion.div>
                {children}
            </div>
        </motion.section>
    );
}

function InfoList({
    title,
    items,
}: {
    title: string;
    items: { date: string; title: string }[];
}) {
    return (
        <section>
            <motion.div
                initial={itemVariants.hidden}
                whileInView={itemVariants.show}
                viewport={revealViewport}
                className="mb-8"
            >
                <h3 className="text-3xl font-extrabold leading-tight tracking-tight text-white md:text-4xl">{title}</h3>
            </motion.div>
            <div className="flex flex-col">
                {items.map((item) => (
                    <motion.article
                        key={`${item.date}-${item.title}`}
                        initial={itemVariants.hidden}
                        whileInView={itemVariants.show}
                        viewport={revealViewport}
                        whileHover={{ x: 6 }}
                        transition={{ duration: 0.45, ease }}
                        className="grid gap-2 border-t border-white/10 py-6 md:grid-cols-[118px_minmax(0,1fr)]"
                    >
                        <time className="text-sm font-light tracking-widest text-gray-600">{item.date}</time>
                        <p className="break-keep text-lg font-light leading-relaxed text-gray-300">{item.title}</p>
                    </motion.article>
                ))}
            </div>
        </section>
    );
}
