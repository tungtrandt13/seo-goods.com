/**
 * Hook for managing product data and operations
 */

import { useState, useEffect } from 'react';
import { getProductById } from '@/lib/data';
import type { Product } from '@/lib/types';

interface UseProductReturn {
    product: Product | undefined;
    loading: boolean;
    error: string | null;
}

/**
 * Custom hook to fetch and manage product data
 * @param id - Product ID
 * @returns Product data with loading and error states
 */
export function useProduct(id: number): UseProductReturn {
    const [product, setProduct] = useState<Product | undefined>(undefined);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setLoading(true);
        setError(null);

        try {
            // Simulating async data fetch with setTimeout
            // In production, this would be an actual API call
            setTimeout(() => {
                const foundProduct = getProductById(id);

                if (!foundProduct) {
                    setError('Product not found');
                } else {
                    setProduct(foundProduct);
                }

                setLoading(false);
            }, 100);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to load product');
            setLoading(false);
        }
    }, [id]);

    return { product, loading, error };
}
