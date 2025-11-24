/**
 * Utility functions
 * Shared helper functions used throughout the application
 */

import { CURRENCY, LOCALE } from './constants';
import { type ClassValue, clsx } from 'clsx';

/**
 * Format a number as Vietnamese currency (VND)
 * @param amount - The amount to format
 * @returns Formatted currency string
 * @example formatCurrency(1000000) => "1.000.000 ₫"
 */
export function formatCurrency(amount: number): string {
    return new Intl.NumberFormat(LOCALE, {
        style: 'currency',
        currency: CURRENCY,
    }).format(amount);
}

/**
 * Calculate discount percentage
 * @param originalPrice - Original price
 * @param salePrice - Sale price
 * @returns Discount percentage rounded to nearest integer
 * @example calculateDiscount(10000, 8000) => 20
 */
export function calculateDiscount(originalPrice: number, salePrice: number): number {
    if (originalPrice <= 0 || salePrice >= originalPrice) return 0;
    return Math.round(((originalPrice - salePrice) / originalPrice) * 100);
}

/**
 * Merge class names conditionally (similar to shadcn/ui's cn utility)
 * Uses clsx for combining classes
 * @param inputs - Class values to merge
 * @returns Merged class string
 */
export function cn(...inputs: ClassValue[]): string {
    return clsx(inputs);
}

/**
 * Format card number with spaces every 4 digits
 * @param value - Card number string
 * @returns Formatted card number
 * @example formatCardNumber("1234567890123456") => "1234 5678 9012 3456"
 */
export function formatCardNumber(value: string): string {
    const cleaned = value.replace(/\s/g, '');
    const formatted = cleaned.match(/.{1,4}/g)?.join(' ') || cleaned;
    return formatted;
}

/**
 * Format card expiry as MM/YY
 * @param value - Expiry string
 * @returns Formatted expiry
 * @example formatCardExpiry("1225") => "12/25"
 */
export function formatCardExpiry(value: string): string {
    let cleaned = value.replace(/\D/g, '');
    if (cleaned.length >= 2) {
        cleaned = cleaned.slice(0, 2) + '/' + cleaned.slice(2, 4);
    }
    return cleaned;
}

/**
 * Truncate text to specified length with ellipsis
 * @param text - Text to truncate
 * @param maxLength - Maximum length
 * @returns Truncated text
 */
export function truncate(text: string, maxLength: number): string {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
}

/**
 * Debounce function calls
 * @param func - Function to debounce
 * @param wait - Wait time in milliseconds
 * @returns Debounced function
 */
export function debounce<T extends (...args: any[]) => any>(
    func: T,
    wait: number
): (...args: Parameters<T>) => void {
    let timeout: NodeJS.Timeout;
    return (...args: Parameters<T>) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), wait);
    };
}

/**
 * Check if value is defined (not null or undefined)
 */
export function isDefined<T>(value: T | null | undefined): value is T {
    return value !== null && value !== undefined;
}
