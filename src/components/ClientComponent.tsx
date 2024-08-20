'use client';

import { useEffect, useRef } from 'react';
import styles from '@/styles/MainPage.module.css';

export default function Home() {
    const largePRef = useRef<HTMLParagraphElement | null>(null);
    const smallPRef = useRef<HTMLParagraphElement | null>(null);
    const buttonRef = useRef<HTMLButtonElement | null>(null);

    useEffect(() => {
        const largePElement = largePRef.current;
        const smallPElement = smallPRef.current;
        const buttonElement = buttonRef.current;

        const animateElement = (element: HTMLElement | null, delay: number, isVisible: boolean) => {
            if (element) {
                const action = isVisible ? 'add' : 'remove';
                element.classList[action](styles.fadeIn);
                element.classList[action === 'add' ? 'remove' : 'add'](styles.fadeOut);
                element.style.animationDelay = `${delay}s`;
            }
        };

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    const { isIntersecting, target } = entry;
                    if (target === largePElement) {
                        animateElement(largePElement, 0, isIntersecting);
                    } else if (target === smallPElement) {
                        animateElement(smallPElement, 0.6, isIntersecting);
                    } else if (target === buttonElement) {
                        animateElement(buttonElement, 1.0, isIntersecting);
                    }
                });
            },
            { rootMargin: '0px', threshold: 0.1 }
        );

        if (largePElement) observer.observe(largePElement);
        if (smallPElement) observer.observe(smallPElement);
        if (buttonElement) observer.observe(buttonElement);

        return () => {
            if (largePElement) observer.unobserve(largePElement);
            if (smallPElement) observer.unobserve(smallPElement);
            if (buttonElement) observer.unobserve(buttonElement);
        };
    }, []);

    return (
        <div className="bg-sky-200 p-14">
            <p ref={largePRef} className={`${styles.hidden} text-2xl font-bold mb-3`}>
                강건의 개발 사이트 입니다.
            </p>
            <p ref={smallPRef} className={`${styles.hidden} text-sm mb-3`}>
                사이트에 오신 걸 환영합니다.<br/>
                현재 페이지 개발 중 입니다 !!
            </p>
            <button
                ref={buttonRef}
                className={`${styles.hidden} px-4 py-1.5 bg-sky-500 text-white font-semibold rounded-lg shadow-md hover:bg-sky-600`}>
                버튼
            </button>
        </div>
    );
}
