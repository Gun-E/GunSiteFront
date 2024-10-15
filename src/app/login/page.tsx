"use client";

import React, {useEffect, useState} from 'react';
import {useRouter} from 'next/navigation';
import axios from 'axios';
import {useAuth} from "@/app/context/AuthContext";
import {FaEye, FaEyeSlash} from 'react-icons/fa';

export default function Home() {
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const {login} = useAuth();
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            router.push('/');
        }
    }, [router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await axios.post('https://gun-site-6fce5a54a3c1.herokuapp.com/login', {id, password}, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const {token} = response.data;
            login(token);
            router.push('/');
        } catch (err) {
            if (axios.isAxiosError(err) && err.response) {
                setError(err.response.data);
            } else {
                setError('서버와 통신을 실패 했습니다. 다시 시도해주세요.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="customContainer">
            <div className="customFormContainer">
                <h1 className="text-3xl mb-4 text-center"><span className="logo">GunSite</span> 계정</h1>
                <h3 className="text-sm text-gray-700 mb-16 text-center"><span className="logo">GunSite</span> 계정으로 로그인</h3>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <form className="w-full" onSubmit={handleSubmit}>
                    <div className="mb-5">
                        <input
                            type="email"
                            id="id"
                            value={id}
                            onChange={(e) => setId(e.target.value)}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:border-blue-700 transition-colors duration-300"
                            placeholder="이메일 또는 전화번호"
                        />
                    </div>
                    <div className="mb-12 relative">
                        <input
                            type={showPassword ? 'text' : 'password'}
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
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                        >
                            {showPassword ? <FaEyeSlash/> : <FaEye/>}
                        </button>
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-2 px-4 rounded-xl text-white transition-colors duration-300 ${loading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'} flex justify-center items-center`}
                    >
                        {loading ? (
                            <div className="loader"></div>
                        ) : (
                            '로그인'
                        )}
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
