"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { jwtDecode } from "jwt-decode";

interface AuthContextType {
    isLoggedIn: boolean;
    userId: number | null;
    login: (token: string) => void;
    logout: () => void;
    isAdmin: boolean;
}

interface DecodedToken {
    userId: number;
    roles: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userId, setUserId] = useState<number | null>(null);
    const [isAdmin, setIsAdmin] = useState(false);

    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decodedToken: DecodedToken = jwtDecode(token);
                setUserId(decodedToken.userId);
                setIsAdmin(decodedToken.roles==="ROLE_ADMIN");
                setIsLoggedIn(true);
            } catch (error) {
                console.error("Invalid token", error);
                setIsLoggedIn(false);
            }
        }
    }, []);

    const login = (token: string) => {
        localStorage.setItem('token', token);
        try {
            const decodedToken: DecodedToken = jwtDecode(token);
            setUserId(decodedToken.userId);
            setIsAdmin(decodedToken.roles==="ROLE_ADMIN");
            setIsLoggedIn(true);
        } catch (error) {
            console.error("Invalid token", error);
            setIsLoggedIn(false);
        }
        router.push('/');
    };

    const logout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        setUserId(null);
        setIsAdmin(false);
        router.push('/login');
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, userId, login, logout, isAdmin }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth는 AuthProvider 내에서 사용해야 합니다.');
    }
    return context;
};
