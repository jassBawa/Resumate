'use client';

import { ResumeVersion } from '@prisma/client';
import { Skeleton } from '@/components/ui/skeleton';
import { Clock } from 'lucide-react';

import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Eye, Loader2, RotateCcw } from 'lucide-react';

interface VersionListProps {
  versions: ResumeVersion[];
  loading: boolean;
  currentVersionId: string;
  revertingId: string | null;
  onView: (version: ResumeVersion) => void;
  onConfirmRevert: (versionId: string, title: string) => void;
}

export function VersionList({
  versions,
  loading,
  currentVersionId,
  revertingId,
  onView,
  onConfirmRevert,
}: VersionListProps) {
  if (loading) {
    return (
      <div className="flex flex-col gap-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="p-4 border rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <Skeleton className="w-32 h-5 mb-2" />
                <Skeleton className="w-48 h-4" />
              </div>
              <div className="flex gap-2">
                <Skeleton className="w-16 h-8" />
                <Skeleton className="w-16 h-8" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (versions.length === 0) {
    return (
      <div className="py-8 text-center">
        <Clock className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
        <p className="text-sm text-muted-foreground">
          No versions available yet.
        </p>
        <p className="mt-1 text-xs text-muted-foreground">
          Versions will appear here as you make changes to your resume.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {versions.map((version, idx) => {
        const versionNumber = versions.length - idx;
        const isCurrent = version.id === currentVersionId;
        const isReverting = revertingId === version.id;

        return (
          <VersionItem
            key={version.id}
            version={version}
            versionNumber={versionNumber}
            isCurrent={isCurrent}
            isReverting={isReverting}
            onView={() => onView(version)}
            onRevert={() =>
              onConfirmRevert(version.id, `v${versionNumber}: ${version.title}`)
            }
          />
        );
      })}
    </div>
  );
}

interface VersionItemProps {
  version: ResumeVersion;
  versionNumber: number;
  isCurrent: boolean;
  isReverting: boolean;
  onView: () => void;
  onRevert: () => void;
}

export function VersionItem({
  version,
  versionNumber,
  isCurrent,
  isReverting,
  onView,
  onRevert,
}: VersionItemProps) {
  return (
    <div
      className={`border p-4 rounded-lg transition-all ${
        isCurrent
          ? 'border-primary bg-primary/5 ring-1 ring-primary/20'
          : 'hover:border-muted-foreground/30'
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <p className="text-sm font-medium md:text-base">
              v{versionNumber}: {version.title}
            </p>
          </div>
          <p className="text-xs text-muted-foreground">
            {format(new Date(version.createdAt), 'MMM dd, yyyy - hh:mm a')}
          </p>
        </div>

        <div className="flex gap-2 ml-4">
          {isCurrent && (
            <span className="flex items-center justify-center px-2 py-1 text-xs rounded-full bg-primary text-primary-foreground">
              Current
            </span>
          )}
          <Button
            variant="outline"
            size="sm"
            onClick={onView}
            disabled={isReverting}
            className="flex items-center gap-1"
          >
            <Eye className="w-3 h-3" />
            <span className="hidden sm:inline">View</span>
          </Button>

          {!isCurrent && (
            <Button
              variant="destructive"
              size="sm"
              onClick={onRevert}
              disabled={isReverting}
              className="flex items-center gap-1"
            >
              {isReverting ? (
                <Loader2 className="w-3 h-3 animate-spin" />
              ) : (
                <RotateCcw className="w-3 h-3" />
              )}
              <span className="hidden sm:inline">
                {isReverting ? 'Reverting...' : 'Revert'}
              </span>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
