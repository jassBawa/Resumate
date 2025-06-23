'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useResumeStore } from '@/hooks/useResumeStore';
import { getResumeVersions, revertToVersionAction } from '@/lib/actions/getResumeVersions';
import type { ResumeVersion } from '@prisma/client';
import { Clock, History, FileText } from 'lucide-react';
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
        <DialogContent className="mx-auto w-full max-w-2xl rounded-3xl border-0 bg-white p-0 shadow-2xl dark:bg-gray-900">
          <div className="p-6">
            <DialogHeader className="space-y-3">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-purple-50 dark:bg-purple-900/20">
                <History className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <DialogTitle className="text-center text-xl font-semibold text-gray-900 dark:text-gray-100">
                Version History
              </DialogTitle>
              <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                View and manage your resume versions
              </p>
            </DialogHeader>

            <div className="mt-6">
              {loading ? (
                <div className="space-y-4">
                  {/* Loading skeleton */}
                  <div className="flex items-center justify-center py-8">
                    <div className="flex items-center space-x-2 text-gray-500 dark:text-gray-400">
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-purple-600 border-t-transparent"></div>
                      <span className="text-sm">Loading versions...</span>
                    </div>
                  </div>
                </div>
              ) : versions.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
                    <FileText className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="mb-2 text-lg font-medium text-gray-900 dark:text-gray-100">
                    No versions found
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Resume versions will appear here as you make changes
                  </p>
                </div>
              ) : (
                <div className="rounded-2xl border border-gray-200 bg-gray-50/50 dark:border-gray-700 dark:bg-gray-800/50">
                  <div className="max-h-[60vh] overflow-y-auto rounded-2xl">
                    <VersionList
                      versions={versions}
                      loading={loading}
                      currentVersionId={currentVersionId}
                      revertingId={revertingId}
                      onView={handleView}
                      onConfirmRevert={(id, title) => setConfirmRevert({ versionId: id, title })}
                    />
                  </div>
                </div>
              )}

              {/* Version count footer */}
              {versions.length > 0 && (
                <div className="mt-4 flex items-center justify-between rounded-xl bg-purple-50 px-4 py-3 dark:bg-purple-900/10">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                    <span className="text-sm font-medium text-purple-900 dark:text-purple-100">
                      {versions.length} version{versions.length !== 1 ? 's' : ''} available
                    </span>
                  </div>
                  <div className="text-xs text-purple-700 dark:text-purple-300">
                    Current: {versions.find(v => v.id === currentVersionId)?.title || 'Latest'}
                  </div>
                </div>
              )}
            </div>
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
