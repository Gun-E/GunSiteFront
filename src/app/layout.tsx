import type {Metadata} from "next";
import "@/styles/globals.css";
import Header from '@/components/Header'
import Footer from "@/components/Footer";
import {AuthProvider} from './context/AuthContext';
import React from "react";

export const metadata: Metadata = {
    title: "건 사이트",
    description: "강건의 개발 사이트 입니다.",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ko">
        <body>
        <AuthProvider>
            <Header/>
            <div className="box-border">
            {children}

            </div>
            <Footer/>
        </AuthProvider>
        </body>
        </html>
    );
}
