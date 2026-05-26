import type { Metadata } from "next";
import "@/styles/globals.css";
import Header from '@/components/layout/Header';
import Footer from "@/components/layout/Footer";
import React from "react";

export const metadata: Metadata = {
    title: "강건 | Full-Stack Developer",
    description: "강건의 풀스택 포트폴리오 사이트입니다.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ko" className="scroll-smooth">
            <body className="bg-black text-white antialiased">
                <Header />
                {children}
                <Footer />
            </body>
        </html>
    );
}