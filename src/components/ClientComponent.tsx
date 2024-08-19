'use client';

import { useEffect, useRef } from 'react';
import styles from '@/styles/MainPage.module.css';

export default function Home() {
    const largePRef = useRef<HTMLParagraphElement | null>(null);
    const smallPRef = useRef<HTMLParagraphElement | null>(null);

    useEffect(() => {
        const largePElement = largePRef.current;
        const smallPElement = smallPRef.current;

        const animateElement = (element: HTMLParagraphElement, delay: number, isVisible: boolean) => {
            if (element) {
                if (isVisible) {
                    element.classList.remove(styles.fadeOut);
                    element.classList.add(styles.fadeIn);
                } else {
                    element.classList.remove(styles.fadeIn);
                    element.classList.add(styles.fadeOut);
                }
                element.style.animationDelay = `${delay}s`;
            }
        };

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        if (entry.target === largePElement) {
                            animateElement(largePElement, 0, true);
                        } else if (entry.target === smallPElement) {
                            animateElement(smallPElement, 0.6, true);
                        }
                    } else {
                        if (entry.target === largePElement) {
                            animateElement(largePElement, 0, false);
                        } else if (entry.target === smallPElement) {
                            animateElement(smallPElement, 0.6, false);
                        }
                    }
                });
            },
            { rootMargin: '0px', threshold: 0.1 }
        );

        if (largePElement) {
            observer.observe(largePElement);
        }

        if (smallPElement) {
            observer.observe(smallPElement);
        }

        return () => {
            if (largePElement) {
                observer.unobserve(largePElement);
            }
            if (smallPElement) {
                observer.unobserve(smallPElement);
            }
        };
    }, []);

    return (
        <div className={`bg-blue-200 p-14`}>
            <p ref={largePRef} className={`${styles.hidden} text-xl mb-2`}>
                강건의 사이트 입니다.
            </p>
            <p ref={smallPRef} className={`${styles.hidden} text-sm`}>
                사이트에 오신 걸 환영합니다.
            </p>
        </div>
    );
}
