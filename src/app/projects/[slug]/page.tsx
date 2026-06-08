import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { ReactNode } from 'react';
import { experiences } from '@/data/experiences';

type ProjectDetailPageProps = {
    params: {
        slug: string;
    };
};

export function generateStaticParams() {
    return experiences.map((experience) => ({
        slug: experience.slug,
    }));
}

export function generateMetadata({ params }: ProjectDetailPageProps) {
    const experience = experiences.find((item) => item.slug === params.slug);

    if (!experience) {
        return {
            title: 'Project Not Found',
        };
    }

    return {
        title: `${experience.title} | KANGGEON`,
        description: experience.summary,
    };
}

export default function ProjectDetailPage({ params }: ProjectDetailPageProps) {
    const experience = experiences.find((item) => item.slug === params.slug);

    if (!experience) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-black px-6 pt-36 pb-28">
            <article className="max-w-6xl mx-auto">
                <Link
                    href="/#projects"
                    className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-white transition-colors"
                >
                    <span aria-hidden="true">←</span>
                    Back to projects
                </Link>

                <div className="mt-16 border-t border-white/10 pt-12">
                    <div className="grid gap-12 lg:grid-cols-[1fr_320px]">
                        <div>
                            <p className="text-sm text-gray-500 tracking-[0.35em] uppercase">
                                {experience.category}
                            </p>
                            <h1 className="mt-5 text-4xl md:text-6xl font-bold tracking-tight text-white">
                                {experience.title}
                            </h1>
                            <p className="mt-10 text-xl md:text-2xl leading-relaxed text-gray-300">
                                {experience.summary}
                            </p>
                        </div>

                        <aside className="space-y-8 border-t border-white/10 pt-8 lg:border-t-0 lg:border-l lg:pl-8 lg:pt-0">
                            <InfoBlock label="Period" value={experience.date} />
                            {'role' in experience && experience.role && (
                                <InfoBlock label="Role" value={experience.role} />
                            )}
                            {'stack' in experience && experience.stack && (
                                <div>
                                    <p className="text-xs text-gray-600 tracking-[0.3em] uppercase">
                                        Stack
                                    </p>
                                    <div className="mt-4 flex flex-wrap gap-2">
                                        {experience.stack.map((tech) => (
                                            <span
                                                key={tech}
                                                className="rounded-full border border-white/10 px-3 py-1.5 text-sm text-gray-300"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </aside>
                    </div>
                </div>

                {'overview' in experience && experience.overview && (
                    <ProjectSection title="Overview">
                        <div className="space-y-6">
                            {experience.overview.map((paragraph) => (
                                <p key={paragraph} className="text-lg leading-8 text-gray-300">
                                    {paragraph}
                                </p>
                            ))}
                        </div>
                    </ProjectSection>
                )}

                <ProjectSection title="Key Contributions">
                    <ul className="grid gap-4 md:grid-cols-2">
                        {experience.details.map((detail) => (
                            <li
                                key={detail}
                                className="min-h-32 rounded-lg border border-white/10 bg-white/[0.02] p-6 text-gray-300 leading-relaxed"
                            >
                                {detail}
                            </li>
                        ))}
                    </ul>
                </ProjectSection>

                {'sections' in experience && experience.sections && (
                    <ProjectSection title="Project Details">
                        <div className="space-y-10">
                            {experience.sections.map((section) => (
                                <section key={section.title} className="border-t border-white/10 pt-8">
                                    <h3 className="text-2xl font-semibold text-white">
                                        {section.title}
                                    </h3>
                                    <ul className="mt-6 space-y-4">
                                        {section.items.map((item) => (
                                            <li key={item} className="flex gap-4 text-gray-400 leading-7">
                                                <span className="mt-3 h-1.5 w-1.5 flex-none rounded-full bg-white/60" />
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </section>
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
            <p className="text-xs text-gray-600 tracking-[0.3em] uppercase">
                {label}
            </p>
            <p className="mt-3 text-base leading-7 text-gray-300">
                {value}
            </p>
        </div>
    );
}

function ProjectSection({ title, children }: { title: string; children: ReactNode }) {
    return (
        <section className="mt-20 border-t border-white/10 pt-12">
            <div className="grid gap-8 lg:grid-cols-[240px_1fr]">
                <h2 className="text-lg font-semibold text-white">
                    {title}
                </h2>
                <div>
                    {children}
                </div>
            </div>
        </section>
    );
}
