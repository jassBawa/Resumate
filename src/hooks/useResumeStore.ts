import { create } from 'zustand';
import { ResumeSections } from '@/config/parseSections';

type SectionKey = keyof ResumeSections;

interface ResumeStore {
  resumeSections: ResumeSections;
  setResumeSections: (sections: ResumeSections) => void;
  updateSection: <T extends SectionKey>(
    key: T,
    section: ResumeSections[T]
  ) => void;
  resetSections: () => void;
}

export const useResumeStore = create<ResumeStore>((set) => ({
  resumeSections: {},
  setResumeSections: (sections) => set({ resumeSections: sections }),
  updateSection: (key, section) =>
    set((state) => ({
      resumeSections: {
        ...state.resumeSections,
        [key]: section,
      },
    })),
  resetSections: () => set({ resumeSections: {} }),
}));
