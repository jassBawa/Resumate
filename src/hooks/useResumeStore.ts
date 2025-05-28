import { create } from 'zustand';
import { ResumeSections } from '@/config/parseSections';

type SectionKey = keyof ResumeSections;

interface ResumeStore {
  originalSections: ResumeSections;
  resumeSections: ResumeSections;
  setResumeSections: (sections: ResumeSections) => void;
  setOriginalSections: (sections: ResumeSections) => void;
  updateSection: <T extends SectionKey>(
    key: T,
    section: ResumeSections[T]
  ) => void;
  resetSections: () => void;
}

export const useResumeStore = create<ResumeStore>((set) => ({
  originalSections: {},
  resumeSections: {},
  setResumeSections: (sections) => set({ resumeSections: sections }),
  setOriginalSections: (sections) => set({ originalSections: sections }),
  updateSection: (key, section) =>
    set((state) => ({
      resumeSections: {
        ...state.resumeSections,
        [key]: section,
      },
    })),
  resetSections: () =>
    set((state) => ({
      resumeSections: state.originalSections, // Reset to original
    })),
}));
