'use client';

import React, { useEffect, useRef } from 'react';
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
                    const { isIntersecting, target } = entry;
                    if (target === elements.largeP) {
                        animateElement(elements.largeP, 0, isIntersecting);
                    } else if (target === elements.smallP) {
                        animateElement(elements.smallP, 0.6, isIntersecting);
                    } else if (target === elements.button) {
                        animateElement(elements.button, 1.0, isIntersecting);
                    }
                });
            },
            { rootMargin: '0px', threshold: 0.1 }
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
        <div className="relative bg-my-gray flex justify-between items-center backdrop-blur-lg">
            <div className="absolute top-11 left-7 sm:top-16 sm:left-14 md:left-20 lg:left-36 xl:left-52">
                <p ref={largePRef} className={`${styles.hidden} text-lg sm:text-2xl md:text-3xl font-bold mb-3`}>
                    강건의 <br />개발 사이트 입니다.
                </p>
                <p ref={smallPRef} className={`${styles.hidden} text-xs sm:text-sm md:text-lg mb-3`}>
                    사이트에 오신 걸 환영합니다.<br />
                    현재 페이지 개발 중 입니다 !!
                </p>
                <Link
                    ref={buttonRef}
                    href="https://github.com/Gun-E/GunSiteFront"
                    className={`${styles.hidden} px-4 py-1 bg-brown text-white font-semibold rounded-full shadow-md duration-300`}>
                    코드
                </Link>
            </div>
            <div className="flex flex-col"></div>
            <div className="flex flex-col md:pr-20 lg:pr-36 xl:pr-52">
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
