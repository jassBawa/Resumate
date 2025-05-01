import { BackgroundElements } from '@/components/BackgroundElements';
import ShareableResume from '@/components/resume/ShareableResume';
import { extractResumeSections } from '@/config/parseSections';
import { getShareableResumeById } from '@/lib/actions/threads';
import { notFound } from 'next/navigation';

async function ThreadPage({
  params,
}: {
  params: Promise<{ publicId: string }>;
}) {
  const { publicId } = await params;
  const {
    data: threadData,
    error: threadError,
    status,
  } = await getShareableResumeById(publicId);

  if (status == 404) {
    return notFound();
  }

  // Handle other errors if needed
  if (threadError) {
    // You could handle other errors differently or also use notFound()
    return <div>Something went wrong</div>;
  }

  const { sections } = extractResumeSections(threadData.resumeText);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-zinc-900 dark:via-zinc-800 dark:to-black py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300 relative overflow-hidden">
      <BackgroundElements />
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold mb-4 text-center">
          {threadData.name}&apos;s Resume
        </h1>

        <div className="mt-6">{<ShareableResume sections={sections} />}</div>
      </div>
    </div>
  );
}

export default ThreadPage;
