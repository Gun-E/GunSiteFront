"use client";

import styles from "@/styles/Header.module.css";
import {FaCode} from "react-icons/fa";
import { BiMenu } from "react-icons/bi";
import Link from "next/link";
import {usePathname} from "next/navigation";
import {useState} from "react";
import ToggleMenu from "./ToggleMenu";

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const pathname = usePathname();

    const toggleMenu = () => {
        setIsMenuOpen(prev => !prev);
    };

    return (
        <nav className={styles.headerNavbar}>
            <Link href="/">
                <FaCode className="logoBrand" aria-hidden="true"/>
            </Link>

            <div className={styles.menuList}>
                <NavItem href="/" label="홈" currentPath={pathname}/>
                <NavItem href="/about" label="소개" currentPath={pathname}/>
            </div>

            <button onClick={toggleMenu} aria-label="메뉴 토글" className={styles.menuToggle}>
                <BiMenu className="text-3xl"/>
            </button>

            <ToggleMenu isOpen={isMenuOpen} onClose={toggleMenu} pathname={pathname}/>
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
