import { useState, useEffect, useRef } from 'react';
import { Send, Loader2, User, Bot } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  createdAt: Date;
}

interface ChatInterfaceProps {
  threadId: string;
}

interface ApiMessage {
  role: 'user' | 'assistant';
  content: string;
  createdAt: string;
}

export default function ChatInterface({ threadId }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Fetch old messages when threadId changes
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch(`/api/chat?threadId=${threadId}`);
        if (response.ok) {
          const data = await response.json();
          setMessages(data.messages.map((msg: ApiMessage) => ({
            ...msg,
            createdAt: new Date(msg.createdAt),
          })));
        }
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    if (threadId) {
      fetchMessages();
    }
  }, [threadId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setIsLoading(true);

    // Add user message to UI immediately
    setMessages(prev => [...prev, {
      role: 'user',
      content: userMessage,
      createdAt: new Date(),
    }]);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          threadId,
          message: userMessage,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Add assistant message to UI
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: data.message,
          createdAt: new Date(),
        }]);
      } else {
        throw new Error(data.message || 'Failed to send message');
      }
    } catch (error) {
      console.error('Chat error:', error);
      // Add error message to UI
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.',
        createdAt: new Date(),
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[600px] bg-white dark:bg-gray-900 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${
              message.role === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`max-w-[80%] rounded-lg p-4 ${
                message.role === 'user'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100'
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                {message.role === 'user' ? (
                  <User className="h-4 w-4" />
                ) : (
                  <Bot className="h-4 w-4" />
                )}
                <span className="text-xs font-medium">
                  {message.role === 'user' ? 'You' : 'Assistant'}
                </span>
              </div>
              {message.role === 'assistant' ? (
                <div className="prose prose-sm max-w-none dark:prose-invert">
                  <ReactMarkdown
                    components={{
                      code({ className, children, ...props }) {
                        return (
                          <code
                            className={`${className} bg-gray-200 dark:bg-gray-700 rounded px-1 py-0.5`}
                            {...props}
                          >
                            {children}
                          </code>
                        );
                      },
                      pre({ children, ...props }) {
                        return (
                          <pre
                            className="bg-gray-200 dark:bg-gray-700 rounded p-2 overflow-x-auto my-2"
                            {...props}
                          >
                            {children}
                          </pre>
                        );
                      },
                    }}
                  >
                    {message.content}
                  </ReactMarkdown>
                </div>
              ) : (
                <p className="text-sm">{message.content}</p>
              )}
              <p className="text-xs mt-2 opacity-70">
                {message.createdAt.toLocaleTimeString()}
              </p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4">
              <div className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin text-gray-500 dark:text-gray-400" />
                <span className="text-sm text-gray-500 dark:text-gray-400">Thinking...</span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 rounded-lg border border-gray-300 dark:border-gray-600 px-4 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
      </form>
    </div>
  );
} 