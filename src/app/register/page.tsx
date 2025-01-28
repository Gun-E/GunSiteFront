"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { FaEye, FaEyeSlash } from "react-icons/fa";

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
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const validateEmailFormat = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const nameRegex = /^[가-힣a-zA-Z\s]+$/;

    const validateName = (name: string) => {
        return nameRegex.test(name);
    };

    // 이메일 중복 검사
    const checkEmailAvailability = async (email: string): Promise<boolean> => {
        try {
            const response = await axios.post('http://15.164.28.20:8080/user/email-duplicate-check', { email }, {
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
        setLoading(true);
        if (!email || !password || !confirmPassword || !name || !phone) {
            setError('입력란은 비워둘 수 없습니다. 모든 필드를 입력해주세요.');
            setLoading(false);
            return;
        }

        if (!validateEmailFormat) {
            setError('올바른 이메일 형식이 아닙니다.');
            setLoading(false);
            return;
        }

        if (!validateName(name)) {
            setError('이름은 한글 또는 영문으로만 입력해주세요.');
            setLoading(false);
            return;
        }


        if (await checkEmailAvailability(email)) {
            setError('이미 사용 중인 이메일입니다.');
            setLoading(false);
            return;
        }

        if (password.length < 8 || password.length > 14) {
            setError('비밀번호는 8자에서 14자 사이여야 합니다.');
            setLoading(false);
            return;
        }

        if (password !== confirmPassword) {
            setError('비밀번호가 일치하지 않습니다.');
            setLoading(false);
            return;
        }

        if (!validatePhoneFormat(phone)) {
            setPhoneValid(false);
            setError('올바른 전화번호 형식이 아닙니다.');
            setLoading(false);
            return;
        }

        try {
            await axios.post('http://15.164.28.20:8080/user/register', {
                email,
                password,
                name,
                phone
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            router.push('/login');

        } catch (err) {
            if (axios.isAxiosError(err) && err.response) {
                setError(err.response.data.error || '서버 오류가 발생했습니다.');
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
                <h1 className="text-3xl mb-4 text-center"><span className="logo">GunSite</span> 계정 가입</h1>
                <h3 className="text-sm text-gray-700 mb-16 text-center"><span
                    className="logo">GunSite</span> 계정으로 모든 서비스를 이용할 수 있습니다.</h3>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <form className="w-full" onSubmit={handleSubmit}>
                    <div className="mb-5">
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                                setEmailValid(true);
                                setEmailAvailable(true);
                            }}
                            className={`w-full px-3 py-2 border ${emailValid && emailAvailable ? 'border-gray-300' : 'border-red-500'} rounded-xl focus:outline-none focus:border-blue-700 transition-colors duration-300`}
                            placeholder="이메일"
                        />
                    </div>
                    <div className="mb-5 relative">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
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
                    <div className="mb-14">
                        <input
                            type="password"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:border-blue-700 transition-colors duration-300"
                            placeholder="암호 확인"
                        />
                    </div>
                    <div className="flex justify-center mb-14">
                        <hr className="border-t border-gray-300 w-full"/>
                    </div>
                    <div className="mb-5">
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:border-blue-700 transition-colors duration-300"
                            placeholder="이름"
                        />
                    </div>
                    <div className="mb-12">
                        <input
                            type="tel"
                            id="phone"
                            value={phone}
                            onChange={(e) => {
                                setPhone(e.target.value);
                                setPhoneValid(true);
                            }}
                            className={`w-full px-3 py-2 border ${phoneValid ? 'border-gray-300' : 'border-red-500'} rounded-xl focus:outline-none focus:border-blue-700 transition-colors duration-300`}
                            placeholder="전화번호"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-2 px-4 rounded-xl text-white transition-colors duration-300 ${loading ? 'bg-gray-400' : 'bg-my-blue'} flex justify-center items-center`}
                    >
                        {loading ? (
                            <div className="loader"></div>
                        ) : (
                            '회원가입'
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
}
