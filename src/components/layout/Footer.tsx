export default function Footer() {
    return (
        <footer className="flex w-full items-center justify-center border-t border-blue-400/10 bg-black py-10 text-sm font-light text-gray-500">
            <p>© {new Date().getFullYear()} Kang Geon. All rights reserved.</p>
        </footer>
    );
}
