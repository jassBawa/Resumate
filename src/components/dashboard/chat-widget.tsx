import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useIsMobile } from '@/hooks/use-mobile';
import { useResumeStore } from '@/hooks/useResumeStore';
import { ResumeSections } from '@/types';
import { Send, Sparkles, Wand2, X, Zap } from 'lucide-react';
import { useState, useRef, useEffect, useCallback } from 'react';

// Types for better type safety (Interface Segregation Principle)
interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface ChatState {
  isOpen: boolean;
  message: string;
  isLoading: boolean;
  messages: Message[];
}

// Custom hook for chat logic (Single Responsibility Principle)
function useChatLogic(threadId: string) {
  const [state, setState] = useState<ChatState>({
    isOpen: false,
    message: '',
    isLoading: false,
    messages: [
      {
        id: 1,
        text: "👋 Welcome to your AI Resume Assistant! I can help you:\n\n✨ Add projects and experiences\n🎯 Optimize for specific roles\n🚀 Enhance any section\n📝 Improve content quality\n\nTry: 'Add a React project' or 'Optimize for senior developer'",
        sender: 'bot',
        timestamp: new Date(),
      },
    ],
  });

  const { updateSection } = useResumeStore();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom (Single Responsibility)
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  // Effect for auto-scrolling when messages change
  useEffect(() => {
    scrollToBottom();
  }, [state.messages, scrollToBottom]);

  // Message handling logic (Single Responsibility)
  const addMessage = useCallback((text: string, sender: 'user' | 'bot') => {
    setState(prev => ({
      ...prev,
      messages: [
        ...prev.messages,
        {
          id: prev.messages.length + 1,
          text,
          sender,
          timestamp: new Date(),
        },
      ],
    }));
  }, []);

  // API call logic (Single Responsibility)
  const sendMessageToAPI = useCallback(
    async (message: string) => {
      try {
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            message,
            threadId,
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to get response from AI');
        }

        const data = await response.json();
        console.log(data);
        // Handle edit responses (Dependency Inversion - depends on abstraction)
        if (data.type === 'edit') {
          const parsedResume = data.data.parsedResume as ResumeSections;
          Object.entries(parsedResume).forEach(([sectionKey, sectionValue]) => {
            const key = sectionKey as keyof ResumeSections;
            if (sectionValue) {
              updateSection(key, sectionValue);
            }
          });
        }

        return data.content;
      } catch (error) {
        console.error('Error in chat:', error);
        throw new Error("😔 I'm having trouble processing your request. Please try again.");
      }
    },
    [threadId, updateSection]
  );

  // Main send message handler (Open/Closed Principle)
  const handleSendMessage = useCallback(async () => {
    const currentMessage = state.message.trim();
    if (!currentMessage || state.isLoading) return;

    // Clear input and set loading
    setState(prev => ({
      ...prev,
      message: '',
      isLoading: true,
    }));

    // Add user message immediately
    addMessage(currentMessage, 'user');

    try {
      const response = await sendMessageToAPI(currentMessage);
      addMessage(response, 'bot');
    } catch (error) {
      addMessage(error instanceof Error ? error.message : 'Something went wrong', 'bot');
    } finally {
      setState(prev => ({ ...prev, isLoading: false }));
    }
  }, [state.message, state.isLoading, addMessage, sendMessageToAPI]);

  return {
    ...state,
    messagesEndRef,
    setState,
    handleSendMessage,
    addMessage,
  };
}

export function ChatWidget({ threadId }: { threadId: string }) {
  const isMobile = useIsMobile();
  const { isOpen, message, isLoading, messages, messagesEndRef, setState, handleSendMessage } =
    useChatLogic(threadId);

  // Input handlers (Single Responsibility)
  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setState(prev => ({ ...prev, message: e.target.value }));
    },
    [setState]
  );

  const toggleChat = useCallback(() => {
    setState(prev => ({ ...prev, isOpen: !prev.isOpen }));
  }, [setState]);

  const setQuickAction = useCallback(
    (action: string) => {
      setState(prev => ({ ...prev, message: action }));
    },
    [setState]
  );

  // Keyboard handler
  const handleKeyPress = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSendMessage();
      }
    },
    [handleSendMessage]
  );

  const quickActions = [
    'Add React project',
    'Optimize for senior role',
    'Update skills',
    'Improve summary',
  ];

  const chatSize = isMobile
    ? { width: 'w-[95vw]', height: 'h-[85vh]' }
    : { width: 'w-[450px]', height: 'h-[600px]' };

  return (
    <div className={`fixed ${isMobile ? 'right-4 bottom-4 left-4' : 'right-6 bottom-6'} z-50`}>
      {!isOpen ? (
        <div className="flex flex-col items-end space-y-3">
          {/* Feature badge */}
          <div className="animate-bounce rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-4 py-2 text-xs font-semibold text-white shadow-lg backdrop-blur-sm">
            ✨ AI Assistant
          </div>

          <Button
            onClick={toggleChat}
            size="lg"
            className={`${isMobile ? 'h-16 w-16' : 'h-16 w-16'} group relative rounded-full bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25`}
          >
            <div className="relative">
              <Sparkles
                className={`${isMobile ? 'h-7 w-7' : 'h-14 w-14'} text-white transition-transform group-hover:scale-110 group-hover:rotate-12`}
              />
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 to-transparent" />
            </div>
          </Button>
        </div>
      ) : (
        <Card
          className={`${chatSize.width} ${chatSize.height} flex flex-col border-0 bg-white/95 p-0 shadow-2xl ring-1 ring-gray-200/50 backdrop-blur-xl dark:bg-[#23272f] dark:ring-1 dark:ring-[#353945]`}
        >
          <CardHeader className="flex-shrink-0 rounded-t-xl bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 p-4 text-white dark:from-indigo-700 dark:via-purple-800 dark:to-pink-900">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-3 text-lg font-semibold">
                <div className="relative">
                  <div className="rounded-lg bg-white/20 p-2 backdrop-blur-sm">
                    <Wand2 className="h-5 w-5 text-white" />
                  </div>
                  <Sparkles className="absolute -top-1 -right-1 h-3 w-3 animate-pulse text-yellow-300" />
                </div>
                <span className="text-white">AI Resume Assistant</span>
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleChat}
                className="h-8 w-8 rounded-full bg-white/10 p-0 text-white backdrop-blur-sm transition-colors hover:bg-white/20 dark:bg-white/10 dark:hover:bg-white/20"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <p className="mt-2 text-sm text-white/80">Your intelligent resume companion</p>
          </CardHeader>

          <CardContent className="flex flex-1 flex-col overflow-hidden p-0">
            <div className="flex h-full flex-col p-4">
              {/* Messages */}
              <div className="mb-4 min-h-0 flex-1">
                <div className="scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-gray-300 dark:scrollbar-track-[#23272f] dark:scrollbar-thumb-[#353945] h-full space-y-4 overflow-y-auto pr-2">
                  {messages.map(msg => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm shadow-sm transition-colors duration-200 ${
                          msg.sender === 'user'
                            ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white dark:from-indigo-700 dark:to-purple-800'
                            : 'border border-gray-200 bg-gray-50 text-gray-800 dark:border-[#353945] dark:bg-[#181a20] dark:text-gray-100'
                        } `}
                      >
                        <div className="flex items-start gap-3">
                          {msg.sender === 'bot' && (
                            <div className="mt-0.5 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 p-1 dark:from-indigo-700 dark:to-purple-800">
                              <Zap className="h-3 w-3 text-white" />
                            </div>
                          )}
                          <div className="leading-relaxed whitespace-pre-wrap">{msg.text}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-800 shadow-sm dark:border-[#353945] dark:bg-[#181a20] dark:text-gray-100">
                        <div className="flex items-center gap-3">
                          <div className="rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 p-1 dark:from-indigo-700 dark:to-purple-800">
                            <Sparkles className="h-3 w-3 animate-spin text-white" />
                          </div>
                          <span>AI is crafting your response...</span>
                        </div>
                      </div>
                    </div>
                  )}
                  {/* Auto-scroll anchor */}
                  <div ref={messagesEndRef} />
                </div>
              </div>

              {/* Quick Actions */}
              <div className="mb-4 flex-shrink-0">
                <p className="mb-3 text-xs font-medium tracking-wide text-gray-500 uppercase dark:text-gray-400">
                  Quick Actions
                </p>
                <div className="flex flex-wrap gap-2">
                  {quickActions.map((action, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      className="h-8 rounded-full border-indigo-200 bg-gradient-to-r from-indigo-50 to-purple-50 text-xs font-medium text-indigo-700 transition-all hover:from-indigo-100 hover:to-purple-100 hover:shadow-sm dark:border-[#353945] dark:bg-[#23272f] dark:from-indigo-500 dark:to-purple-600 dark:text-indigo-200 dark:hover:bg-[#232c3b]"
                      onClick={() => setQuickAction(action)}
                    >
                      {action}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Input */}
              <div className="flex flex-shrink-0 gap-3 rounded-xl bg-gray-50 p-3 dark:bg-[#181a20]">
                <Input
                  placeholder="Ask AI to enhance your resume..."
                  value={message}
                  onChange={handleInputChange}
                  onKeyPress={handleKeyPress}
                  className="flex-1 border-0 border-none bg-white shadow-sm dark:bg-[#23272f] dark:text-white dark:placeholder:text-gray-400"
                  disabled={isLoading}
                />
                <Button
                  size="sm"
                  onClick={handleSendMessage}
                  disabled={isLoading || !message.trim()}
                  className="h-10 w-10 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 p-0 shadow-sm transition-all hover:from-indigo-600 hover:to-purple-700 hover:shadow-md disabled:opacity-50 dark:from-indigo-700 dark:to-purple-800"
                >
                  <Send className="h-4 w-4 text-white" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
