import { useState, useCallback } from 'react';
import { toast } from 'sonner';
import { createOrderId } from '@/lib/actions/payments/createOrderId';
import { verifyPayment } from '@/lib/actions/payments/verifyPayment';
import {
  PaymentError,
  RazorpayError,
  type Plan,
  type PaymentData,
  type RazorpayResponse,
} from '@/types/subscription';

declare global {
  interface Window {
    Razorpay: any;
  }
}

interface UsePaymentProps {
  plan: Plan;
  onSuccess?: () => void;
  onCancel?: () => void;
  onError?: (error: Error) => void;
}

interface UsePaymentReturn {
  isLoading: boolean;
  processPayment: () => Promise<void>;
  error: Error | null;
  clearError: () => void;
}

export function usePayment({
  plan,
  onSuccess,
  onCancel,
  onError,
}: UsePaymentProps): UsePaymentReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const validateEnvironment = useCallback((): boolean => {
    if (!process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID) {
      const error = new PaymentError(
        'Payment configuration error. Please contact support.',
        'MISSING_RAZORPAY_KEY'
      );
      setError(error);
      onError?.(error);
      return false;
    }

    if (!window.Razorpay) {
      const error = new PaymentError(
        'Payment system not ready. Please wait a moment and try again.',
        'RAZORPAY_NOT_LOADED'
      );
      setError(error);
      onError?.(error);
      return false;
    }

    return true;
  }, [onError]);

  const createOrder = useCallback(async () => {
    try {
      const orderResponse = await createOrderId();

      if (!orderResponse.success || !orderResponse.data) {
        throw new PaymentError(
          orderResponse.error || 'Failed to create order',
          'ORDER_CREATION_FAILED',
          orderResponse
        );
      }

      return orderResponse.data;
    } catch (error) {
      if (error instanceof PaymentError) {
        throw error;
      }
      throw new PaymentError('Failed to create payment order', 'ORDER_CREATION_ERROR', error);
    }
  }, []);

  const handlePaymentVerification = useCallback(
    async (orderId: string, response: RazorpayResponse) => {
      try {
        const paymentData: PaymentData = {
          orderCreationId: orderId,
          razorpayPaymentId: response.razorpay_payment_id,
          razorpayOrderId: response.razorpay_order_id,
          razorpaySignature: response.razorpay_signature,
          razorpayCustomerId: response.razorpay_customer_id,
        };

        const verifyResponse = await verifyPayment(paymentData);

        if (!verifyResponse.success) {
          throw new PaymentError(
            verifyResponse.error || 'Payment verification failed',
            'VERIFICATION_FAILED',
            verifyResponse
          );
        }

        toast.success('Payment successful! Welcome to ResuMate Pro!');
        onSuccess?.();
      } catch (error) {
        if (error instanceof PaymentError) {
          throw error;
        }
        throw new PaymentError('Payment verification failed', 'VERIFICATION_ERROR', error);
      }
    },
    [onSuccess]
  );

  const processPayment = useCallback(async () => {
    if (!validateEnvironment()) {
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const order = await createOrder();

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
        amount: order.amount,
        currency: order.currency,
        name: 'ResuMate',
        description: `${plan.name} - Monthly Subscription`,
        order_id: order.id,
        handler: async (response: RazorpayResponse) => {
          try {
            await handlePaymentVerification(order.id, response);
          } catch (error) {
            const paymentError =
              error instanceof PaymentError
                ? error
                : new PaymentError('Payment verification failed', 'VERIFICATION_ERROR', error);

            setError(paymentError);
            onError?.(paymentError);
            toast.error(paymentError.message);
          } finally {
            setIsLoading(false);
          }
        },
        theme: {
          color: '#3B82F6',
        },
        modal: {
          ondismiss: () => {
            setIsLoading(false);
            onCancel?.();
            toast.info('Payment was cancelled.');
          },
        },
        retry: {
          enabled: true,
          max_count: 3,
        },
      } as const;

      const razorpay = new window.Razorpay(options);

      razorpay.on('payment.failed', (response: any) => {
        const razorpayError = new RazorpayError(
          `Payment failed: ${response.error.description}`,
          response.error
        );
        setError(razorpayError);
        onError?.(razorpayError);
        toast.error(razorpayError.message);
        setIsLoading(false);
      });

      razorpay.open();
    } catch (error) {
      const paymentError =
        error instanceof PaymentError
          ? error
          : new PaymentError('Failed to process payment', 'PAYMENT_PROCESSING_ERROR', error);

      setError(paymentError);
      onError?.(paymentError);
      toast.error(paymentError.message);
      setIsLoading(false);
    }
  }, [validateEnvironment, createOrder, handlePaymentVerification, plan.name, onCancel, onError]);

  return {
    isLoading,
    processPayment,
    error,
    clearError,
  };
}
