'use client';

import type React from 'react';

// Components
import ParsedResumeTemplate from '../../template/ParsedResumeTemplate';
import { ShareResumeModal } from '../modals/ShareResumeModal';
import { TemplateSelectionModal } from '../modals/TemplateSelectionModal';
import { VersionModal } from '../modals/VersionModal';
import { DeleteResumeModal } from '../modals/DeleteResumeModal';
import type { ThreadData } from './ResumeContainer';

interface ResumePreviewProps {
  threadData: ThreadData;
  threadId: string;
  isRefreshing: boolean;

  // Modal States
  isTemplateModalOpen: boolean;
  isShareResumeModalOpen: boolean;
  isVersionModalOpen: boolean;
  isDeleteDialogOpen: boolean;
  isDeleting: boolean;

  // Modal handlers
  onCloseTemplateModal: () => void;
  onCloseShareModal: () => void;
  onCloseVersionModal: () => void;
  setIsDeleteDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleDelete: () => void;
  onRevert: () => void;
}

export function ResumePreview({
  threadData,
  threadId,
  isRefreshing,
  isTemplateModalOpen,
  isShareResumeModalOpen,
  isVersionModalOpen,
  isDeleteDialogOpen,
  isDeleting,
  onCloseTemplateModal,
  onCloseShareModal,
  onCloseVersionModal,
  setIsDeleteDialogOpen,
  handleDelete,
  onRevert,
}: ResumePreviewProps) {
  return (
    <div tabIndex={0}>
      {/* Resume template */}
      <div
        className="transition-opacity duration-300 max-w-4xl mx-auto"
        style={{ opacity: isRefreshing ? 0.6 : 1 }}
      >
        <ParsedResumeTemplate showAnalysis={true} />
      </div>

      {/* Modals */}
      <TemplateSelectionModal
        isOpen={isTemplateModalOpen}
        onClose={onCloseTemplateModal}
      />

      <ShareResumeModal
        isOpen={isShareResumeModalOpen}
        onClose={onCloseShareModal}
        isSharable={threadData.isSharable}
        publicId={threadData.publicId}
        threadId={threadId}
      />

      <VersionModal
        isOpen={isVersionModalOpen}
        onClose={onCloseVersionModal}
        currentVersionId={threadData.currentVersionId}
        threadId={threadId}
        onRevert={onRevert}
      />

      <DeleteResumeModal
        handleDelete={handleDelete}
        isDeleteDialogOpen={isDeleteDialogOpen}
        isDeleting={isDeleting}
        setIsDeleteDialogOpen={setIsDeleteDialogOpen}
      />
    </div>
  );
}
