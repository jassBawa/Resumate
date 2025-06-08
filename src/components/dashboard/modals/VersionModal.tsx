'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useResumeStore } from '@/hooks/useResumeStore';
import { getResumeVersions, revertToVersionAction } from '@/lib/actions/getResumeVersions';
import type { ResumeVersion } from '@prisma/client';
import { Clock } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { ConfirmRevertDialog } from './VersionConfirmDialog';
import { VersionList } from './VersionList';

interface VersionModalProps {
  threadId: string;
  currentVersionId: string;
  isOpen: boolean;
  onClose: () => void;
}

export function VersionModal({ threadId, currentVersionId, isOpen, onClose }: VersionModalProps) {
  const [versions, setVersions] = useState<ResumeVersion[]>([]);
  const [loading, setLoading] = useState(false);
  const [revertingId, setRevertingId] = useState<string | null>(null);
  const [confirmRevert, setConfirmRevert] = useState<{
    versionId: string;
    title: string;
  } | null>(null);

  const { setResumeSections, setOriginalSections } = useResumeStore();

  const handleRevert = async (versionId: string) => {
    setRevertingId(versionId);
    try {
      const { data, error } = await revertToVersionAction(threadId, versionId);
      if (!data || error) {
        toast.error(error);
        return;
      }
      toast.success('Successfully reverted to previous version');
      setResumeSections(data);
      setOriginalSections(data);
      onClose();
    } catch (err) {
      console.error(err);
      toast.error('Failed to revert to version');
    } finally {
      setRevertingId(null);
      setConfirmRevert(null);
    }
  };

  // TODO:
  const handleView = (version: ResumeVersion) => {
    console.log(version);
    toast.info('View functionality coming soon');
  };

  useEffect(() => {
    const fetchVersions = async () => {
      setLoading(true);
      try {
        const { data, error } = await getResumeVersions(threadId);
        if (!data || error) {
          toast.error(error || 'Failed to fetch versions');
          return;
        }
        setVersions(data.versions);
      } catch (err) {
        console.error(err);
        toast.error('An unexpected error occurred');
      } finally {
        setLoading(false);
      }
    };
    if (isOpen) {
      fetchVersions();
    } else {
      setVersions([]);
      setRevertingId(null);
      setConfirmRevert(null);
    }
  }, [isOpen, threadId]);

  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        document.body.style.pointerEvents = 'auto';
      }, 200);
    }
  }, [isOpen]);

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="mx-auto w-full max-w-sm rounded-2xl shadow-lg md:max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-lg font-semibold md:text-2xl">
              <Clock className="h-5 w-5" />
              Version History
            </DialogTitle>
          </DialogHeader>

          <div className="scrollbar-hide max-h-[60vh] overflow-y-auto p-4">
            <VersionList
              versions={versions}
              loading={loading}
              currentVersionId={currentVersionId}
              revertingId={revertingId}
              onView={handleView}
              onConfirmRevert={(id, title) => setConfirmRevert({ versionId: id, title })}
            />
          </div>
        </DialogContent>
      </Dialog>

      <ConfirmRevertDialog
        confirmRevert={confirmRevert}
        revertingId={revertingId}
        onCancel={() => setConfirmRevert(null)}
        onConfirm={handleRevert}
      />
    </>
  );
}
