import Hero from "@/components/home/Hero";
import Profile from "@/components/home/Profile";
import Contact from "@/components/home/Contact";

export default function Home() {
    return (
        <main className="bg-black min-h-screen">
            <Hero />
            <Profile />
            <Contact />
        </main>
    );
}
