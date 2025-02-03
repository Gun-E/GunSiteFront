'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import styles from '@/styles/MainPage.module.css';

export default function BoardComponent() {
    const largePRef = useRef<HTMLParagraphElement | null>(null);
    const smallPRef = useRef<HTMLParagraphElement | null>(null);
    const [index, setIndex] = useState(0);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    interface Category {
        name: string;
        path: string;
        bgImage: string;
    }

    const categories: Category[] = [
        { name: "JAVA / SPRING", path: "https://start.spring.io/", bgImage: '/images/spring.svg' },
        { name: "AWS", path: "https://aws.amazon.com/", bgImage: '/images/aws.svg' },
        { name: "ChatGPT", path: "https://chatgpt.com/", bgImage: '/images/gpt.svg' },
        { name: "Vercel", path: "https://Vercel.com/", bgImage: '/images/vercel.svg' },
        { name: "REACT", path: "https://ko.legacy.reactjs.org/", bgImage: '/images/react.svg' },
    ];

    const total = categories.length;

    const resetTimeout = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
    };

    useEffect(() => {
        resetTimeout();
        timeoutRef.current = setTimeout(() => {
            setIndex((prevIndex) => (prevIndex < total - 1 ? prevIndex + 1 : prevIndex));
        }, 6000);

        return () => {
            resetTimeout();
        };
    }, [index, total]);

    useEffect(() => {
        const elements = {
            largeP: largePRef.current,
            smallP: smallPRef.current,
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
                    }
                });
            },
            { rootMargin: '0px', threshold: 0.1 }
        );

        Object.values(elements).forEach((element) => {
            if (element) observer.observe(element);
        });

        return () => {
            Object.values(elements).forEach((element) => {
                if (element) observer.unobserve(element);
            });
        };
    }, []);

    const handleIndicatorClick = (idx: number) => {
        setIndex(idx);
    };

    const handleNext = () => {
        setIndex((prevIndex) => Math.min(prevIndex + 1, total - 1));
    };

    const handlePrev = () => {
        setIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    };

    const touchStartRef = useRef<number>(0);
    const touchEndRef = useRef<number>(0);
    const mouseStartRef = useRef<number>(0);
    const mouseEndRef = useRef<number>(0);
    const isDragging = useRef<boolean>(false);

    const handleTouchStart = (e: React.TouchEvent) => {
        touchStartRef.current = e.touches[0].clientX;
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        touchEndRef.current = e.touches[0].clientX;
    };

    const handleTouchEnd = () => {
        const threshold = 25;
        if (touchStartRef.current - touchEndRef.current > threshold) {
            handleNext();
        } else if (touchStartRef.current - touchEndRef.current < -threshold) {
            handlePrev();
        }
    };

    const handleMouseDown = (e: React.MouseEvent) => {
        mouseStartRef.current = e.clientX;
        isDragging.current = true;
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (isDragging.current) {
            mouseEndRef.current = e.clientX;
        }
    };

    const handleMouseUp = () => {
        const threshold = 25;
        if (isDragging.current) {
            if (mouseStartRef.current - mouseEndRef.current > threshold) {
                handleNext();
            } else if (mouseStartRef.current - mouseEndRef.current < -threshold) {
                handlePrev();
            }
            isDragging.current = false;
        }
    };

    return (
        <div className="bg-white flex flex-col items-center pb-20">
            <div
                className={styles.sliderContainer}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
            >
                {categories.map((category, idx) => (
                    <a
                        href={category.path}
                        target="_blank"
                        rel="noopener noreferrer"
                        key={idx}
                        draggable="false"
                    >
                        <div
                            className={`${styles.slideItem} ${index === idx ? styles.active : ''}`}
                            style={{
                                transform: `translateX(${(idx - index) * 100}%)`,
                                backgroundImage: `url(${category.bgImage})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                            }}
                        >
                        </div>
                    </a>
                ))}
            </div>

            <div className={styles.indicatorContainer}>
                {categories.map((_, idx) => (
                    <div
                        key={idx}
                        className={`${styles.indicator} ${index === idx ? styles.activeIndicator : ''}`}
                        onClick={() => handleIndicatorClick(idx)}
                    />
                ))}
            </div>
        </div>
    );
}