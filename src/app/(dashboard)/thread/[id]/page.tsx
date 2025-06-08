import { BackgroundElements } from '@/components/BackgroundElements';
import ResumeContainer from '@/components/dashboard/resume/ResumeContainer';
import ResumeDropZone from '@/components/resume/ResumeDropzone';
import { getThreadById } from '@/lib/actions/threads';
import React from 'react';

async function ThreadPage({ params }: { params: Promise<{ id: string }> }) {
  const { id: threadId } = await params;
  const { data: threadData, error: threadError } = await getThreadById(
    threadId
  );

  if (threadError) {
    <div> Something went wrong</div>;
  }

  const isResumeUploaded =
    threadData.fileId !== null && threadData.fileId !== '';

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-zinc-900 dark:via-zinc-800 dark:to-black pt-4 pb-24 px-4 sm:px-6 lg:px-8 transition-colors duration-300 overflow-hidden">
      {/* Blurred color blobs for depth */}
      <div className="pointer-events-none select-none">
        <div className="absolute top-[-8rem] left-[-8rem] w-[32rem] h-[32rem] bg-blue-200 dark:bg-blue-900 opacity-20 rounded-full blur-3xl z-0" />
        <div className="absolute bottom-[-8rem] right-[-8rem] w-[32rem] h-[32rem] bg-purple-200 dark:bg-purple-900 opacity-20 rounded-full blur-3xl z-0" />
        <div className="absolute top-1/2 left-[-6rem] w-[20rem] h-[20rem] bg-pink-200 dark:bg-pink-900 opacity-10 rounded-full blur-2xl z-0" />
      </div>
      <BackgroundElements />
      <div className="relative z-10 mx-auto">
        {!isResumeUploaded && (
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-2">Upload Resume</h2>
            <ResumeDropZone threadId={threadId} />
          </div>
        )}

        {isResumeUploaded && <ResumeContainer threadId={threadId} />}
      </div>
    </div>
  );
}

export default ThreadPage;
