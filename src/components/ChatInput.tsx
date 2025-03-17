// src/components/ChatInput.tsx
'use client'
import React, { useState, useContext, FormEvent } from 'react';
import { Button } from './ui/button';
import { ChatContext } from '@/context/chat-context';

const ChatInput: React.FC = () => {
  const [input, setInput] = useState('');
  const { sendMessage } = useContext(ChatContext);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    sendMessage(input);
    setInput('');
  };

  return (
    <form onSubmit={handleSubmit} className="mt-2 flex items-center space-x-2">
      <input
        type="text"
        className="flex-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
        placeholder="Type your message..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <Button type="submit">Send</Button>
    </form>
  );
};

export default ChatInput;
