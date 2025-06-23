import ResumeDropZone from '@/components/resume/ResumeDropzone';
import { getThreadById } from '@/lib/actions/threads';
import DashboardLayout from './DashboardLayout';
import { notFound } from 'next/navigation';

async function ThreadPage({ params }: { params: Promise<{ id: string }> }) {
  const { id: threadId } = await params;
  const { data: threadData, error: threadError, status } = await getThreadById(threadId);

  // Handle 404 errors and non-existent threads
  if (status === 404 || !threadData) {
    notFound();
  }

  // Handle other errors (optional: you could show an error page instead)
  if (threadError) {
    throw new Error(`Failed to load thread: ${threadError}`);
  }

  const isResumeUploaded = threadData.fileId !== null && threadData.fileId !== '';

  return (
    <>
      <div className="relative">
        {!isResumeUploaded && (
          <div className="mt-6">
            <h2 className="mb-2 text-xl font-semibold">Upload Resume</h2>
            <ResumeDropZone threadId={threadId} />
          </div>
        )}
      </div>
      {isResumeUploaded && <DashboardLayout threadId={threadId} />}
    </>
  );
}

export default ThreadPage;
