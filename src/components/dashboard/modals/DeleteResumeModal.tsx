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
import { useResumeViewStore } from '@/hooks/useResumeViewStore';
import { deleteResume } from '@/lib/actions/resume';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

interface DeleteResumeModalProps {
  threadId: string;
}

export function DeleteResumeModal({ threadId }: DeleteResumeModalProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const { closeDeleteDialog, isDeleteDialogOpen } = useResumeViewStore();

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const result = await deleteResume(threadId);

      if (result.success) {
        toast.success('Resume deleted successfully');
        router.push('/dashboard');
        closeDeleteDialog();
      } else {
        toast.error(result.error || 'Failed to delete resume');
      }
    } catch (error) {
      console.log(error);
      toast.error('An unexpected error occurred');
    } finally {
      setIsDeleting(false);
    }
  };
  return (
    <AlertDialog open={isDeleteDialogOpen} onOpenChange={closeDeleteDialog}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to delete this resume?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            resume and all associated versions.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
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
  );
}
