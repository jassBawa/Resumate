'use client';

import Dropzone from '@/components/Dropzone';
import { useResumeUpload } from '@/hooks/useResumeUpload';
import { FileText, Hash, User, Clock, Loader2 } from 'lucide-react';
import ResumeLayout from '@/components/template/ResumeLayout';
import { useEffect, useState } from 'react';
import { extractResumeSections } from '@/config/parseSections';
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
    handleFileUpload,
    setIsLoadingSections,
    setResumeSections,
  } = useResumeUpload();

  useEffect(() => {
    if (resumeSections && resumeSections.sections) {
      console.log('Updated Resume Sections:', resumeSections);
    }
  }, [resumeSections]);

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

  // Chat state and handlers
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState<
    { role: 'user' | 'assistant'; content: string }[]
  >([]);
  const [chatLoading, setChatLoading] = useState(false);

  const handleChatSend = async () => {
    if (!chatInput.trim()) return;
    const messageToSend = chatInput;
    // Add the user's message to the conversation history
    setChatMessages((prev) => [
      ...prev,
      { role: 'user', content: messageToSend },
    ]);
    setChatInput('');
    setChatLoading(true);

    try {
      setIsLoadingSections(true);
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: messageToSend,
          // Optional: Pass any resume context if needed for enhanced answers
          resumeText: resumeText,
          // Pass only assistant messages from conversation history (adjust as needed)
          conversationHistory: chatMessages,
        }),
      });
      const data = await response.json();

      if (!response.body) throw new Error('No response body returned');

      const rawText:string = data.response;

      // ✅ Extract <parsedResume>...</parsedResume> and `response` text
      const resumeMatch = rawText.match(
        /<parsedResume>([\s\S]*?)<\/parsedResume>/
      );
      const parsedResume = resumeMatch?.[1]?.trim();
      const responseMessage = rawText
        .replace(resumeMatch?.[0] || '', '')
        .trim();

      console.log(parsedResume, responseMessage);
      if (parsedResume) {
        const parsedResumeSections = extractResumeSections(
          `<parsedResume>${parsedResume}</parsedResume>`
        );
        console.log(parsedResumeSections);
        // setResumeSections(parsedResumeSections);
      }

      if (responseMessage) {
        setChatMessages((prev) => [
          ...prev,
          { role: 'assistant', content: JSON.parse(responseMessage).response },
        ]);
      }
    } catch (error: any) {
      console.error('Chat error:', error);
    } finally {
      setChatLoading(false);
      setIsLoadingSections(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-zinc-900 dark:to-black py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        {/* Resume Upload & Analysis */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Resume Upload
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Upload your resume in DOCX format to create a vector database entry
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
            Current user: <span className="font-mono">jass</span> (hardcoded)
          </p>
        </div>

        <div className="max-w-3xl mx-auto bg-white dark:bg-zinc-900 border dark:border-zinc-700 rounded-lg shadow-xl p-8 transition-all duration-300">
          {isLoading ? (
            <p className="text-center text-gray-600 dark:text-gray-400">
              Checking for existing threads...
            </p>
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

          {uploadStatus?.message && (
            <div
              className={`mt-6 p-6 rounded-lg transition-all duration-300 ${
                uploadStatus.success
                  ? 'bg-green-50 dark:bg-green-900 text-green-800 dark:text-green-200'
                  : 'bg-red-50 dark:bg-red-900 text-red-800 dark:text-red-200'
              }`}
            >
              <div className="flex items-center mb-4">
                <FileText className="h-5 w-5 mr-2" />
                <p className="text-sm font-medium">{uploadStatus.message}</p>
              </div>
              {uploadStatus.success && (
                <div className="space-y-3 text-sm">
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-2" />
                    <span>
                      User: <span className="font-mono">jass</span>
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Hash className="h-4 w-4 mr-2" />
                    <span>
                      Thread ID:{' '}
                      <span className="font-mono">{uploadStatus.threadId}</span>
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Hash className="h-4 w-4 mr-2" />
                    <span>
                      File ID:{' '}
                      <span className="font-mono">{uploadStatus.fileName}</span>
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2" />
                    <span>
                      {uploadStatus.message === 'Using existing file'
                        ? 'Found at'
                        : 'Uploaded at'}
                      :{' '}
                      <span className="font-mono">
                        {new Date().toLocaleString()}
                      </span>
                    </span>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {uploadStatus?.success && (
          <>
            <div className="mt-12">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 text-center">
                Resume Sections
              </h2>

              <div>
                {isLoadingSections ? (
                  <div className="text-center py-4">
                    <Loader2 className="h-6 w-6 text-blue-500 animate-spin mx-auto" />
                  </div>
                ) : (
                  <ResumeLayout sections={resumeSections.sections} />
                )}
              </div>
            </div>

            {/* Chat Interface */}
            <div className="mt-12">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 text-center">
                Resume Chat Assistant
              </h2>
              <div className="max-w-3xl mx-auto bg-white dark:bg-zinc-900 border dark:border-zinc-700 rounded-lg shadow-xl p-6 transition-all duration-300">
                <div className="space-y-4 h-64 overflow-y-auto border-b border-gray-200 dark:border-gray-600 pb-4">
                  {chatMessages.map((msg, idx) => (
                    <div
                      key={idx}
                      className={`p-2 rounded-md ${
                        msg.role === 'user'
                          ? 'bg-blue-100 text-blue-900 self-end'
                          : 'bg-gray-100 dark:bg-zinc-700 text-gray-900 dark:text-gray-100 self-start'
                      }`}
                    >
                      {msg.content}
                    </div>
                  ))}
                  {chatLoading && (
                    <div className="text-center text-gray-600 dark:text-gray-400">
                      Typing...
                    </div>
                  )}
                </div>
                <div className="mt-4 flex items-center">
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder="Ask about your resume..."
                    className="flex-1 border border-gray-300 dark:border-gray-600 rounded-l-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    onClick={handleChatSend}
                    disabled={chatLoading}
                    className="px-4 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700 disabled:opacity-50"
                  >
                    Send
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
