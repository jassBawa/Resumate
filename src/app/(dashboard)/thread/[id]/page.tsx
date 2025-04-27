import { BackgroundElements } from '@/components/BackgroundElements';
import ResumeDropZone from '@/components/resume/ResumeDropzone';
import { ResumeLayout } from '@/components/template/ResumeLayout';
import { getResumeSections } from '@/lib/actions/resume';
import { getThreadById } from '@/lib/actions/threads';
import { notFound } from 'next/navigation';
import React from 'react';

async function ThreadPage({ params }: { params: Promise<{ id: string }> }) {
  const { id: threadId } = await params;
  const { data: threadData, error: threadError } = await getThreadById(threadId);

  if (threadError) {
    console.log(threadError);
    return notFound();
  }
  console.log(threadData);

  const isResumeUploaded = threadData.fileId !== null && threadData.fileId !== '';


  // TODO: move this to client side
  let sectionsData = null;

  if (isResumeUploaded) {
    const { data, error } = await getResumeSections(threadId);
    if (!error && data?.sections) {
      sectionsData = data.sections;
    }
  }


  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-zinc-900 dark:via-zinc-800 dark:to-black py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300 relative overflow-hidden">
      <BackgroundElements />
      <div className='max-w-7xl mx-auto'>
      <h1 className="text-2xl font-bold mb-4">Thread Details</h1>
      {!isResumeUploaded && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">Upload Resume</h2>
          <ResumeDropZone threadId={threadId} />
        </div>
      )}

      {/* Display thread data */}
      <div className="mt-6">
        {/* Your thread display logic here */}
        {isResumeUploaded && sectionsData && (
         <div>
          <ResumeLayout sections={sectionsData.sections} />
         </div>
        )}
      </div>
      </div>
    </div>
  );
}

export default ThreadPage;
