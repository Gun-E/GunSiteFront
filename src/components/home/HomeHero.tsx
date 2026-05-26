'use client';

import React, { useRef } from 'react';
import styles from '@/styles/MainPage.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

export default function HomeHero() {
    const elementsRef = useRef<Record<string, HTMLElement | null>>({
        largeP: null,
        smallP: null,
        button: null,
    });

    useIntersectionObserver(elementsRef, {
        fadeIn: styles.fadeIn,
        fadeOut: styles.fadeOut,
    });

    return (
        <section className="bg-blue-50">
            <div className="relative flex justify-between items-center px-10 max-w-[1140px] mx-auto h-screen">
                <div className="absolute inset-0 z-10 w-full flex items-center justify-end pr-9">
                    <Image
                        src="/images/image.svg"
                        alt="Background landscape"
                        className="w-2/5 object-contain opacity-70"
                        width={1600}
                        height={900}
                        priority
                    />
                </div>
                <div className="flex flex-col space-y-3 sm:space-y-5 md:space-y-6 lg:space-y-8 xl:space-y-10 relative z-10">
                    <h1
                        ref={(el) => { elementsRef.current.largeP = el; }}
                        className={`${styles.hidden} text-lg sm:text-2xl md:text-3xl font-bold`}
                    >
                        강건의 <br />개발 사이트 입니다.
                    </h1>
                    <p
                        ref={(el) => { elementsRef.current.smallP = el; }}
                        className={`${styles.hidden} text-xs sm:text-sm md:text-lg`}
                    >
                        사이트에 오신 걸 환영합니다.<br />
                        현재 페이지 개발 중 입니다 !!
                    </p>
                    <Link
                        ref={(el) => { elementsRef.current.button = el; }}
                        href="https://github.com/Gun-E/GunSiteFront"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${styles.hidden} flex items-center justify-center w-16 px-4 py-1 bg-button text-white font-semibold rounded-full shadow-md duration-300 hover:bg-blue-700`}
                    >
                        코드
                    </Link>
                </div>
            </div>
        </section>
    );
}
