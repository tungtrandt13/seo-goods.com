'use client';

import Image from 'next/image';
import Link from 'next/link';
import { notFound, useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Share2, MoreHorizontal, Star, MessageCircle, Store, ShoppingBag, ChevronRight, ThumbsUp, Package } from 'lucide-react';
import { useCart } from '@/context/cart-context';
import { PRODUCTS } from '@/lib/data';
import { useState, useEffect, useRef } from 'react';

export default function ProductDetailPage() {
    const params = useParams();
    const router = useRouter();
    const { addToCart } = useCart();
    const [isScrolled, setIsScrolled] = useState(false);
    const [activeTab, setActiveTab] = useState('details');
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [showStickyTabs, setShowStickyTabs] = useState(false);

    const sliderRef = useRef<HTMLDivElement>(null);
    const tabsRef = useRef<HTMLDivElement>(null);
    const detailsRef = useRef<HTMLDivElement>(null);
    const specsRef = useRef<HTMLDivElement>(null);
    const reviewsRef = useRef<HTMLDivElement>(null);

    const id = Number(params.id);
    const product = PRODUCTS.find((p) => p.id === id);

    // Mock multiple images for slider
    const productImages = product ? [
        product.image,
        'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000&auto=format&fit=crop', // Mock extra image
        'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000&auto=format&fit=crop', // Mock extra image
    ] : [];

    // Mock comments
    const comments = [
        { id: 1, user: 't***n', rating: 5, date: '2023-10-15', content: 'Sản phẩm rất tốt, giao hàng nhanh.', variant: 'Màu đen' },
        { id: 2, user: 'h***g', rating: 4, date: '2023-10-12', content: 'Đóng gói cẩn thận, chất lượng ổn trong tầm giá.', variant: 'Màu trắng' },
        { id: 3, user: 'm***a', rating: 5, date: '2023-10-10', content: 'Rất thích, sẽ ủng hộ shop tiếp.', variant: 'Màu đen' },
    ];

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);

            // Check if tabs should be sticky
            if (tabsRef.current) {
                const tabsTop = tabsRef.current.getBoundingClientRect().top;
                setShowStickyTabs(tabsTop <= 56); // 56px is header height (14*4)
            }

            // Update active tab based on scroll position
            const sections = [
                { ref: reviewsRef, id: 'reviews' },
                { ref: specsRef, id: 'specs' },
                { ref: detailsRef, id: 'details' },
            ];

            for (const section of sections) {
                if (section.ref.current) {
                    const rect = section.ref.current.getBoundingClientRect();
                    // Check if section is near the top (accounting for sticky header + tabs)
                    if (rect.top <= 120 && rect.top >= -50) {
                        setActiveTab(section.id);
                        break;
                    }
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    if (!product) {
        return notFound();
    }

    const scrollToSection = (sectionId: 'details' | 'specs' | 'reviews') => {
        const refs = {
            details: detailsRef,
            specs: specsRef,
            reviews: reviewsRef,
        };

        const targetRef = refs[sectionId];
        if (targetRef.current) {
            // Set active tab immediately to prevent jumping
            setActiveTab(sectionId);

            // Account for sticky header (56px) + tabs (48px) = 104px
            const offsetTop = targetRef.current.offsetTop - 110;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth',
            });
        }
    };

    const handleScrollImage = (e: React.UIEvent<HTMLDivElement>) => {
        const scrollLeft = e.currentTarget.scrollLeft;
        const width = e.currentTarget.offsetWidth;
        const index = Math.round(scrollLeft / width);
        setCurrentImageIndex(index);
    };

    const scrollToImage = (index: number) => {
        if (sliderRef.current) {
            const width = sliderRef.current.offsetWidth;
            sliderRef.current.scrollTo({
                left: width * index,
                behavior: 'smooth',
            });
            setCurrentImageIndex(index);
        }
    };

    const LazySection = ({ children }: { children: React.ReactNode }) => {
        const [isVisible, setIsVisible] = useState(false);
        const ref = useRef<HTMLDivElement>(null);

        useEffect(() => {
            const observer = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) {
                        setIsVisible(true);
                        observer.disconnect();
                    }
                },
                { rootMargin: '200px' } // Increased margin to load earlier
            );

            if (ref.current) {
                observer.observe(ref.current);
            }

            return () => observer.disconnect();
        }, []);

        return (
            <div ref={ref} className="min-h-[500px]">
                {isVisible ? children : (
                    <div className="bg-white p-4">
                        <div className="animate-pulse space-y-4">
                            <div className="h-6 bg-gray-200 rounded w-1/3"></div>
                            <div className="space-y-3">
                                <div className="h-20 bg-gray-100 rounded"></div>
                                <div className="h-20 bg-gray-100 rounded"></div>
                                <div className="h-20 bg-gray-100 rounded"></div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-gray-100 flex justify-center">
            <div className="w-full max-w-md bg-gray-50 shadow-xl relative pb-24">

                {/* Mobile Header - Sticky & Adaptive */}
                <header
                    className={`fixed top-0 z-50 flex w-full max-w-md items-center justify-between px-4 py-3 transition-all duration-300 ${isScrolled ? 'bg-white shadow-sm text-gray-900' : 'bg-transparent text-white'
                        }`}
                >
                    <button
                        onClick={() => router.back()}
                        className={`flex h-8 w-8 items-center justify-center rounded-full ${isScrolled ? 'hover:bg-gray-100' : 'bg-black/30 backdrop-blur-sm'
                            }`}
                    >
                        <ArrowLeft className="h-5 w-5" />
                    </button>

                    {/* Tabs in header when scrolled (optional, or just title) */}
                    <div className={`flex-1 px-4 flex justify-center gap-6 text-sm font-medium transition-opacity duration-300 ${isScrolled ? 'opacity-100' : 'opacity-0 hidden'
                        }`}>
                        <button
                            onClick={() => {
                                setActiveTab('details');
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}
                            className={`relative py-1 ${activeTab === 'details' ? 'text-red-600 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-red-600' : 'text-gray-600'}`}
                        >
                            Sản phẩm
                        </button>
                        <button
                            onClick={() => {
                                setActiveTab('reviews');
                                document.getElementById('reviews-section')?.scrollIntoView({ behavior: 'smooth' });
                            }}
                            className={`relative py-1 ${activeTab === 'reviews' ? 'text-red-600 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-red-600' : 'text-gray-600'}`}
                        >
                            Đánh giá
                        </button>
                    </div>

                    <div className="flex items-center gap-3">
                        <button className={`flex h-8 w-8 items-center justify-center rounded-full ${isScrolled ? 'hover:bg-gray-100' : 'bg-black/30 backdrop-blur-sm'
                            }`}>
                            <Share2 className="h-5 w-5" />
                        </button>
                        <button className={`flex h-8 w-8 items-center justify-center rounded-full ${isScrolled ? 'hover:bg-gray-100' : 'bg-black/30 backdrop-blur-sm'
                            }`}>
                            <MoreHorizontal className="h-5 w-5" />
                        </button>
                    </div>
                </header>

                {/* Image Slider */}
                <div className="bg-white pb-4">
                    <div className="relative aspect-square w-full">
                        <div
                            ref={sliderRef}
                            className="flex h-full w-full overflow-x-auto snap-x snap-mandatory scrollbar-hide"
                            onScroll={handleScrollImage}
                        >
                            {productImages.map((img, index) => (
                                <div key={index} className="min-w-full h-full snap-center relative">
                                    <Image
                                        src={img}
                                        alt={`${product.name} - ${index + 1}`}
                                        fill
                                        className="object-cover"
                                        priority={index === 0}
                                    />
                                </div>
                            ))}
                        </div>

                        {/* Image Counter Badge */}
                        <div className="absolute bottom-4 right-4 rounded-full bg-black/50 px-3 py-1 text-xs text-white backdrop-blur-sm">
                            {currentImageIndex + 1}/{productImages.length}
                        </div>
                    </div>

                    {/* Thumbnail Strip */}
                    <div className="mt-2 flex gap-2 px-4 overflow-x-auto scrollbar-hide">
                        {productImages.map((img, index) => (
                            <button
                                key={index}
                                onClick={() => scrollToImage(index)}
                                className={`relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border-2 transition-all ${currentImageIndex === index ? 'border-red-600 opacity-100' : 'border-transparent opacity-60'
                                    }`}
                            >
                                <Image
                                    src={img}
                                    alt={`Thumbnail ${index + 1}`}
                                    fill
                                    className="object-cover"
                                />
                            </button>
                        ))}
                    </div>
                </div>
                {/* Price & Title Section */}
                <div className="mb-2 bg-white p-4">
                    <div className="flex items-baseline gap-2 mb-1">
                        <span className="text-3xl font-bold text-red-600">
                            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price)}
                        </span>
                        {product.originalPrice && (
                            <>
                                <span className="text-sm text-gray-400 line-through decoration-gray-400">
                                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.originalPrice)}
                                </span>
                                <span className="ml-1 rounded bg-red-100 px-1 py-0.5 text-xs font-bold text-red-600">
                                    -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                                </span>
                            </>
                        )}
                    </div>

                    <h1 className="mb-2 text-lg font-medium text-gray-900 line-clamp-2 leading-snug">
                        {product.name}
                    </h1>

                    <div className="flex items-center justify-between text-xs text-gray-500 mt-3">
                        <div className="flex items-center gap-1">
                            <span className="bg-red-600 text-white text-[10px] px-1 py-0.5 rounded">Mall</span>
                        </div>
                        <span>Đã bán 1.2k</span>
                    </div>
                </div>

                {/* Service / Guarantee Section */}
                <div className="mb-2 bg-white px-4 py-3">
                    <div className="flex items-center justify-between text-xs text-gray-600">
                        <div className="flex items-center gap-1.5">
                            <div className="flex h-4 w-4 items-center justify-center rounded-full border border-red-500">
                                <span className="text-[10px] font-bold text-red-500">✓</span>
                            </div>
                            <span>Chính hãng 100%</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <div className="flex h-4 w-4 items-center justify-center rounded-full border border-red-500">
                                <span className="text-[10px] font-bold text-red-500">✓</span>
                            </div>
                            <span>Giao hàng miễn phí</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <div className="flex h-4 w-4 items-center justify-center rounded-full border border-red-500">
                                <span className="text-[10px] font-bold text-red-500">✓</span>
                            </div>
                            <span>7 ngày đổi trả</span>
                        </div>
                    </div>
                </div>

                {/* Tab Navigation */}
                <div ref={tabsRef} className="bg-white border-b border-gray-200 sticky top-14 z-40">
                    <div className="flex">
                        <button
                            onClick={() => scrollToSection('details')}
                            className={`flex-1 py-3 text-sm font-medium transition-colors relative ${activeTab === 'details'
                                ? 'text-red-600 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-red-600'
                                : 'text-gray-600'
                                }`}
                        >
                            Chi tiết sản phẩm
                        </button>
                        <button
                            onClick={() => scrollToSection('specs')}
                            className={`flex-1 py-3 text-sm font-medium transition-colors relative ${activeTab === 'specs'
                                ? 'text-red-600 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-red-600'
                                : 'text-gray-600'
                                }`}
                        >
                            Thông số
                        </button>
                        <button
                            onClick={() => scrollToSection('reviews')}
                            className={`flex-1 py-3 text-sm font-medium transition-colors relative ${activeTab === 'reviews'
                                ? 'text-red-600 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-red-600'
                                : 'text-gray-600'
                                }`}
                        >
                            Đánh giá
                        </button>
                    </div>
                </div>

                {/* Details Section */}
                <div ref={detailsRef} className="mb-2 bg-white p-4">
                    <h3 className="text-base font-bold text-gray-900 mb-4">Chi tiết sản phẩm</h3>
                    <div className="space-y-4">
                        {/* Product images grid */}
                        {productImages.map((img, index) => (
                            <div key={`detail-${index}`} className="relative aspect-square w-full">
                                <Image
                                    src={img}
                                    alt={`${product.name} detail ${index + 1}`}
                                    fill
                                    className="object-cover rounded-lg"
                                    loading="lazy"
                                />
                            </div>
                        ))}
                        <div className="text-sm text-gray-600 leading-relaxed">
                            {product.description}
                        </div>
                    </div>
                </div>

                {/* Specs Section */}
                <div ref={specsRef} className="mb-2 bg-white p-4">
                    <h3 className="text-base font-bold text-gray-900 mb-4">Thông số kỹ thuật</h3>
                    <div className="space-y-3">
                        {product.specs ? (
                            Object.entries(product.specs).map(([key, value]) => (
                                <div key={key} className="flex border-b border-gray-100 pb-3 last:border-0">
                                    <span className="w-1/3 text-sm text-gray-500">{key}</span>
                                    <span className="w-2/3 text-sm font-medium text-gray-900">{value}</span>
                                </div>
                            ))
                        ) : (
                            <div className="grid grid-cols-2 gap-3">
                                <div className="flex flex-col border-b border-gray-100 pb-3">
                                    <span className="text-xs text-gray-500">Thương hiệu</span>
                                    <span className="text-sm font-medium text-gray-900">Đang cập nhật</span>
                                </div>
                                <div className="flex flex-col border-b border-gray-100 pb-3">
                                    <span className="text-xs text-gray-500">Xuất xứ</span>
                                    <span className="text-sm font-medium text-gray-900">Đang cập nhật</span>
                                </div>
                                <div className="flex flex-col border-b border-gray-100 pb-3">
                                    <span className="text-xs text-gray-500">Bảo hành</span>
                                    <span className="text-sm font-medium text-gray-900">12 tháng</span>
                                </div>
                                <div className="flex flex-col border-b border-gray-100 pb-3">
                                    <span className="text-xs text-gray-500">Trạng thái</span>
                                    <span className="text-sm font-medium text-gray-900">Còn hàng</span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Reviews Section (Lazy Loaded) */}
                <LazySection>
                    <div ref={reviewsRef} className="mb-2 bg-white p-4">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2">
                                <h3 className="text-base font-bold text-gray-900">Đánh giá sản phẩm</h3>
                                <div className="flex items-center gap-1 text-sm">
                                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                    <span className="font-bold text-gray-900">4.9</span>
                                    <span className="text-gray-500">(50)</span>
                                </div>
                            </div>
                            <span className="text-sm text-red-600">Xem tất cả</span>
                        </div>

                        <div className="space-y-4">
                            {comments.map((comment) => (
                                <div key={comment.id} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-500">
                                            {comment.user.charAt(0).toUpperCase()}
                                        </div>
                                        <div>
                                            <p className="text-xs font-medium text-gray-900">{comment.user}</p>
                                            <div className="flex gap-0.5">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star key={i} className={`h-3 w-3 ${i < comment.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-xs text-gray-500 mb-2">
                                        {comment.date} | Phân loại: {comment.variant}
                                    </div>
                                    <p className="text-sm text-gray-800 mb-2">{comment.content}</p>
                                    {/* Mock images in review */}
                                    <div className="flex gap-2">
                                        <div className="h-16 w-16 bg-gray-100 rounded"></div>
                                        <div className="h-16 w-16 bg-gray-100 rounded"></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </LazySection>

                {/* Sticky Footer Action Bar */}
                <div className="fixed bottom-0 z-50 flex w-full max-w-md items-center bg-white px-2 py-2 shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
                    {/* Icons */}
                    <div className="flex gap-2 px-2">
                        <button className="flex flex-col items-center justify-center gap-1 text-gray-500 w-12">
                            <MessageCircle className="h-5 w-5" />
                            <span className="text-[10px]">Chat</span>
                        </button>
                        <button
                            onClick={() => {
                                // TODO: Navigate to order tracking page
                                const orderCode = prompt('Nhập mã đơn hàng của bạn:');
                                if (orderCode) {
                                    alert(`Đang tra cứu đơn hàng: ${orderCode}`);
                                    // router.push(`/orders/${orderCode}`);
                                }
                            }}
                            className="flex flex-col items-center justify-center gap-1 text-gray-500 w-12"
                        >
                            <Package className="h-5 w-5" />
                            <span className="text-[10px]">Đơn hàng</span>
                        </button>
                    </div>

                    {/* Buttons */}
                    <div className="ml-2 flex flex-1">
                        <button
                            onClick={() => {
                                addToCart(product);
                                router.push('/checkout');
                            }}
                            className="w-full rounded-full bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 py-2.5 text-sm font-bold text-white shadow-lg shadow-orange-300/50"
                        >
                            Mua ngay
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
