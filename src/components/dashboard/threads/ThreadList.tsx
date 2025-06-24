import { CreateThreadButton } from '@/components/dashboard';
import ThreadCard, { Thread } from '@/components/dashboard/threads/ThreadCard';
import { getThreads } from '@/lib/actions/threads';
import { ArrowRight, FileText, Sparkles } from 'lucide-react';
import CreateResumeButton from './CreateResumeButton';

export default async function ThreadList() {
  const threads = await getThreads();

  if (!threads || threads.length === 0) {
    return (
      <div className="relative min-h-[60vh] overflow-hidden rounded-2xl bg-white/60 p-8 shadow-lg backdrop-blur-sm dark:bg-[#23272f]/60">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 h-full w-full opacity-5 dark:opacity-10">
            <div className="absolute top-8 left-8 h-2 w-2 rounded-full bg-blue-500"></div>
            <div className="absolute top-16 right-12 h-1 w-1 rounded-full bg-gray-400"></div>
            <div className="absolute bottom-12 left-12 h-1.5 w-1.5 rounded-full bg-gray-300"></div>
            <div className="absolute right-8 bottom-8 h-1 w-1 rounded-full bg-gray-400"></div>
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center">
          <div className="mb-8">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
              <FileText className="h-10 w-10 text-blue-600 dark:text-blue-400" />
            </div>
            <h2 className="mb-3 text-2xl font-bold text-gray-900 dark:text-white">
              Create Your First AI Resume
            </h2>
            <p className="mx-auto max-w-md text-gray-600 dark:text-gray-400">
              Start building your professional resume with AI assistance. Get personalized
              recommendations and create a standout resume that gets you hired.
            </p>
          </div>

          <div className="mb-8">
            <CreateResumeButton />
          </div>

          {/* Feature Highlights */}
          <div className="grid max-w-2xl grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30">
                <Sparkles className="h-3 w-3 text-blue-600 dark:text-blue-400" />
              </div>
              <span>AI-Powered</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/30">
                <ArrowRight className="h-3 w-3 text-emerald-600 dark:text-emerald-400" />
              </div>
              <span>ATS Optimized</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900/30">
                <FileText className="h-3 w-3 text-purple-600 dark:text-purple-400" />
              </div>
              <span>Professional</span>
            </div>
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

      {/* Floating Create Button - only show when there are existing threads */}
      <CreateThreadButton />
    </div>
  );
}
