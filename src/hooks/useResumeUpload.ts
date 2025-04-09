import { useState, useEffect } from 'react';
import { ParsedResume } from '@/config/parseSections';

export interface SectionData {
  data: any;  
  analysis: any;
}


export const useResumeUpload = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingSections, setIsLoadingSections] = useState(false);
  const [resumeSections, setResumeSections] = useState<ParsedResume>();
  const [uploadStatus, setUploadStatus] = useState<{
    success?: boolean;
    message?: string;
    threadId?: string;
    fileName?: string;
  } | null>(null);

  useEffect(() => {
    const checkExistingThreads = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`/api/thread?userId=jass`);
        const data = await res.json();
        if (res.ok && data.thread) {
          setUploadStatus({
            success: true,
            message: 'Using existing file',
            threadId: data.thread.id,
            fileName: data.thread.fileId,
          });
          fetchResumeSections(data.thread.id);
        }
      } catch (error) {
        console.error('Thread check failed', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkExistingThreads();
  }, []);

  const fetchResumeSections = async (threadId: string) => {
    setIsLoadingSections(true);
    try {
      const res = await fetch(`/api/retrieve-resume?threadId=${threadId}`);
      const data = await res.json();
      console.log('API Response:', data);
      if (res.ok) {
        
        setResumeSections(data.parsedResume.sections);
      }
    } catch (err) {
      console.error('Error fetching resume sections:', err);
    } finally {
      setIsLoadingSections(false);
    }
  };

  const handleFileUpload = async (file: File) => {
    if (!file.name.endsWith('.docx')) {
      return setUploadStatus({
        success: false,
        message: 'Please upload a .docx file',
      });
    }

    setIsUploading(true);
    setUploadStatus(null);

    try {
      const formData = new FormData();
      formData.append('file', file);
      const res = await fetch('/api/upload', { method: 'POST', body: formData });
      const data = await res.json();

      if (res.ok) {
        setUploadStatus({
          success: true,
          message: 'Resume uploaded successfully!',
          threadId: data.threadId,
          fileName: data.fileName,
        });
        fetchResumeSections(data.threadId);
      } else {
        throw new Error(data.message || 'Upload failed');
      }
    } catch (err) {
      setUploadStatus({
        success: false,
        message: err instanceof Error ? err.message : 'Upload error',
      });
    } finally {
      setIsUploading(false);
    }
  };

  return {
    isUploading,
    isDragging,
    setIsDragging,
    isLoading,
    isLoadingSections,
    resumeSections,
    uploadStatus,
    handleFileUpload,
  };
};
