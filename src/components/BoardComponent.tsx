'use client';

import React, {useEffect, useRef} from 'react';
import styles from '@/styles/MainPage.module.css';
import Image from 'next/image';

export default function BoardComponent() {
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
        <div className="bg-white flex flex-col items-center pb-20">
            <p ref={largePRef} className={`${styles.hidden} text-3xl sm:text-4xl md:text-5xl font-medium p-10`}>
                게시판
            </p>
            <div className={styles.borderContainer}>
                <div className={styles.borderItem}><p className={styles.borderText}>자유 게시판</p></div>
                <div className={styles.borderItem}><p className={styles.borderText}>JAVA / SPRING</p></div>
                <div className={styles.borderItem}><p className={styles.borderText}>HTML / CSS</p></div>
                <div className={styles.borderItem}><p className={styles.borderText}>PYTHON / FAST API</p></div>
                <div className={styles.borderItem}><p className={styles.borderText}>JAVA SCRIPT / NODE.JS</p></div>
                <div className={styles.borderItem}><p className={styles.borderText}>DATABASE / SQL</p></div>
                <div className={styles.borderItem}><p className={styles.borderText}>REACT / NEXT.JS</p></div>
                <div className={styles.borderItem}><p className={styles.borderText}>AI</p></div>
                <div className={styles.borderItem}><p className={styles.borderText}>DATA ANALYSIS</p></div>
                <div className={styles.borderItem}><p className={styles.borderText}>CLOUD</p></div>
            </div>
        </div>
    );
}
