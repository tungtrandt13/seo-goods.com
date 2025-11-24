/**
 * Hook for formatting currency values
 * Provides consistent currency formatting across the application
 */

import { formatCurrency as formatCurrencyUtil } from '@/lib/utils';

/**
 * Custom hook to get a currency formatting function
 * @returns Function to format numbers as VND currency
 * @example
 * const formatCurrency = useFormatCurrency();
 * formatCurrency(1000000); // "1.000.000 ₫"
 */
export function useFormatCurrency() {
    return formatCurrencyUtil;
}
