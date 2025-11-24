/**
 * Reusable Input Component
 * Provides consistent input styling with icon support
 */

import { cn } from '@/lib/utils';
import { InputHTMLAttributes, forwardRef, ReactNode } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    icon?: ReactNode;
    error?: string;
}

/**
 * Input component with optional icon and error message
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ icon, error, className, ...props }, ref) => {
        return (
            <div className="w-full">
                <div className="relative">
                    {icon && (
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            {icon}
                        </div>
                    )}
                    <input
                        ref={ref}
                        className={cn(
                            'block w-full rounded-md border border-gray-300 py-2 px-3 text-sm',
                            'focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500',
                            'disabled:bg-gray-100 disabled:cursor-not-allowed',
                            icon && 'pl-10',
                            error && 'border-red-500',
                            className
                        )}
                        {...props}
                    />
                </div>
                {error && (
                    <p className="mt-1 text-xs text-red-600">{error}</p>
                )}
            </div>
        );
    }
);

Input.displayName = 'Input';

/**
 * Textarea component with error support
 */
interface TextareaProps extends InputHTMLAttributes<HTMLTextAreaElement> {
    error?: string;
    rows?: number;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({ error, className, rows = 3, ...props }, ref) => {
        return (
            <div className="w-full">
                <textarea
                    ref={ref}
                    rows={rows}
                    className={cn(
                        'block w-full rounded-md border border-gray-300 py-2 px-3 text-sm',
                        'focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500',
                        'disabled:bg-gray-100 disabled:cursor-not-allowed',
                        error && 'border-red-500',
                        className
                    )}
                    {...props}
                />
                {error && (
                    <p className="mt-1 text-xs text-red-600">{error}</p>
                )}
            </div>
        );
    }
);

Textarea.displayName = 'Textarea';
