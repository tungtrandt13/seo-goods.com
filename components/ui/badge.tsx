/**
 * Reusable Badge Component
 * Used for product labels like HOT, SALE, discounts
 */

import { cn } from '@/lib/utils';

interface BadgeProps {
    children: React.ReactNode;
    variant?: 'hot' | 'sale' | 'discount' | 'default';
    className?: string;
}

const variantStyles = {
    hot: 'bg-red-500 text-white',
    sale: 'bg-orange-500 text-white',
    discount: 'bg-orange-500 text-white',
    default: 'bg-gray-500 text-white',
};

/**
 * Badge component for displaying labels and tags
 */
export function Badge({ children, variant = 'default', className }: BadgeProps) {
    return (
        <span
            className={cn(
                'rounded px-2 py-0.5 text-xs font-bold',
                variantStyles[variant],
                className
            )}
        >
            {children}
        </span>
    );
}
