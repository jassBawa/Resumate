import { create } from 'zustand';

interface ResumeViewStore {
  isShareModalOpen: boolean;
  isTemplateModalOpen: boolean;
  isVersionModalOpen: boolean;
  isDeleteDialogOpen: boolean;
  openShareModal: () => void;
  openTemplateModal: () => void;
  openVersionModal: () => void;
  openDeleteDialog: () => void;
  closeShareModal: () => void;
  closeTemplateModal: () => void;
  closeVersionModal: () => void;
  closeDeleteDialog: () => void;
}

export const useResumeViewStore = create<ResumeViewStore>((set) => ({
  isShareModalOpen: false,
  isTemplateModalOpen: false,
  isVersionModalOpen: false,
  isDeleteDialogOpen: false,
  openShareModal: () => set({ isShareModalOpen: true }),
  openTemplateModal: () => set({ isTemplateModalOpen: true }),
  openVersionModal: () => set({ isVersionModalOpen: true }),
  openDeleteDialog: () => set({ isDeleteDialogOpen: true }),
  closeShareModal: () => set({ isShareModalOpen: false }),
  closeTemplateModal: () => set({ isTemplateModalOpen: false }),
  closeVersionModal: () => set({ isVersionModalOpen: false }),
  closeDeleteDialog: () => set({ isDeleteDialogOpen: false }),
}));
