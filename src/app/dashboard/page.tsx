import { Suspense } from 'react';
import CustomDarkToggle from '@/components/DarkToggle';
import {
  DashboardHeader,
  ThreadList,
  ThreadListSkeleton,
  CreateThreadButton,
} from '@/components/dashboard';

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <main className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold tracking-tight">
            Your Conversations
          </h1>
          <CustomDarkToggle />
        </div>

        <Suspense fallback={<ThreadListSkeleton />}>
          <ThreadList />
        </Suspense>

        <CreateThreadButton />
      </main>
    </div>
  );
}
