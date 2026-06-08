import { notFound } from 'next/navigation';
import { experiences } from '@/data/experiences';
import ProjectDetailView from './ProjectDetailView';

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

    return <ProjectDetailView experience={experience} />;
}
