'use client';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { updateResumeSharing } from '@/lib/actions/threads';
import { Copy, Share2, Lock, Globe, CheckCircle2 } from 'lucide-react';
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
  const [copied, setCopied] = useState(false);

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

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(publicURL);
      setCopied(true);
      toast.success('Link copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error(err);
      toast.error('Failed to copy link');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="mx-auto w-full max-w-md rounded-3xl border-0 bg-white p-0 shadow-2xl dark:bg-gray-900">
        <div className="p-6">
          <DialogHeader className="space-y-3">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 dark:bg-blue-900/20">
              <Share2 className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <DialogTitle className="text-center text-xl font-semibold text-gray-900 dark:text-gray-100">
              Share Your Resume
            </DialogTitle>
            <p className="text-center text-sm text-gray-600 dark:text-gray-400">
              Control who can access your resume online
            </p>
          </DialogHeader>

          <div className="mt-6 space-y-6">
            {/* Privacy Toggle Section */}
            <div className="rounded-2xl border border-gray-200 bg-gray-50/50 p-4 dark:border-gray-700 dark:bg-gray-800/50">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="rounded-lg bg-white p-2 shadow-sm dark:bg-gray-800">
                    {shareEnabled ? (
                      <Globe className="h-4 w-4 text-green-600 dark:text-green-400" />
                    ) : (
                      <Lock className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                    )}
                  </div>
                  <div>
                    <Label
                      htmlFor="share-toggle"
                      className="text-sm font-medium text-gray-900 dark:text-gray-100"
                    >
                      Public Access
                    </Label>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      {shareEnabled ? 'Anyone with the link can view' : 'Only you can access'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Switch
                    id="share-toggle"
                    checked={shareEnabled}
                    onCheckedChange={handleToggle}
                    disabled={loading}
                    className="data-[state=checked]:bg-green-600 data-[state=unchecked]:bg-gray-300 dark:data-[state=unchecked]:bg-gray-600"
                  />
                  {loading && (
                    <div className="ml-2 h-4 w-4 animate-spin rounded-full border-2 border-blue-600 border-t-transparent"></div>
                  )}
                </div>
              </div>
            </div>

            {/* Share Link Section */}
            <div className="space-y-3">
              <Label className="text-sm font-medium text-gray-900 dark:text-gray-100">
                Shareable Link
              </Label>
              <div className="flex space-x-2">
                <div className="relative flex-1">
                  <Input
                    value={publicURL}
                    readOnly
                    className="h-11 rounded-xl border-gray-200 bg-gray-50 pr-4 text-sm dark:border-gray-700 dark:bg-gray-800"
                  />
                </div>
                <Button
                  variant="outline"
                  onClick={handleCopy}
                  className="h-11 rounded-xl border-gray-200 px-4 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800"
                  disabled={!shareEnabled}
                >
                  {copied ? (
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
              {!shareEnabled && (
                <p className="text-xs text-amber-600 dark:text-amber-400">
                  Enable public access to share this link
                </p>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3 pt-2">
              <Button
                variant="outline"
                onClick={onClose}
                className="flex-1 rounded-xl border-gray-200 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800"
              >
                Close
              </Button>
              {shareEnabled && (
                <Button
                  onClick={handleCopy}
                  className="flex-1 rounded-xl bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700"
                >
                  Copy Link
                </Button>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
