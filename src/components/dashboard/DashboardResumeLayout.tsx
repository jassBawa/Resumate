'use client';
import { useState } from 'react';
import { TemplateSelectionModal } from './TemplateSelectionModal';

import { Button } from '@/components/ui/button';
import { FileText, MoveLeft, Share, Trash } from 'lucide-react';
import ParsedResumeTemplate from '../template/ParsedResumeTemplate';
import { ShareResumeModal } from './ShareResumeModal';
import Link from 'next/link';
import { deleteResume } from '@/lib/actions/resume';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { useResumeStore } from '@/hooks/useResumeStore';

export interface ThreadData {
  isSharable: boolean;
  publicId: string;
  viewerCount: number;
  title: string;
  resumeText: string;
}

interface ResumeLayoutProps {
  threadData: ThreadData;
  threadId: string;
  resumeText: string;
}

export function ResumeLayout({
  threadData,
  threadId,
  resumeText,
}: ResumeLayoutProps) {
  const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false);
  const [isShareResumeModalOpen, setIsShareResumeModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { resumeSections } = useResumeStore();

  const router = useRouter();

  const handleDelete = async () => {
    setIsDeleting(true);
    const result = await deleteResume(threadId);
    setIsDeleting(false);

    if (result.success) {
      toast.success('Resume deleted successfully');
      router.refresh();
    } else {
      toast.error(result.error || 'Failed to delete resume');
    }
  };

  return (
    <div className="p-3 md:p-6">
      <div className="max-w-4xl mx-auto mb-6">
        <div className="mb-4">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-gray-900 transition"
          >
            <MoveLeft className="" />
            <span>Dashboard</span>
          </Link>
        </div>
        <div className="mt-8 flex flex-col gap-4 justify-center items-center md:block">
          <div className="w-full flex flex-col gap-6 md:flex-row justify-between items-center">
            <h1 className="text-2xl font-bold">Your Resume</h1>

            <div className="flex flex-col md:flex-row gap-2">
              <Button
                variant="outline"
                onClick={() => setIsShareResumeModalOpen(true)}
              >
                Share Resume
                <Share />
              </Button>
              <Button
                variant="outline"
                onClick={() => setIsTemplateModalOpen(true)}
              >
                Export pdf
                <FileText />
              </Button>

              <Button
                variant="destructive"
                onClick={handleDelete}
                disabled={isDeleting}
              >
                {isDeleting ? 'Deleting...' : 'Delete Resume'}
                <Trash />
              </Button>
            </div>
          </div>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
            <span className="font-semibold text-blue-600">Tip:</span> Hover over
            different sections to view helpful insights
          </p>
        </div>
      </div>

      <TemplateSelectionModal
        isOpen={isTemplateModalOpen}
        onClose={() => setIsTemplateModalOpen(false)}
        sections={resumeSections}
      />
      <ShareResumeModal
        isOpen={isShareResumeModalOpen}
        onClose={() => setIsShareResumeModalOpen(false)}
        isSharable={threadData.isSharable}
        publicId={threadData.publicId}
        threadId={threadId}
      />

      <ParsedResumeTemplate showAnalysis={true} resumeText={resumeText} />
    </div>
  );
}
