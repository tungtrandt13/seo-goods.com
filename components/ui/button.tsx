/**
 * Reusable Button Component
 * Provides consistent button styling across the application
 */

import { cn } from '@/lib/utils';
import { ButtonHTMLAttributes, forwardRef } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'gradient';
    size?: 'sm' | 'md' | 'lg';
    children: React.ReactNode;
}

const variantStyles = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'bg-gray-600 text-white hover:bg-gray-700',
    outline: 'border-2 border-blue-600 text-blue-600 hover:bg-blue-50',
    ghost: 'text-gray-600 hover:bg-gray-100',
    gradient: 'bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 text-white shadow-lg shadow-orange-300/50',
};

const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-6 py-2.5 text-base',
    lg: 'px-8 py-3 text-lg',
};

/**
 * Button component with multiple variants and sizes
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ variant = 'primary', size = 'md', className, children, ...props }, ref) => {
        return (
            <button
                ref={ref}
                className={cn(
                    'rounded-full font-bold transition-colors disabled:opacity-50 disabled:cursor-not-allowed',
                    variantStyles[variant],
                    sizeStyles[size],
                    className
                )}
                {...props}
            >
                {children}
            </button>
        );
    }
);

Button.displayName = 'Button';
