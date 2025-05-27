'use client';

import React, { useEffect, useState } from 'react';
import { ResumeLayout, ThreadData } from './DashboardResumeLayout';
import { ChatInterface } from '../resume/ChatInterface';
import { getResumeSections } from '@/lib/actions/resume';
import { ResumeSkeleton } from '../resume/ResumeSkelton';
import { useResumeStore } from '@/hooks/useResumeStore';

interface ResumeContainerProps {
  threadId: string;
}

const ResumeContainer: React.FC<ResumeContainerProps> = ({ threadId }) => {
  const [loading, setLoading] = useState(true);
  const [threadData, setThreadData] = useState<ThreadData>({} as ThreadData);
  // const [resumeText, setResumeText] = useState('');
  const { setResumeSections } = useResumeStore();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, error } = await getResumeSections(threadId);
        if (!error && data?.sections) {
          setResumeSections(data.sections);
          setThreadData(data.threadData);
        }
      } catch (err) {
        console.error('Failed to fetch resume sections:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [threadId, setResumeSections]);

  return (
    <div>
      {loading ? (
        <ResumeSkeleton />
      ) : (
        <>
          <ResumeLayout
            threadId={threadId}
            resumeText={threadData.resumeText}
            threadData={threadData}
          />
          <ChatInterface resumeText={threadData.resumeText} />
        </>
      )}
    </div>
  );
};

export default ResumeContainer;
