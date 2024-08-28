"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { FaCode } from "react-icons/fa";

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0);
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <nav
            className={`fixed z-50 w-full p-4 transition-shadow duration-200 ${isScrolled && !isHovered ? 'bg-white bg-opacity-70 backdrop-blur shadow-md' : 'bg-white shadow-md'}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-black font-bold text-xl">
                    <Link href="/" className="flex items-center font-bold text-black text-2xl">
                        GunSite
                        <FaCode className="ml-2 text-sky-700" aria-hidden="true" />
                    </Link>
                </div>
                <div className="space-x-4">
                    <Link href="/" className="text-gray-400 hover:text-sky-700 font-semibold" aria-label="홈">
                        홈
                    </Link>
                    <Link href="/board" className="text-gray-400 hover:text-sky-700 font-semibold" aria-label="게시판">
                        게시판
                    </Link>
                    <Link href="/about" className="text-gray-400 hover:text-sky-700 font-semibold" aria-label="About">
                        About
                    </Link>
                </div>
                <div className="space-x-4">
                    <Link href="/login" className="text-gray-400 hover:text-sky-700 font-semibold" aria-label="로그인">
                        로그인
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Header;
