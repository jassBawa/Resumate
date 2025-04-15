'use client';

import { Loader2, FileText } from 'lucide-react';
import React from 'react';

export default function Dropzone({
  isDragging,
  isUploading,
  onDragOver,
  onDragLeave,
  onDrop,
  onFileSelect,
}: {
  isDragging: boolean;
  isUploading: boolean;
  onDragOver: (e: React.DragEvent) => void;
  onDragLeave: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent) => void;
  onFileSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div
      className={`relative border-2 border-dashed rounded-xl p-12 text-center transition-all duration-300 ${
        isDragging
          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
          : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
      }`}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
    >
      <input
        type="file"
        onChange={onFileSelect}
        className="hidden"
        id="file-upload"
        accept=".docx, .pdf"
      />
      <label
        htmlFor="file-upload"
        className="cursor-pointer flex flex-col items-center space-y-4"
      >
        {isUploading ? (
          <div className="flex flex-col items-center space-y-4">
            <Loader2 className="h-12 w-12 text-blue-500 dark:text-blue-400 animate-spin" />
            <div className="space-y-2">
              <p className="text-lg font-medium text-gray-900 dark:text-gray-100">
                Uploading your resume...
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Please wait while we process your file
              </p>
            </div>
          </div>
        ) : (
          <>
            <div
              className={`p-4 rounded-full ${
                isDragging
                  ? 'bg-blue-100 dark:bg-blue-900/30'
                  : 'bg-gray-100 dark:bg-gray-800'
              }`}
            >
              <FileText
                className={`h-8 w-8 ${
                  isDragging
                    ? 'text-blue-500 dark:text-blue-400'
                    : 'text-gray-400 dark:text-gray-500'
                }`}
              />
            </div>
            <div className="space-y-2">
              <p className="text-lg font-medium text-gray-900 dark:text-gray-100">
                {isDragging
                  ? 'Drop your resume here'
                  : 'Drag and drop your resume'}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                or{' '}
                <span className="text-blue-500 dark:text-blue-400 font-medium">
                  click to browse
                </span>
              </p>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
                Only .docx and .pdf files are supported
              </p>
            </div>
          </>
        )}
      </label>
    </div>
  );
}
