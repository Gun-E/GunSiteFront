"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function Home() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [error, setError] = useState('');
    const [emailValid, setEmailValid] = useState(true);
    const [emailAvailable, setEmailAvailable] = useState(true);
    const [phoneValid, setPhoneValid] = useState(true);
    const router = useRouter();

    // 이메일 형식 확인
    const validateEmailFormat = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };
    // 한글, 영문, 공백 허용하는 정규 표현식
    const nameRegex = /^[가-힣a-zA-Z\s]+$/;

    // 이름 유효성 검사 함수
    const validateName = (name: string) => {
        return nameRegex.test(name);
    };
    // 이메일 중복 검사
    const checkEmailAvailability = async (email: string): Promise<boolean> => {
        try {
            const response = await axios.post('https://gun-site-6fce5a54a3c1.herokuapp.com/user/email-duplicate-check', { email }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            return response.data;
        } catch (err) {
            console.error('이메일 중복 검사 실패:', err);
            return false;
        }
    };

    const validatePhoneFormat = (phone: string) => {
        const phoneRegex = /^\d{10,11}$/; // 한국 전화번호 형식: 10~11자리 숫자
        return phoneRegex.test(phone);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email || !password || !confirmPassword || !name || !phone) {
            setError('입력란은 비워둘 수 없습니다. 모든 필드를 입력해주세요.');
            return;
        }

        if (!validateEmailFormat(email)) {
            setEmailValid(false);
            setError('올바른 이메일 형식이 아닙니다.');
            return;
        }
        if (!validateName(name)) {
            setError('이름은 한글 또는 영문으로만 입력해주세요.');
            return;
        }
        const isEmailAvailable = await checkEmailAvailability(email);
        if (isEmailAvailable) {
            setEmailAvailable(false);
            setError('이미 사용 중인 이메일입니다.');
            return;
        }

        if (password.length < 8 || password.length > 14) {
            setError('비밀번호는 8자에서 14자 사이여야 합니다.');
            return;
        }

        if (password !== confirmPassword) {
            setError('비밀번호가 일치하지 않습니다.');
            return;
        }

        if (!validatePhoneFormat(phone)) {
            setPhoneValid(false);
            setError('올바른 전화번호 형식이 아닙니다.');
            return;
        }

        try {
            const response = await axios.post('https://gun-site-6fce5a54a3c1.herokuapp.com/user/register', { email, password, name, phone }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            router.push('/login');
        } catch (err) {
            setError('회원가입 실패 다시 시도해주세요.');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 bg-white shadow-md rounded-lg">
                <h1 className="text-2xl font-bold mb-4">회원가입</h1>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700">이메일</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={async (e) => {
                                setEmail(e.target.value);
                                setEmailValid(true);
                                setEmailAvailable(true);
                            }}
                            className={`w-full px-3 py-2 border ${emailValid && emailAvailable ? 'border-gray-300' : 'border-red-500'} rounded`}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-gray-700">비밀번호</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="confirmPassword" className="block text-gray-700">비밀번호 확인</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-gray-700">이름</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="phone" className="block text-gray-700">전화번호</label>
                        <input
                            type="tel"
                            id="phone"
                            value={phone}
                            onChange={(e) => {
                                setPhone(e.target.value);
                                setPhoneValid(true);
                            }}
                            className={`w-full px-3 py-2 border ${phoneValid ? 'border-gray-300' : 'border-red-500'} rounded`}
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-green-500 text-white rounded hover:bg-green-600"
                    >
                        회원가입
                    </button>
                </form>
                <div className="mt-4 flex items-center justify-between">
                    <p className="m-0">이미 회원이신가요?</p>
                    <a
                        href="/login"
                        className="py-1 px-3 bg-gray-400 text-white rounded-full hover:bg-gray-600 transition-colors duration-300"
                        aria-label="로그인">
                        로그인
                    </a>
                </div>
            </div>
        </div>
    );
}
