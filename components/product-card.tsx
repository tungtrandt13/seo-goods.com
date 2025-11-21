'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/context/cart-context';

interface ProductCardProps {
    id: string | number;
    name: string;
    price: number;
    originalPrice?: number;
    image: string;
    isHot?: boolean;
    isSale?: boolean;
}

export function ProductCard({ id, name, price, originalPrice, image, isHot, isSale }: ProductCardProps) {
    const { addToCart } = useCart();
    const discount = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;

    const handleAddToCart = () => {
        addToCart({ id, name, price, image });
        // Optional: Add toast notification here
    };

    return (
        <div className="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white transition-shadow hover:shadow-lg">
            {/* Badges */}
            <div className="absolute left-2 top-2 z-10 flex flex-col gap-1">
                {isHot && (
                    <span className="rounded bg-red-500 px-2 py-0.5 text-xs font-bold text-white">
                        HOT
                    </span>
                )}
                {isSale && discount > 0 && (
                    <span className="rounded bg-orange-500 px-2 py-0.5 text-xs font-bold text-white">
                        -{discount}%
                    </span>
                )}
            </div>

            {/* Image */}
            <Link href={`/product/${id}`} className="relative aspect-square w-full overflow-hidden bg-gray-100">
                {/* Note: Using a placeholder if image fails, but for now assuming valid URLs or local images */}
                <Image
                    src={image}
                    alt={name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
            </Link>

            {/* Content */}
            <div className="flex flex-1 flex-col p-4">
                <h3 className="mb-2 text-sm font-medium text-gray-900 line-clamp-2 group-hover:text-blue-600">
                    <Link href={`/product/${id}`}>
                        {name}
                    </Link>
                </h3>

                <div className="mt-auto flex items-end justify-between">
                    <div className="flex flex-col">
                        <span className="text-lg font-bold text-red-600">
                            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price)}
                        </span>
                        {originalPrice && originalPrice > price && (
                            <span className="text-xs text-gray-400 line-through">
                                {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(originalPrice)}
                            </span>
                        )}
                    </div>

                    <button
                        onClick={handleAddToCart}
                        className="rounded-full bg-blue-50 p-2 text-blue-600 transition-colors hover:bg-blue-600 hover:text-white"
                    >
                        <ShoppingCart className="h-5 w-5" />
                    </button>
                </div>
            </div>
        </div>
    );
}
