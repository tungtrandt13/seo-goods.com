'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Trash2, Plus, Minus, ArrowLeft } from 'lucide-react';
import { useCart } from '@/context/cart-context';

export default function CartPage() {
    const { items, removeFromCart, updateQuantity, totalPrice } = useCart();

    if (items.length === 0) {
        return (
            <div className="container mx-auto flex min-h-[60vh] flex-col items-center justify-center px-4 py-16 text-center">
                <div className="mb-6 rounded-full bg-gray-100 p-6">
                    <Trash2 className="h-12 w-12 text-gray-400" />
                </div>
                <h2 className="mb-2 text-2xl font-bold text-gray-900">Giỏ hàng trống</h2>
                <p className="mb-8 text-gray-500">Bạn chưa thêm sản phẩm nào vào giỏ hàng.</p>
                <Link
                    href="/"
                    className="rounded-full bg-blue-600 px-8 py-3 font-bold text-white transition hover:bg-blue-700"
                >
                    Tiếp tục mua sắm
                </Link>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8 md:px-6">
            <h1 className="mb-8 text-2xl font-bold text-gray-900">Giỏ hàng của bạn</h1>

            <div className="grid gap-8 lg:grid-cols-3">
                {/* Cart Items List */}
                <div className="lg:col-span-2">
                    <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
                        <ul className="divide-y divide-gray-200">
                            {items.map((item) => (
                                <li key={item.id} className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center">
                                    {/* Image */}
                                    <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                        <Image
                                            src={item.image}
                                            alt={item.name}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>

                                    {/* Info */}
                                    <div className="flex flex-1 flex-col justify-between gap-4 sm:flex-row sm:items-center">
                                        <div className="flex-1">
                                            <h3 className="text-base font-medium text-gray-900">
                                                <Link href={`/product/${item.id}`} className="hover:text-blue-600">
                                                    {item.name}
                                                </Link>
                                            </h3>
                                            <p className="mt-1 text-sm font-bold text-red-600">
                                                {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.price)}
                                            </p>
                                        </div>

                                        {/* Quantity & Remove */}
                                        <div className="flex items-center justify-between gap-6 sm:justify-end">
                                            <div className="flex items-center rounded-lg border border-gray-200">
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                    className="p-2 text-gray-600 hover:bg-gray-100"
                                                    disabled={item.quantity <= 1}
                                                >
                                                    <Minus className="h-4 w-4" />
                                                </button>
                                                <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                    className="p-2 text-gray-600 hover:bg-gray-100"
                                                >
                                                    <Plus className="h-4 w-4" />
                                                </button>
                                            </div>

                                            <button
                                                onClick={() => removeFromCart(item.id)}
                                                className="text-gray-400 hover:text-red-500"
                                            >
                                                <Trash2 className="h-5 w-5" />
                                            </button>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Order Summary */}
                <div className="lg:col-span-1">
                    <div className="sticky top-24 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                        <h2 className="mb-4 text-lg font-bold text-gray-900">Tổng đơn hàng</h2>

                        <div className="mb-4 flex justify-between border-b border-gray-200 pb-4">
                            <span className="text-gray-600">Tạm tính</span>
                            <span className="font-medium text-gray-900">
                                {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalPrice)}
                            </span>
                        </div>

                        <div className="mb-6 flex justify-between">
                            <span className="text-lg font-bold text-gray-900">Tổng cộng</span>
                            <span className="text-lg font-bold text-red-600">
                                {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalPrice)}
                            </span>
                        </div>

                        <Link
                            href="/checkout"
                            className="block w-full rounded-full bg-blue-600 py-3 text-center font-bold text-white transition hover:bg-blue-700"
                        >
                            Thanh toán ngay
                        </Link>

                        <div className="mt-4 text-center">
                            <Link href="/" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-blue-600">
                                <ArrowLeft className="h-4 w-4" /> Tiếp tục mua sắm
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
