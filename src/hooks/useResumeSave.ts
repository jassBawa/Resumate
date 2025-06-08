import { useState } from 'react';
import { toast } from 'sonner';
import { saveResumeSections } from '@/lib/actions/saveResumeSections';
import { useResumeStore } from './useResumeStore';

export const useResumeSave = (threadId: string) => {
  const [saving, setSaving] = useState(false);
  const [showTitleDialog, setShowTitleDialog] = useState(false);
  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState('');
  const { resumeSections, setOriginalSections } = useResumeStore();

  const handleSaveClick = () => {
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

  return {
    saving,
    showTitleDialog,
    title,
    titleError,
    handleSaveClick,
    handleSaveConfirm,
    handleDialogClose,
    handleTitleChange,
    handleKeyDown,
  };
};
