import { BackgroundElements } from '@/components/BackgroundElements';
import ShareableResumeTemplate from '@/components/template/ShareableResumeTemplate';
// import { extractResumeSections } from '@/config/parseSections';
import { getShareableResumeById } from '@/lib/actions/threads';
import { notFound } from 'next/navigation';

async function ThreadPage({ params }: { params: Promise<{ publicId: string }> }) {
  const { publicId } = await params;
  const { data: threadData, error: threadError, status } = await getShareableResumeById(publicId);

  if (status == 404) {
    return notFound();
  }

  // Handle other errors if needed
  if (threadError) {
    // You could handle other errors differently or also use notFound()
    return <div>Something went wrong</div>;
  }

  const sections = threadData.parsedSections;

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-100 px-4 py-12 transition-colors duration-300 sm:px-6 lg:px-8 dark:from-zinc-900 dark:via-zinc-800 dark:to-black">
      <BackgroundElements />
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-4 text-center text-2xl font-bold">{threadData.name}&;s Resume</h1>

        <div className="mt-6">{<ShareableResumeTemplate sections={sections} />}</div>
      </div>
    </div>
  );
}

export default ThreadPage;
