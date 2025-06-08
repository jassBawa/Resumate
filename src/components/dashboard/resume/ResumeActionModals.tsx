import { useResumeData } from '@/hooks/useResumeData';
import { DeleteResumeModal } from '../modals/DeleteResumeModal';
import { ShareResumeModal } from '../modals/ShareResumeModal';
import { TemplateSelectionModal } from '../modals/TemplateSelectionModal';
import { VersionModal } from '../modals/VersionModal';
import { SaveTitleDialog } from './ResumeSaveTitle';

function ResumeActionModals({ threadId }: { threadId: string }) {
  const { threadData } = useResumeData(threadId);

  return (
    <>
      <TemplateSelectionModal />

      <ShareResumeModal
        isSharable={threadData.isSharable}
        publicId={threadData.publicId}
        threadId={threadId}
      />

      <VersionModal
        currentVersionId={threadData.currentVersionId}
        threadId={threadId}
      />

      <DeleteResumeModal threadId={threadId} />
      <SaveTitleDialog threadId={threadId} />
    </>
  );
}

export default ResumeActionModals;
