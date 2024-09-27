"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { FaCode } from "react-icons/fa";
import { usePathname } from 'next/navigation';
import { useAuth } from "@/app/context/AuthContext";
import styles from '@/styles/Header.module.css';

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const { isLoggedIn, logout } = useAuth();
    const pathname = usePathname();

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
        <nav className={`${styles.headerNavbar} ${isScrolled ? styles.scrolled : styles.default}`}>
            <div className="container py-3 px-10 mx-auto flex justify-between items-center">
                <div className="text-black font-bold text-xl">
                    <Link href="/" className="flex items-center font-bold text-black text-2xl">
                        GunSite
                        <FaCode className="ml-2 text-sky-700" aria-hidden="true" />
                    </Link>
                </div>
                <div className="space-x-4">
                    <Link
                        href="/"
                        className={`text-gray-400 hover:text-sky-700 font-semibold ${pathname === '/' ? 'text-sky-700' : ''}`}
                        aria-label="홈"
                    >
                        홈
                    </Link>
                    <Link
                        href="/board"
                        className={`text-gray-400 hover:text-sky-700 font-semibold ${pathname === '/board' ? 'text-sky-700' : ''}`}
                        aria-label="게시판"
                    >
                        게시판
                    </Link>
                    <Link
                        href="/about"
                        className={`text-gray-400 hover:text-sky-700 font-semibold ${pathname === '/about' ? 'text-sky-700' : ''}`}
                        aria-label="About"
                    >
                        About
                    </Link>
                </div>
                <div className="space-x-4">
                    {isLoggedIn ? (
                        <button
                            onClick={logout}
                            className="text-gray-400 hover:text-sky-700 font-semibold"
                            aria-label="로그아웃"
                        >
                            로그아웃
                        </button>
                    ) : (
                        <Link href="/login" className="text-gray-400 hover:text-sky-700 font-semibold" aria-label="로그인">
                            로그인
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Header;
