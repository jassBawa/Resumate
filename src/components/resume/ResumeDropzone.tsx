'use client';
import { uploadResume } from '@/lib/actions/resume';
import React, { useState } from 'react';
import DragAndDrop from './Dropzone';

function ResumeDropZone({ threadId }: { threadId: string }) {
  const [isUploading, setIsUploading] = useState(false);
  const handleUploadComplete = async (file: File) => {
    try {
      setIsUploading(true);
      // Call your server action to update the thread with the file ID
      const formData = new FormData();
      formData.append('file', file);
      await uploadResume(threadId, formData);

      // todo; remove
      location.reload();
    } catch (error) {
      console.error('Error updating thread with file:', error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <DragAndDrop onDrop={handleUploadComplete} isUploading={isUploading} />
  );
}

export default ResumeDropZone;
