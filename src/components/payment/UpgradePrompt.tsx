'use client';

import { useState, useEffect } from 'react';
import { Crown, X, Sparkles } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { motion, AnimatePresence } from 'framer-motion';
import { useSubscriptionContext } from '@/contexts/SubscriptionProvider';
import { SubscriptionModal } from './SubscriptionModal';

export function UpgradePrompt() {
  const [isVisible, setIsVisible] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const { shouldShowUpgradePrompt, daysUntilTrialExpires } = useSubscriptionContext();

  useEffect(() => {
    if (shouldShowUpgradePrompt()) {
      // Show prompt after a delay
      const timer = setTimeout(() => setIsVisible(true), 3000);
      return () => clearTimeout(timer);
    }
  }, [shouldShowUpgradePrompt]);

  const handleUpgrade = () => {
    setShowModal(true);
    setIsVisible(false);
  };

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!shouldShowUpgradePrompt() || !isVisible) {
    return null;
  }

  return (
    <>
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.9 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="fixed right-4 bottom-4 z-50 max-w-sm"
        >
          <div className="relative rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 p-4 text-white shadow-lg">
            <button
              onClick={handleClose}
              className="absolute -top-2 -right-2 rounded-full bg-white/20 p-1 text-white hover:bg-white/30"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="flex items-start gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
                <Crown className="h-4 w-4" />
              </div>

              <div className="flex-1">
                <div className="mb-2 flex items-center gap-2">
                  <h3 className="font-semibold">Upgrade to Pro</h3>
                  <Badge variant="secondary" className="bg-white/20 text-white">
                    {daysUntilTrialExpires} day{daysUntilTrialExpires !== 1 ? 's' : ''} left
                  </Badge>
                </div>

                <p className="mb-3 text-sm text-blue-100">
                  Unlock unlimited AI conversations and premium features. Save 33% on yearly plans!
                </p>

                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    className="bg-white text-blue-600 hover:bg-gray-100"
                    onClick={handleUpgrade}
                  >
                    <Sparkles className="mr-1 h-3 w-3" />
                    Upgrade Now
                  </Button>

                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-white hover:bg-white/10"
                    onClick={handleClose}
                  >
                    Maybe Later
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Unified Subscription Modal */}
      <SubscriptionModal
        open={showModal}
        onOpenChange={setShowModal}
        mode="upgrade"
        onSuccess={() => {
          setShowModal(false);
        }}
        onCancel={() => {
          setShowModal(false);
        }}
      />
    </>
  );
}
