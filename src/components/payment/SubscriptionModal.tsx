'use client';

import { useState, useEffect } from 'react';
import Script from 'next/script';
import { X } from 'lucide-react';
import { Dialog, DialogContent } from '../ui/dialog';
import { useSubscriptionContext } from '@/contexts/SubscriptionProvider';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { createOrderId } from '@/lib/actions/payments/createOrderId';
import { verifyPayment } from '@/lib/actions/payments/verifyPayment';
import { SubscriptionModalContent } from './subscription/SubscriptionModalContent';

declare global {
  interface Window {
    Razorpay: any;
  }
}

interface Plan {
  id: string;
  name: string;
  price: number;
  period: 'month' | 'year';
  features: string[];
  popular?: boolean;
}

const plan: Plan = {
  id: 'monthly',
  name: 'Pro Plan',
  price: 99,
  period: 'month',
  features: [
    'Unlimited resume conversations',
    'AI-powered resume optimization',
    'Job-specific tailoring',
    'Multiple resume templates',
    'Export to PDF',
    'Priority support',
  ],
  popular: true,
};

interface SubscriptionModalProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  mode?: 'forced' | 'upgrade' | 'purchase';
  onSuccess?: () => void;
  onCancel?: () => void;
}

export function SubscriptionModal({
  open,
  onOpenChange,
  mode = 'forced',
  onSuccess,
  onCancel,
}: SubscriptionModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [showCloseButton, setShowCloseButton] = useState(false);
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);

  const {
    isTrialExpired,
    daysUntilTrialExpires,
    daysSinceTrialExpired,
    shouldShowSubscriptionModal,
    shouldShowUpgradePrompt,
    refreshSubscription,
  } = useSubscriptionContext();

  const handleRazorpayLoad = () => {
    setRazorpayLoaded(true);
    console.log('Razorpay script loaded successfully');
  };

  const handleRazorpayError = () => {
    console.error('Failed to load Razorpay script');
    toast.error('Payment system failed to load. Please refresh the page.');
  };

  useEffect(() => {
    const checkRazorpay = () => {
      if (typeof window !== 'undefined' && window.Razorpay) {
        setRazorpayLoaded(true);
      }
    };
    checkRazorpay();
    const timer = setTimeout(checkRazorpay, 2000);
    return () => clearTimeout(timer);
  }, []);

  const shouldShow = () => {
    if (open !== undefined) return open;

    switch (mode) {
      case 'forced':
        return shouldShowSubscriptionModal();
      case 'upgrade':
        return shouldShowUpgradePrompt();
      case 'purchase':
        return true;
      default:
        return false;
    }
  };

  const isForced = mode === 'forced' && isTrialExpired;

  useEffect(() => {
    if (mode === 'upgrade' && !isForced) {
      const timer = setTimeout(() => setShowCloseButton(true), 5000);
      return () => clearTimeout(timer);
    }
  }, [mode, isForced]);

  const handleSubscribe = async () => {
    if (!razorpayLoaded || !window.Razorpay) {
      toast.error('Payment system not ready. Please wait a moment and try again.');
      return;
    }

    if (!process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID) {
      toast.error('Payment configuration error. Please contact support.');
      return;
    }

    setIsLoading(true);
    try {
      const orderResponse = await createOrderId();
      if (!orderResponse.success || !orderResponse.data) {
        toast.error(orderResponse.error || 'Failed to create order');
        return;
      }

      const order = orderResponse.data;
      const { amount, currency, id } = order;
      console.log(order);
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount,
        currency,
        name: 'ResuMate',
        description: `${plan.name} - Monthly Subscription`,
        order_id: id,
        handler: async function (response: any) {
          try {
            const data = {
              orderCreationId: id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpayOrderId: response.razorpay_order_id,
              razorpaySignature: response.razorpay_signature,
            };
            const verifyResponse = await verifyPayment(data);
            if (verifyResponse.success) {
              toast.success('Payment successful! Welcome to ResuMate Pro!');
              await refreshSubscription();
              onSuccess?.();
              onOpenChange?.(false);
            } else {
              throw new Error(verifyResponse.error || 'Payment verification failed');
            }
          } catch (error) {
            toast.error('Payment verification failed. Please contact support.');
          } finally {
            setIsLoading(false);
          }
        },
        theme: {
          color: '#3B82F6',
        },
        modal: {
          ondismiss: function () {
            setIsLoading(false);
            if (!isForced) {
              toast.info('Payment was cancelled.');
              onCancel?.();
            }
          },
        },
        retry: {
          enabled: true,
          max_count: 3,
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.on('payment.failed', function (response: any) {
        toast.error(`Payment failed: ${response.error.description}`);
        setIsLoading(false);
      });
      razorpay.open();
    } catch (error) {
      toast.error('Failed to create subscription. Please try again.');
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    if (!isForced && !isLoading) {
      onCancel?.();
      onOpenChange?.(false);
    }
  };

  if (!shouldShow()) {
    return null;
  }

  const getTitle = () => {
    switch (mode) {
      case 'forced':
        return 'Unlock Your Full Potential';
      case 'upgrade':
        return 'Upgrade to Pro for Just ₹99';
      case 'purchase':
        return 'Start Building Amazing Resumes';
      default:
        return 'Upgrade to Pro';
    }
  };

  const getDescription = () => {
    switch (mode) {
      case 'forced':
        return `Your trial ended ${daysSinceTrialExpired} day${
          daysSinceTrialExpired !== 1 ? 's' : ''
        } ago. Continue building amazing resumes with AI.`;
      case 'upgrade':
        return `Only ${daysUntilTrialExpires} day${
          daysUntilTrialExpires !== 1 ? 's' : ''
        } left in your trial. Upgrade now for just ₹99/month.`;
      case 'purchase':
        return 'Join thousands of professionals who trust ResuMate to create compelling resumes that get them hired.';
      default:
        return 'Choose a plan to continue using all features.';
    }
  };

  const getButtonText = () => {
    switch (mode) {
      case 'forced':
        return 'Continue with Pro';
      case 'upgrade':
      case 'purchase':
        return 'Get Started Now';
      default:
        return 'Upgrade Now';
    }
  };

  const getBadgeText = () => {
    switch (mode) {
      case 'forced':
        return 'Trial Expired';
      case 'upgrade':
        return 'Upgrade Now';
      case 'purchase':
        return 'Get Started';
      default:
        return 'Upgrade';
    }
  };

  return (
    <div>
      <Script
        id="razorpay-checkout-js"
        src="https://checkout.razorpay.com/v1/checkout.js"
        onLoad={handleRazorpayLoad}
        onError={handleRazorpayError}
        strategy="lazyOnload"
      />
      <Dialog open={true} onOpenChange={handleClose}>
        <DialogContent className={cn('max-h-[85vh] max-w-lg overflow-hidden p-0 sm:max-w-md')}>
          {showCloseButton && !isLoading && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              onClick={handleClose}
              className="absolute top-2 right-2 z-50 rounded-full bg-gray-100 p-1.5 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
            >
              <X className="h-3 w-3" />
            </motion.button>
          )}
          <SubscriptionModalContent
            plan={plan}
            isLoading={isLoading}
            razorpayLoaded={razorpayLoaded}
            getBadgeText={getBadgeText}
            getTitle={getTitle}
            getDescription={getDescription}
            getButtonText={getButtonText}
            handleSubscribe={handleSubscribe}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
