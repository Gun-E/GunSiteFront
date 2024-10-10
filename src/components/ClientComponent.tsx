'use client';

import React, {useEffect, useRef} from 'react';
import styles from '@/styles/MainPage.module.css';
import Image from 'next/image';

export default function Home() {
    const largePRef = useRef<HTMLParagraphElement | null>(null);
    const smallPRef = useRef<HTMLParagraphElement | null>(null);
    const buttonRef = useRef<HTMLButtonElement | null>(null);

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
        <div className="relative bg-sky-200 flex justify-between items-center">
            <div className="absolute top-11 sm:top-16 left-7 sm:left-14">
                <p ref={largePRef} className={`${styles.hidden} text-lg sm:text-2xl font-bold mb-3`}>
                    강건의 <br/>개발 사이트 입니다.
                </p>
                <p ref={smallPRef} className={`${styles.hidden} text-xs sm:text-sm mb-3`}>
                    사이트에 오신 걸 환영합니다.<br/>
                    현재 페이지 개발 중 입니다 !!
                </p>
                <button
                    ref={buttonRef}
                    className={`${styles.hidden} px-4 py-1 bg-sky-500 text-white font-semibold rounded-lg shadow-md hover:bg-sky-600`}>
                    버튼
                </button>
            </div>
            <div className="flex flex-col">

            </div>
            <div className="flex flex-col">
                <Image
                    src="/images/pic.png"
                    alt="Landscape picture"
                    className="imageStyle"
                    style={{
                        objectFit: 'cover'
                    }}
                    width={400}
                    height={400}
                />
            </div>
        </div>
    );
}
