"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useAuth } from "@/app/context/AuthContext";
import styles from '@/styles/Login.module.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

export default function Home() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);

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
        <div className={styles.loginContainer}>
            <div className={styles.loginFormContainer}>
                <h1 className="text-3xl font-black mb-4 text-center">GunSite 계정</h1>
                <h3 className="text-sm text-gray-700 font-black mb-16 text-center">GunSite 계정으로 로그인</h3>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <form className="w-full" onSubmit={handleSubmit}>
                    <div className="mb-5">
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:border-blue-700 transition-colors duration-300"
                            placeholder="이메일 또는 전화번호"
                        />
                    </div>
                    <div className="mb-12 relative"> {/* relative 추가 */}
                        <input
                            type={showPassword ? 'text' : 'password'} // 타입 변경
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:border-blue-700 transition-colors duration-300"
                            placeholder="암호"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" // 버튼 위치 조정
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-blue-500 text-white rounded-xl hover:bg-blue-600"
                    >
                        로그인
                    </button>
                </form>
                <div className="mt-12">
                    <a
                        href="/register"
                        className="py-1 px-3 text-blue-700 hover:text-blue-400 transition-colors duration-300"
                        aria-label="회원가입">
                        아직 회원이 아니신가요?
                    </a>
                </div>
            </div>
        </div>
    );
}
