'use client';

import React, {useEffect, useRef} from 'react';
import styles from '@/styles/MainPage.module.css';
import Image from 'next/image';
import Link from "next/link";

export default function HomeComponent() {
    const largePRef = useRef<HTMLParagraphElement | null>(null);
    const smallPRef = useRef<HTMLParagraphElement | null>(null);
    const buttonRef = useRef<HTMLAnchorElement | null>(null);

    useEffect(() => {
        const elements = {
            largeP: largePRef.current,
            smallP: smallPRef.current,
            button: buttonRef.current
        };

        const animateElement = (element: HTMLElement | null, delay: number, isVisible: boolean) => {
            if (element) {
                element.classList.toggle(styles.fadeIn, isVisible);
                element.classList.toggle(styles.fadeOut, !isVisible);
                element.style.animationDelay = `${delay}s`;

                element.setAttribute('aria-hidden', !isVisible ? 'true' : 'false');
            }
        };

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    const {isIntersecting, target} = entry;
                    if (target === elements.largeP) {
                        animateElement(elements.largeP, 0, isIntersecting);
                    } else if (target === elements.smallP) {
                        animateElement(elements.smallP, 0.6, isIntersecting);
                    } else if (target === elements.button) {
                        animateElement(elements.button, 1.0, isIntersecting);
                    }
                });
            },
            {rootMargin: '0px', threshold: 0.1}
        );

        Object.values(elements).forEach(element => {
            if (element) observer.observe(element);
        });

        return () => {
            Object.values(elements).forEach(element => {
                if (element) observer.unobserve(element);
            });
        };
    }, []);

    return (
        <div className="bg-blue-50">
            <div
                className="relative flex justify-between items-center px-10 max-w-[1140px] mx-auto h-screen">

                <div className="absolute inset-0 z-10 w-full flex items-center justify-end pr-9">
                    <Image
                        src="/images/image.svg"
                        alt="Landscape picture"
                        className="w-2/5 object-contain opacity-70"
                        width={1600}
                        height={900}
                    />
                </div>
                <div
                    className="flex flex-col space-y-3 sm:space-y-5 md:space-y-6 lg:space-y-8 xl:space-y-10 relative z-10">
                    <h1 ref={largePRef} className={`${styles.hidden} text-lg sm:text-2xl md:text-3xl font-bold`}>
                        강건의 <br/>개발 사이트 입니다.
                    </h1>
                    <p ref={smallPRef} className={`${styles.hidden} text-xs sm:text-sm md:text-lg`}>
                        사이트에 오신 걸 환영합니다.<br/>
                        현재 페이지 개발 중 입니다 !!
                    </p>
                    <Link
                        ref={buttonRef}
                        href="https://github.com/Gun-E/GunSiteFront"
                        className={`${styles.hidden} flex items-center justify-center w-16 px-4 py-1 bg-button text-white font-semibold rounded-full shadow-md duration-300`}>
                        코드
                    </Link>
                </div>
            </div>
        </div>
    );
}
