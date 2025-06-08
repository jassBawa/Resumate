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

import { ChatInterface } from '../../resume/ChatInterface';
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
          <div className="flex flex-col h-full">
            <div className="">
              <ResumePreview
                // threadData={threadData}
                // threadId={threadId}
                isRefreshing={false}
              />
            </div>
            <ChatInterface />
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
        <div className="flex-1 min-w-0 bg-background dark:bg-neutral-900 shadow-[0_4px_16px_rgba(0,0,0,0.05)] rounded-xl">
          {renderContent()}
        </div>
      </div>

      <ResumeActionModals threadId={threadId} />
    </>
  );
};

export default ResumeContainer;
