import { ThreadList, ThreadListSkeleton } from '@/components/dashboard';
import { Suspense } from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard - ResuMate | Manage Your Resumes',
  description:
    'Manage and continue your resume conversations. View all your resume projects, track progress, and access AI-powered resume building tools.',
  robots: 'noindex, nofollow', // Dashboard should not be indexed
};

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-[#f6f8fa] dark:bg-[#181a20]">
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
            <div className="hidden sm:block">
              <div className="rounded-xl bg-white/60 px-4 py-2 shadow-sm backdrop-blur-sm dark:bg-[#23272f]/60">
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  AI-Powered Resume Builder
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Thread List Section */}
        <div className="space-y-6">
          <Suspense fallback={<ThreadListSkeleton />}>
            <ThreadList />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
