"use client";

import styles from "@/styles/Header.module.css";
import {FaBars, FaCode} from "react-icons/fa";
import Link from "next/link";
import {usePathname} from "next/navigation";
import {useState} from "react";
import {useAuth} from "@/app/context/AuthContext";
import ToggleMenu from "@/components/ToggleMenu";

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const {isLoggedIn, logout} = useAuth();
    const pathname = usePathname();

    const toggleMenu = () => {
        setIsMenuOpen(prev => !prev);
    };
    const handleLogout = async () => {
        logout();
        setIsMenuOpen(false);
    };

    return (
        <nav className={styles.headerNavbar}>
            <Link href="/">
                <FaCode className="logoBrand" aria-hidden="true"/>
            </Link>

            <div className={styles.menuList}>
                <NavItem href="/" label="홈" currentPath={pathname}/>
                <NavItem href="/board" label="게시판" currentPath={pathname}/>
                <NavItem href="/about" label="소개" currentPath={pathname}/>
                {isLoggedIn ? (
                    <button onClick={handleLogout} className={styles.login_button} aria-label="로그아웃">
                        로그아웃
                    </button>
                ) : (
                    <Link href="/login" className={styles.login_button} aria-label="로그인">
                        로그인
                    </Link>
                )}
            </div>

            <button onClick={toggleMenu} aria-label="메뉴 토글" className={styles.menuToggle}>
                <FaBars className="text-2xl"/>
            </button>

            <ToggleMenu isOpen={isMenuOpen} isLoggedIn={isLoggedIn} onClose={toggleMenu} handleLogout={handleLogout}
                        pathname={pathname}/>
        </nav>
    );
}

interface NavItemProps {
    href: string;
    label: string;
    currentPath: string;
}

function NavItem({href, label, currentPath}: NavItemProps) {
    return (
        <Link
            href={href}
            className={`${styles.menuItem} ${currentPath === href ? styles.menuCurrent : ''}`}
            aria-label={label}
        >
            {label}
        </Link>
    );
}
