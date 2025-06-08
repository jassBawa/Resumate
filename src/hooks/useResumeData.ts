import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { getResumeSections } from '@/lib/actions/resume';
import { useResumeStore } from './useResumeStore';

export interface ThreadData {
  isSharable: boolean;
  publicId: string;
  viewerCount: number;
  title: string;
  resumeText: string;
  currentVersionId: string;
}

export const useResumeData = (threadId: string) => {
  console.log(threadId);
  const [loading, setLoading] = useState(true);
  const [threadData, setThreadData] = useState<ThreadData>({} as ThreadData);
  const { setResumeSections, setOriginalSections } = useResumeStore();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const { data, error } = await getResumeSections(threadId);
      if (error) {
        toast.error(error);
      }
      if (data?.sections) {
        setResumeSections(data.sections);
        setOriginalSections(data.sections);
        setThreadData(data.threadData);
      }
      setLoading(false);
    };

    fetchData();
  }, [threadId, setResumeSections, setOriginalSections]);

  return {
    loading,
    threadData,
  };
};
