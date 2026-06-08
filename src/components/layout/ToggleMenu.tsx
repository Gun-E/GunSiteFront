"use client";

import React, { useEffect } from "react";
import { BiX } from "react-icons/bi";
import Link from "next/link";
import ReactDOM from "react-dom";

interface ToggleMenuProps {
    isOpen: boolean;
    onClose: () => void;
    pathname: string;
}

const ToggleMenu = ({ isOpen, onClose, pathname }: ToggleMenuProps) => {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
        return () => { document.body.style.overflow = "auto"; };
    }, [isOpen]);

    if (!isOpen) return null;

    const renderLink = (href: string, label: string) => {
        const isActive = pathname === href;
        return (
            <Link
                href={href}
                className={`text-5xl font-bold tracking-tighter transition-colors ${isActive ? 'text-blue-300' : 'text-gray-600 hover:text-gray-300'}`}
                onClick={onClose}
            >
                {label}
            </Link>
        );
    };

    return ReactDOM.createPortal(
        <div className={`fixed inset-0 z-[9999] bg-black/95 backdrop-blur-3xl flex flex-col justify-center items-center transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
            <button onClick={onClose} className="absolute top-6 right-6 md:top-10 md:right-10 text-white p-2">
                <BiX className="text-5xl" />
            </button>
            <div className="flex flex-col gap-12 text-center">
                {renderLink("/", "Home")}
                {renderLink("/about", "Career")}
            </div>
        </div>,
        document.body
    );
};

export default ToggleMenu;
