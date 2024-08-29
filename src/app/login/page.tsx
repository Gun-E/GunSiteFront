"use client";

import React, {useEffect, useState} from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import {useAuth} from "@/app/context/AuthContext";

export default function Home() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            router.push('/');
        }
    }, [router]);
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://192.168.219.68:8080/login', { email, password }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const { token } = response.data;
            login(token);
            router.push('/');
        } catch (err) {
            setError('로그인 실패: 이메일 또는 비밀번호를 확인해주세요.');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 bg-white shadow-md rounded-lg">
                <h1 className="text-2xl font-bold mb-4">로그인</h1>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700">이메일</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-gray-700">비밀번호</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        로그인
                    </button>
                </form>
                <div className="mt-4 flex items-center justify-between">
                    <p className="m-0">아직 회원이 아니신가요?</p>
                    <a
                        href="/register"
                        className="py-1 px-3 bg-gray-400 text-white rounded-full hover:bg-gray-600 transition-colors duration-300"
                        aria-label="회원가입">
                        회원가입
                    </a>
                </div>
            </div>
        </div>
    );
}
