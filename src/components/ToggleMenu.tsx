"use client"

import React, {useEffect} from "react";
import styles from "@/styles/Header.module.css";
import {FaTimes} from "react-icons/fa";
import Link from "next/link";
import ReactDOM from "react-dom";

interface ToggleMenuProps {
    isOpen: boolean;
    isLoggedIn: boolean;
    onClose: () => void;
    handleLogout: () => void;
    pathname: string;
}

const ToggleMenu = ({isOpen, isLoggedIn, onClose, handleLogout, pathname}: ToggleMenuProps) => {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const renderLink = (href: string, label: string) => {
        const isActive = pathname === href;
        return (
            <Link
                href={href}
                className={`${styles.menuToggleListA} ${isActive ? styles.menuCurrent : styles.menuDefault}`}
                aria-label={`${label} 페이지`}
                onClick={onClose}
            >
                {label}
            </Link>
        );
    };

    return ReactDOM.createPortal(
        <div className={`${styles.modalOverlay} ${isOpen ? styles.modalOpen : styles.modalClose}`}>
            <div className={styles.menuCloseButton}>
                <button onClick={onClose} className={styles.menuToggle}>
                    <FaTimes className="text-2xl"/>
                </button>
            </div>
            <div className={styles.menuToggleList}>
                {renderLink("/", "홈")}
                {renderLink("/board", "게시판")}
                {renderLink("/about", "소개")}
                {isLoggedIn ? (
                    <button onClick={handleLogout} className={styles.toggle_login_button} aria-label="로그아웃">
                        로그아웃
                    </button>
                ) : (
                    <Link href="/login" onClick={handleLogout} className={styles.toggle_login_button}
                          aria-label="로그인">
                        로그인
                    </Link>
                )}
            </div>
        </div>
        ,
        document.body
    );
};

export default ToggleMenu;
