'use client';

import { SubscriptionButton } from '../payment/SubscriptionButton';

interface DashboardContentProps {
  children: React.ReactNode;
}

export function DashboardContent({ children }: DashboardContentProps) {
  const handleSuccess = () => {
    // Refresh the page or update subscription status
    window.location.reload();
  };

  return (
    <div className="container mx-auto px-6 py-8">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
              Your Resumes
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Manage and continue your resume conversations
            </p>
          </div>
          <div className="hidden items-center gap-4 sm:flex">
            <div className="rounded-xl bg-white/60 px-4 py-2 shadow-sm backdrop-blur-sm dark:bg-[#23272f]/60">
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                AI-Powered Resume Builder
              </p>
            </div>
            <SubscriptionButton variant="default" size="sm" onSuccess={handleSuccess}>
              Upgrade to Pro
            </SubscriptionButton>
          </div>
        </div>
      </div>

      {/* Content */}
      {children}
    </div>
  );
}
