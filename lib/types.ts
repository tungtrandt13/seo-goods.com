/**
 * Shared TypeScript types and interfaces
 * Centralized type definitions to avoid duplication
 */

import { PaymentMethodType, SizeType } from './constants';

// Product Types
export interface Product {
    id: number;
    name: string;
    price: number;
    originalPrice?: number;
    image: string;
    description?: string;
    isHot?: boolean;
    isSale?: boolean;
    specs?: Record<string, string>;
    stock?: number;
    soldCount?: string;
    rating?: number;
    reviewCount?: number;
}

// Review/Comment Types
export interface Review {
    id: number;
    user: string;
    rating: number;
    date: string;
    content: string;
    variant?: string;
    images?: string[];
}

// Variant Types
export interface ColorVariant {
    name: string;
    image: string;
    available: boolean;
}

export interface ProductVariant {
    colors: ColorVariant[];
    sizes: readonly SizeType[];
}

// Cart Types (extended from cart-context)
export interface CartItem {
    id: string | number;
    name: string;
    price: number;
    image: string;
    quantity: number;
}

// Checkout Types
export interface CheckoutFormData {
    name: string;
    phone: string;
    address: string;
    note: string;
}

export interface CardDetails {
    cardNumber: string;
    expiry: string;
    cvc: string;
    cardholderName: string;
}

export interface CheckoutState {
    formData: CheckoutFormData;
    selectedColor: string;
    selectedSize: SizeType;
    paymentMethod: PaymentMethodType;
    cardDetails: CardDetails;
    isSuccess: boolean;
}

// Navigation Types
export interface NavLink {
    href: string;
    label: string;
}

// Footer Types
export interface FooterSection {
    title: string;
    links: NavLink[];
}

// API Response Types (for future use)
export interface ApiResponse<T> {
    data: T;
    error?: string;
    status: 'success' | 'error';
}

export interface PaginatedResponse<T> {
    items: T[];
    total: number;
    page: number;
    pageSize: number;
}
