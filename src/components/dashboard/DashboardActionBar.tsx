'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {
  FileText,
  GitCompare,
  Share2,
  Trash2,
  Loader2,
  RefreshCw,
  Eye,
  MoreHorizontal,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface ResumeActionBarProps {
  onShare: () => void;
  onExport: () => void;
  onVersions: () => void;
  onRefresh: () => void;
  onDelete: () => void;
  isDeleting?: boolean;
  isRefreshing?: boolean;
  viewCount?: number;
}

export function ResumeActionBar({
  onShare,
  onExport,
  onVersions,
  onRefresh,
  onDelete,
  isDeleting = false,
  isRefreshing = false,
  viewCount = 0,
}: ResumeActionBarProps) {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const handleDeleteClick = () => {
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    onDelete();
    setIsDeleteDialogOpen(false);
  };

  return (
    <TooltipProvider delayDuration={300}>
      <div className="flex items-center justify-between w-full gap-4">
        {/* Primary Actions */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="default"
                  onClick={onRefresh}
                  disabled={isRefreshing}
                  className="h-10 px-4"
                >
                  {isRefreshing ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <RefreshCw className="w-4 h-4 mr-2" />
                  )}
                  Refresh
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Refresh resume data</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="default"
                  onClick={onShare}
                  className="h-10 px-4"
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                  <kbd className="hidden ml-2 text-xs bg-muted px-1.5 py-0.5 rounded md:inline-block">
                    ⌘S
                  </kbd>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Share your resume publicly</p>
              </TooltipContent>
            </Tooltip>
          </div>

          <Separator orientation="vertical" className="h-6" />

          <div className="flex items-center gap-2">
            <Tooltip>
              <TooltipTrigger asChild></TooltipTrigger>
              <TooltipContent>
                <p>Download as PDF</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>

        {/* Secondary Actions */}
        <div className="flex items-center gap-3">
          {viewCount > 0 && (
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <Eye className="w-4 h-4" />
              <span>
                {viewCount} {viewCount === 1 ? 'view' : 'views'}
              </span>
            </div>
          )}

          <Separator orientation="vertical" className="h-6" />

          {/* More Actions Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="default" className="h-10 px-3">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem onClick={onVersions}>
                <GitCompare className="w-4 h-4 mr-2" />
                Versions
                <kbd className="hidden ml-2 text-xs bg-muted px-1.5 py-0.5 rounded md:inline-block">
                  ⌘V
                </kbd>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onExport}>
                <FileText className="w-4 h-4 mr-2" />
                Export PDF
                <kbd className="hidden ml-2 text-xs bg-muted px-1.5 py-0.5 rounded md:inline-block">
                  ⌘E
                </kbd>
              </DropdownMenuItem>

              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={handleDeleteClick}
                className="text-destructive focus:text-destructive"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete Resume
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Resume</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this resume? This action cannot be
              undone and will permanently remove all versions and associated
              data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              disabled={isDeleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isDeleting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Deleting...
                </>
              ) : (
                'Delete Resume'
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </TooltipProvider>
  );
}
