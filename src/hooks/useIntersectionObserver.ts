import { useEffect } from 'react';

export function useIntersectionObserver(
    elementsRef: React.MutableRefObject<Record<string, HTMLElement | null>>,
    animationStyles: Record<string, string>,
    threshold: number = 0.1
) {
    useEffect(() => {
        const elements = elementsRef.current;

        const animateElement = (element: HTMLElement | null, delay: number, isVisible: boolean) => {
            if (element) {
                element.classList.toggle(animationStyles.fadeIn, isVisible);
                element.classList.toggle(animationStyles.fadeOut, !isVisible);
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
            { rootMargin: '0px', threshold }
        );

        Object.values(elements).forEach((element) => {
            if (element) observer.observe(element);
        });

        return () => {
            Object.values(elements).forEach((element) => {
                if (element) observer.unobserve(element);
            });
        };
    }, [elementsRef, animationStyles, threshold]);
}