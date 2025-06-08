'use client';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { updateResumeSharing } from '@/lib/actions/threads';
import { Copy } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

interface ShareResumeModalProps {
  isSharable: boolean;
  publicId: string;
  threadId: string;
  isOpen: boolean;
  onClose: () => void;
}

export function ShareResumeModal({
  isSharable,
  publicId,
  threadId,
  isOpen,
  onClose,
}: ShareResumeModalProps) {
  const [shareEnabled, setShareEnabled] = useState(isSharable);
  const [loading, setLoading] = useState(false);

  const handleToggle = async (value: boolean) => {
    setShareEnabled(value); // optimistic UI
    setLoading(true);

    const result = await updateResumeSharing(threadId, value);
    setLoading(false);

    if (result.success) {
      toast.success(`Resume is now ${value ? 'sharable' : 'private'}`);
    } else {
      toast.error(result.error || 'Failed to update sharing settings');
      setShareEnabled(!value); // revert on failure
    }
  };

  const publicURL = `${process.env.NEXT_PUBLIC_APP_URL}/resume/view/${publicId}`;

  const handleCopy = () => {
    toast.success('Link copied to clipboard!');
    navigator.clipboard.writeText(publicURL);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="mx-auto w-full max-w-sm rounded-2xl shadow-lg md:max-w-xl">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold md:text-2xl">
            Change settings for resume access
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-6 p-4">
          {/* Toggle Sharable */}
          <div className="flex items-center justify-between">
            <Label htmlFor="share-toggle" className="text-md">
              Make Resume Publicly Sharable
            </Label>
            <Switch
              id="share-toggle"
              checked={shareEnabled}
              onCheckedChange={handleToggle}
              disabled={loading}
            />
          </div>

          <div>
            <Label className="mb-2 block">Public Link</Label>
            <div className="flex gap-2">
              <Input value={publicURL} readOnly className="flex-1" />
              <Button variant="outline" onClick={handleCopy}>
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
