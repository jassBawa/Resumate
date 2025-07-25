'use client';

import { useState } from 'react';
import { Crown } from 'lucide-react';
import { Button } from '../ui/button';
import { SubscriptionModal } from './SubscriptionModal';
import { useSubscriptionContext } from '@/contexts/SubscriptionProvider';

interface SubscriptionButtonProps {
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  children?: React.ReactNode;
  className?: string;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export function SubscriptionButton({
  variant = 'default',
  size = 'default',
  children,
  className,
  onSuccess,
  onCancel,
}: SubscriptionButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { isSubscribed } = useSubscriptionContext();

  const handleSuccess = () => {
    setIsOpen(false);
    onSuccess?.();
  };

  const handleCancel = () => {
    setIsOpen(false);
    onCancel?.();
  };

  const defaultChildren = (
    <>
      <Crown className="mr-2 h-4 w-4" />
      Get Pro Plan
    </>
  );

  // Don't render the button if user is already subscribed
  if (isSubscribed) {
    return null;
  }

  return (
    <>
      <Button variant={variant} size={size} className={className} onClick={() => setIsOpen(true)}>
        {children || defaultChildren}
      </Button>

      <SubscriptionModal
        open={isOpen}
        onOpenChange={setIsOpen}
        mode="purchase"
        onSuccess={handleSuccess}
        onCancel={handleCancel}
      />
    </>
  );
}
