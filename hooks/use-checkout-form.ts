/**
 * Hook for managing checkout form state and validation
 */

import { useState, ChangeEvent } from 'react';
import type { CheckoutFormData, CardDetails } from '@/lib/types';
import type { PaymentMethodType } from '@/lib/constants';
import { PAYMENT_METHODS } from '@/lib/constants';
import { formatCardNumber, formatCardExpiry } from '@/lib/utils';

interface UseCheckoutFormReturn {
    // Form data
    formData: CheckoutFormData;
    cardDetails: CardDetails;
    paymentMethod: PaymentMethodType;

    // Form handlers
    handleInputChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    handleCardNumberChange: (value: string) => void;
    handleCardExpiryChange: (value: string) => void;
    handleCardCVCChange: (value: string) => void;
    handleCardNameChange: (value: string) => void;
    setPaymentMethod: (method: PaymentMethodType) => void;

    // Validation
    isFormValid: boolean;
}

const initialFormData: CheckoutFormData = {
    name: '',
    phone: '',
    address: '',
    note: '',
};

const initialCardDetails: CardDetails = {
    cardNumber: '',
    expiry: '',
    cvc: '',
    cardholderName: '',
};

/**
 * Custom hook to manage checkout form state
 * @returns Form state and handlers
 */
export function useCheckoutForm(): UseCheckoutFormReturn {
    const [formData, setFormData] = useState<CheckoutFormData>(initialFormData);
    const [cardDetails, setCardDetails] = useState<CardDetails>(initialCardDetails);
    const [paymentMethod, setPaymentMethod] = useState<PaymentMethodType>(PAYMENT_METHODS.COD);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleCardNumberChange = (value: string) => {
        const formatted = formatCardNumber(value);
        setCardDetails((prev) => ({ ...prev, cardNumber: formatted }));
    };

    const handleCardExpiryChange = (value: string) => {
        const formatted = formatCardExpiry(value);
        setCardDetails((prev) => ({ ...prev, expiry: formatted }));
    };

    const handleCardCVCChange = (value: string) => {
        const cleaned = value.replace(/\D/g, '').slice(0, 3);
        setCardDetails((prev) => ({ ...prev, cvc: cleaned }));
    };

    const handleCardNameChange = (value: string) => {
        setCardDetails((prev) => ({ ...prev, cardholderName: value.toUpperCase() }));
    };

    // Basic form validation
    const isFormValid = Boolean(
        formData.name &&
        formData.phone &&
        formData.address &&
        (paymentMethod === PAYMENT_METHODS.COD ||
            (cardDetails.cardNumber && cardDetails.expiry && cardDetails.cvc && cardDetails.cardholderName))
    );

    return {
        formData,
        cardDetails,
        paymentMethod,
        handleInputChange,
        handleCardNumberChange,
        handleCardExpiryChange,
        handleCardCVCChange,
        handleCardNameChange,
        setPaymentMethod,
        isFormValid,
    };
}
