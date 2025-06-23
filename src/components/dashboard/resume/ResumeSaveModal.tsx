// components/resume/SaveTitleDialog.tsx
'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useResumeStore } from '@/hooks/useResumeStore';
import { saveResumeSections } from '@/lib/actions/saveResumeSections';
import { AlertCircle, Lightbulb, Loader2, Save } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
interface SaveTitleDialogProps {
  threadId: string;
  isOpen: boolean;
  onClose: () => void;
}

export const SaveTitleDialog: React.FC<SaveTitleDialogProps> = ({ threadId, isOpen, onClose }) => {
  const [saving, setSaving] = useState(false);
  const [title, setTitle] = useState(
    `Resume Version - ${new Date().toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })}`
  );
  const [titleError, setTitleError] = useState('');
  const { resumeSections, setOriginalSections } = useResumeStore();

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
      const result = await saveResumeSections(threadId, resumeSections, title.trim());
      if (result.success) {
        toast.success('Resume saved successfully!');
        setOriginalSections(resumeSections);
        setTitle('');
        onClose();
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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="mx-auto w-full max-w-md rounded-3xl border-0 bg-white p-0 shadow-2xl dark:bg-gray-900">
        <div className="p-6">
          <DialogHeader className="space-y-3">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-50 dark:bg-green-900/20">
              <Save className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <DialogTitle className="text-center text-xl font-semibold text-gray-900 dark:text-gray-100">
              Save Resume Version
            </DialogTitle>
            <DialogDescription className="text-center text-sm text-gray-600 dark:text-gray-400">
              Give this resume version a descriptive title to help you identify it later.
            </DialogDescription>
          </DialogHeader>

          <div className="mt-6 space-y-6">
            {/* Title Input Section */}
            <div className="space-y-3">
              <Label
                htmlFor="resume-title"
                className="text-sm font-medium text-gray-900 dark:text-gray-100"
              >
                Resume Title
              </Label>
              <div className="relative">
                <Input
                  id="resume-title"
                  value={title}
                  onChange={handleTitleChange}
                  onKeyDown={handleKeyDown}
                  placeholder="e.g., Software Engineer Resume - Tech Companies"
                  className={`h-11 rounded-xl border-gray-200 bg-gray-50 text-sm dark:border-gray-700 dark:bg-gray-800 ${
                    titleError ? 'border-red-500 focus-visible:ring-red-500' : ''
                  }`}
                  disabled={saving}
                  autoFocus
                />
                {saving && (
                  <div className="absolute top-1/2 right-3 -translate-y-1/2">
                    <Loader2 className="h-4 w-4 animate-spin text-gray-400" />
                  </div>
                )}
              </div>
              {titleError && (
                <div className="flex items-center space-x-2 rounded-lg bg-red-50 p-3 dark:bg-red-900/20">
                  <AlertCircle className="h-4 w-4 flex-shrink-0 text-red-600 dark:text-red-400" />
                  <p className="text-sm text-red-700 dark:text-red-300">{titleError}</p>
                </div>
              )}
            </div>

            {/* Tip Section */}
            <div className="rounded-xl bg-blue-50 p-4 dark:bg-blue-900/20">
              <div className="flex items-start space-x-3">
                <div className="rounded-lg bg-blue-100 p-1 dark:bg-blue-800/50">
                  <Lightbulb className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-blue-900 dark:text-blue-100">Pro Tip</p>
                  <p className="text-xs text-blue-700 dark:text-blue-300">
                    Use descriptive titles like &quot;Added New Project - Resume Analyser&quot; to
                    easily track changes
                  </p>
                </div>
              </div>
            </div>

            {/* Character Count */}
            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
              <span>Minimum 3 characters</span>
              <span className={title.length > 100 ? 'text-red-500' : ''}>{title.length}/100</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex space-x-3">
            <Button
              variant="outline"
              onClick={onClose}
              disabled={saving}
              className="flex-1 rounded-xl border-gray-200 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSaveConfirm}
              disabled={saving || !title.trim() || title.length < 3 || title.length > 100}
              className="flex-1 rounded-xl bg-green-600 hover:bg-green-700 dark:bg-green-600 dark:hover:bg-green-700"
            >
              {saving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Save Resume
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
