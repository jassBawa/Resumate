import { useResumeStore } from './useResumeStore';
import { isEqual } from 'lodash'; // Or use shallow/deep comparison of your choice

export const useHasUnsavedChanges = () => {
  const resumeSections = useResumeStore((s) => s.resumeSections);
  const originalSections = useResumeStore((s) => s.originalSections);
  return !isEqual(resumeSections, originalSections);
};
