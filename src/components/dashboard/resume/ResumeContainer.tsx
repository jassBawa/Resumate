'use client';

import { AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { toast } from 'sonner';

import { ResumeAnalysisView } from './ResumeAnalysisView';
import { ResumeEditView } from './ResumeEditView';
import { SaveBar } from './ResumeSavbar';

import { useHasUnsavedChanges } from '@/hooks/useHasUnsavedChanges';
import { useResumeData } from '@/hooks/useResumeData';
import { useResumeKeyboardShortcuts } from '@/hooks/useResumeKeyboardShortcuts';
import { useResumeSave } from '@/hooks/useResumeSave';
import { useResumeStore } from '@/hooks/useResumeStore';

import { ResumeSkeleton } from '../../resume/ResumeSkelton';
import { ResumeHeader } from './ResumeHeader';
import { ResumePreview } from './ResumePreview';
import { ResumeSidebar } from './ResumeSidebar';
import ResumeActionModals from './ResumeActionModals';

interface ResumeContainerProps {
  threadId: string;
}

type ActiveView = 'preview' | 'edit' | 'analysis';

const ResumeContainer: React.FC<ResumeContainerProps> = ({ threadId }) => {
  const [activeView, setActiveView] = useState<ActiveView>('preview');

  const hasUnsavedChanges = useHasUnsavedChanges();
  const { resetSections } = useResumeStore();
  const { loading, threadData } = useResumeData(threadId);
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

    switch (activeView) {
      case 'preview':
        return (
          <div className="flex flex-col h-full py-8">
            <ResumePreview isRefreshing={false} />
          </div>
        );
      case 'edit':
        return <ResumeEditView />;
      case 'analysis':
        return <ResumeAnalysisView />;
      default:
        return null;
    }
  };

  return (
    <>
      <ResumeHeader threadData={threadData} />
      <AnimatePresence>
        {hasUnsavedChanges && (
          <SaveBar
            onSave={handleSaveClick}
            onDiscard={handleDiscard}
            saving={saving}
          />
        )}
      </AnimatePresence>

      <div className="relative flex mt-8 gap-12">
        <div className="w-64 flex-shrink-0">
          <ResumeSidebar
            activeView={activeView}
            setActiveView={setActiveView}
          />
        </div>
        <div className="flex-1 min-w-0 bg-white/90 dark:bg-zinc-900/60 border border-gray-200 dark:border-zinc-800 shadow-xl shadow-blue-900/20 backdrop-blur-md rounded-2xl text-zinc-900 dark:text-zinc-100 transition-all">
          {renderContent()}
        </div>
      </div>

      <ResumeActionModals threadId={threadId} />
    </>
  );
};

export default ResumeContainer;
