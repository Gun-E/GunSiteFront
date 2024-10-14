"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {FaCode, FaBars, FaTimes, FaChevronRight} from "react-icons/fa";
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
    const handleLogout = () => {
        logout();
        setIsMenuOpen(false);
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
                    <Link href="/" className="flex items-center logo text-black text-2xl">
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
                        <Link href="/login"
                              className={`text-gray-400 hover:text-sky-700 font-semibold ${pathname === '/login' ? 'text-sky-700' : ''}`}
                              aria-label="로그인">
                            로그인
                        </Link>
                    )}
                </div>

                <div className="md:hidden flex">
                    <button onClick={toggleMenu} aria-label="메뉴 토글" className="text-gray-400">
                        <FaBars className="text-2xl"/>
                    </button>
                </div>

                <div className={`${styles.menuButton} ${isMenuOpen ? styles.menuButtonOpen : ''}`}>
                    <div className={styles.menuCloseButton}>
                        <button onClick={toggleMenu} className="font-bold text-xl text-gray-400">
                            <FaTimes className="text-3xl"/>
                        </button>
                    </div>
                    <div className="flex flex-col items-start py-10 px-10 relative w-full">
                        <Link
                            href="/"
                            className={`text-gray-400 text-2xl hover:text-sky-700 font-semibold ${pathname === '/' ? 'text-sky-700' : ''} border-b-2 py-9 border-gray-300 w-full`}
                            aria-label="홈"
                            onClick={toggleMenu}
                        >
                            <p className="pl-2">홈</p>
                        </Link>
                        <Link
                            href="/board"
                            className={`text-gray-400 text-2xl hover:text-sky-700 font-semibold ${pathname === '/board' ? 'text-sky-700' : ''} border-b-2 py-9 border-gray-300 w-full`}
                            aria-label="게시판"
                            onClick={toggleMenu}
                        >
                            <p className="pl-2">게시판</p>
                        </Link>
                        <Link
                            href="/about"
                            className={`text-gray-400 text-2xl hover:text-sky-700 font-semibold ${pathname === '/about' ? 'text-sky-700' : ''} py-9 border-gray-300 w-full`}
                            aria-label="About"
                            onClick={toggleMenu}
                        >
                            <p className="pl-2">About</p>
                        </Link>
                        {isLoggedIn ? (

                            <button
                                onClick={handleLogout}
                                className="text-gray-400 text-2xl font-semibold my-12 flex justify-between items-center w-full"
                                aria-label="로그아웃"
                            >
                                <span>로그아웃</span>
                                <FaChevronRight/>
                            </button>
                        ) : (
                            <Link
                                href="/login"
                                className="text-sky-700 text-2xl font-semibold my-12 flex justify-between items-center w-full"
                                aria-label="로그인"
                                onClick={toggleMenu}
                            >
                                <span>로그인</span>
                                <FaChevronRight/>
                            </Link>
                        )}
                    </div>
                </div>

            </div>
        </nav>
    );
};

export default Header;
