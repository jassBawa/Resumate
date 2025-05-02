import { BackgroundElements } from '@/components/BackgroundElements';
import ResumeContainer from '@/components/dashboard/ResumeContainer';
import ResumeDropZone from '@/components/resume/ResumeDropzone';
import { getThreadById } from '@/lib/actions/threads';
// import { notFound } from 'next/navigation';
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-zinc-900 dark:via-zinc-800 dark:to-black py-12 pb-24 px-4 sm:px-6 lg:px-8 transition-colors duration-300 relative overflow-hidden">
      <BackgroundElements />
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Thread: {threadData.name}</h1>
        {!isResumeUploaded && (
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-2">Upload Resume</h2>
            <ResumeDropZone threadId={threadId} />
          </div>
        )}

        <div className="mt-6">
          {isResumeUploaded && (
            <ResumeContainer
              threadId={threadId}
              resumeText={threadData.resumeText}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default ThreadPage;
