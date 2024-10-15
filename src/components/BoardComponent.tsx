'use client';

import React, { useEffect, useRef } from 'react';
import styles from '@/styles/MainPage.module.css';

export default function BoardComponent() {
    const largePRef = useRef<HTMLParagraphElement | null>(null);
    const smallPRef = useRef<HTMLParagraphElement | null>(null);
    const buttonRef = useRef<HTMLButtonElement | null>(null);
    const borderItemsRef = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        const elements = {
            largeP: largePRef.current,
            smallP: smallPRef.current,
            button: buttonRef.current,
            borderItems: borderItemsRef.current,
        };

        const animateElement = (element: HTMLElement | null, delay: number, isVisible: boolean, animationType: string) => {
            if (element) {
                if (animationType === 'fade') {
                    element.classList.toggle(styles.fadeIn, isVisible);
                    element.classList.toggle(styles.fadeOut, !isVisible);
                } else if (animationType === 'flip') {
                    element.classList.toggle(styles.flipIn, isVisible);
                    element.classList.toggle(styles.itemHidden, !isVisible);
                }
                element.style.animationDelay = `${delay}s`;
            }
        };

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    const { isIntersecting, target } = entry;

                    if (target === elements.largeP) {
                        animateElement(elements.largeP, 0, isIntersecting, 'fade');
                    } else if (target === elements.smallP) {
                        animateElement(elements.smallP, 0.2, isIntersecting, 'fade');
                    } else if (elements.borderItems.includes(target as HTMLDivElement)) {
                        const index = elements.borderItems.indexOf(target as HTMLDivElement);
                        if (index !== -1) {
                            const isFirstItem = index % 2 === 0;
                            if (isFirstItem) {
                                const nextIndex = index + 1;
                                animateElement(elements.borderItems[index], index * 0.2, isIntersecting, 'flip'); // 현재 아이템
                                if (nextIndex < elements.borderItems.length) {
                                    animateElement(elements.borderItems[nextIndex], index * 0.2, isIntersecting, 'flip'); // 다음 아이템
                                }
                            }
                        }
                    }
                });
            },
            { rootMargin: '0px', threshold: 0.1 }
        );

        [elements.largeP, elements.smallP].forEach((element) => {
            if (element) observer.observe(element);
        });

        elements.borderItems.forEach((item) => {
            if (item) observer.observe(item!);
        });

        return () => {
            [elements.largeP, elements.smallP, ...elements.borderItems].forEach((element) => {
                if (element) observer.unobserve(element!);
            });
        };
    }, []);

    return (
        <div className="bg-white flex flex-col items-center pb-20">
            <div className="flex flex-col p-10 justify-center items-center">
                <p ref={largePRef}
                   className={`${styles.hidden} text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium mb-5`}>
                    게시판
                </p>
                <p ref={smallPRef} className={`${styles.hidden} text-xs sm:text-sm md:text-lg`}>
                    자유 글 및 공부 자료를 작성할 수 있는 게시판입니다
                </p>
            </div>
            <div className={styles.borderContainer}>
                {["자유 게시판", "JAVA / SPRING", "HTML / CSS", "PYTHON / FAST API",
                    "JAVA SCRIPT / NODE.JS", "DATABASE / SQL", "REACT / NEXT.JS",
                    "DATA ANALYSIS", "CLOUD", "AI"].map((text, idx) => (
                    <div
                        ref={el => {
                            borderItemsRef.current[idx] = el;
                            return undefined;
                        }}
                        className={`${styles.borderItem} ${styles.itemHidden}`}
                        key={idx}>
                        <p className={styles.borderText}>{text}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
