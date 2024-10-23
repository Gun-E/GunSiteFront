'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import styles from '@/styles/MainPage.module.css';

export default function BoardComponent() {
    const largePRef = useRef<HTMLParagraphElement | null>(null);
    const smallPRef = useRef<HTMLParagraphElement | null>(null);
    const [index, setIndex] = useState(0);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const categories = [
        { name: "자유 게시판", path: "/free-board", bgImage: '/images/image1.png' },
        { name: "JAVA / SPRING", path: "/java-spring", bgImage: '/images/image1.png' },
        { name: "HTML / CSS", path: "/html-css", bgImage: '/images/image1.png' },
        { name: "PYTHON / FAST API", path: "/python-fastapi", bgImage: '/images/image1.png' },
        { name: "JAVASCRIPT / NODE.JS", path: "/javascript-nodejs", bgImage: '/images/image1.png' },
        { name: "DATABASE / SQL", path: "/database-sql", bgImage: '/images/image1.png' },
        { name: "REACT / NEXT.JS", path: "/react-next", bgImage: '/images/image1.png' },
        { name: "DATA ANALYSIS", path: "/data-analysis", bgImage: '/images/image1.png' },
        { name: "CLOUD", path: "/cloud", bgImage: '/images/image1.png' },
        { name: "AI", path: "/ai", bgImage: '/images/image1.png' },
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
            setIndex((prevIndex) => (prevIndex < total - 1 ? prevIndex + 1 : prevIndex)); // 마지막 인덱스에서 더 이상 증가하지 않도록
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
        setIndex((prevIndex) => Math.min(prevIndex + 1, total - 1)); // 마지막 인덱스를 넘지 않도록 방지
    };

    const handlePrev = () => {
        setIndex((prevIndex) => Math.max(prevIndex - 1, 0)); // 첫 번째 인덱스 아래로 가지 않도록 방지
    };

    // 터치 스와이프 및 마우스 드래그 처리
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
        const threshold = 25; // 스와이프 감지 거리 줄임
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
            <div className="flex flex-col p-10 justify-center items-center">
                <p ref={largePRef}
                   className={`${styles.hidden} text-lg sm:text-2xl md:text-3xl font-bold mb-3`}>
                    BOARD
                </p>
                <p ref={smallPRef} className={`${styles.hidden} text-xs sm:text-sm md:text-lg mb-3`}>
                    자유 글 및 공부 자료를 작성할 수 있는 게시판입니다
                </p>
            </div>

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
                    <div
                        key={idx}
                        className={`${styles.slideItem} ${index === idx ? styles.active : ''}`}
                        style={{
                            transform: `translateX(${(idx - index) * 100}%)`,
                            backgroundImage: `url(${category.bgImage})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}
                    >
                        <Link href={category.path} passHref>
                            <p className={styles.slideText}>{category.name}</p>
                        </Link>
                    </div>
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
