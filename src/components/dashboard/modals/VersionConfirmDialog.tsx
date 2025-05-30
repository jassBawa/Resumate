'use client';

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
import { Loader2 } from 'lucide-react';

interface ConfirmRevertDialogProps {
  confirmRevert: { versionId: string; title: string } | null;
  revertingId: string | null;
  onCancel: () => void;
  onConfirm: (versionId: string) => void;
}

export function ConfirmRevertDialog({
  confirmRevert,
  revertingId,
  onCancel,
  onConfirm,
}: ConfirmRevertDialogProps) {
  return (
    <AlertDialog
      open={!!confirmRevert}
      onOpenChange={(open) => !open && onCancel()}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirm Version Revert</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to revert to &quot;{confirmRevert?.title}
            &quot;? This will overwrite your current resume and cannot be
            undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={!!revertingId}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => confirmRevert && onConfirm(confirmRevert.versionId)}
            disabled={!!revertingId}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {revertingId ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                Reverting...
              </>
            ) : (
              'Revert'
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
