"use client";
import Link from 'next/link';
import {FaGithub, FaInstagram} from 'react-icons/fa';
import Image from "next/image";
import {useState} from "react";

const Footer = () => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <footer className="bg-white text-gray-500 py-8 px-10 max-w-[1140px] mx-auto">
            <div className="flex items-center space-x-4">
                <Link href="https://github.com/Gun-E" target="_blank" className="text-gray-500 hover:text-gray-700">
                    <FaGithub size={24}/>
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
                        style={{objectFit: 'cover'}}
                        width={24}
                        height={24}
                    />
                </Link>
                <Link href="https://www.instagram.com/9un.99/" target="_blank"
                      className="hover:text-gray-700"> {/* Change href to Instagram */}
                    <FaInstagram size={24}/>
                </Link>
            </div>
            
            <div className="container flex mt-3">
                <p>&copy; 2024 GunSite. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
