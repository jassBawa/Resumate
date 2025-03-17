// src/components/ChatBubble.tsx
'use client'
import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Card } from './ui/card';

export interface Message {
  sender: 'user' | 'ai';
  text: string;
}

interface ChatBubbleProps {
  message: Message;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ message }) => {
  const isUser = message.sender === 'user';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <Card
        className={`p-3 max-w-xs ${
          isUser
            ? 'bg-blue-500 text-white'
            : 'bg-gray-200 dark:bg-gray-800 text-gray-900'
        } rounded-lg shadow-md`}
      >
        <ReactMarkdown>{message.text}</ReactMarkdown>
      </Card>
    </div>
  );
};

export default ChatBubble;
