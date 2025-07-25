'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { getUserDetails } from '@/lib/actions/payments/getUserDetails';

export interface SubscriptionStatus {
  isSubscribed: boolean;
  isTrialExpired: boolean;
  trialEndDate: Date | null;
  subscriptionEndDate: Date | null;
  daysUntilTrialExpires: number;
  daysSinceTrialExpired: number;
  isLoading: boolean;
}

interface SubscriptionContextType extends SubscriptionStatus {
  refreshSubscription: () => Promise<void>;
  shouldShowSubscriptionModal: () => boolean;
  shouldShowUpgradePrompt: () => boolean;
}

const SubscriptionContext = createContext<SubscriptionContextType | null>(null);

export const useSubscriptionContext = () => {
  const context = useContext(SubscriptionContext);
  if (!context) {
    throw new Error('useSubscriptionContext must be used within a SubscriptionProvider');
  }
  return context;
};

export function SubscriptionProvider({ children }: { children: React.ReactNode }) {
  const [status, setStatus] = useState<SubscriptionStatus>({
    isSubscribed: false,
    isTrialExpired: false,
    trialEndDate: null,
    subscriptionEndDate: null,
    daysUntilTrialExpires: 0,
    daysSinceTrialExpired: 0,
    isLoading: true,
  });

  const fetchSubscriptionStatus = async () => {
    try {
      const { user, error } = await getUserDetails();

      if (error || !user) {
        setStatus(prev => ({ ...prev, isLoading: false }));
        return;
      }

      const now = new Date();
      const trialEndDate = user.subscriptionEndDate ? new Date(user.subscriptionEndDate) : null;

      // Calculate trial status
      const isTrialExpired = trialEndDate ? trialEndDate < now : false;
      // const isTrialExpired = true; // testing
      const daysUntilTrialExpires = trialEndDate
        ? Math.ceil((trialEndDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
        : 0;
      const daysSinceTrialExpired =
        trialEndDate && isTrialExpired
          ? Math.floor((now.getTime() - trialEndDate.getTime()) / (1000 * 60 * 60 * 24))
          : 0;

      setStatus({
        isSubscribed: user.isSubscribed,
        isTrialExpired,
        trialEndDate,
        subscriptionEndDate: user.subscriptionEndDate ? new Date(user.subscriptionEndDate) : null,
        daysUntilTrialExpires: Math.max(0, daysUntilTrialExpires),
        daysSinceTrialExpired,
        isLoading: false,
      });
    } catch (error) {
      console.error('Error fetching subscription status:', error);
      setStatus(prev => ({ ...prev, isLoading: false }));
    }
  };

  const refreshSubscription = async () => {
    setStatus(prev => ({ ...prev, isLoading: true }));
    await fetchSubscriptionStatus();
  };

  const shouldShowSubscriptionModal = () => {
    if (status.isLoading) return false;
    if (status.isSubscribed) return false;
    return status.isTrialExpired;
  };

  const shouldShowUpgradePrompt = () => {
    if (status.isLoading) return false;
    if (status.isSubscribed) return false;
    // Show upgrade prompt when trial is about to expire (within 3 days)
    return status.daysUntilTrialExpires <= 3 && status.daysUntilTrialExpires > 0;
  };

  useEffect(() => {
    fetchSubscriptionStatus();
  }, []);

  const value: SubscriptionContextType = {
    ...status,
    refreshSubscription,
    shouldShowSubscriptionModal,
    shouldShowUpgradePrompt,
  };

  return <SubscriptionContext.Provider value={value}>{children}</SubscriptionContext.Provider>;
}
