import { ThreadList, ThreadListSkeleton } from '@/components/dashboard';
import { DashboardContent } from '@/components/dashboard/DashboardContent';
import { SubscriptionModal } from '@/components/payment/SubscriptionModal';
import { UpgradePrompt } from '@/components/payment/UpgradePrompt';
import { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Dashboard - ResuMate | Manage Your Resumes',
  description:
    'Manage and continue your resume conversations. View all your resume projects, track progress, and access AI-powered resume building tools.',
  robots: 'noindex, nofollow', // Dashboard should not be indexed
};

export default async function DashboardPage() {
  return (
    <main className="min-h-screen bg-[#f6f8fa] dark:bg-[#181a20]">
      <DashboardContent>
        {/* Thread List Section */}
        <div className="space-y-6">
          <Suspense fallback={<ThreadListSkeleton />}>
            <ThreadList />
          </Suspense>
        </div>
      </DashboardContent>

      {/* Subscription Modal - will show automatically based on user's subscription status */}
      <SubscriptionModal mode="forced" />

      {/* Upgrade Prompt - shows during trial period */}
      <UpgradePrompt />
    </main>
  );
}
