// components/resume/SaveTitleDialog.tsx
'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useResumeStore } from '@/hooks/useResumeStore';
import { saveResumeSections } from '@/lib/actions/saveResumeSections';
import { AlertCircle, Loader2, FileText, Save } from 'lucide-react';
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
      <DialogContent className="max-w-sm md:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-slate-600" />
            Save Resume Version
          </DialogTitle>
          <DialogDescription>
            Give this resume version a descriptive title to help you identify it later.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="resume-title" className="text-sm font-medium">
              Resume Title
            </Label>
            <Input
              id="resume-title"
              value={title}
              onChange={handleTitleChange}
              onKeyDown={handleKeyDown}
              placeholder="e.g., Software Engineer Resume - Tech Companies"
              className={titleError ? 'border-red-500 focus-visible:ring-red-500' : ''}
              disabled={saving}
              autoFocus
            />
            {titleError && (
              <p className="flex items-center gap-1 text-sm text-red-500">
                <AlertCircle className="h-3 w-3" />
                {titleError}
              </p>
            )}
          </div>
          <div className="text-xs text-slate-500">
            💡 <strong>Tip:</strong> Use descriptive titles like &quot;Added New Project - Resume
            Analyser&quot;
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={onClose} disabled={saving}>
            Cancel
          </Button>
          <Button onClick={handleSaveConfirm} disabled={saving || !title.trim()}>
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
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
