// src/components/ChatWindow.tsx
'use client'
import React, { useRef, useEffect, useContext } from 'react';
import ChatBubble from './ChatBubble';
import { ChatContext } from '@/context/chat-context';
import LoadingIndicator from './LoadingIndicator';

const ChatWindow: React.FC = () => {
  const { messages, isLoading } = useContext(ChatContext);
  const endOfChatRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    endOfChatRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="h-full overflow-y-auto space-y-4">
      {messages.map((msg, index) => (
        <ChatBubble key={index} message={msg} />
      ))}
      {isLoading && <LoadingIndicator />}
      <div ref={endOfChatRef} />
    </div>
  );
};

export default ChatWindow;
