'use client';

import Dropzone from '@/components/Dropzone';
import { useResumeUpload } from '@/hooks/useResumeUpload';
import { FileText, Hash, User, Clock, Loader2, Send, Bot, Sparkles } from 'lucide-react';
import ResumeLayout from '@/components/template/ResumeLayout';
import { useState } from 'react';
import { extractResumeSections } from '@/config/parseSections';
import { motion } from 'framer-motion';

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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-zinc-900 dark:via-zinc-800 dark:to-black py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 dark:bg-purple-900 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-300 dark:bg-yellow-900 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 dark:bg-pink-900 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="max-w-7xl mx-auto relative">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 mb-4">
            <Sparkles className="h-8 w-8 text-purple-500 dark:text-purple-400" />
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400">
              Resume Upload
            </h1>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Upload your resume in DOCX format to create a vector database entry and get AI-powered insights
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
            Current user: <span className="font-mono bg-gray-100 dark:bg-zinc-800 px-2 py-1 rounded-md">jass</span>
          </p>
        </motion.div>

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

          {uploadStatus?.message && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`mt-6 p-6 rounded-lg transition-all duration-300 ${
                uploadStatus.success
                  ? 'bg-green-50 dark:bg-green-900/50 text-green-800 dark:text-green-200'
                  : 'bg-red-50 dark:bg-red-900/50 text-red-800 dark:text-red-200'
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
                      User: <span className="font-mono bg-gray-100 dark:bg-zinc-800 px-2 py-1 rounded-md">jass</span>
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Hash className="h-4 w-4 mr-2" />
                    <span>
                      Thread ID:{' '}
                      <span className="font-mono bg-gray-100 dark:bg-zinc-800 px-2 py-1 rounded-md">{uploadStatus.threadId}</span>
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Hash className="h-4 w-4 mr-2" />
                    <span>
                      File ID:{' '}
                      <span className="font-mono bg-gray-100 dark:bg-zinc-800 px-2 py-1 rounded-md">{uploadStatus.fileName}</span>
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2" />
                    <span>
                      {uploadStatus.message === 'Using existing file'
                        ? 'Found at'
                        : 'Uploaded at'}
                      :{' '}
                      <span className="font-mono bg-gray-100 dark:bg-zinc-800 px-2 py-1 rounded-md">
                        {new Date().toLocaleString()}
                      </span>
                    </span>
                  </div>
                </div>
              )}
            </motion.div>
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

              <div>
                {isLoadingSections ? (
                  <div className="text-center py-4">
                    <Loader2 className="h-6 w-6 text-purple-500 animate-spin mx-auto" />
                  </div>
                ) : (
                  <ResumeLayout sections={resumeSections.sections} onDelete={handleDeleteResume} />
                )}
              </div>
            </motion.div>

            {/* Chat Interface */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="mt-12"
            >
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 text-center">
                Resume Chat Assistant
              </h2>
              <div className="max-w-3xl mx-auto bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm border dark:border-zinc-700 rounded-xl shadow-xl p-6 transition-all duration-300 hover:shadow-2xl">
                <div className="space-y-4 h-96 overflow-y-auto border-b border-gray-200 dark:border-gray-600 pb-4">
                  {chatMessages.map((msg, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: idx * 0.1 }}
                      className={`flex ${
                        msg.role === 'user' ? 'justify-end' : 'justify-start'
                      }`}
                    >
                      <div
                        className={`max-w-[80%] rounded-lg p-4 ${
                          msg.role === 'user'
                            ? 'bg-purple-500 text-white'
                            : 'bg-gray-100 dark:bg-zinc-700 text-gray-900 dark:text-gray-100'
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-2">
                          {msg.role === 'user' ? (
                            <User className="h-4 w-4" />
                          ) : (
                            <Bot className="h-4 w-4" />
                          )}
                          <span className="text-xs font-medium">
                            {msg.role === 'user' ? 'You' : 'Assistant'}
                          </span>
                        </div>
                        <p className="text-sm">{msg.content}</p>
                      </div>
                    </motion.div>
                  ))}
                  {chatLoading && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex justify-start"
                    >
                      <div className="bg-gray-100 dark:bg-zinc-700 rounded-lg p-4">
                        <div className="flex items-center gap-2">
                          <Loader2 className="h-4 w-4 animate-spin text-gray-500 dark:text-gray-400" />
                          <span className="text-sm text-gray-500 dark:text-gray-400">Thinking...</span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
                <div className="mt-4 flex items-center gap-2">
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder="Ask about your resume..."
                    className="flex-1 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 bg-white dark:bg-zinc-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 transition-colors duration-200"
                    disabled={chatLoading}
                  />
                  <button
                    onClick={handleChatSend}
                    disabled={chatLoading || !chatInput.trim()}
                    className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 flex items-center gap-2"
                  >
                    <Send className="h-5 w-5" />
                    <span>Send</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </div>
    </div>
  );
}
