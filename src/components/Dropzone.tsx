'use client';

import { Upload, Loader2 } from 'lucide-react';
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
      className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors duration-200 ${
        isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'
      }`}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
    >
      <input
        type="file"
        accept=".docx"
        onChange={onFileSelect}
        className="hidden"
        id="file-upload"
      />
      <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center">
        {isUploading ? (
          <Loader2 className="h-12 w-12 text-blue-500 animate-spin mb-4" />
        ) : (
          <Upload className={`h-12 w-12 mb-4 ${isDragging ? 'text-blue-500' : 'text-gray-400'}`} />
        )}
        <span className="text-lg font-medium text-gray-900">
          {isUploading
            ? 'Uploading...'
            : isDragging
            ? 'Drop your resume here'
            : 'Drag and drop or click to upload your resume'}
        </span>
        <span className="text-sm text-gray-500 mt-2">Only .docx files are supported</span>
      </label>
    </div>
  );
}
