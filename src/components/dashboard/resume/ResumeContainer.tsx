'use client';
// todo: 'Remove this component';
import { AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { toast } from 'sonner';

import { SaveBar } from './ResumeSavbar';

import { useHasUnsavedChanges } from '@/hooks/useHasUnsavedChanges';
import { useResumeData } from '@/hooks/useResumeData';
import { useResumeKeyboardShortcuts } from '@/hooks/useResumeKeyboardShortcuts';
import { useResumeSave } from '@/hooks/useResumeSave';
import { useResumeStore } from '@/hooks/useResumeStore';

import { AppSidebar } from '@/components/layout/AppSidebar';
import { ResumeSkeleton } from '../../resume/ResumeSkelton';
import ResumeActionModals from './ResumeActionModals';

interface ResumeContainerProps {
  threadId: string;
}

const ResumeContainer: React.FC<ResumeContainerProps> = ({ threadId }) => {
  console.log(threadId);
  const [activeView, setActiveView] = useState<string>('preview');

  const hasUnsavedChanges = useHasUnsavedChanges();
  const { resetSections } = useResumeStore();
  const { loading } = useResumeData(threadId);
  const { saving, handleSaveClick } = useResumeSave(threadId);

  useResumeKeyboardShortcuts();

  const handleDiscard = () => {
    resetSections();
    toast.info('Changes discarded');
  };

  const renderContent = () => {
    if (loading) {
      return <ResumeSkeleton />;
    }
  };

  return (
    <div className="relative min-h-screen bg-gray-50 dark:bg-zinc-900">
      <AnimatePresence>
        {hasUnsavedChanges && (
          <SaveBar onSave={handleSaveClick} onDiscard={handleDiscard} saving={saving} />
        )}
      </AnimatePresence>

      <div className="relative mx-auto mt-8 flex max-w-7xl gap-6 px-6 pb-8">
        <div className="w-64 flex-shrink-0">
          <div className="sticky top-8 rounded-xl bg-white/50 p-4 backdrop-blur-sm transition-colors dark:bg-zinc-900/50">
            <AppSidebar activeSection={activeView} setActiveSection={setActiveView} />
          </div>
        </div>
        <div className="min-w-0 flex-1 rounded-xl bg-white/50 p-6 backdrop-blur-sm transition-colors dark:bg-zinc-900/50">
          {renderContent()}
        </div>
      </div>

      <ResumeActionModals threadId={threadId} />
    </div>
  );
};

export default ResumeContainer;
