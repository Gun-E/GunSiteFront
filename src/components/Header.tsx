"use client";

import {useState} from 'react';
import Link from 'next/link';
import {FaCode, FaBars, FaTimes, FaChevronRight} from "react-icons/fa";
import {usePathname} from 'next/navigation';
import {useAuth} from "@/app/context/AuthContext";
import styles from '@/styles/Header.module.css';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const {isLoggedIn, logout} = useAuth();
    const pathname = usePathname();

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };
    const handleLogout = () => {
        logout();
        setIsMenuOpen(false);
    };

    return (
        <nav className={styles.headerNavbar}>
            <div className={styles.menuWrap}>
                <Link href="/" className={`${styles.menuLogo} logo`}>
                    GunSite
                    <FaCode className="ml-2 logoBrand" aria-hidden="true"/>
                </Link>

                <div className={styles.menuList}>
                    <div className="flex">
                        <Link
                            href="/"
                            className={`${styles.menuItem} ${pathname === '/' ? styles.menuCurrent : ''}`}
                            aria-label="홈"
                        >
                            홈
                        </Link>
                        <Link
                            href="/board"
                            className={`${styles.menuItem} ${pathname === '/board' ? styles.menuCurrent : ''}`}
                            aria-label="게시판"
                        >
                            게시판
                        </Link>
                        <Link
                            href="/about"
                            className={`${styles.menuItem} ${pathname === '/about' ? styles.menuCurrent : ''}`}
                            aria-label="About"
                        >
                            About
                        </Link>
                    </div>
                    {isLoggedIn ? (
                        <button
                            onClick={logout}
                            className="w-20 text-center rounded-full bg-my-blue text-white font-semibold duration-300"
                            aria-label="로그아웃"
                        >
                            로그아웃
                        </button>
                    ) : (
                        <Link href="/login"
                              className={`w-20 text-center rounded-full bg-my-blue text-white font-semibold duration-300 ${pathname === '/login' ? 'text-sky-700' : ''}`}
                              aria-label="로그인">
                            로그인
                        </Link>
                    )}
                </div>


                <div className={styles.menuToggle}>
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
