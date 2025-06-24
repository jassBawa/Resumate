'use client';

import { Loader2, FileText, Upload, CheckCircle, AlertCircle } from 'lucide-react';
import React, { useState } from 'react';

export default function Dropzone({
  isUploading,
  onDrop,
}: {
  isUploading: boolean;
  onDrop: (e: File) => Promise<void>;
}) {
  const [isDragging, setIsDragging] = useState(false);
  const [dragError, setDragError] = useState<string | null>(null);

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
    setDragError(null);
  };

  const onDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    setDragError(null);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    setDragError(null);

    const file = e.dataTransfer.files[0];
    if (file) {
      // Validate file type
      const validTypes = [
        'application/pdf',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      ];
      if (!validTypes.includes(file.type)) {
        setDragError('Please upload a PDF or DOCX file');
        return;
      }

      // Validate file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        setDragError('File size must be less than 10MB');
        return;
      }

      onDrop(file);
    }
  };

  const onFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      const validTypes = [
        'application/pdf',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      ];
      if (!validTypes.includes(file.type)) {
        setDragError('Please upload a PDF or DOCX file');
        return;
      }

      // Validate file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        setDragError('File size must be less than 10MB');
        return;
      }

      setDragError(null);
      onDrop(file);
    }
  };

  return (
    <div className="mx-auto w-full max-w-2xl">
      <div
        className={`relative rounded-2xl border-2 border-dashed p-12 text-center transition-all duration-300 ${
          isDragging
            ? 'border-blue-500 bg-gradient-to-br from-blue-50 to-blue-100/50 shadow-lg shadow-blue-500/20 dark:from-blue-900/20 dark:to-blue-800/20'
            : dragError
              ? 'border-red-500 bg-gradient-to-br from-red-50 to-red-100/50 dark:from-red-900/20 dark:to-red-800/20'
              : 'border-gray-300 bg-white/50 hover:border-blue-400 hover:bg-white/80 dark:border-[#353945] dark:bg-[#23272f]/50 dark:hover:border-blue-500 dark:hover:bg-[#23272f]/80'
        }`}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={handleDrop}
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 overflow-hidden rounded-2xl">
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent dark:via-white/[0.02]"></div>
          <div className="absolute top-0 left-0 h-full w-full opacity-5 dark:opacity-10">
            <div className="absolute top-4 left-4 h-2 w-2 rounded-full bg-blue-500"></div>
            <div className="absolute top-8 right-8 h-1 w-1 rounded-full bg-purple-500"></div>
            <div className="absolute bottom-6 left-8 h-1.5 w-1.5 rounded-full bg-blue-400"></div>
            <div className="absolute right-4 bottom-4 h-1 w-1 rounded-full bg-purple-400"></div>
          </div>
        </div>

        <input
          type="file"
          onChange={onFileSelect}
          className="hidden"
          id="file-upload"
          accept=".docx, .pdf"
        />

        <label
          htmlFor="file-upload"
          className="relative z-10 flex cursor-pointer flex-col items-center space-y-6"
        >
          {isUploading ? (
            <div className="flex flex-col items-center space-y-6">
              <div className="relative">
                <div className="rounded-full bg-gradient-to-br from-blue-500 to-purple-600 p-6 shadow-lg">
                  <Loader2 className="h-8 w-8 animate-spin text-white" />
                </div>
                <div className="absolute -top-1 -right-1 h-4 w-4 animate-pulse rounded-full bg-green-500"></div>
              </div>
              <div className="space-y-3">
                <p className="text-xl font-semibold text-gray-900 dark:text-white">
                  Processing your resume...
                </p>
                <p className="max-w-sm text-sm text-gray-600 dark:text-gray-400">
                  Our AI is analyzing your resume and extracting key information. This usually takes
                  a few seconds.
                </p>
              </div>
            </div>
          ) : (
            <>
              <div className="relative">
                <div
                  className={`rounded-full p-6 transition-all duration-300 ${
                    isDragging
                      ? 'bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg shadow-blue-500/30'
                      : dragError
                        ? 'bg-gradient-to-br from-red-500 to-red-600 shadow-lg shadow-red-500/30'
                        : 'bg-gradient-to-br from-gray-100 to-gray-200 shadow-md dark:from-[#353945] dark:to-[#2a2d35]'
                  }`}
                >
                  {dragError ? (
                    <AlertCircle className="h-8 w-8 text-white" />
                  ) : (
                    <FileText
                      className={`h-8 w-8 transition-colors duration-300 ${
                        isDragging ? 'text-white' : 'text-gray-600 dark:text-gray-400'
                      }`}
                    />
                  )}
                </div>
                {isDragging && (
                  <div className="absolute -top-2 -right-2 rounded-full bg-green-500 p-2 shadow-lg">
                    <Upload className="h-4 w-4 text-white" />
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <p className="text-xl font-semibold text-gray-900 dark:text-white">
                    {dragError
                      ? 'Upload Error'
                      : isDragging
                        ? 'Drop your resume here'
                        : 'Upload your resume'}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {dragError
                      ? dragError
                      : isDragging
                        ? 'Release to upload your file'
                        : 'Drag and drop your resume file here'}
                  </p>
                </div>

                {!dragError && !isDragging && (
                  <div className="space-y-3">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      or{' '}
                      <span className="font-medium text-blue-600 transition-colors hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
                        click to browse files
                      </span>
                    </p>

                    <div className="flex items-center justify-center gap-6 text-xs text-gray-400 dark:text-gray-500">
                      <div className="flex items-center gap-1">
                        <CheckCircle className="h-3 w-3 text-green-500" />
                        <span>PDF & DOCX</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <CheckCircle className="h-3 w-3 text-green-500" />
                        <span>Max 10MB</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <CheckCircle className="h-3 w-3 text-green-500" />
                        <span>Secure</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </label>
      </div>
    </div>
  );
}
