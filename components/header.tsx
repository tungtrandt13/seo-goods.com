'use client';

import Link from 'next/link';
import { Search, ShoppingCart, Menu } from 'lucide-react';
import { useCart } from '@/context/cart-context';

export function Header() {
    const { totalItems } = useCart();

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-white shadow-sm">
            <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 text-2xl font-bold text-gray-900">
                    <span className="text-blue-600">SEO</span>Goods
                </Link>

                {/* Search Bar - Hidden on mobile, visible on desktop */}
                <div className="hidden flex-1 items-center justify-center px-8 md:flex">
                    <div className="relative w-full max-w-md">
                        <input
                            type="text"
                            placeholder="Tìm kiếm sản phẩm..."
                            className="w-full rounded-full border border-gray-300 bg-gray-50 py-2 pl-4 pr-10 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                        <button className="absolute right-0 top-0 flex h-full w-10 items-center justify-center text-gray-500 hover:text-blue-600">
                            <Search className="h-5 w-5" />
                        </button>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-4">
                    <button className="md:hidden text-gray-600">
                        <Search className="h-6 w-6" />
                    </button>

                    <Link href="/cart" className="relative flex items-center justify-center text-gray-600 hover:text-blue-600">
                        <ShoppingCart className="h-6 w-6" />
                        {totalItems > 0 && (
                            <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                                {totalItems}
                            </span>
                        )}
                    </Link>

                    <button className="md:hidden text-gray-600">
                        <Menu className="h-6 w-6" />
                    </button>
                </div>
            </div>
        </header>
    );
}
