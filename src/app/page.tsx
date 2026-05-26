import Hero from "@/components/home/Hero";
import Skills from "@/components/home/Skills";
import Experience from "@/components/home/Experience";
import Contact from "@/components/home/Contact";

export default function Home() {
    return (
        <main className="bg-black min-h-screen">
            <Hero />
            <Skills />
            <Experience />
            <Contact />
        </main>
    );
}