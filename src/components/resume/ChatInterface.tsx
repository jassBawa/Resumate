import { useState, useRef, useEffect } from 'react';
import { Loader2, Send, Bot, User } from 'lucide-react';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

interface ChatInterfaceProps {
  resumeText: string;
  onResumeUpdate: (resumseString: string) => void;
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

export function ChatInterface({
  resumeText,
  onResumeUpdate,
}: ChatInterfaceProps) {
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [chatLoading, setChatLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedSuggestion, setSelectedSuggestion] = useState(0);
  const chatContainerRef = useRef<HTMLDivElement>(null);

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
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: messageToSend,
          resumeText: resumeText,
          conversationHistory: chatMessages,
          // sectionId: []
        }),
      });

      const data = await response.json();
      console.log(data);
      if (!response.body) throw new Error('No response body returned');
      const rawText: string = data.response;
      let assistantMessage = '';
      let parsed = null;

      try {
        const jsonMatch = rawText.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          parsed = JSON.parse(jsonMatch[0]);
        }
        console.log(parsed);

        // const parsed = JSON.parse(jsonMatch[0]);

        if (parsed?.response) {
          assistantMessage = parsed.response;
        } else if (parsed?.coverLetter) {
          assistantMessage = parsed.coverLetter;
        } else {
          assistantMessage = rawText;
        }

        if (parsed?.resume) {
          const cleanResume = parsed.resume
            .replace(/\\"/g, '"')
            .replace(/\\n/g, '\n');
          onResumeUpdate(cleanResume);
        }
      } catch (error) {
        console.error('Parsing error or fallback:', error);
        assistantMessage =
          rawText ||
          'Sorry, I couldn’t parse the response, but here’s the raw output:\n\n' +
            rawText;
      }

      setChatMessages((prev) => [
        ...prev,
        { role: 'assistant', content: assistantMessage },
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
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 text-center">
        Resume Chat Assistant
      </h2>
      <div className="max-w-3xl mx-auto bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm border dark:border-zinc-700 rounded-xl shadow-xl p-6">
        <div
          ref={chatContainerRef}
          className="space-y-4 h-96 overflow-y-auto border-b border-gray-200 dark:border-gray-600 pb-4"
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
                    <User className="h-4 w-4" />
                  ) : (
                    <Bot className="h-4 w-4" />
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
              <div className="bg-gray-100 dark:bg-zinc-700 rounded-lg p-4">
                <div className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin text-gray-500 dark:text-gray-400" />
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
            className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 bg-white dark:bg-zinc-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400"
            disabled={chatLoading}
          />

          {showSuggestions && (
            <div className="absolute z-10 mt-1 w-full bg-white dark:bg-zinc-800 border border-gray-300 dark:border-gray-700 rounded-lg shadow-lg">
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
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
