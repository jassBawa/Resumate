import ResumeDropZone from '@/components/resume/ResumeDropzone';
import { getThreadById } from '@/lib/actions/threads';
import DashboardLayout from './DashboardLayout';

async function ThreadPage({ params }: { params: Promise<{ id: string }> }) {
  const { id: threadId } = await params;
  const { data: threadData, error: threadError } = await getThreadById(threadId);
  if (threadError) {
    <div> Something went wrong</div>;
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
