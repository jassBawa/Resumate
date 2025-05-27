'use client';

import React, { useEffect, useState } from 'react';
import { ResumeLayout, ThreadData } from './DashboardResumeLayout';
import { ChatInterface } from '../resume/ChatInterface';
import { getResumeSections } from '@/lib/actions/resume';
import { extractResumeSections, ParsedResume } from '@/config/parseSections';
import { ResumeSkeleton } from '../resume/ResumeSkelton';

interface ResumeContainerProps {
  threadId: string;
  resumeText: string;
}

const ResumeContainer: React.FC<ResumeContainerProps> = ({
  threadId,
  resumeText,
}) => {
  const [resumeSections, setResumeSections] = useState<ParsedResume>({
    sections: {},
  });
  const [threadData, setThreadData] = useState<ThreadData>({} as ThreadData);
  const [loading, setLoading] = useState<boolean>(true);

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
  }, [threadId]);

  const handleResumeUpdate = (parsedResume: string) => {
    const parsedResumeSections = extractResumeSections(parsedResume);
    setResumeSections(parsedResumeSections);
  };

  return (
    <div>
      {loading ? (
        <ResumeSkeleton />
      ) : (
        <>
          <ResumeLayout
            sections={resumeSections.sections}
            threadData={threadData}
            threadId={threadId}
            resumeText={resumeText}
          />
          <ChatInterface
            resumeText={resumeText}
            onResumeUpdate={handleResumeUpdate}
          />
        </>
      )}
    </div>
  );
};

export default ResumeContainer;
