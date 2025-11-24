'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/context/cart-context';
import { useFormatCurrency } from '@/hooks/use-format-currency';
import { calculateDiscount } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

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
    const formatCurrency = useFormatCurrency();
    const discount = originalPrice ? calculateDiscount(originalPrice, price) : 0;

    const handleAddToCart = () => {
        addToCart({ id, name, price, image });
        // Optional: Add toast notification here
    };

    return (
        <div className="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white transition-shadow hover:shadow-lg">
            {/* Badges */}
            <div className="absolute left-2 top-2 z-10 flex flex-col gap-1">
                {isHot && <Badge variant="hot">HOT</Badge>}
                {isSale && discount > 0 && <Badge variant="discount">-{discount}%</Badge>}
            </div>

            {/* Image */}
            <Link href={`/product/${id}`} className="relative aspect-square w-full overflow-hidden bg-gray-100">
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
                            {formatCurrency(price)}
                        </span>
                        {originalPrice && originalPrice > price && (
                            <span className="text-xs text-gray-400 line-through">
                                {formatCurrency(originalPrice)}
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
