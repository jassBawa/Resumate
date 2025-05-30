'use client';

import type React from 'react';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

// Icons
import { ArrowLeft, Info, KeyRound } from 'lucide-react';

// Components
import { Card } from '@/components/ui/card';
import ParsedResumeTemplate from '../template/ParsedResumeTemplate';
import { ShareResumeModal } from './modals/ShareResumeModal';
import { TemplateSelectionModal } from './modals/TemplateSelectionModal';
import { VersionModal } from './modals/VersionModal';
import { DeleteResumeModal } from './modals/DeleteResumeModal';

// Actions
import { deleteResume, getResumeSections } from '@/lib/actions/resume';
import { ResumeActionBar } from './DashboardActionBar';
import { useResumeStore } from '@/hooks/useResumeStore';

export interface ThreadData {
  isSharable: boolean;
  publicId: string;
  viewerCount: number;
  title: string;
  resumeText: string;
  currentVersionId: string;
}

interface ResumeLayoutProps {
  threadData: ThreadData;
  threadId: string;
  setThreadData: React.Dispatch<React.SetStateAction<ThreadData>>;
}

export function ResumeLayout({
  threadData,
  threadId,
  setThreadData,
}: ResumeLayoutProps) {
  // Modal states
  const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false);
  const [isShareResumeModalOpen, setIsShareResumeModalOpen] = useState(false);
  const [isVersionModalOpen, setIsVersionModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  // Loading states
  const [isDeleting, setIsDeleting] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const router = useRouter();

  const { setOriginalSections, setResumeSections } = useResumeStore();

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const result = await deleteResume(threadId);

      if (result.success) {
        toast.success('Resume deleted successfully');
        router.push('/dashboard');
      } else {
        toast.error(result.error || 'Failed to delete resume');
      }
    } catch (error) {
      console.log(error);
      toast.error('An unexpected error occurred');
    } finally {
      setIsDeleting(false);
      setIsDeleteDialogOpen(false);
    }
  };

  const handleRefreshResume = async () => {
    setIsRefreshing(true);
    try {
      const { data, error } = await getResumeSections(threadId);
      if (error) {
        toast.error(error);
      }
      if (data?.sections) {
        setResumeSections(data.sections);
        setOriginalSections(data.sections);
        setThreadData(data.threadData);
      }
    } finally {
      setTimeout(() => setIsRefreshing(false), 500); // Ensure user sees the loading state
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 's') {
        e.preventDefault();
        setIsShareResumeModalOpen(true);
      } else if ((e.metaKey || e.ctrlKey) && e.key === 'e') {
        e.preventDefault();
        setIsTemplateModalOpen(true);
      } else if ((e.metaKey || e.ctrlKey) && e.key === 'v') {
        e.preventDefault();
        setIsVersionModalOpen(true);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="p-3 md:p-6" tabIndex={0}>
      <div className="max-w-4xl mx-auto mb-6">
        {/* Back navigation */}
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 px-3 py-2 text-sm transition-colors rounded-md hover:bg-muted"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Dashboard</span>
        </Link>

        <div className="mt-8">
          {/* Header section */}
          <div className="space-y-4">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">
                  {threadData.title || 'Full-Stack Developer'}
                </h1>
                <p className="text-muted-foreground">
                  Resume • Last updated 2 hours ago
                </p>
              </div>
            </div>

            {/* Action Bar */}
            <ResumeActionBar
              onShare={() => setIsShareResumeModalOpen(true)}
              onExport={() => setIsTemplateModalOpen(true)}
              onVersions={() => setIsVersionModalOpen(true)}
              onRefresh={handleRefreshResume}
              onDelete={handleDelete}
              isDeleting={isDeleting}
              isRefreshing={isRefreshing}
              viewCount={threadData.viewerCount}
            />
          </div>

          {/* Tip card */}
          <Card className="p-4 mt-4 mb-6 border-blue-200 bg-blue-50 dark:bg-blue-950 dark:border-blue-900">
            <div className="flex items-start gap-3">
              <Info className="flex-shrink-0 w-5 h-5 mt-0.5 text-blue-500" />
              <div>
                <p className="text-sm font-medium text-blue-800 dark:text-blue-300">
                  Pro Tips
                </p>
                <ul className="mt-1 text-sm text-blue-700 dark:text-blue-400">
                  <li className="flex items-center gap-1.5">
                    <span>•</span> Hover over different sections to view helpful
                    insights
                  </li>
                  <li className="flex items-center gap-1.5">
                    <span>•</span> Use keyboard shortcuts for quick actions
                    <span className="inline-flex items-center ml-1 text-xs bg-blue-200 dark:bg-blue-800 px-1.5 py-0.5 rounded">
                      <KeyRound className="w-3 h-3 mr-1" /> ⌘+S, ⌘+E, ⌘+V
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Resume template */}
      <div
        className="transition-opacity duration-300"
        style={{ opacity: isRefreshing ? 0.6 : 1 }}
      >
        <ParsedResumeTemplate showAnalysis={true} />
      </div>

      {/* Modals */}
      <TemplateSelectionModal
        isOpen={isTemplateModalOpen}
        onClose={() => setIsTemplateModalOpen(false)}
      />

      <ShareResumeModal
        isOpen={isShareResumeModalOpen}
        onClose={() => setIsShareResumeModalOpen(false)}
        isSharable={threadData.isSharable}
        publicId={threadData.publicId}
        threadId={threadId}
      />

      <VersionModal
        isOpen={isVersionModalOpen}
        onClose={() => setIsVersionModalOpen(false)}
        currentVersionId={threadData.currentVersionId}
        threadId={threadId}
        onRevert={handleRefreshResume}
      />

      <DeleteResumeModal
        handleDelete={handleDelete}
        isDeleteDialogOpen={isDeleteDialogOpen}
        isDeleting={isDeleting}
        setIsDeleteDialogOpen={setIsDeleteDialogOpen}
      />
    </div>
  );
}
