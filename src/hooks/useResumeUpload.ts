import { useState, useEffect } from 'react';
import { extractResumeSections, ParsedResume } from '@/config/parseSections';
import { getThreadById } from '@/lib/actions/threads';
import { usePathname } from 'next/navigation';

export const useResumeUpload = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingSections, setIsLoadingSections] = useState(false);
  const [resumeText, setResumeText] = useState<string>('');
  const [resumeSections, setResumeSections] = useState<ParsedResume>({
    sections: {},
  });
  const [uploadStatus, setUploadStatus] = useState<{
    success?: boolean;
    message?: string;
    threadId?: string;
    fileName?: string;
  } | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const threadId = usePathname().split('/').pop();
  // console.log(pathname)
// 
  useEffect(() => {
    const checkExistingThreads = async () => {
      if(!threadId){
        return;
      }
      setIsLoading(true);
      const { data, error } = await getThreadById(threadId);
      if (!data) {
        console.log(error);
        return;
      }
      setUploadStatus({
        success: true,
        message: 'Using existing file',
        threadId: data.thread.id,
        fileName: data.thread.fileId,
      });
      fetchResumeSections(data.thread.id);
      setIsLoading(false);
    };

    checkExistingThreads();
  }, [threadId]);

  const fetchResumeSections = async (threadId: string) => {
    setIsLoadingSections(true);
    try {
      const res = await fetch(`/api/retrieve-resume?threadId=${threadId}`);
      const data = await res.json();
      if (res.ok) {
        setResumeText(data.response);
        const parsedResumeSections = extractResumeSections(data.response);
        setResumeSections(parsedResumeSections);
      }
    } catch (err) {
      console.error('Error fetching resume sections:', err);
    } finally {
      setIsLoadingSections(false);
    }
  };

  const handleFileUpload = async (file: File) => {
    if (!file.name.endsWith('.docx') && !file.name.endsWith('.pdf')) {
      return setUploadStatus({
        success: false,
        message: 'Please upload a .docx or .pdf file',
      });
    }

    setIsUploading(true);
    setUploadStatus(null);

    try {
      const formData = new FormData();
      formData.append('file', file);
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
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

  const handleDeleteResume = async () => {
    if (!uploadStatus?.threadId) return;

    setIsDeleting(true);
    try {
      const res = await fetch(
        `/api/delete-resume?threadId=${uploadStatus.threadId}`,
        {
          method: 'DELETE',
        }
      );

      if (!res.ok) throw new Error('Failed to delete resume');

      // Reset all states
      setResumeText('');
      setResumeSections({ sections: {} });
      setUploadStatus(null);
    } catch (error) {
      console.error('Error deleting resume:', error);
    } finally {
      setIsDeleting(false);
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
    resumeText,
    setResumeSections,
    setIsLoadingSections,
    isDeleting,
    handleDeleteResume,
  };
};
