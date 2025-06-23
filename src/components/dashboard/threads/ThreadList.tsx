import EmptyState from '@/components/dashboard/threads/EmptyState';
import ThreadCard, { Thread } from '@/components/dashboard/threads/ThreadCard';
import { getThreads } from '@/lib/actions/threads';
import { CreateThreadButton } from '@/components/dashboard';

export default async function ThreadList() {
  const threads = await getThreads();

  if (!threads || threads.length === 0) {
    return (
      <div className="relative min-h-[60vh] overflow-hidden rounded-3xl bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-8 dark:from-blue-900/20 dark:via-purple-900/20 dark:to-pink-900/20">
        {/* Colorful Blobs */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 -left-20 h-40 w-40 rounded-full bg-gradient-to-r from-blue-400/30 to-purple-400/30 blur-3xl"></div>
          <div className="absolute -right-20 -bottom-20 h-40 w-40 rounded-full bg-gradient-to-r from-purple-400/30 to-pink-400/30 blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-emerald-400/20 to-teal-400/20 blur-2xl"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center">
          <EmptyState />
          <div className="mt-8">
            <CreateThreadButton />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats Section */}
      <div className="rounded-2xl bg-white/60 p-6 shadow-lg backdrop-blur-sm dark:bg-[#23272f]/60">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Resume Projects</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {threads.length} {threads.length === 1 ? 'project' : 'projects'} in your workspace
            </p>
          </div>
        </div>
      </div>

      {/* Threads Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {threads.map((thread: Thread) => (
          <ThreadCard key={thread.id} thread={thread} />
        ))}
      </div>

      {/* Bottom Spacing */}
      <div className="h-8"></div>
    </div>
  );
}
