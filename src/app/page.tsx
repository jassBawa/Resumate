"use client";

import { useState, useCallback } from "react";
import { Upload, FileText, Loader2, User, Hash, Clock } from "lucide-react";
import ChatInterface from "@/components/ChatInterface";

export default function Home() {
  const [isUploading, setIsUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<{
    success?: boolean;
    message?: string;
    threadId?: string;
    fileName?: string;
  } | null>({
    success: true,
    fileName: 'afa',
    threadId: "b57c56a1-15a7-477d-aa1e-d008f8fc0233",
    message: 'Resume uploaded successfully!'
  });

  const handleFileUpload = async (file: File) => {
    if (!file) return;

    if (!file.name.endsWith('.docx')) {
      setUploadStatus({
        success: false,
        message: "Please upload a .docx file"
      });
      return;
    }

    setIsUploading(true);
    setUploadStatus(null);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setUploadStatus({
          success: true,
          message: "Resume uploaded successfully!",
          threadId: data.threadId,
          fileName: data.fileName
        });
      } else {
        throw new Error(data.message || 'Upload failed');
      }
    } catch (error) {
      setUploadStatus({
        success: false,
        message: error instanceof Error ? error.message : "Failed to upload resume"
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileUpload(file);
    }
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Resume Upload
          </h1>
          <p className="text-lg text-gray-600">
            Upload your resume in DOCX format to create a vector database entry
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-xl p-8">
          <div
            className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors duration-200 ${
              isDragging
                ? "border-blue-500 bg-blue-50"
                : "border-gray-300 hover:border-gray-400"
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <input
              type="file"
              accept=".docx"
              onChange={handleFileInput}
              className="hidden"
              id="file-upload"
            />
            <label
              htmlFor="file-upload"
              className="cursor-pointer flex flex-col items-center"
            >
              {isUploading ? (
                <Loader2 className="h-12 w-12 text-blue-500 animate-spin mb-4" />
              ) : (
                <Upload className={`h-12 w-12 mb-4 ${
                  isDragging ? "text-blue-500" : "text-gray-400"
                }`} />
              )}
              <span className="text-lg font-medium text-gray-900">
                {isUploading 
                  ? "Uploading..." 
                  : isDragging 
                    ? "Drop your resume here" 
                    : "Drag and drop or click to upload your resume"}
              </span>
              <span className="text-sm text-gray-500 mt-2">
                Only .docx files are supported
              </span>
            </label>
          </div>

          {uploadStatus && (
            <div
              className={`mt-6 p-6 rounded-lg ${
                uploadStatus.success
                  ? "bg-green-50 text-green-800"
                  : "bg-red-50 text-red-800"
              }`}
            >
              <div className="flex items-center mb-4">
                <FileText className="h-5 w-5 mr-2" />
                <p className="text-sm font-medium">{uploadStatus.message}</p>
              </div>
              {uploadStatus.success && (
                <div className="space-y-3">
                  <div className="flex items-center text-sm">
                    <User className="h-4 w-4 mr-2" />
                    <span>User: <span className="font-mono">jass</span></span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Hash className="h-4 w-4 mr-2" />
                    <span>Thread ID: <span className="font-mono">{uploadStatus.threadId}</span></span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Hash className="h-4 w-4 mr-2" />
                    <span>File ID: <span className="font-mono">{uploadStatus.fileName}</span></span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Clock className="h-4 w-4 mr-2" />
                    <span>Uploaded at: <span className="font-mono">{new Date().toLocaleString()}</span></span>
                  </div>
                </div>
              )}
            </div>
          )}

          {uploadStatus?.success && uploadStatus.threadId && (
            <div className="mt-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Chat with Assistant</h2>
              <ChatInterface threadId={uploadStatus.threadId} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}