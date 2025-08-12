'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { createPortal } from 'react-dom';
import Script from 'next/script';
import { X } from 'lucide-react';
import { Dialog, DialogContent } from '../ui/dialog';
import { useSubscriptionContext } from '@/contexts/SubscriptionProvider';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { SubscriptionModalContent } from './subscription/SubscriptionModalContent';
import { PaymentErrorBoundary } from './ErrorBoundary';
import { usePayment } from '@/hooks/usePayment';
import { useRazorpayScript } from '@/hooks/useRazorpayScript';
import type { SubscriptionModalProps, SubscriptionMode, Plan } from '@/types/subscription';

// Default plan configuration
const DEFAULT_PLAN: Plan = {
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
  description: 'Everything you need to create professional resumes',
};

// Memoized content generators to prevent unnecessary re-renders
const useContentGenerators = (
  mode: SubscriptionMode,
  daysUntilTrialExpires: number,
  daysSinceTrialExpired: number
) => {
  return useMemo(
    () => ({
      getTitle: (): string => {
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
      },

      getDescription: (): string => {
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
      },

      getButtonText: (): string => {
        switch (mode) {
          case 'forced':
            return 'Continue with Pro';
          case 'upgrade':
          case 'purchase':
            return 'Get Started Now';
          default:
            return 'Upgrade Now';
        }
      },

      getBadgeText: (): string => {
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
      },
    }),
    [mode, daysUntilTrialExpires, daysSinceTrialExpired]
  );
};

export function SubscriptionModal({
  open,
  onOpenChange,
  mode = 'forced',
  onSuccess,
  onCancel,
  plan = DEFAULT_PLAN,
}: SubscriptionModalProps) {
  const [showCloseButton, setShowCloseButton] = useState(false);
  const [key, setKey] = useState(0); // For force re-render on errors

  const {
    isTrialExpired,
    daysUntilTrialExpires,
    daysSinceTrialExpired,
    shouldShowSubscriptionModal,
    shouldShowUpgradePrompt,
    refreshSubscription,
    isLoading: subscriptionLoading,
  } = useSubscriptionContext();

  const { isLoaded: razorpayLoaded, error: razorpayError } = useRazorpayScript();

  // Memoized content generators
  const contentGenerators = useContentGenerators(
    mode,
    daysUntilTrialExpires,
    daysSinceTrialExpired
  );

  const isForced = useMemo(() => mode === 'forced' && isTrialExpired, [mode, isTrialExpired]);

  // Payment processing logic
  const {
    isLoading: paymentLoading,
    processPayment,
    error: paymentError,
    clearError,
  } = usePayment({
    plan,
    onSuccess: useCallback(async () => {
      try {
        await refreshSubscription();
        onSuccess?.();
        onOpenChange?.(false);
      } catch (error) {
        console.error('Failed to refresh subscription:', error);
        toast.error('Payment successful, but failed to update status. Please refresh the page.');
      }
    }, [refreshSubscription, onSuccess, onOpenChange]),
    onCancel: useCallback(() => {
      onCancel?.();
      if (!isForced) {
        onOpenChange?.(false);
      }
    }, [onCancel, onOpenChange, isForced]),
    onError: useCallback((error: Error) => {
      console.error('Payment error:', error);
    }, []),
  });

  // Determine modal visibility
  const shouldShow = useMemo(() => {
    if (subscriptionLoading) return false;
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
  }, [open, mode, shouldShowSubscriptionModal, shouldShowUpgradePrompt, subscriptionLoading]);

  // Handle close button visibility for upgrade prompts
  useEffect(() => {
    if (mode === 'upgrade' && !isForced) {
      const timer = setTimeout(() => setShowCloseButton(true), 5000);
      return () => clearTimeout(timer);
    }
  }, [mode, isForced]);

  // Handle modal close
  const handleClose = useCallback(() => {
    if (!isForced && !paymentLoading) {
      clearError();
      onCancel?.();
      onOpenChange?.(false);
    }
  }, [isForced, paymentLoading, clearError, onCancel, onOpenChange]);

  // Handle payment initiation
  const handleSubscribe = useCallback(async () => {
    clearError();
    await processPayment();
  }, [clearError, processPayment]);

  // Error recovery
  const handleErrorRecovery = useCallback(() => {
    clearError();
    setKey(prev => prev + 1); // Force re-render
  }, [clearError]);

  // Loading state
  const isLoading = paymentLoading || subscriptionLoading;

  if (!shouldShow) {
    return null;
  }

  return (
    <PaymentErrorBoundary onError={handleErrorRecovery}>
      <div key={key}>
        {/* Global styles for Razorpay z-index/focus fix */}
        <style jsx global>{`
          .razorpay-container {
            z-index: 2147483647 !important;
          }
          .razorpay-checkout-frame {
            z-index: 2147483647 !important;
          }
          .razorpay-backdrop,
          .razorpay-modal,
          iframe[src*='razorpay'] {
            z-index: 2147483647 !important;
          }
        `}</style>

        {/* Load Razorpay script */}
        <Script
          id="razorpay-checkout-js"
          src="https://checkout.razorpay.com/v1/checkout.js"
          // strategy="lazyOnload"
          onError={() => {
            console.error('Failed to load Razorpay script');
            toast.error('Payment system failed to load. Please refresh the page.');
          }}
        />

        {/* Custom overlay to block background while keeping Razorpay interactive */}
        {shouldShow &&
          typeof window !== 'undefined' &&
          createPortal(
            <div
              className="fixed inset-0 z-[58] bg-black/70"
              aria-hidden="true"
              onClick={() => {
                if (!isForced && !isLoading) {
                  handleClose();
                }
              }}
            />,
            document.body
          )}

        <Dialog
          open={shouldShow}
          modal={false}
          onOpenChange={handleClose}
          aria-labelledby="subscription-modal-title"
          aria-describedby="subscription-modal-description"
        >
          <DialogContent
            className={cn(
              'z-[60] max-h-[90vh] max-w-lg overflow-hidden p-0 sm:max-w-md',
              'focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none'
            )}
            onPointerDownOutside={e => {
              // Prevent closing during payment processing
              if (isLoading || isForced) {
                e.preventDefault();
              }
            }}
            onEscapeKeyDown={e => {
              // Prevent ESC key closing during payment or forced mode
              if (isLoading || isForced) {
                e.preventDefault();
              }
            }}
          >
            {/* Close button for upgrade prompts */}
            <AnimatePresence>
              {showCloseButton && !isForced && !isLoading && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  onClick={handleClose}
                  className={cn(
                    'absolute top-2 right-2 z-50 rounded-full bg-gray-100 p-1.5',
                    'text-gray-600 hover:bg-gray-200 dark:bg-gray-800',
                    'dark:text-gray-300 dark:hover:bg-gray-700',
                    'focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none'
                  )}
                  aria-label="Close subscription modal"
                >
                  <X className="h-3 w-3" />
                </motion.button>
              )}
            </AnimatePresence>

            {/* Error display */}
            {(paymentError || razorpayError) && (
              <div className="border-b border-red-200 bg-red-50 p-3 dark:bg-red-900/20">
                <p className="text-sm text-red-600 dark:text-red-400">
                  {paymentError?.message || razorpayError || 'An error occurred'}
                </p>
              </div>
            )}

            {/* Main content */}
            <SubscriptionModalContent
              plan={plan}
              isLoading={isLoading}
              razorpayLoaded={razorpayLoaded}
              getBadgeText={contentGenerators.getBadgeText}
              getTitle={contentGenerators.getTitle}
              getDescription={contentGenerators.getDescription}
              getButtonText={contentGenerators.getButtonText}
              handleSubscribe={handleSubscribe}
            />
          </DialogContent>
        </Dialog>
      </div>
    </PaymentErrorBoundary>
  );
}

// Export types for external use
export type { SubscriptionModalProps, SubscriptionMode, Plan };
