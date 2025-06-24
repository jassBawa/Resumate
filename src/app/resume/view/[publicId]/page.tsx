import { BackgroundElements } from '@/components/BackgroundElements';
import ShareableResumeTemplate from '@/components/template/ShareableResumeTemplate';
// import { extractResumeSections } from '@/config/parseSections';
import { getShareableResumeById } from '@/lib/actions/threads';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ publicId: string }>;
}): Promise<Metadata> {
  const { publicId } = await params;
  const { data: threadData, error: threadError, status } = await getShareableResumeById(publicId);

  if (status === 404 || threadError || !threadData) {
    return {
      title: 'Resume Not Found - ResuMate',
      description: 'The requested resume could not be found.',
      robots: 'noindex, nofollow',
    };
  }

  const resumeOwnerName = threadData.name || 'Professional';

  return {
    title: `${resumeOwnerName}'s Resume - ResuMate`,
    description: `View ${resumeOwnerName}'s professional resume created with ResuMate's AI-powered resume builder. Professional resume template with optimized formatting.`,
    openGraph: {
      title: `${resumeOwnerName}'s Resume`,
      description: `Professional resume created with ResuMate`,
      type: 'profile',
    },
    robots: 'noindex, nofollow', // Public resumes should not be indexed for privacy
  };
}

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
        <h1 className="mb-4 text-center text-2xl font-bold">{threadData.name} Resume</h1>

        <div className="mt-6">{<ShareableResumeTemplate sections={sections} />}</div>
      </div>
    </div>
  );
}

export default ThreadPage;
