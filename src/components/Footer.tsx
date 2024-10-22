"use client";
import Link from 'next/link';
import { FaGithub, FaTwitter, FaInstagram, FaCode } from 'react-icons/fa'; // Import FaInstagram
import Image from "next/image";
import { useState } from "react";

const Footer = () => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <footer className="bg-white text-gray-500 py-6 px-11">
            <div className="container mx-auto flex justify-between">
                <div className="flex items-center">
                    <Link href="/" className="flex items-center logo text-2xl">
                        GunSite
                        <FaCode className="ml-2 logoBrand" />
                    </Link>
                </div>
                <div className="flex items-center space-x-4">
                    <Link href="https://github.com/Gun-E" target="_blank" className="text-gray-500 hover:text-gray-700">
                        <FaGithub size={24} />
                    </Link>
                    <Link
                        href="https://nextjs-server-lac.vercel.app"
                        target="_blank"
                        className="text-gray-500"
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                    >
                        <Image
                            src={isHovered ? "/images/modii.png" : "/images/modiiHover.png"}
                            alt="modii icon"
                            style={{ objectFit: 'cover' }}
                            width={24}
                            height={24}
                        />
                    </Link>
                    <Link href="https://www.instagram.com/9un.99/" target="_blank" className="hover:text-gray-700"> {/* Change href to Instagram */}
                        <FaInstagram size={24} />
                    </Link>
                </div>
            </div>
            <div className="container mx-auto flex mt-3">
                <p>&copy; 2024 GunSite. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
