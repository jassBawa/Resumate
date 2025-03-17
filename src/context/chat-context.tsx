// src/context/chat-context.tsx
import React, { createContext, useState, ReactNode } from 'react';

export interface Message {
  sender: 'user' | 'ai';
  text: string;
}

interface ChatContextProps {
  messages: Message[];
  sendMessage: (text: string) => Promise<void>;
  isLoading: boolean;
  currentThread: string;
}

export const ChatContext = createContext<ChatContextProps>({
  messages: [],
  sendMessage: async () => {},
  isLoading: false,
  currentThread: 'default',
});

interface ChatProviderProps {
  children: ReactNode;
}

export const ChatProvider: React.FC<ChatProviderProps> = ({ children }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentThread] = useState<string>('default');

  const sendMessage = async (text: string) => {
    const userMessage: Message = { sender: 'user', text };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // Dummy thread API call (replace with your actual API logic)
      const res = await fetch('/api/thread', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ threadId: currentThread, message: text }),
      });
      const data = await res.json();
      const aiResponse: Message = {
        sender: 'ai',
        text: data.message || 'Dummy thread response.',
      };
      setMessages((prev) => [...prev, aiResponse]);
    } catch (error) {
      console.error('Error processing thread:', error);
      const aiResponse: Message = {
        sender: 'ai',
        text: 'Error processing your request.',
      };
      setMessages((prev) => [...prev, aiResponse]);
    }
    setIsLoading(false);
  };

  return (
    <ChatContext.Provider
      value={{ messages, sendMessage, isLoading, currentThread }}
    >
      {children}
    </ChatContext.Provider>
  );
};
