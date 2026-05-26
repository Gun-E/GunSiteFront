"use client";

import { FaCode } from "react-icons/fa";
import { BiMenu } from "react-icons/bi";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import ToggleMenu from "./ToggleMenu";

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            <header className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'bg-black/50 backdrop-blur-xl border-b border-white/10 py-4' : 'bg-transparent py-6'}`}>
                <div className="max-w-[1140px] mx-auto px-6 md:px-10 flex items-center justify-between">
                    <Link href="/" className="text-white flex items-center gap-3 hover:opacity-80 transition-opacity">
                        <FaCode className="text-2xl" />
                        <span className="font-bold tracking-widest text-lg">KANGGEON</span>
                    </Link>

                    <nav className="hidden md:flex items-center gap-8 px-8 py-2.5 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-md">
                        <NavItem href="/" label="Home" currentPath={pathname} />
                        <NavItem href="/about" label="About" currentPath={pathname} />
                    </nav>

                    <button onClick={() => setIsMenuOpen(true)} className="md:hidden text-white" aria-label="Menu Toggle">
                        <BiMenu className="text-3xl" />
                    </button>
                </div>
            </header>

            <ToggleMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} pathname={pathname} />
        </>
    );
}

function NavItem({ href, label, currentPath }: { href: string; label: string; currentPath: string }) {
    const isActive = currentPath === href;
    return (
        <Link
            href={href}
            className={`text-sm font-medium transition-colors ${isActive ? 'text-white' : 'text-gray-400 hover:text-white'}`}
        >
            {label}
        </Link>
    );
}