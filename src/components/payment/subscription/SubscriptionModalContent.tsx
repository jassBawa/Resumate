import { SubscriptionModalHeader } from './SubscriptionModalHeader';
import { SubscriptionModalPlan } from './SubscriptionModalPlan';
import type { Plan } from '@/types/subscription';

interface SubscriptionModalContentProps {
  plan: Plan;
  isLoading: boolean;
  razorpayLoaded: boolean;
  getBadgeText: () => string;
  getTitle: () => string;
  getDescription: () => string;
  getButtonText: () => string;
  handleSubscribe: () => void;
}

export function SubscriptionModalContent({
  plan,
  isLoading,
  razorpayLoaded,
  getBadgeText,
  getTitle,
  getDescription,
  getButtonText,
  handleSubscribe,
}: SubscriptionModalContentProps) {
  return (
    <div className="flex flex-col">
      <SubscriptionModalHeader
        getBadgeText={getBadgeText}
        getTitle={getTitle}
        getDescription={getDescription}
      />
      <SubscriptionModalPlan
        plan={plan}
        isLoading={isLoading}
        razorpayLoaded={razorpayLoaded}
        getButtonText={getButtonText}
        handleSubscribe={handleSubscribe}
      />
    </div>
  );
}
