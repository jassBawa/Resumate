import {
  CreateThreadButton,
  ThreadList,
  ThreadListSkeleton,
} from '@/components/dashboard';
import { Suspense } from 'react';

export default function DashboardPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Your Resumes</h1>
          <p className="text-muted-foreground mt-2">
            Manage and continue your resume conversations
          </p>
        </div>
      </div>
      <div className="relative">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full border-t border-border/50" />
        </div>
        <div className="relative flex justify-center">
          <span className="bg-background px-4 text-sm text-muted-foreground">
            Recent conversations
          </span>
        </div>
      </div>
      <div className="mt-8">
        <Suspense fallback={<ThreadListSkeleton />}>
          <ThreadList />
        </Suspense>
      </div>
      <CreateThreadButton />
    </main>
  );
}
