'use client';

import { SaveBar } from './ResumeSavbar';
import { SaveTitleDialog } from './ResumeSaveTitle';

import { useHasUnsavedChanges } from '@/hooks/useHasUnsavedChanges';
import { useResumeStore } from '@/hooks/useResumeStore';
import { getResumeSections } from '@/lib/actions/resume';
import { saveResumeSections } from '@/lib/actions/saveResumeSections';
import { AnimatePresence } from 'framer-motion';
import type React from 'react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { ChatInterface } from '../../resume/ChatInterface';
import { ResumeSkeleton } from '../../resume/ResumeSkelton';
import { ResumeLayout, type ThreadData } from '../DashboardResumeLayout';

interface ResumeContainerProps {
  threadId: string;
}

const ResumeContainer: React.FC<ResumeContainerProps> = ({ threadId }) => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showTitleDialog, setShowTitleDialog] = useState(false);
  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState('');
  const [threadData, setThreadData] = useState<ThreadData>({} as ThreadData);
  const {
    setResumeSections,
    setOriginalSections,
    resumeSections,
    resetSections,
  } = useResumeStore();

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

  useEffect(() => {
    const fetchData = async () => {
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

  return (
    <div className="relative">
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

      {loading ? (
        <ResumeSkeleton />
      ) : (
        <>
          <ResumeLayout
            threadId={threadId}
            threadData={threadData}
            setThreadData={setThreadData}
          />
          <ChatInterface />
        </>
      )}
    </div>
  );
};

export default ResumeContainer;
