export default function Footer() {
    return (
        <footer className="w-full py-10 border-t border-white/10 bg-black flex justify-center items-center text-sm text-gray-500 font-light">
            <p>© {new Date().getFullYear()} Kang Geon. All rights reserved.</p>
        </footer>
    );
}