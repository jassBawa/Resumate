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
import { AlertCircle, Loader2, FileText, Save } from 'lucide-react';
import type { ChangeEvent, KeyboardEvent } from 'react';

interface SaveTitleDialogProps {
  open: boolean;
  saving: boolean;
  title: string;
  titleError: string;
  onCancel: () => void;
  onSave: () => void;
  onTitleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void;
}

export const SaveTitleDialog: React.FC<SaveTitleDialogProps> = ({
  open,
  saving,
  title,
  titleError,
  onCancel,
  onSave,
  onTitleChange,
  onKeyDown,
}) => (
  <Dialog open={open} onOpenChange={onCancel}>
    <DialogContent className="sm:max-w-md">
      <DialogHeader>
        <DialogTitle className="flex items-center gap-2">
          <FileText className="w-5 h-5 text-slate-600" />
          Save Resume Version
        </DialogTitle>
        <DialogDescription>
          Give this resume version a descriptive title to help you identify it
          later.
        </DialogDescription>
      </DialogHeader>

      <div className="py-4 space-y-4">
        <div className="space-y-2">
          <Label htmlFor="resume-title" className="text-sm font-medium">
            Resume Title
          </Label>
          <Input
            id="resume-title"
            value={title}
            onChange={onTitleChange}
            onKeyDown={onKeyDown}
            placeholder="e.g., Software Engineer Resume - Tech Companies"
            className={
              titleError ? 'border-red-500 focus-visible:ring-red-500' : ''
            }
            disabled={saving}
            autoFocus
          />
          {titleError && (
            <p className="flex items-center gap-1 text-sm text-red-500">
              <AlertCircle className="w-3 h-3" />
              {titleError}
            </p>
          )}
        </div>
        <div className="text-xs text-slate-500">
          💡 <strong>Tip:</strong> Use descriptive titles like &quot;Added New
          Project - Resume Analyser&quot;
        </div>
      </div>

      <DialogFooter className="gap-2">
        <Button variant="outline" onClick={onCancel} disabled={saving}>
          Cancel
        </Button>
        <Button onClick={onSave} disabled={saving || !title.trim()}>
          {saving ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="w-4 h-4 mr-2" />
              Save Resume
            </>
          )}
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
);
