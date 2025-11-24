/**
 * Application-wide constants
 * Centralized location for all magic numbers and repeated strings
 */

// Currency & Locale
export const CURRENCY = 'VND';
export const LOCALE = 'vi-VN';

// Pricing
export const SHIPPING_COST = 30000;

// UI Constants
export const MAX_PRODUCT_IMAGES = 3;
export const DEFAULT_RATING = 4.9;
export const DEFAULT_REVIEW_COUNT = 50;
export const DEFAULT_SOLD_COUNT = '1.2k';

// Payment Methods
export const PAYMENT_METHODS = {
    COD: 'cod',
    STRIPE: 'stripe',
    PAYPAL: 'paypal',
} as const;

export type PaymentMethodType = typeof PAYMENT_METHODS[keyof typeof PAYMENT_METHODS];

// Product Variants
export const SIZES = ['S', 'M', 'L', 'XL'] as const;
export type SizeType = typeof SIZES[number];

// Navigation Paths
export const PATHS = {
    HOME: '/',
    CART: '/cart',
    CHECKOUT: '/checkout',
    PRODUCT: (id: string | number) => `/product/${id}`,
} as const;

// Footer Navigation Links
export const FOOTER_LINKS = {
    POLICIES: [
        { href: '/chinh-sach/bao-mat', label: 'Chính sách bảo mật' },
        { href: '/chinh-sach/doi-tra', label: 'Chính sách đổi trả' },
        { href: '/chinh-sach/van-chuyen', label: 'Chính sách vận chuyển' },
        { href: '/chinh-sach/thanh-toan', label: 'Hình thức thanh toán' },
    ],
    SUPPORT: [
        { href: '/dieu-khoan/su-dung', label: 'Điều khoản sử dụng' },
        { href: '/lien-he', label: 'Liên hệ' },
    ],
} as const;

// Site Info
export const SITE_INFO = {
    NAME: 'SEO Goods',
    EMAIL: 'support@seogoods.com',
    DESCRIPTION: 'SEO Goods chuyên cung cấp các sản phẩm công nghệ, gia dụng chất lượng cao với giá tốt nhất thị trường.',
    COPYRIGHT_YEAR: 2024,
} as const;

// Mock Comments/Reviews (can be moved to data.ts later)
export const MOCK_COLORS = [
    { name: 'Đen', available: true },
    { name: 'Trắng', available: true },
    { name: 'Đỏ', available: true },
    { name: 'Xanh', available: false },
] as const;

// Scroll & Animation
export const SCROLL_OFFSET = {
    STICKY_HEADER: 56,
    STICKY_TABS: 48,
    TOTAL_OFFSET: 110, // STICKY_HEADER + STICKY_TABS + margin
} as const;

// Warranty & Guarantees
export const GUARANTEES = [
    { id: 'authentic', label: 'Chính hãng 100%' },
    { id: 'shipping', label: 'Giao hàng miễn phí' },
    { id: 'return', label: '7 ngày đổi trả' },
] as const;
