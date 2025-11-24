/**
 * Product data and mock data for the application
 */

import { Product, Review, ColorVariant } from './types';
import { DEFAULT_RATING, DEFAULT_REVIEW_COUNT, DEFAULT_SOLD_COUNT } from './constants';

export const PRODUCTS: Product[] = [
    {
        id: 1,
        name: "Tai nghe Bluetooth Chống ồn Sony WH-1000XM5",
        price: 6990000,
        originalPrice: 8490000,
        image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&q=80&w=800",
        description: "Tai nghe chống ồn hàng đầu thế giới với thiết kế mới, nhẹ hơn và thoải mái hơn. Thời lượng pin lên đến 30 giờ.",
        isHot: true,
        isSale: true,
        stock: 25,
        soldCount: DEFAULT_SOLD_COUNT,
        rating: DEFAULT_RATING,
        reviewCount: DEFAULT_REVIEW_COUNT,
        specs: {
            "Thương hiệu": "Sony",
            "Kết nối": "Bluetooth 5.2",
            "Pin": "30 giờ",
            "Chống ồn": "Active Noise Cancelling (ANC)"
        }
    },
    {
        id: 2,
        name: "Loa Bluetooth JBL Flip 6 - Âm thanh mạnh mẽ",
        price: 2590000,
        originalPrice: 2990000,
        image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&q=80&w=800",
        description: "Loa di động chống nước IP67, âm thanh JBL Original Pro Sound mạnh mẽ, pin 12 giờ.",
        isHot: false,
        isSale: true,
        stock: 40,
        soldCount: '850',
        rating: 4.7,
        reviewCount: 32,
        specs: {
            "Thương hiệu": "JBL",
            "Công suất": "20W",
            "Pin": "12 giờ",
            "Chống nước": "IP67"
        }
    },
    {
        id: 3,
        name: "Đồng hồ thông minh Apple Watch Series 9",
        price: 9590000,
        originalPrice: 10490000,
        image: "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?auto=format&fit=crop&q=80&w=800",
        description: "Chip S9 SiP mạnh mẽ nhất, màn hình sáng gấp đôi, thao tác chạm hai lần mới.",
        isHot: true,
        isSale: false,
        stock: 15,
        soldCount: '2.3k',
        rating: 4.9,
        reviewCount: 78,
        specs: {
            "Thương hiệu": "Apple",
            "Kích thước": "41mm / 45mm",
            "Màn hình": "Always-On Retina",
            "Chống nước": "WR50"
        }
    },
    {
        id: 4,
        name: "Máy ảnh Fujifilm X-T5 Body - Bạc",
        price: 43990000,
        originalPrice: 45990000,
        image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=800",
        description: "Cảm biến 40MP X-Trans CMOS 5 HR, quay video 6.2K/30p, ổn định hình ảnh IBIS 7 stop.",
        isHot: false,
        isSale: false,
        stock: 8,
        soldCount: '145',
        rating: 4.8,
        reviewCount: 24,
        specs: {
            "Thương hiệu": "Fujifilm",
            "Cảm biến": "40MP APS-C",
            "Video": "6.2K 30p",
            "Trọng lượng": "557g"
        }
    },
];

/**
 * Mock reviews data
 */
export const MOCK_REVIEWS: Review[] = [
    {
        id: 1,
        user: 't***n',
        rating: 5,
        date: '2023-10-15',
        content: 'Sản phẩm rất tốt, giao hàng nhanh.',
        variant: 'Màu đen',
        images: []
    },
    {
        id: 2,
        user: 'h***g',
        rating: 4,
        date: '2023-10-12',
        content: 'Đóng gói cẩn thận, chất lượng ổn trong tầm giá.',
        variant: 'Màu trắng',
        images: []
    },
    {
        id: 3,
        user: 'm***a',
        rating: 5,
        date: '2023-10-10',
        content: 'Rất thích, sẽ ủng hộ shop tiếp.',
        variant: 'Màu đen',
        images: []
    },
];

/**
 * Mock color variants
 */
export const MOCK_COLOR_VARIANTS: ColorVariant[] = [
    {
        name: 'Đen',
        image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&q=80&w=800',
        available: true
    },
    {
        name: 'Trắng',
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=200',
        available: true
    },
    {
        name: 'Đỏ',
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=200',
        available: true
    },
    {
        name: 'Xanh',
        image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=200',
        available: false
    },
];

// Data Helper Functions

/**
 * Get a product by ID
 * @param id - Product ID
 * @returns Product or undefined
 */
export function getProductById(id: number): Product | undefined {
    return PRODUCTS.find((p) => p.id === id);
}

/**
 * Get related products (excluding current product)
 * @param currentId - Current product ID
 * @param limit - Maximum number of related products
 * @returns Array of related products
 */
export function getRelatedProducts(currentId: number, limit: number = 4): Product[] {
    return PRODUCTS.filter((p) => p.id !== currentId).slice(0, limit);
}

/**
 * Get products by category (mocked for now)
 * @param isHot - Filter by hot products
 * @param isSale - Filter by sale products
 * @returns Filtered products
 */
export function getFilteredProducts(filters: { isHot?: boolean; isSale?: boolean }): Product[] {
    let filtered = PRODUCTS;

    if (filters.isHot !== undefined) {
        filtered = filtered.filter((p) => p.isHot === filters.isHot);
    }

    if (filters.isSale !== undefined) {
        filtered = filtered.filter((p) => p.isSale === filters.isSale);
    }

    return filtered;
}

/**
 * Get mock product images for slider
 * @param product - Product object
 * @returns Array of image URLs
 */
export function getProductImages(product: Product): string[] {
    return [
        product.image,
        'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000&auto=format&fit=crop',
    ];
}
