'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, MapPin, Phone, User, ShieldCheck, CreditCard } from 'lucide-react';
import { useCart } from '@/context/cart-context';
import { useRouter } from 'next/navigation';

export default function CheckoutPage() {
    const { items, totalPrice, clearCart } = useCart();
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        address: '',
        note: '',
    });
    const [selectedColor, setSelectedColor] = useState('Đen');
    const [selectedSize, setSelectedSize] = useState('M');
    const [paymentMethod, setPaymentMethod] = useState<'cod' | 'stripe' | 'paypal'>('cod');
    const [cardDetails, setCardDetails] = useState({
        cardNumber: '',
        expiry: '',
        cvc: '',
        cardholderName: '',
    });
    const [isSuccess, setIsSuccess] = useState(false);

    // Mock variants data
    const colors = [
        { name: 'Đen', image: items[0]?.image || '', available: true },
        { name: 'Trắng', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=200', available: true },
        { name: 'Đỏ', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=200', available: true },
        { name: 'Xanh', image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=200', available: false },
    ];

    const sizes = ['S', 'M', 'L', 'XL'];

    const shippingCost = 30000;

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Simulate API call
        setTimeout(() => {
            setIsSuccess(true);
            clearCart();
        }, 1000);
    };

    if (isSuccess) {
        return (
            <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 text-center">
                <div className="mb-6 rounded-full bg-green-100 p-6">
                    <ShieldCheck className="h-16 w-16 text-green-600" />
                </div>
                <h1 className="mb-2 text-2xl font-bold text-gray-900">Đặt hàng thành công!</h1>
                <p className="mb-8 text-gray-600">
                    Cảm ơn bạn đã mua hàng. Chúng tôi sẽ liên hệ sớm để xác nhận đơn hàng.
                </p>
                <Link
                    href="/"
                    className="rounded-full bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 px-8 py-3 font-bold text-white shadow-lg shadow-orange-300/50"
                >
                    Về trang chủ
                </Link>
            </div>
        );
    }

    if (items.length === 0) {
        return (
            <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 text-center">
                <p className="mb-4 text-gray-600">Giỏ hàng trống</p>
                <Link href="/" className="text-blue-600 hover:underline">
                    Quay lại mua sắm
                </Link>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen justify-center bg-gray-100">
            <div className="w-full max-w-md bg-white pb-32">
                {/* Header */}
                <header className="sticky top-0 z-50 flex items-center bg-white px-4 py-3 shadow-sm">
                    <Link href="/cart" className="mr-4 text-gray-600">
                        <ArrowLeft className="h-6 w-6" />
                    </Link>
                    <h1 className="text-lg font-bold text-gray-900">Xác nhận đơn hàng</h1>
                </header>

                <form onSubmit={handleSubmit} className="pb-4">
                    {/* Product Image */}
                    <div className="mb-2 bg-white p-4">
                        <div className="relative aspect-square w-full overflow-hidden rounded-lg">
                            <Image
                                src={items[0]?.image || ''}
                                alt={items[0]?.name || 'Product'}
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>

                    {/* Product Details & Variants */}
                    <div className="mb-2 bg-white p-4">
                        <h2 className="mb-2 text-lg font-bold text-gray-900">{items[0]?.name}</h2>
                        <div className="mb-4 flex items-baseline gap-2">
                            <span className="text-2xl font-bold text-red-600">
                                {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(items[0]?.price || 0)}
                            </span>
                            {(items[0] as any)?.originalPrice && (
                                <span className="text-sm text-gray-400 line-through">
                                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format((items[0] as any).originalPrice)}
                                </span>
                            )}
                        </div>

                        {/* Color Selection */}
                        <div className="mb-4">
                            <div className="mb-2 text-sm font-medium text-gray-700">Màu sắc: {selectedColor}</div>
                            <div className="flex gap-2 overflow-x-auto scrollbar-hide">
                                {colors.map((color) => (
                                    <button
                                        key={color.name}
                                        type="button"
                                        onClick={() => color.available && setSelectedColor(color.name)}
                                        disabled={!color.available}
                                        className={`relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border-2 transition-all ${selectedColor === color.name
                                            ? 'border-red-600 opacity-100'
                                            : color.available
                                                ? 'border-gray-200 opacity-70 hover:opacity-100'
                                                : 'border-gray-200 opacity-30'
                                            }`}
                                    >
                                        <Image
                                            src={color.image}
                                            alt={color.name}
                                            fill
                                            className="object-cover"
                                        />
                                        {!color.available && (
                                            <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                                                <span className="text-xs text-white">Hết hàng</span>
                                            </div>
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Size Selection */}
                        <div className="mb-4">
                            <div className="mb-2 text-sm font-medium text-gray-700">Kích cỡ: {selectedSize}</div>
                            <div className="flex gap-2">
                                {sizes.map((size) => (
                                    <button
                                        key={size}
                                        type="button"
                                        onClick={() => setSelectedSize(size)}
                                        className={`rounded-md border-2 px-4 py-2 text-sm font-medium transition-all ${selectedSize === size
                                            ? 'border-red-600 bg-red-50 text-red-600'
                                            : 'border-gray-200 text-gray-700 hover:border-gray-300'
                                            }`}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Address Section */}
                    <div className="mb-2 bg-white p-4">
                        <div className="mb-4 flex items-center gap-2 border-b border-gray-100 pb-3">
                            <MapPin className="h-5 w-5 text-orange-600" />
                            <span className="font-bold text-gray-900">Địa chỉ nhận hàng</span>
                        </div>

                        <div className="space-y-3">
                            <div>
                                <label className="mb-1 block text-sm font-medium text-gray-700">Họ và tên</label>
                                <div className="relative">
                                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                        <User className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="text"
                                        name="name"
                                        required
                                        placeholder="Nguyễn Văn A"
                                        className="block w-full rounded-md border border-gray-300 py-2 pl-10 pr-3 text-sm focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="mb-1 block text-sm font-medium text-gray-700">Số điện thoại</label>
                                <div className="relative">
                                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                        <Phone className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="tel"
                                        name="phone"
                                        required
                                        placeholder="0987654321"
                                        className="block w-full rounded-md border border-gray-300 py-2 pl-10 pr-3 text-sm focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="mb-1 block text-sm font-medium text-gray-700">Địa chỉ</label>
                                <textarea
                                    name="address"
                                    required
                                    rows={3}
                                    placeholder="Số nhà, tên đường, phường/xã, quận/huyện, tỉnh/thành phố"
                                    className="block w-full rounded-md border border-gray-300 py-2 px-3 text-sm focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
                                    value={formData.address}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div>
                                <label className="mb-1 block text-sm font-medium text-gray-700">Ghi chú (không bắt buộc)</label>
                                <textarea
                                    name="note"
                                    rows={2}
                                    placeholder="Ghi chú thêm cho người bán..."
                                    className="block w-full rounded-md border border-gray-300 py-2 px-3 text-sm focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
                                    value={formData.note}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Payment Method Section */}
                    <div className="mb-2 bg-white p-4">
                        <div className="mb-4 flex items-center gap-2 border-b border-gray-100 pb-3">
                            <CreditCard className="h-5 w-5 text-orange-600" />
                            <span className="font-bold text-gray-900">Phương thức thanh toán</span>
                        </div>

                        <div className="space-y-3">
                            {/* COD Option */}
                            <button
                                type="button"
                                onClick={() => setPaymentMethod('cod')}
                                className={`w-full rounded-lg border-2 p-4 text-left transition-all ${paymentMethod === 'cod'
                                    ? 'border-red-600 bg-red-50'
                                    : 'border-gray-200 hover:border-gray-300'
                                    }`}
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className={`h-5 w-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'cod' ? 'border-red-600' : 'border-gray-300'
                                            }`}>
                                            {paymentMethod === 'cod' && (
                                                <div className="h-3 w-3 rounded-full bg-red-600"></div>
                                            )}
                                        </div>
                                        <div>
                                            <div className="font-medium text-gray-900">Thanh toán khi nhận hàng (COD)</div>
                                            <div className="text-xs text-gray-500">Thanh toán bằng tiền mặt khi nhận hàng</div>
                                        </div>
                                    </div>
                                </div>
                            </button>

                            {/* Stripe Option */}
                            <button
                                type="button"
                                onClick={() => setPaymentMethod('stripe')}
                                className={`w-full rounded-lg border-2 p-4 text-left transition-all ${paymentMethod === 'stripe'
                                    ? 'border-red-600 bg-red-50'
                                    : 'border-gray-200 hover:border-gray-300'
                                    }`}
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className={`h-5 w-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'stripe' ? 'border-red-600' : 'border-gray-300'
                                            }`}>
                                            {paymentMethod === 'stripe' && (
                                                <div className="h-3 w-3 rounded-full bg-red-600"></div>
                                            )}
                                        </div>
                                        <div>
                                            <div className="font-medium text-gray-900">Thẻ tín dụng/ghi nợ</div>
                                            <div className="text-xs text-gray-500">Thanh toán qua Stripe</div>
                                        </div>
                                    </div>
                                    <div className="flex gap-1">
                                        <div className="h-6 w-9 rounded bg-blue-600 flex items-center justify-center text-white text-[10px] font-bold">VISA</div>
                                        <div className="h-6 w-9 rounded bg-orange-600 flex items-center justify-center text-white text-[10px] font-bold">MC</div>
                                    </div>
                                </div>
                            </button>

                            {/* Stripe Card Form */}
                            {paymentMethod === 'stripe' && (
                                <div className="ml-8 space-y-3 border-l-2 border-red-200 pl-4 py-2">
                                    <div>
                                        <label className="mb-1 block text-xs font-medium text-gray-700">Số thẻ</label>
                                        <input
                                            type="text"
                                            placeholder="1234 5678 9012 3456"
                                            maxLength={19}
                                            className="block w-full rounded-md border border-gray-300 py-2 px-3 text-sm focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
                                            value={cardDetails.cardNumber}
                                            onChange={(e) => {
                                                const value = e.target.value.replace(/\s/g, '');
                                                const formatted = value.match(/.{1,4}/g)?.join(' ') || value;
                                                setCardDetails({ ...cardDetails, cardNumber: formatted });
                                            }}
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-3">
                                        <div>
                                            <label className="mb-1 block text-xs font-medium text-gray-700">Ngày hết hạn</label>
                                            <input
                                                type="text"
                                                placeholder="MM/YY"
                                                maxLength={5}
                                                className="block w-full rounded-md border border-gray-300 py-2 px-3 text-sm focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
                                                value={cardDetails.expiry}
                                                onChange={(e) => {
                                                    let value = e.target.value.replace(/\D/g, '');
                                                    if (value.length >= 2) {
                                                        value = value.slice(0, 2) + '/' + value.slice(2, 4);
                                                    }
                                                    setCardDetails({ ...cardDetails, expiry: value });
                                                }}
                                            />
                                        </div>
                                        <div>
                                            <label className="mb-1 block text-xs font-medium text-gray-700">CVC</label>
                                            <input
                                                type="text"
                                                placeholder="123"
                                                maxLength={3}
                                                className="block w-full rounded-md border border-gray-300 py-2 px-3 text-sm focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
                                                value={cardDetails.cvc}
                                                onChange={(e) => setCardDetails({ ...cardDetails, cvc: e.target.value.replace(/\D/g, '') })}
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="mb-1 block text-xs font-medium text-gray-700">Tên chủ thẻ</label>
                                        <input
                                            type="text"
                                            placeholder="NGUYEN VAN A"
                                            className="block w-full rounded-md border border-gray-300 py-2 px-3 text-sm uppercase focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
                                            value={cardDetails.cardholderName}
                                            onChange={(e) => setCardDetails({ ...cardDetails, cardholderName: e.target.value.toUpperCase() })}
                                        />
                                    </div>
                                </div>
                            )}

                            {/* PayPal Option */}
                            <button
                                type="button"
                                onClick={() => setPaymentMethod('paypal')}
                                className={`w-full rounded-lg border-2 p-4 text-left transition-all ${paymentMethod === 'paypal'
                                    ? 'border-red-600 bg-red-50'
                                    : 'border-gray-200 hover:border-gray-300'
                                    }`}
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className={`h-5 w-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'paypal' ? 'border-red-600' : 'border-gray-300'
                                            }`}>
                                            {paymentMethod === 'paypal' && (
                                                <div className="h-3 w-3 rounded-full bg-red-600"></div>
                                            )}
                                        </div>
                                        <div>
                                            <div className="font-medium text-gray-900">PayPal</div>
                                            <div className="text-xs text-gray-500">Thanh toán qua PayPal</div>
                                        </div>
                                    </div>
                                    <div className="h-6 px-2 rounded bg-blue-500 flex items-center justify-center text-white text-xs font-bold">PayPal</div>
                                </div>
                            </button>

                            {paymentMethod === 'paypal' && (
                                <div className="ml-8 border-l-2 border-red-200 pl-4 py-2">
                                    <p className="text-xs text-gray-600">
                                        Bạn sẽ được chuyển hướng đến PayPal để hoàn tất thanh toán.
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div className="mb-2 bg-white p-4">
                        <h3 className="mb-4 font-bold text-gray-900">Chi tiết đơn hàng</h3>
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                                <span className="text-gray-600">Tổng tiền hàng</span>
                                <span className="text-gray-900">
                                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalPrice)}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Phí vận chuyển</span>
                                <span className="text-gray-900">
                                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(shippingCost)}
                                </span>
                            </div>
                            <div className="border-t border-gray-200 pt-2 flex justify-between font-bold text-base">
                                <span className="text-gray-900">Tổng thanh toán</span>
                                <span className="text-red-600 text-lg">
                                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalPrice + shippingCost)}
                                </span>
                            </div>
                        </div>
                    </div>
                </form>

                {/* Footer with Policies */}
                <footer className="bg-gray-50 border-t border-gray-200 py-6 px-4">
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-3 text-sm">
                            <Link href="/chinh-sach/bao-mat" className="text-gray-600 hover:text-red-600 transition-colors">
                                Chính sách bảo mật
                            </Link>
                            <Link href="/chinh-sach/doi-tra" className="text-gray-600 hover:text-red-600 transition-colors">
                                Chính sách đổi trả
                            </Link>
                            <Link href="/chinh-sach/van-chuyen" className="text-gray-600 hover:text-red-600 transition-colors">
                                Chính sách vận chuyển
                            </Link>
                            <Link href="/chinh-sach/thanh-toan" className="text-gray-600 hover:text-red-600 transition-colors">
                                Hình thức thanh toán
                            </Link>
                            <Link href="/dieu-khoan/su-dung" className="text-gray-600 hover:text-red-600 transition-colors">
                                Điều khoản sử dụng
                            </Link>
                            <Link href="/lien-he" className="text-gray-600 hover:text-red-600 transition-colors">
                                Liên hệ
                            </Link>
                        </div>
                        <div className="border-t border-gray-200 pt-4 text-center">
                            <p className="text-xs text-gray-500">
                                © 2024 SEO Goods. All rights reserved.
                            </p>
                            <p className="text-xs text-gray-400 mt-1">
                                Mọi thông tin cá nhân được bảo mật tuyệt đối
                            </p>
                        </div>
                    </div>
                </footer>

                {/* Sticky Bottom Button */}
                <div className="fixed bottom-0 left-0 right-0 z-50 bg-white shadow-[0_-2px_10px_rgba(0,0,0,0.1)] max-w-md mx-auto">
                    <div className="flex items-center justify-between px-4 py-3">
                        <div className="flex flex-col">
                            <span className="text-xs text-gray-600">Tổng thanh toán</span>
                            <span className="text-lg font-bold text-red-600">
                                {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalPrice + shippingCost)}
                            </span>
                        </div>
                        <button
                            onClick={handleSubmit}
                            className="rounded-full bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-orange-300/50"
                        >
                            Xác nhận và đặt hàng
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
