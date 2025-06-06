'use client';

import { useRouter } from 'next/navigation';

import { SaveBar } from './ResumeSavbar';
import { SaveTitleDialog } from './ResumeSaveTitle';

import { useHasUnsavedChanges } from '@/hooks/useHasUnsavedChanges';
import { useResumeStore } from '@/hooks/useResumeStore';
import { deleteResume, getResumeSections } from '@/lib/actions/resume';
import { saveResumeSections } from '@/lib/actions/saveResumeSections';
import { AnimatePresence } from 'framer-motion';
import type React from 'react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { ChatInterface } from '../../resume/ChatInterface';
import { ResumeSkeleton } from '../../resume/ResumeSkelton';
import { EditSectionCard } from './EditSectionCard';
import { ResumeHeader } from './ResumeHeader';
import { ResumePreview } from './ResumePreview';
import { ResumeViewContent, ResumeViewLayout } from './ResumeViewLayout';
import { ResumeSidebar } from './ResumeSidebar';
import { useResumeViewStore } from '@/hooks/useResumeViewStore';

interface ResumeContainerProps {
  threadId: string;
}

export interface ThreadData {
  isSharable: boolean;
  publicId: string;
  viewerCount: number;
  title: string;
  resumeText: string;
  currentVersionId: string;
}

type ActiveView = 'preview' | 'edit';

const ResumeContainer: React.FC<ResumeContainerProps> = ({ threadId }) => {
  // Core state
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [threadData, setThreadData] = useState<ThreadData>({} as ThreadData);
  const [activeView, setActiveView] = useState<ActiveView>('preview');

  // Title save state
  const [showTitleDialog, setShowTitleDialog] = useState(false);
  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState('');

  // Modal states from store
  const {
    isShareModalOpen,
    isTemplateModalOpen,
    isVersionModalOpen,
    isDeleteDialogOpen,
    closeShareModal,
    closeTemplateModal,
    closeVersionModal,
    closeDeleteDialog,
  } = useResumeViewStore();

  // Action states
  const [isDeleting, setIsDeleting] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const {
    setResumeSections,
    setOriginalSections,
    resumeSections,
    resetSections,
  } = useResumeStore();

  const router = useRouter();
  const hasUnsavedChanges = useHasUnsavedChanges();

  const handleSaveClick = () => {
    // Generate a default title based on current date
    const defaultTitle = `Resume Version - ${new Date().toLocaleDateString(
      'en-US',
      {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }
    )}`;

    setTitle(defaultTitle);
    setTitleError('');
    setShowTitleDialog(true);
  };

  const handleSaveConfirm = async () => {
    // Validate title
    if (!title.trim()) {
      setTitleError('Please enter a title for this resume version');
      return;
    }

    if (title.trim().length < 3) {
      setTitleError('Title must be at least 3 characters long');
      return;
    }

    if (title.trim().length > 100) {
      setTitleError('Title must be less than 100 characters');
      return;
    }

    setSaving(true);
    setTitleError('');

    try {
      const result = await saveResumeSections(
        threadId,
        resumeSections,
        title.trim()
      );
      if (result.success) {
        toast.success('Resume saved successfully!');
        setOriginalSections(resumeSections);
        setShowTitleDialog(false);
        setTitle('');
      } else {
        toast.error(result.error || 'Failed to save changes');
      }
    } catch (error) {
      console.error(error);
      toast.error('An unexpected error occurred');
    } finally {
      setSaving(false);
    }
  };

  const handleDialogClose = () => {
    if (!saving) {
      setShowTitleDialog(false);
      setTitle('');
      setTitleError('');
    }
  };

  const handleDiscard = () => {
    resetSections();
    toast.info('Changes discarded');
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    if (titleError) {
      setTitleError('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !saving) {
      handleSaveConfirm();
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const result = await deleteResume(threadId);

      if (result.success) {
        toast.success('Resume deleted successfully');
        router.push('/dashboard');
        closeDeleteDialog();
      } else {
        toast.error(result.error || 'Failed to delete resume');
      }
    } catch (error) {
      console.log(error);
      toast.error('An unexpected error occurred');
    } finally {
      setIsDeleting(false);
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
    const fetchData = async () => {
      setLoading(true);
      const { data, error } = await getResumeSections(threadId);
      if (error) {
        toast.error(error);
      }
      if (data?.sections) {
        setResumeSections(data.sections);
        setOriginalSections(data.sections);
        setThreadData(data.threadData);
      }

      setLoading(false);
    };

    fetchData();
  }, [threadId, setResumeSections, setOriginalSections]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const store = useResumeViewStore.getState();
      if ((e.metaKey || e.ctrlKey) && e.key === 's') {
        e.preventDefault();
        store.openShareModal();
      } else if ((e.metaKey || e.ctrlKey) && e.key === 'e') {
        e.preventDefault();
        store.openTemplateModal();
      } else if ((e.metaKey || e.ctrlKey) && e.key === 'v') {
        e.preventDefault();
        store.openVersionModal();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const renderContent = () => {
    if (loading) {
      return <ResumeSkeleton />;
    }

    switch (activeView) {
      case 'preview':
        return (
          <div className="flex flex-col h-full">
            <div className="p-3 md:p-6">
              <ResumeHeader
                threadData={threadData}
                onRefresh={handleRefreshResume}
                isRefreshing={isRefreshing}
              />
            </div>
            <div className="flex-grow overflow-y-auto px-3 md:px-6 pb-3 md:pb-6">
              <ResumePreview
                threadData={threadData}
                threadId={threadId}
                isRefreshing={isRefreshing}
                isTemplateModalOpen={isTemplateModalOpen}
                isShareResumeModalOpen={isShareModalOpen}
                isVersionModalOpen={isVersionModalOpen}
                isDeleteDialogOpen={isDeleteDialogOpen}
                isDeleting={isDeleting}
                onCloseTemplateModal={closeTemplateModal}
                onCloseShareModal={closeShareModal}
                onCloseVersionModal={closeVersionModal}
                setIsDeleteDialogOpen={closeDeleteDialog}
                handleDelete={handleDelete}
                onRevert={handleRefreshResume}
              />
            </div>
            <ChatInterface />
          </div>
        );
      case 'edit':
        return (
          <div className="p-4 lg:p-6 h-full overflow-y-auto">
            <h1 className="text-2xl font-bold">Edit Resume Sections</h1>
            <p className="text-muted-foreground mt-1">
              Click on a section to start editing.
            </p>
            <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <EditSectionCard
                title="Personal Information"
                description="Manage your contact details and summary."
              />
              <EditSectionCard
                title="Work Experience"
                description="Detail your professional history."
              />
              <EditSectionCard
                title="Education"
                description="List your academic background."
              />
              <EditSectionCard
                title="Skills"
                description="Showcase your technical and soft skills."
              />
              <EditSectionCard
                title="Projects"
                description="Highlight your personal or professional projects."
              />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <ResumeViewLayout
      sidebar={
        <ResumeSidebar activeView={activeView} setActiveView={setActiveView} />
      }
    >
      <div className="relative h-full">
        <AnimatePresence>
          {hasUnsavedChanges && (
            <SaveBar
              onSave={handleSaveClick}
              onDiscard={handleDiscard}
              saving={saving}
            />
          )}
        </AnimatePresence>

        <SaveTitleDialog
          open={showTitleDialog}
          saving={saving}
          title={title}
          titleError={titleError}
          onCancel={handleDialogClose}
          onSave={handleSaveConfirm}
          onTitleChange={handleTitleChange}
          onKeyDown={handleKeyDown}
        />

        <ResumeViewContent
          className={hasUnsavedChanges ? 'pt-20' : ''} // Adjust for SaveBar
        >
          {renderContent()}
        </ResumeViewContent>
      </div>
    </ResumeViewLayout>
  );
};

export default ResumeContainer;
