import Link from 'next/link';
import {FaGithub, FaTwitter, FaLinkedin, FaCode} from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-white text-gray-500 py-6 px-11">
            <div className="container mx-auto flex justify-between">
                <div className="flex items-center">
                    <Link href="/" className="flex items-center text-xl">
                        <span className="text-2xl font-bold">GunSite</span>
                        <FaCode className="ml-2 text-sky-700"/>
                    </Link>
                </div>
                <div className="flex space-x-4">
                    <Link href="https://github.com/Gun-E" target="_blank" className="hover:text-gray-700">
                        <FaGithub size={24} />
                    </Link>
                    <Link href="https://twitter.com" target="_blank" className="hover:text-gray-700">
                        <FaTwitter size={24} />
                    </Link>
                    <Link href="https://linkedin.com" target="_blank" className="hover:text-gray-700">
                        <FaLinkedin size={24} />
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
