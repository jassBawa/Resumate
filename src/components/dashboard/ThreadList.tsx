import EmptyState from '@/components/dashboard/EmptyState';
import ThreadCard, { Thread } from '@/components/dashboard/ThreadCard';
import { getThreads } from '@/lib/actions/threads';

export default async function ThreadList() {
  const threads = await getThreads();

  if (!threads || threads.length === 0) {
    return <EmptyState />;
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {threads.map((thread: Thread) => (
        <ThreadCard key={thread.id} thread={thread} />
      ))}
    </div>
  );
}
