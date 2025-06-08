import { useEffect } from 'react';
import { useResumeViewStore } from './useResumeViewStore';

export const useResumeKeyboardShortcuts = () => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const store = useResumeViewStore.getState();
      if ((e.metaKey || e.ctrlKey) && e.key === 's') {
        e.preventDefault();
        store.openShareModal();
      } else if ((e.metaKey || e.ctrlKey) && e.key === 'e') {
        e.preventDefault();
        store.openTemplateModal();
      } else if ((e.metaKey || e.ctrlKey) && e.key === 'v') {
        e.preventDefault();
        store.openVersionModal();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);
};
