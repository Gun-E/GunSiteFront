"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaCode, FaBars, FaTimes } from "react-icons/fa";
import { usePathname } from 'next/navigation';
import { useAuth } from "@/app/context/AuthContext";
import styles from '@/styles/Header.module.css';

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { isLoggedIn, logout } = useAuth();
    const pathname = usePathname();

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

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
        <nav className={`${styles.headerNavbar} ${isScrolled && !isMenuOpen ? styles.scrolled : ''}`}>
            <div className={styles.menuContainer}>
                <div className="text-black font-bold text-xl">
                    <Link href="/" className="flex items-center font-bold text-black text-2xl">
                        GunSite
                        <FaCode className="ml-2 text-sky-700" aria-hidden="true"/>
                    </Link>
                </div>
                <div className="hidden md:flex space-x-4">
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
                <div className="hidden md:flex space-x-4">
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

                <div className="md:hidden">
                    <button onClick={toggleMenu} aria-label="메뉴 토글" className="text-gray-400">
                        {isMenuOpen ? <FaTimes className="text-2xl"/> : <FaBars className="text-2xl"/>}
                    </button>
                </div>

                <div className={`${styles.menuButton} ${isMenuOpen ? styles.menuButtonOpen : ''}`}>
                    <div className="flex flex-col items-center space-y-4 py-4">
                        <Link
                            href="/"
                            className={`text-gray-400 hover:text-sky-700 font-semibold ${pathname === '/' ? 'text-sky-700' : ''}`}
                            aria-label="홈"
                            onClick={toggleMenu}
                        >
                            홈
                        </Link>
                        <Link
                            href="/board"
                            className={`text-gray-400 hover:text-sky-700 font-semibold ${pathname === '/board' ? 'text-sky-700' : ''}`}
                            aria-label="게시판"
                            onClick={toggleMenu}
                        >
                            게시판
                        </Link>
                        <Link
                            href="/about"
                            className={`text-gray-400 hover:text-sky-700 font-semibold ${pathname === '/about' ? 'text-sky-700' : ''}`}
                            aria-label="About"
                            onClick={toggleMenu}
                        >
                            About
                        </Link>
                        {isLoggedIn ? (
                            <button
                                onClick={() => {
                                    logout();
                                    toggleMenu();
                                }}
                                className="text-gray-400 hover:text-sky-700 font-semibold"
                                aria-label="로그아웃"
                            >
                                로그아웃
                            </button>
                        ) : (
                            <Link href="/login" className="text-gray-400 hover:text-sky-700 font-semibold"
                                  aria-label="로그인" onClick={toggleMenu}>
                                로그인
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Header;
