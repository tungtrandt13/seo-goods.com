/**
 * Hook for tracking scroll position and scroll-based UI states
 */

import { useState, useEffect, RefObject } from 'react';

interface UseScrollPositionReturn {
    isScrolled: boolean;
    scrollY: number;
}

/**
 * Track window scroll position
 * @param threshold - Scroll threshold in pixels to trigger isScrolled state
 * @returns Object with scroll states
 */
export function useScrollPosition(threshold: number = 50): UseScrollPositionReturn {
    const [isScrolled, setIsScrolled] = useState(false);
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            setScrollY(currentScrollY);
            setIsScrolled(currentScrollY > threshold);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll(); // Initial check

        return () => window.removeEventListener('scroll', handleScroll);
    }, [threshold]);

    return { isScrolled, scrollY };
}

interface UseScrollToSectionParams {
    sections: Array<{
        ref: RefObject<HTMLElement>;
        id: string;
    }>;
    offset?: number;
}

/**
 * Hook for scroll-to-section functionality with active section tracking
 * @param params - Configuration with section refs and offset
 * @returns Active section ID and scroll function
 */
export function useScrollToSection({ sections, offset = 110 }: UseScrollToSectionParams) {
    const [activeSection, setActiveSection] = useState(sections[0]?.id || '');

    useEffect(() => {
        const handleScroll = () => {
            for (const { ref, id } of sections) {
                if (ref.current) {
                    const rect = ref.current.getBoundingClientRect();
                    if (rect.top <= 120 && rect.top >= -50) {
                        setActiveSection(id);
                        break;
                    }
                }
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [sections]);

    const scrollToSection = (sectionId: string) => {
        const section = sections.find((s) => s.id === sectionId);
        if (section?.ref.current) {
            setActiveSection(sectionId);
            const offsetTop = section.ref.current.offsetTop - offset;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth',
            });
        }
    };

    return { activeSection, scrollToSection, setActiveSection };
}
