import { useState, useRef, useEffect } from 'react';
import { Loader2, Send, Bot, User } from 'lucide-react';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { useResumeStore } from '@/hooks/useResumeStore';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

const commandSuggestions = [
  {
    command: '/modify',
    description: 'Modify your resume with a specific instruction',
  },
  {
    command: '/cover-letter',
    description: 'Generate a tailored cover letter',
  },
];

export function ChatInterface() {
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [chatLoading, setChatLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedSuggestion, setSelectedSuggestion] = useState(0);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const { setResumeSections, originalSections } = useResumeStore();

  const filteredSuggestions = chatInput.startsWith('/')
    ? commandSuggestions.filter((s) =>
        s.command.toLowerCase().includes(chatInput.toLowerCase())
      )
    : [];

  const inputRef = useRef<HTMLInputElement>(null);

  const handleChatSend = async () => {
    if (!chatInput.trim()) return;
    const messageToSend = chatInput;

    setChatMessages((prev) => [
      ...prev,
      { role: 'user', content: messageToSend },
    ]);
    setChatInput('');
    setChatLoading(true);
    setShowSuggestions(false);

    try {
      const resumeText = JSON.stringify(originalSections);
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: messageToSend,
          conversationHistory: chatMessages,
          resumeText,
        }),
      });

      const data = await res.json();
      console.log(data);
      const { response, parsedSections } = data;
      console.log(parsedSections);
      if (parsedSections) {
        setResumeSections(parsedSections);
      }

      setChatMessages((prev) => [
        ...prev,
        { role: 'assistant', content: response },
      ]);
    } catch (error: any) {
      console.error('Chat error:', error);
      setChatMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: 'Sorry, there was an error processing your request.',
        },
      ]);
    } finally {
      setChatLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (showSuggestions && filteredSuggestions.length) {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedSuggestion(
          (prev) => (prev + 1) % filteredSuggestions.length
        );
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedSuggestion((prev) =>
          prev === 0 ? filteredSuggestions.length - 1 : prev - 1
        );
      } else if (e.key === 'Enter') {
        if (filteredSuggestions.length > 0) {
          e.preventDefault();
          setChatInput(filteredSuggestions[selectedSuggestion].command + ' ');
          setShowSuggestions(false);
          return;
        }
        handleChatSend();
      } else if (e.key === 'Escape') {
        setShowSuggestions(false);
      }
    } else if (e.key === 'Enter') {
      handleChatSend();
    }
  };

  useEffect(() => {
    setShowSuggestions(
      chatInput.startsWith('/') && filteredSuggestions.length > 0
    );
    setSelectedSuggestion(0);
  }, [chatInput, filteredSuggestions.length]);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    chatContainerRef.current?.scrollTo({
      top: chatContainerRef.current.scrollHeight,
      behavior: 'smooth',
    });
  }, [chatMessages, chatLoading]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
      className="mt-12"
    >
      <h2 className="mb-4 text-xl font-semibold text-center text-gray-900 dark:text-white">
        Resume Chat Assistant
      </h2>
      <div className="max-w-3xl p-6 mx-auto border shadow-xl bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm dark:border-zinc-700 rounded-xl">
        <div
          ref={chatContainerRef}
          className="pb-4 space-y-4 overflow-y-auto border-b border-gray-200 h-96 dark:border-gray-600"
        >
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
                    <User className="w-4 h-4" />
                  ) : (
                    <Bot className="w-4 h-4" />
                  )}
                  <span className="text-xs font-medium">
                    {msg.role === 'user' ? 'You' : 'Assistant'}
                  </span>
                </div>
                <div className="text-sm">
                  <ReactMarkdown>{msg.content}</ReactMarkdown>
                </div>
              </div>
            </motion.div>
          ))}
          {chatLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-start"
            >
              <div className="p-4 bg-gray-100 rounded-lg dark:bg-zinc-700">
                <div className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 text-gray-500 animate-spin dark:text-gray-400" />
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    Thinking...
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        <div className="relative mt-4">
          <input
            ref={inputRef}
            type="text"
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about your resume or type / to see commands..."
            className="w-full px-4 py-2 text-gray-900 bg-white border border-gray-300 rounded-lg dark:border-gray-600 dark:bg-zinc-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400"
            disabled={chatLoading}
          />

          {showSuggestions && (
            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg dark:bg-zinc-800 dark:border-gray-700">
              {filteredSuggestions.map((s, idx) => (
                <div
                  key={s.command}
                  className={`px-4 py-2 cursor-pointer ${
                    selectedSuggestion === idx
                      ? 'bg-purple-500 text-white'
                      : 'hover:bg-gray-100 dark:hover:bg-zinc-700'
                  }`}
                  onMouseDown={() => {
                    setChatInput(s.command + ' ');
                    setShowSuggestions(false);
                  }}
                >
                  <span className="font-medium">{s.command}</span>
                  <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                    – {s.description}
                  </span>
                </div>
              ))}
            </div>
          )}

          <button
            onClick={handleChatSend}
            disabled={chatLoading || !chatInput.trim()}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-purple-500 text-white rounded-lg px-3 py-1.5 hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
