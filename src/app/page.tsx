'use client';

import Dropzone from '@/components/Dropzone';
import { useResumeUpload } from '@/hooks/useResumeUpload';
import { Loader2 } from 'lucide-react';
import { ResumeLayout } from '@/components/template/ResumeLayout';
import { motion } from 'framer-motion';
import { ChatInterface } from '@/components/ChatInterface';
import { extractResumeSections } from '@/config/parseSections';
import { Header } from '@/components/Header';
import { StatusMessage } from '@/components/StatusMessage';
import { BackgroundElements } from '@/components/BackgroundElements';

export default function Home() {
  const {
    isDragging,
    isUploading,
    isLoading,
    isLoadingSections,
    setIsDragging,
    resumeText,
    uploadStatus,
    resumeSections,
    setResumeSections,
    handleFileUpload,
    handleDeleteResume,
  } = useResumeUpload();

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const onDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFileUpload(file);
  };

  const onFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFileUpload(file);
  };

  const handleResumeUpdate = (parsedResume: string) => {
    const parsedResumeSections = extractResumeSections(parsedResume);
    setResumeSections(parsedResumeSections);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-zinc-900 dark:via-zinc-800 dark:to-black py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300 relative overflow-hidden">
      <BackgroundElements />

      <div className="max-w-7xl mx-auto relative">
        <Header
          title="Resume Upload"
          description="Upload your resume in DOCX format to create a vector database entry and get AI-powered insights"
          currentUser="jass"
        />

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-3xl mx-auto bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm border dark:border-zinc-700 rounded-xl shadow-xl p-8 transition-all duration-300 hover:shadow-2xl"
        >
          {isLoading ? (
            <div className="flex items-center justify-center space-x-2">
              <Loader2 className="h-6 w-6 text-purple-500 animate-spin" />
              <p className="text-gray-600 dark:text-gray-400">Checking for existing threads...</p>
            </div>
          ) : !uploadStatus?.success ? (
            <Dropzone
              isDragging={isDragging}
              isUploading={isUploading}
              onDragOver={onDragOver}
              onDragLeave={onDragLeave}
              onDrop={onDrop}
              onFileSelect={onFileSelect}
            />
          ) : null}

          {uploadStatus && (
            <StatusMessage
              success={uploadStatus.success || false}
              message={uploadStatus.message || ''}
              threadId={uploadStatus.threadId}
              fileName={uploadStatus.fileName}
            />
          )}
        </motion.div>

        {uploadStatus?.success && (
          <>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-12"
            >
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 text-center">
                Resume Sections
              </h2>


                {isLoadingSections ? (
                  <div className="text-center py-4">
                    <Loader2 className="h-6 w-6 text-purple-500 animate-spin mx-auto" />
                  </div>
                ) : (
                  <ResumeLayout sections={resumeSections.sections} onDelete={handleDeleteResume} />
                )}
              {/* </div> */}
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="mt-12"
            >
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 text-center">
                Resume Chat Assistant
              </h2>
              <ChatInterface 
                resumeText={resumeText} 
                onResumeUpdate={handleResumeUpdate}
              />
            </motion.div>
          </>
        )}
      </div>
    </div>
  );
}
